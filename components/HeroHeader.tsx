import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import Container from './Container'

const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY

export default function HeroHeader() {
  return (
    <div className="bg-gray-100 py-24 text-center">
      <Container>
        {siteMetadata?.profileUrl && (
          <Image
            src={siteMetadata.profileUrl}
            className="mx-auto h-24 w-24 rounded-full"
            alt="profile"
            width={400}
            height={300}
          />
        )}
        <div className="mt-4 text-3xl font-extrabold text-gray-900">{siteMetadata.headerTitle}</div>
        <div className="mx-auto mt-2 max-w-2xl text-xl text-gray-500">
          {siteMetadata.headerDescription}
        </div>
      </Container>
    </div>
  )
}
