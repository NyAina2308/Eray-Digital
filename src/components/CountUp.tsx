import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

type CountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

function CountUp({ value, prefix = '', suffix = '', duration = 1400 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default CountUp
