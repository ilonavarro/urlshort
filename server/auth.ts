import {sql} from '@vercel/postgres'

export const getData = async () => {
  const {rows} = await sql`SELECT * FROM links`
  return rows
}
