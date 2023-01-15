import Container from 'components/Container'
import Socials from 'components/Socials'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-t bg-white py-16">
      <Container>
        <div className="md:flex md:items-center md:justify-between">
          <Socials />
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-gray-400">{siteMetadata.footerText}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
