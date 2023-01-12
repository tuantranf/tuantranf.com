import siteMetaData from '@/data/siteMetaData'

export default function getLocalizedDate(date) {
  return new Date(date).toLocaleDateString(siteMetaData.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
