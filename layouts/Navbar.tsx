import Container from 'components/Container'
import Socials from 'components/Socials'
import siteMetaData from '@/data/siteMetaData'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed z-10 w-full border-b bg-white">
      <Container>
        <div className="flex w-full justify-between py-4 ">
          <Link href="/" passHref>
            <div className="cursor-pointer text-xl font-bold">{siteMetaData.author}</div>
          </Link>
          <Socials />
        </div>
      </Container>
    </div>
  )
}
