import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import PostList from '@/components/PostList'
import { PageSEO } from '@/components/SEO'
import { convertToArticleList, getAllArticles } from '@/lib/utils/notion'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Article } from '@/types/Article'
import { Pagination as PaginationType } from '@/types/Pagination'
import Pagination from '@/components/Pagination'
import Container from '@/components/Container'

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps<{
  articles: Article[]
  initialDisplayPosts: Article[]
  pagination: PaginationType
}> = async () => {
  const data = await getAllArticles()

  const { articles } = convertToArticleList(data)

  const initialDisplayPosts = articles.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(articles.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, articles, pagination } }
}

export default function Blog({
  articles,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('')
  let filteredArticles = []
  if (articles) {
    filteredArticles = articles.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  initialDisplayPosts = filteredArticles.slice(0, POSTS_PER_PAGE)
  pagination = {
    currentPage: 1,
    totalPages: Math.ceil(filteredArticles.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <Container>
        <div className="relative">
          <input
            type="text"
            placeholder={'Search Articles'}
            className="dark:bg-night block w-full border border-black bg-white px-4 py-2 text-black dark:border-white dark:text-white"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="article-container my-8">
          <PostList articles={initialDisplayPosts} />
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </Container>
    </>
  )
}
