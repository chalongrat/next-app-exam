// lib/oracle.ts (แนะนำให้เก็บใน folder lib)
import oracledb from "oracledb";

// กำหนดค่า connection pool
let pool: oracledb.Pool | null = null;

export async function initialize() {
    try {
        // ตั้งค่า Oracle Instant Client path (อาจไม่จำเป็นถ้าตั้งค่าในระดับระบบแล้ว)
        // oracledb.initOracleClient({ libDir: '/path/to/instant_client' });

        pool = await oracledb.createPool({
            user: process.env.ORACLE_USER || "APPESV",
            password: process.env.ORACLE_PASSWORD || "DaQoasdIPKHaFqdk!2$",
            connectString: process.env.ORACLE_CONNECTION_STRING || "10.250.0.115:1521/OLTPDEV",
            poolIncrement: 5,
            poolMax: 20,
            poolMin: 5,
            poolTimeout: 60,
        });

        console.log("Oracle connection pool initialized successfully");
        return pool;
    } catch (err) {
        console.error("Failed to initialize Oracle connection pool:", err);
        throw err;
    }
}

export async function closePool() {
    if (pool) {
        try {
            await pool.close(0);
            pool = null;
            console.log("Oracle connection pool closed");
        } catch (err) {
            console.error("Error closing Oracle connection pool:", err);
            throw err;
        }
    }
}

export async function executeQuery<T>(sql: string, binds: any[] = [], options: oracledb.ExecuteOptions = {}): Promise<T[]> {
    if (!pool) {
        await initialize();
    }

    let connection: oracledb.Connection | null = null;
    try {
        connection = await pool!.getConnection();

        // ตั้งค่าให้ return เป็น JavaScript objects
        const defaultOptions: oracledb.ExecuteOptions = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            autoCommit: true,
        };

        const result = await connection.execute(sql, binds, { ...defaultOptions, ...options });
        return result.rows as T[];
    } catch (err) {
        console.error("Error executing Oracle query:", err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing Oracle connection:", err);
            }
        }
    }
}

// เพิ่มฟังก์ชันสำหรับ DML operations (INSERT, UPDATE, DELETE)
export async function executeDML(sql: string, binds: any[] = [], options: oracledb.ExecuteOptions = {}): Promise<number> {
    if (!pool) {
        await initialize();
    }

    let connection: oracledb.Connection | null = null;
    try {
        connection = await pool!.getConnection();

        const defaultOptions: oracledb.ExecuteOptions = {
            autoCommit: true,
        };

        const result = await connection.execute(sql, binds, { ...defaultOptions, ...options });
        return result.rowsAffected || 0;
    } catch (err) {
        console.error("Error executing Oracle DML:", err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing Oracle connection:", err);
            }
        }
    }
}

// เพิ่มฟังก์ชันสำหรับการทำ transaction
export async function executeTransaction<T>(callback: (connection: oracledb.Connection) => Promise<T>): Promise<T> {
    if (!pool) {
        await initialize();
    }

    let connection: oracledb.Connection | null = null;
    try {
        connection = await pool!.getConnection();

        // ปิด autoCommit
        await connection.execute("SET TRANSACTION READ WRITE");

        const result = await callback(connection);

        // Commit transaction
        await connection.commit();

        return result;
    } catch (err) {
        if (connection) {
            try {
                // Rollback transaction ในกรณีเกิด error
                await connection.rollback();
            } catch (rollbackErr) {
                console.error("Error during rollback:", rollbackErr);
            }
        }
        console.error("Error executing transaction:", err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing Oracle connection:", err);
            }
        }
    }
}
