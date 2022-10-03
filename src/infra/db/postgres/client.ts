import { Pool } from 'pg'
import 'dotenv/config'

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
};

const client = new Pool(credentials)
client.connect()
export default client