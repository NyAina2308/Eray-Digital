import type { ReactNode, ElementType } from 'react'
import { useInView } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
