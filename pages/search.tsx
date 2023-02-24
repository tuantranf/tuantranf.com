import { getAllArticles, convertToArticleList } from '@/lib/utils/notion'
import SearchLayout from '@/layouts/search'

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}

export const getStaticProps = async () => {
  const posts = await getAllArticles()
  const { articles, tags } = convertToArticleList(posts)

  return {
    props: {
      tags,
      posts: articles,
    },
    revalidate: 10,
  }
}
