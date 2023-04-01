import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import PostList from '@/components/PostList'
import siteMetadata from '@/data/siteMetadata'
import { convertToArticleList, getAllArticles } from '@/lib/utils/notion'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Article } from '@/types/Article'
import NewsletterForm from '@/components/NewsletterForm'
import generateRss from '@/lib/generate-rss'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ articles: Article[] }> = async () => {
  const data = await getAllArticles()

  const { articles } = convertToArticleList(data)

  // rss
  if (articles.length > 0) {
    const rss = generateRss(articles, `feed.xml`)
    const rssPath = path.join(root, 'public')
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { articles } }
}

export default function Home({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <PostList articles={articles.slice(0, MAX_DISPLAY)} />
      </div>
      {articles.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
