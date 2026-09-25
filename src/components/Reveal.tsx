import type { ReactNode, ElementType } from 'react'
import { useInView } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

/** Apparition au défilement : fondu + légère montée. */
function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform,translate,scale,rotate,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-[opacity,transform] motion-reduce:transition-none ${
        inView ? 'opacity-100 [transform:none]' : 'opacity-0 [transform:translateY(28px)] motion-reduce:opacity-100 motion-reduce:[transform:none]'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
