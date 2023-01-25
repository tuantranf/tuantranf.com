/* eslint-disable no-case-declarations */

import React, { Fragment } from 'react'
import Text from '@/components/notionBlocks/Text'
import AnchorLink from '@/components/notionBlocks/AnchorLink'
import CodeBlock from '@/components/notionBlocks/CodeBlock'
import Callout from '@/components/notionBlocks/Callout'
import YoutubeEmbed from '@/components/notionBlocks/YoutubeEmbed'
import Image from '@/components/Image'

export function renderBlocks(block) {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="text-lg leading-[28px]">
          <Text text={value.text} />
        </p>
      )
    case 'heading_1':
      return (
        <div className="pt-16 text-3xl font-semibold">
          <AnchorLink text={value.text[0].text.content}>
            <Text text={value.text} />
          </AnchorLink>
        </div>
      )
    case 'heading_2':
      return (
        <div className="pt-8 text-2xl font-semibold">
          <AnchorLink text={value.text[0].text.content}>
            <Text text={value.text} />
          </AnchorLink>
        </div>
      )
    case 'heading_3':
      return (
        <div className="pt-8 text-xl font-semibold">
          <AnchorLink text={value.text[0].text.content}>
            <Text text={value.text} />
          </AnchorLink>
        </div>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className="text-lg">
          <Text text={value.text} />
        </li>
      )
    case 'to_do':
      return (
        <div className="text-lg">
          <label htmlFor={id} className="flex items-center justify-start space-x-3">
            <input
              id={id}
              aria-describedby={value.text}
              name={id}
              type="checkbox"
              checked={value?.checked}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <Text text={value.text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption.length >= 1 ? value.caption[0].plain_text : ''
      return (
        <figure className="mt-0">
          <Image
            className="aspect-video rounded-lg"
            src={src}
            placeholder="blur"
            alt={caption ? caption : 'A visual depiction of what is being written about'}
          />
          {caption && <figcaption className="text-center">{caption}</figcaption>}
        </figure>
      )
    case 'code':
      return (
        <CodeBlock
          language={value.language}
          caption={value.caption.length >= 1 && value.caption[0].plain_text}
          code={value.text[0].text.content}
        />
      )
    case 'callout':
      return (
        <Callout>
          {value.icon && <span className="text-2xl">{value.icon.emoji}</span>}
          <div className="text-base leading-[28px]">
            <Text text={value.text} />
          </div>
        </Callout>
      )
    case 'table_of_contents':
      return <div>TOC</div>
    case 'video':
      return <YoutubeEmbed url={value?.external?.url || ''} />
    case 'quote':
      return (
        <blockquote className="rounded-r-lg bg-gray-50 p-4">
          <Text text={value.text} />
        </blockquote>
      )
    case 'divider':
      return (
        <hr className="my-16 h-10 w-full border-none text-center before:text-2xl before:text-[#D1D5DB] before:content-['∿∿∿']"></hr>
      )
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
  }
}
