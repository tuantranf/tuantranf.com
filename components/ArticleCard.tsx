import { Article } from '@/types/Article'
import slugify from 'slugify'
import getLocalizedDate from '@/lib/utils/getLocalizedDate'
import Image from '@/components/Image'

type Props = {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.title, { strict: true }).toLowerCase()

  const formattedTime = getLocalizedDate(article.publishedDate)

  return (
    <a href={`/notion-blog/${slug}`}>
      <div className="group flex cursor-pointer flex-col overflow-hidden">
        <div className="relative">
          <div className="absolute">
            {article?.tags?.map((category) => (
              <div
                key={category}
                className="relative left-3 top-3 z-[2] mb-2 mr-2 inline-flex items-center rounded bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase text-gray-600 shadow"
              >
                {category}
              </div>
            ))}
          </div>
          <div className=" contrast-[0.9] filter">
            {article.coverImage && (
              <Image
                className="aspect-video w-full rounded-lg bg-gray-50 object-cover transition group-hover:opacity-90"
                src={article.coverImage}
                alt={'article cover'}
                width={400}
                height={300}
              />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white py-4">
          <div className="flex-1">
            <p className="text-xl font-semibold text-gray-900">{article.title}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-2">{article.summary}</p>
          </div>
          <div className="mt-4 flex items-center">
            <div className="mb-2 flex space-x-1 text-sm text-gray-400">
              {article.tags.map((category) => (
                <div key={category}>
                  <span className="font-semibold text-gray-600">{category} </span>
                  <span aria-hidden="true">&middot;</span>
                </div>
              ))}
              <time dateTime={formattedTime}>{formattedTime}</time>
            </div>
            {/* <p className="text-sm font-medium text-gray-900">{article?.author?.name}</p> */}
          </div>
        </div>
      </div>
    </a>
  )
}
