import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { convertToArticleList, getAllArticles } from '@/lib/utils/notion'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Article } from '@/types/Article'
import { Pagination } from '@/types/Pagination'

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const data = await getAllArticles()
  const { articles } = convertToArticleList(data)
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  articles: Article[]
  initialDisplayPosts: Article[]
  pagination: Pagination
}> = async (context) => {
  const {
    params: { page },
  } = context
  const data = await getAllArticles()
  const { articles } = convertToArticleList(data)

  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = articles.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(articles.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      articles,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({
  articles,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={articles}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All posts"
      />
    </>
  )
}
