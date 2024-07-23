import pg from "pg";
const { Pool } = pg;

import { getEnvironmentVariableOrFail } from "./environmentVariableHelp.js";

/**
 * A small pool of connections to the database specified in the env var `DATABASE_URL`
 * @see https://node-postgres.com/apis/pool
 */
const dbURL = getEnvironmentVariableOrFail("DATABASE_URL");
const pool = new Pool({
    connectionString: dbURL,
    ssl: !dbURL.includes("localhost"),
    max: 8,
});

/**
 * Promises to execute the given SQL query,
 * optionally using an array of given values in place of placeholders $1, $2, etc.
 *
 * @param {string} sql The SQL query to execute
 * @param {any[]} values
 *
 * Note: Returns a promise - you'll need to `await` its resolution, or schedule a subsequent function with `.then()`
 *
 * Has the same interface as node-postgres's client.query or pool.query:
 *
 * @link https://node-postgres.com/features/queries
 *
 * Note: Don't use this for multi-query transactions - see https://node-postgres.com/apis/pool#poolquery
 */
async function query(sql, values = []) {
    console.log("running sql: ", sql);
    const dbResult = await pool.query(sql, values);
    console.log(
        `Queried db and got : ${dbResult.rowCount} row(s).  SQL was:  ${sql}`
    );
    return dbResult;
}
export { pool, query };
