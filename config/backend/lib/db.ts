import { mockDb } from './mock-db'

// Always use mock DB on Vercel (no real database available)
// This ensures all API routes work with in-memory data
export const db = mockDb;
