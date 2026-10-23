import type { CSSProperties } from 'react'

export type Shape = {
  kind: 'gem' | 'shard' | 'orb' | 'spark' | 'ring'
  pos: CSSProperties
  size?: number
  rotate?: number
  tone?: 'violet' | 'blue' | 'pink'
  delay?: number
}

export const decor: Record<'hero' | 'left' | 'right' | 'soft' | 'dark', Shape[]> = {
  hero: [
    { kind: 'shard', pos: { left: '-18px', top: '40%' }, size: 70, rotate: 20, tone: 'violet' },
    { kind: 'orb', pos: { left: '47%', top: '16%' }, size: 14, tone: 'blue' },
    { kind: 'orb', pos: { left: '44%', bottom: '10%' }, size: 22, tone: 'violet' },
    { kind: 'gem', pos: { right: '2%', top: '58%' }, size: 32, rotate: -14, tone: 'violet' },
    { kind: 'spark', pos: { left: '41%', top: '36%' }, size: 14, tone: 'blue' },
    { kind: 'spark', pos: { right: '30%', bottom: '6%' }, size: 12, tone: 'violet' },
  ],
  left: [
    { kind: 'shard', pos: { left: '-24px', top: '18%' }, size: 62, rotate: -10, tone: 'blue' },
    { kind: 'orb', pos: { left: '36%', top: '8%' }, size: 16, tone: 'violet' },
    { kind: 'gem', pos: { right: '1%', bottom: '12%' }, size: 26, rotate: 22, tone: 'blue' },
    { kind: 'spark', pos: { left: '52%', bottom: '6%' }, size: 12, tone: 'violet' },
  ],
  right: [
    { kind: 'shard', pos: { right: '-22px', top: '26%' }, size: 60, rotate: 160, tone: 'violet' },
    { kind: 'orb', pos: { right: '6%', top: '6%' }, size: 14, tone: 'blue' },
    { kind: 'orb', pos: { left: '3%', bottom: '14%' }, size: 18, tone: 'violet' },
    { kind: 'spark', pos: { left: '46%', top: '4%' }, size: 14, tone: 'blue' },
    { kind: 'ring', pos: { left: '30%', bottom: '2%' }, size: 56 },
  ],
  soft: [
    { kind: 'orb', pos: { left: '2%', top: '12%' }, size: 14, tone: 'blue' },
    { kind: 'gem', pos: { right: '1%', top: '20%' }, size: 24, rotate: -18, tone: 'violet' },
    { kind: 'spark', pos: { right: '12%', bottom: '8%' }, size: 12, tone: 'violet' },
  ],
  dark: [
    { kind: 'shard', pos: { right: '-10px', top: '12%' }, size: 80, rotate: 160, tone: 'blue' },
    { kind: 'orb', pos: { left: '46%', bottom: '14%' }, size: 16, tone: 'blue' },
    { kind: 'orb', pos: { left: '3%', top: '18%' }, size: 26, tone: 'violet' },
    { kind: 'spark', pos: { left: '38%', top: '16%' }, size: 12, tone: 'pink' },
  ],
}
