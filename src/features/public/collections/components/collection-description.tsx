interface CollectionDescriptionProps {
  description: string
  className?: string
}

export function CollectionDescription({
  description,
  className = 'text-base leading-relaxed font-light md:text-lg',
}: CollectionDescriptionProps) {
  // Split by double newlines (or more) to get paragraphs
  const paragraphs = description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  // If only one paragraph, render as single element for simpler structure
  if (paragraphs.length === 1) {
    return <p className={className}>{paragraphs[0]}</p>
  }

  // Multiple paragraphs: render with spacing
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className={className}>
          {para}
        </p>
      ))}
    </div>
  )
}

