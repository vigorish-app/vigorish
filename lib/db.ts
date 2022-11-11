// db.ts: Database utilties

import { Pool } from "pg";

let GlobalPool = new Pool(); // settings loaded via env vars

export async function query(sql: string, params: any[]) {
  return await GlobalPool.query(sql, params);
}

export async function getAdvancedClient() {
  // Only use if you need multiple queries in a transaction.

  // The client MUST be ".released()" even if an error happens
  return await GlobalPool.connect();
}
