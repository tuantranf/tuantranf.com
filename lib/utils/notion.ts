import { Client, LogLevel } from '@notionhq/client'
import slugify from 'slugify'

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export const getAllArticles = async () => {
  const databaseId = process.env.BLOG_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'publishedAt',
        direction: 'descending',
      },
    ],
  })

  return response.results
}

const mapArticleProperties = (article) => {
  const { id, properties } = article
  return {
    id: id,
    title: properties?.title?.title[0].plain_text || '',
    slug: slugify(properties?.title?.title[0].plain_text, { strict: true }).toLowerCase(),
    draft: false,
    tags: properties?.tags?.multi_select.map((tag: any) => tag.name) || [],
    author: {
      name: properties?.Author?.created_by.name,
      imageUrl: properties?.Author?.created_by.avatar_url,
    },
    coverImage:
      properties?.coverImage?.files[0]?.file?.url ||
      properties?.coverImage?.files[0]?.external?.url ||
      '/static/images/ocean.jpeg',
    publishedDate: properties?.publishedAt?.date?.start ?? '',
    lastUpdatedDate: properties?.UpdatedAt?.date ?? '',
    summary: properties?.description?.rich_text[0]?.plain_text ?? '',
  }
}

export const convertToArticleList = (tableData: any) => {
  let tags: string[] = []

  const articles = tableData.map((article: any) => {
    const { properties } = article

    properties?.tags?.multi_select?.forEach((category: any) => {
      const { name } = category
      if (!tags.includes(name) && name) {
        tags.push(name)
      }
    })

    return mapArticleProperties(article)
  })

  return { articles, tags }
}

export const getMoreArticlesToSuggest = async (databaseId, currentArticleTitle) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'title',
          text: {
            does_not_equal: currentArticleTitle,
          },
        },
      ],
    },
  })

  const moreArticles = response.results.map((article: any) => mapArticleProperties(article))

  return shuffleArray(moreArticles).slice(0, 2)
}

export const getArticlePage = (data, slug) => {
  const response = data.find((result) => {
    if (result.object === 'page') {
      const resultSlug = slugify(result.properties.title.title[0].plain_text, {
        strict: true,
      }).toLowerCase()
      console.log(slug)
      console.log(resultSlug)
      return resultSlug === slug
    }
    return false
  })

  return response
}

export function shuffleArray(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex != 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

export const getArticlePageData = async (page: any, slug: any) => {
  const databaseId = process.env.BLOG_DATABASE_ID

  let content = []
  let title = ''

  title = page?.properties?.title.title[0].plain_text

  const moreArticles: any = await getMoreArticlesToSuggest(databaseId, title)

  let blocks = await notion.blocks.children.list({
    block_id: page.id,
  })

  content = [...blocks.results]

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor,
    })

    content = [...content, ...blocks.results]
  }

  return {
    ...mapArticleProperties(page),
    content,
    slug,
    moreArticles,
  }
}

export const getAllTagsFromPosts = (posts: any) => {
  const taggedPosts = posts.filter((post) => post?.tags?.length > 0)

  const tags = [...taggedPosts.map((p) => p.tags).flat()]
  const tagObj = {}
  tags.forEach((tag: any) => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  return tagObj
}
