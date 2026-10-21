import { useState } from 'react'

type HoverGifIconProps = {
  staticIcon: React.ReactNode
  gif: string
  className?: string
}

export default function HoverGifIcon({
  staticIcon,
  gif,
  className = '',
}: HoverGifIconProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <img
          src={gif}
          alt=""
          className="size-full object-contain"
        />
      ) : (
        staticIcon
      )}
    </span>
  )
}