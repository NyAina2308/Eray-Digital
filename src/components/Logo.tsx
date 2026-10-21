type LogoProps = {
  variant?: 'dark' | 'light'
}

/** Official Eray mark (cropped from public/Logo Eray.jpeg) + wordmark. */
function Logo({ variant = 'dark' }: LogoProps) {
  const light = variant === 'light'
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        className={`grid h-[42px] w-11 place-items-center overflow-hidden rounded-xl bg-white ${
          light ? 'p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,.15),0_8px_30px_rgba(106,60,255,.35)]' : ''
        }`}
      >
        <img src="/eray-logo.png" alt="" width="160" height="148" className="size-full object-contain" />
      </span>
      <span className={`font-sora text-lg font-medium tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>
        Eray
        <strong
          className={`ml-[3px] bg-clip-text font-bold text-transparent ${
            light ? 'bg-[linear-gradient(120deg,#c7b3ff,#9fb4ff)]' : 'bg-[linear-gradient(120deg,#7b3cff,#5a4bff_45%,#2f5bff)]'
          }`}
        >
          Digital
        </strong>
      </span>
    </div>
  )
}

export default Logo
