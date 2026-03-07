import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/astraveda_vault'
});

export const saveSovereignIdentity = async (data) => {
  const query = `
    INSERT INTO identities (email, place, star, reason, status)
    VALUES ($1, $2, $3, $4, 'PENDING_PAYMENT')
    RETURNING id;
  `;
  const values = [data.email, data.place, data.star, data.reason];
  
  try {
    const res = await pool.query(query, values);
    return res.rows[0].id;
  } catch (err) {
    console.error("Database Save Error:", err.stack);
  }
};
