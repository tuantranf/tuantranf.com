import { Fragment } from 'react'
import Link from 'next/link'
import { getAllArticles, getArticlePage, getArticlePageData } from '@/lib/utils/notion'
import { Layout } from '@/layouts/Layout'
import { renderBlocks } from '@/components/notionBlocks/renderBlocks'
import getLocalizedDate from '@/lib/utils/getLocalizedDate'
import Container from '@/components/Container'
import slugify from 'slugify'
import PostList from '@/components/PostList'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'

const ArticlePage = ({
  content,
  title,
  coverImage,
  publishedDate,
  summary,
  tags,
  moreArticles,
}) => {
  const publishedOn = getLocalizedDate(publishedDate)

  const slug = slugify(title, { strict: true }).toLowerCase()

  const ogImage = `${siteMetadata.siteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`

  return (
    <>
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/blog/${slug}`}
      >
        <div>
          <div className="mx-auto -mb-48 px-6 pb-48 text-center md:-mb-96 md:pb-96">
            <div className="mx-auto max-w-3xl">
              <div className="mb-2 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="">{publishedOn}</div>
              </div>
              <PageTitle>{title}</PageTitle>
              <div className="mx-auto mt-3 max-w-3xl text-xl leading-8 text-gray-500 sm:mt-4">
                {summary}
              </div>
              <div className="flex flex-wrap justify-center">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto -mb-48 px-6 py-16 pb-48 text-center md:-mb-96 md:pb-96">
            {coverImage && (
              // responsive div for the cover image

              <div className="relative mx-auto text-center sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <Image
                  className="aspect-w-16 aspect-h-9 rounded-xl object-cover"
                  src={coverImage}
                  alt="cover image"
                  layout="responsive"
                  width={640}
                  height={360}
                />
              </div>
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
                <div className="text-3xl font-bold text-gray-900">Other articles</div>
                <Link href="/blog" passHref={true}>
                  <span className="cursor-pointer font-semibold text-gray-900">
                    More articles ➜
                  </span>
                </Link>
              </div>
              <PostList articles={moreArticles} />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = []
  const data: any = await getAllArticles()

  data.forEach((result) => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(result.properties.title.title[0].plain_text, {
            strict: true,
          }).toLowerCase(),
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
  const data = await getAllArticles()

  const page = getArticlePage(data, slug)
  const result = await getArticlePageData(page, slug)

  return {
    props: result,
    revalidate: 10,
  }
}

export default ArticlePage
