import { Pool } from 'pg';

const {
  PGUSER = 'postgres',
  PGDATABASE = 'perndata',
  PGPASSWORD = 'postgres',
} = process.env;

const pool = new Pool({
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
});

export const query = ( text, params, callback ) => pool.query( text, params, callback );
