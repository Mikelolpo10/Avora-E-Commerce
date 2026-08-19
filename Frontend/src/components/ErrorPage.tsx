interface ErrorProps {
  title?: string;
  text?: string;
}

export default function ErrorPage({ title = '404', text = 'Page Not Found' }: ErrorProps) {
  return (
    <div className="relative pb-12 flex flex-col justify-center items-center min-h-screen h-full w-full gap-2">
      <h1 className="text-5xl font-bold">{title}</h1>
      <h2 className="text-center max-w-[40%] text-xl">{text}</h2>
    </div>
  )
}