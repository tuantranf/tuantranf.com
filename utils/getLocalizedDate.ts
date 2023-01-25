import siteMetadata from '@/data/siteMetadata'

export default function getLocalizedDate(date) {
  return new Date(date).toLocaleDateString(siteMetadata.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
