import {NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

// Exporting an async GET function that takes the params object in the second argument
export const GET = async (_, {params}) => {
  // Making a SQL query to select a link from the links table where the alias matches the provided slug
  // The result is limited to 1 row
  const {rows} =
    await sql`SELECT * FROM links WHERE alias=${params.slug} LIMIT 1`

  // If no rows are returned, return a response indicating the slug is not in the record
  if (rows.length === 0) {
    return new Response(`<h1>/${params.slug} is not in our record</h1>`, {
      status: 400,
      headers: {
        'content-type': 'text/html',
      },
    })
  }

  // If a row is returned, increment the visit_count for the link with the provided slug
  if (rows[0]) {
    await sql`UPDATE links SET visit_count = visit_count + 1 WHERE alias = ${params.slug}`
  }

  // Redirect to the target of the first row (the selected link)
  return NextResponse.redirect(rows[0].target, 302)
}
