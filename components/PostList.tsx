import PostItem from '@/components/PostItem'

type Props = {
  articles: any[]
}

export default function PostList({ articles }: Props) {
  return (
    <ul>
      {!articles.length && 'No posts found.'}
      {articles.length &&
        articles.map((article) => <PostItem article={article} key={article.slug} />)}
    </ul>
  )
}
