import {sql} from '@vercel/postgres'
import Link from 'next/link'

const getData = async () => {
  const {rows} = await sql`SELECT * FROM links`
  return rows
}

export default async function Home() {
  const links = await getData()

  return (
    <div className='min-h-screen bg-black/70 flex flex-col items-center pt-8'>
      <h1 className='text-2xl font-bold mb-5 text-gray-900'>Links stats</h1>
      <div className='flex flex-col items-center overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-900 text-white'>
            <tr className='divide-x divide-gray-500'>
              <th className='px-6 py-3 text-left font-medium'>Alias</th>
              <th className='px-6 py-3 text-left font-medium'>Target</th>
              <th className='px-6 py-3 text-left font-medium'>Visit Count</th>
            </tr>
          </thead>
          <tbody className='bg-gray-800 text-white/80 divide-y divide-gray-200'>
            {links.map((link, index) => (
              <tr key={index} className='divide-x divide-gray-500'>
                {/* <td className='px-6 py-4 whitespace-nowrap'>{link.alias}</td> */}
                {/* <td className='px-6 py-4 whitespace-nowrap'>{link.target}</td> */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/${link.alias}`} target='_blank'>
                    {link.alias}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={link.target} target='_blank'>
                    {link.target}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {link.visit_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
