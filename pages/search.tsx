import { getAllArticles, getAllTagsFromPosts, convertToArticleList } from '@/utils/notion'
import SearchLayout from '@/layouts/search'

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}

export const getStaticProps = async () => {
  const posts = await getAllArticles()
  const { articles, categories } = convertToArticleList(posts)

  const tags = getAllTagsFromPosts(articles)

  return {
    props: {
      tags,
      posts: articles,
    },
    revalidate: 1,
  }
}
