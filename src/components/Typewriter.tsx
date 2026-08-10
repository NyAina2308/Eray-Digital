import { useEffect, useState } from 'react'

type TypewriterProps = {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

function Typewriter({
  words,
  className = '',
  typingSpeed = 65,
  deletingSpeed = 35,
  pause = 1800,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const current = words[wordIndex % words.length]

    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('pausing'), pause)
      return () => clearTimeout(t)
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), pause / 3)
      return () => clearTimeout(t)
    }

    if (text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed)
      return () => clearTimeout(t)
    }

    setPhase('typing')
    setWordIndex((i) => (i + 1) % words.length)
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return (
    <span className={`typewriter ${className}`}>
      {text}
      <span className="typewriter__cursor">|</span>
    </span>
  )
}

export default Typewriter
