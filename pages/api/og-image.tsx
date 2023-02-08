import siteMetadata from '@/data/siteMetadata'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title'
    const hasDate = searchParams.has('date')
    const date = hasDate ? searchParams.get('date')?.slice(0, 100) : 'My default date'

    return new ImageResponse(
      (
        <div className="ml-3 flex flex h-[630px] w-[1200px] items-center justify-center rounded-md border p-16 shadow">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-row">
              <img
                src="https://tuantranf.com/static/images/logo.png"
                className="h-16 w-16 rounded-full"
                alt="tuantranf"
              />
              <div className="flex flex-col pl-8">
                <div className="text-[22px]">{siteMetadata.headerTitle}</div>
                <div className="text-[18px] text-blue-700">{siteMetadata.siteUrl}</div>
              </div>
            </div>

            <div className="text-2xl">
              <div className="text-grey-700 text-[22px]">{date}</div>
            </div>
            <div className="mt-4 mb-8 text-center text-7xl font-extrabold leading-[80px]">
              {title}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
