import type { ReactNode } from 'react'

/**
 * Maquettes d'appareils réalistes (MacBook / iPhone) en CSS pur.
 * L'image d'écran défile doucement vers le bas au survol du groupe parent (`group`).
 */

function Screen({ src, alt, scroll }: { src: string; alt: string; scroll: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`size-full object-cover object-top ${scroll ? 'transition-[object-position] duration-[5s] ease-in-out group-hover:object-bottom' : ''}`}
    />
  )
}

/** Reflet vitré en diagonale posé sur l'écran. */
const Glare = () => (
  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,.04)_28%,transparent_42%)]" />
)

/** Plateau clavier vu de dessus (ordinateur ouvert posé sur une table). */
function Keyboard() {
  return (
    <div className="relative -mt-px [perspective:700px]">
      <div className="origin-top rounded-b-[18px] bg-[linear-gradient(180deg,#c9ccd8,#e8eaf2_30%,#b4b7c6)] px-[7%] pt-[3%] pb-[5%] shadow-[0_40px_50px_-20px_rgba(10,10,60,.7)] [transform:rotateX(62deg)]">
        <div className="grid grid-cols-[repeat(14,1fr)] gap-[2px] rounded-[4px] bg-[#16171f] p-[3px]">
          {/* 4 rangées de 14 touches, puis une rangée avec barre d'espace (4 + 6 + 4 colonnes) */}
          {Array.from({ length: 65 }, (_, i) => (
            <span key={i} className={`h-[clamp(4px,.9vw,11px)] rounded-[2px] bg-[linear-gradient(#2c2e3a,#1d1e27)] ${i === 60 ? 'col-span-6' : ''}`} />
          ))}
        </div>
        <div className="mx-auto mt-[3%] aspect-[16/7] w-[38%] rounded-[6px] bg-[linear-gradient(#d6d9e3,#c3c6d3)] shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]" />
      </div>
    </div>
  )
}

export function Laptop({ src, alt = '', scroll = true, className = '', children, keyboard = false }: { src?: string; alt?: string; scroll?: boolean; className?: string; children?: ReactNode; keyboard?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {/* Couvercle : cadre aluminium + bordure noire + encoche caméra */}
      <div className={`relative ${keyboard ? '' : 'mx-[6%]'} rounded-t-[4.5%_7%] bg-[linear-gradient(#d9dbe4,#a9acbb)] p-[0.35%] shadow-[0_30px_60px_-24px_rgba(20,15,90,.55)]`}>
        <div className="relative rounded-t-[4%_6.5%] bg-[#07070c] p-[2.6%_2.2%_3.2%]">
          <span className="absolute top-0 left-1/2 z-[2] h-[3.2%] w-[11%] -translate-x-1/2 rounded-b-[6px] bg-[#07070c]">
            <span className="absolute top-1/2 left-1/2 size-[4px] -translate-1/2 rounded-full bg-[radial-gradient(#3b4a7a,#0c0f1c)]" />
          </span>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-[#111]">
            {src && <Screen src={src} alt={alt} scroll={scroll} />}
            {children}
            <Glare />
          </div>
        </div>
      </div>
      {/* Base : clavier vu de dessus, ou simple tranche vue de face */}
      {keyboard ? <Keyboard /> : <div className="relative h-[2.2%] min-h-[9px] rounded-b-[40%_100%] bg-[linear-gradient(#eceef5_0%,#c9ccd8_45%,#8d90a1_100%)] shadow-[0_18px_24px_-14px_rgba(20,15,90,.6)]">
        <span className="absolute top-0 left-1/2 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[8px] bg-[linear-gradient(#a8abba,#d3d6e0)]" />
      </div>}
    </div>
  )
}

/** Téléphone : capture d'écran (`src`) ou interface dessinée (`children`). */
export function Phone({ src, alt = '', scroll = true, className = '', children }: { src?: string; alt?: string; scroll?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative aspect-[9/19.3] rounded-[18%/8.5%] bg-[linear-gradient(145deg,#4a4d5c,#1b1c24_40%,#3a3c48)] p-[2.2%] shadow-[0_26px_44px_-16px_rgba(20,15,90,.6)] ${className}`}>
      {/* Boutons latéraux */}
      <span className="absolute top-[18%] -left-[1.8%] h-[6%] w-[2%] rounded-l-sm bg-[#2b2c36]" />
      <span className="absolute top-[27%] -left-[1.8%] h-[10%] w-[2%] rounded-l-sm bg-[#2b2c36]" />
      <span className="absolute top-[24%] -right-[1.8%] h-[14%] w-[2%] rounded-r-sm bg-[#2b2c36]" />
      <div className="relative size-full overflow-hidden rounded-[16%/7.6%] bg-black p-[3%]">
        <div className="relative size-full overflow-hidden rounded-[14%/6.6%]">
          {src && <Screen src={src} alt={alt} scroll={scroll} />}
          {children}
          {/* Dynamic Island */}
          <span className="absolute top-[2.2%] left-1/2 h-[3.6%] w-[34%] -translate-x-1/2 rounded-full bg-black" />
          <Glare />
        </div>
      </div>
    </div>
  )
}
