import { JSONFilePreset } from 'https://cdn.skypack.dev/lowdb/adapters/JSONFile@v1';

export const initDB = async () => {
  const adapter = new JSONFilePreset('./db.json');
  const db = await adapter.dataFile;
  return db;
};
