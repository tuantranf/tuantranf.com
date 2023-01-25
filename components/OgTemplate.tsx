export default function OgTemplate({ date, title }) {
  return (
    <div className="flex h-[630px] w-[1200px] items-center justify-center border p-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl">
          <div className="">{date}</div>
        </div>
        <div className="mt-4 mb-8 text-center text-7xl font-extrabold leading-[80px]">{title}</div>
      </div>
    </div>
  )
}
