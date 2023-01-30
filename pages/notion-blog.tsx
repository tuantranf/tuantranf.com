import { convertToArticleList, getAllArticles } from '@/utils/notion'
import { Layout } from '@/layouts/Layout'
import Container from '@/components/Container'
import { useState } from 'react'
import ArticleList from '@/components/ArticleList'
import { filterArticles } from '@/utils/filterArticles'
import Category from '@/components/Category'
import PageTitle from '@/components/PageTitle'

export default function Index({ articles, categories }) {
  const [selectedTag, setSelectedTag] = useState<string>(null)
  const filteredArticles = filterArticles(articles, selectedTag)

  return (
    <Layout>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {categories.map((tag) => (
          <Category tag={tag} key={tag} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        ))}
      </div>
      <Container>
        <div className="py-8">
          <PageTitle>{!selectedTag ? 'Latest articles' : `${selectedTag} articles`}</PageTitle>
          <ArticleList articles={filteredArticles} />
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data = await getAllArticles()

  const { articles, categories } = convertToArticleList(data)

  return {
    props: {
      articles,
      categories,
    },
    revalidate: 30,
  }
}
