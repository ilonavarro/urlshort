import {NextResponse} from 'next/server'

export const GET = () => {
  return NextResponse.redirect('https://google.com', 302)
}
