import Container from 'components/Container'
import Socials from 'components/Socials'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed z-10 w-full border-b bg-white">
      <Container>
        <div className="flex w-full justify-between py-4 ">
          <Link href="/" passHref>
            <div className="cursor-pointer text-xl font-bold">{siteMetadata.author}</div>
          </Link>
          <Socials />
        </div>
      </Container>
    </div>
  )
}
