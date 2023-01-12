import siteMetaData from '@/data/siteMetaData'
import Head from 'next/head'

export function MetaHead(props) {
  const { date, title, imageUrl, description, ogUrl } = props

  const titleName = title || siteMetaData.title

  return (
    <Head>
      <title>{titleName}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description || titleName} name="description" />
      <meta property="og:site_name" content={siteMetaData.author} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={siteMetaData.title} />
      <meta property="og:image" content={imageUrl || siteMetaData.socialBanner} />

      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={siteMetaData.websiteUrl} />
      <meta property="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={titleName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  )
}
