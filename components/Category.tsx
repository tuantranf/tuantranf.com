export default function Category({ setSelectedTag, tag, selectedTag }) {
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      return setSelectedTag(null)
    }
    return setSelectedTag(tag)
  }

  return (
    <div
      key={tag}
      onClick={() => handleTagClick(tag)}
      className={`${
        selectedTag === tag && 'text-gray-700 ring-2 ring-gray-400'
      } inline-flex cursor-pointer items-center rounded bg-gray-100 px-3 py-1.5 uppercase`}
    >
      <span className="text-xs font-medium uppercase">{tag || 'All'}</span>
    </div>
  )
}
