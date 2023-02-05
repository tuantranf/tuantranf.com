import { Article } from '@/types/Article'
import PostItem from './PostItem'

type Props = {
  articles: Article[]
}

export default function ArticleList({ articles }: Props) {
  return (
    <div>
      {articles.map((article) => (
        <PostItem article={article} key={article.id} />
      ))}
    </div>
  )
}
