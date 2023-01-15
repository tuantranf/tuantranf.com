import { Fragment } from 'react'
import Link from 'next/link'
import { getAllArticles, getArticlePage, getArticlePageData } from '@/utils/notion'
import { Layout } from '@/layouts/Layout'
import { renderBlocks } from '@/components/notionBlocks/renderBlocks'
import getLocalizedDate from '@/utils/getLocalizedDate'
import Container from '@/components/Container'
import slugify from 'slugify'
import ArticleList from '@/components/ArticleList'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'

const ArticlePage = ({ content, title, coverImage, publishedDate, summary, moreArticles }) => {
  const publishedOn = getLocalizedDate(publishedDate)

  const slug = slugify(title).toLowerCase()

  const ogImage = `${siteMetadata.websiteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`

  return (
    <>
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/notion-blog/${slug}`}
      >
        <div>
          <div className="mx-auto -mb-48 px-6 py-16 pb-48 text-center md:-mb-96 md:pb-96">
            <div className="mx-auto max-w-3xl">
              <div className="mb-2 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="">{publishedOn}</div>
              </div>
              <div className="text-w-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </div>
              <div className="mx-auto mt-3 max-w-3xl text-xl leading-8 text-gray-500 sm:mt-4">
                {summary}
              </div>
            </div>
          </div>

          <div className="mx-auto my-16 max-w-5xl px-6 md:px-8">
            {coverImage && (
              <Image
                className="aspect-video w-full rounded-xl object-cover"
                src={coverImage}
                alt="cover image"
                width={400}
                height={300}
              />
            )}
          </div>
          <div className="mx-auto mb-24 max-w-4xl space-y-8 px-6 md:px-8">
            {content.map((block) => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
          <div className="border-t py-12">
            <Container>
              <div className="my-8 flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">Latest articles</div>
                <Link href="/">
                  <span className="cursor-pointer font-semibold text-gray-900">
                    More articles ➜
                  </span>
                </Link>
              </div>
              <ArticleList articles={moreArticles} />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = []
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID)

  data.forEach((result) => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(result.properties.title.title[0].plain_text).toLowerCase(),
        },
      })
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID)

  const page = getArticlePage(data, slug)
  const result = await getArticlePageData(page, slug, process.env.BLOG_DATABASE_ID)

  return {
    props: result,
    revalidate: 30,
  }
}

export default ArticlePage
