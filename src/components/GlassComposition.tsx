import React from 'react'
import { motion, useTime, useTransform } from 'framer-motion'

/* =========================================================
   TYPES & INTERFACES
========================================================= */

export type OrbitItem = {
  image: string
  alt: string
  size?: number
  radiusX: number
  radiusY: number
  tiltDeg?: number       // Inclinaison 3D (ex: 60°)
  rotationDeg?: number   // Rotation de l'axe orbital (ex: -15°)
  duration: number       // Durée d'un tour en secondes
  startAngle?: number    // Angle de départ en degrés (0 à 360)
}

export interface GlassCompositionProps {
  logo: string
  logoAlt?: string
  mainImage?: string
  cards?: OrbitItem[]
}

/* =========================================================
   CARTE EN ORBITE 3D (AVEC PASSAGE DEVANT/DERRIÈRE FLUIDE)
========================================================= */

function OrbitCard({
  image,
  alt,
  size = 120,
  radiusX,
  radiusY,
  tiltDeg = 60,
  rotationDeg = -15,
  duration = 12,
  startAngle = 0,
}: OrbitItem) {
  const time = useTime()

  // 1. Calcul dynamique de X à chaque frame
  const x = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawX = Math.cos(angleRad) * radiusX
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const rotRad = (rotationDeg * Math.PI) / 180

    const x1 = rawX
    const y1 = rawY * Math.cos(tiltRad)
    return x1 * Math.cos(rotRad) - y1 * Math.sin(rotRad)
  })

  // 2. Calcul dynamique de Y à chaque frame
  const y = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawX = Math.cos(angleRad) * radiusX
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const rotRad = (rotationDeg * Math.PI) / 180

    const x1 = rawX
    const y1 = rawY * Math.cos(tiltRad)
    return x1 * Math.sin(rotRad) + y1 * Math.cos(rotRad)
  })

  // 3. Bascule Z-INDEX (Carte centrale = 20)
  // zIndex = 40 quand devant (Z >= 0), zIndex = 10 quand derrière (Z < 0)
  const zIndex = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const z3d = rawY * Math.sin(tiltRad)
    return z3d >= 0 ? 40 : 10
  })

  // 4. Échelle selon la profondeur (0.75 au fond -> 1.10 devant)
  const scale = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const maxZ = Math.abs(radiusY * Math.sin(tiltRad)) || 1
    const normZ = (rawY * Math.sin(tiltRad)) / maxZ
    return 0.75 + 0.35 * ((normZ + 1) / 2)
  })

  // 5. Opacité selon la profondeur (0.5 au fond -> 1.0 devant)
  const opacity = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const maxZ = Math.abs(radiusY * Math.sin(tiltRad)) || 1
    const normZ = (rawY * Math.sin(tiltRad)) / maxZ
    return 0.5 + 0.5 * ((normZ + 1) / 2)
  })

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size * 0.72,
        marginLeft: -size / 2,
        marginTop: -(size * 0.72) / 2,
        x,
        y,
        zIndex,
        scale,
        opacity,
      }}
    >
      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-[18px]
          border
          border-white/80
          bg-white/25
          p-[4px]
          shadow-[0_20px_50px_-15px_rgba(63,48,220,.55)]
          backdrop-blur-xl
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(102,75,255,.35),transparent_70%)] blur-xl" />

        {/* Image */}
        <img
          src={image}
          alt={alt}
          className="relative z-[1] h-full w-full rounded-[14px] object-cover"
        />

        {/* Reflet effet verre */}
        <div className="pointer-events-none absolute inset-[4px] z-[2] rounded-[14px] bg-[linear-gradient(135deg,rgba(255,255,255,.30),transparent_42%,rgba(77,53,255,.20))]" />
      </div>
    </motion.div>
  )
}

/* =========================================================
   POINT LUMINEUX SUR L'ORBITE 3D
========================================================= */

function OrbitDot({
  radiusX,
  radiusY,
  tiltDeg = 60,
  rotationDeg = -15,
  duration = 12,
  startAngle = 0,
  size = 8,
}: {
  radiusX: number
  radiusY: number
  tiltDeg?: number
  rotationDeg?: number
  duration?: number
  startAngle?: number
  size?: number
}) {
  const time = useTime()

  const x = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawX = Math.cos(angleRad) * radiusX
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const rotRad = (rotationDeg * Math.PI) / 180

    const x1 = rawX
    const y1 = rawY * Math.cos(tiltRad)
    return x1 * Math.cos(rotRad) - y1 * Math.sin(rotRad)
  })

  const y = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawX = Math.cos(angleRad) * radiusX
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const rotRad = (rotationDeg * Math.PI) / 180

    const x1 = rawX
    const y1 = rawY * Math.cos(tiltRad)
    return x1 * Math.sin(rotRad) + y1 * Math.cos(rotRad)
  })

  const zIndex = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const z3d = rawY * Math.sin(tiltRad)
    return z3d >= 0 ? 35 : 5
  })

  const scale = useTransform(time, (t) => {
    const progress = ((t / 1000) % duration) / duration
    const angleRad = progress * 2 * Math.PI + (startAngle * Math.PI) / 180
    const rawY = Math.sin(angleRad) * radiusY
    const tiltRad = (tiltDeg * Math.PI) / 180
    const maxZ = Math.abs(radiusY * Math.sin(tiltRad)) || 1
    const normZ = (rawY * Math.sin(tiltRad)) / maxZ
    return 0.7 + 0.4 * ((normZ + 1) / 2)
  })

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full bg-[#715cff] shadow-[0_0_18px_6px_rgba(113,92,255,.55)]"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        x,
        y,
        zIndex,
        scale,
      }}
    />
  )
}

/* =========================================================
   COMPOSANT PRINCIPAL : GlassComposition
========================================================= */

export default function GlassComposition({
  logo,
  logoAlt = 'Eray Digital',
  mainImage,
  cards,
}: GlassCompositionProps) {
  // Config par défaut des 2 cartes opposées (0° et 180°)
  const orbitalCards: OrbitItem[] = cards ?? [
    {
      image: mainImage || logo,
      alt: 'Projet Eray 1',
      size: 130,
      radiusX: 240,
      radiusY: 150,
      tiltDeg: 60,
      rotationDeg: -15,
      duration: 12,
      startAngle: 0,
    },
    {
      image: mainImage || logo,
      alt: 'Projet Eray 2',
      size: 110,
      radiusX: 240,
      radiusY: 150,
      tiltDeg: 60,
      rotationDeg: -15,
      duration: 12,
      startAngle: 180,
    },
  ]

  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-[650px]
        w-full
        max-w-[850px]
        items-center
        justify-center
        overflow-visible
      "
    >
      <div className="relative h-full w-full">
        {/* Halos de lumière */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,71,255,.30),rgba(96,68,255,.12)_40%,transparent_72%)] blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(42,127,255,.20),transparent_70%)] blur-2xl" />

        {/* Anneaux orbitaux décoratifs en arrière-plan (z-index 0) */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[480px] rounded-full border border-[#7466ff]/30"
          style={{
            transform: 'translate(-50%, -50%) rotate(-15deg) rotateX(60deg)',
          }}
        />

        {/* Points lumineux en orbite */}
        <OrbitDot
          radiusX={240}
          radiusY={150}
          tiltDeg={60}
          rotationDeg={-15}
          duration={12}
          startAngle={90}
          size={9}
        />

        {/* Cartes en orbite (Basculent dynamiquement entre z-index 10 et 40) */}
        {orbitalCards.map((card, index) => (
          <OrbitCard key={`${card.alt}-${index}`} {...card} />
        ))}

        {/* Carte centrale FIXE (z-index 20) */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-[20] w-[220px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[25px]
              border
              border-white/25
              bg-[#101052]
              p-[8px]
              shadow-[0_35px_80px_-20px_rgba(45,35,210,.75)]
            "
          >
            {/* Lumières internes */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-[170px] rounded-full bg-[#645cff]/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-[160px] rounded-full bg-[#327eff]/25 blur-3xl" />

            {/* Contenu principal */}
            <div
              className="
                relative
                z-10
                flex
                h-[290px]
                items-center
                justify-center
                overflow-hidden
                rounded-[19px]
                bg-[linear-gradient(145deg,#111150,#211d78_55%,#15134e)]
              "
            >
              <div className="absolute -left-12 top-10 h-[190px] w-[80px] rotate-[25deg] rounded-[50%] border border-[#6589ff]/20" />
              <div className="absolute -right-14 bottom-5 h-[190px] w-[90px] -rotate-[20deg] rounded-[50%] bg-[#5a4cff]/10 blur-xl" />

              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="w-[125px] rounded-[18px] bg-white p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,.55)]"
                />

                <span className="mt-5 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[8px] font-semibold uppercase tracking-[.25em] text-white/50">
                  ERAY DIGITAL
                </span>
              </div>
            </div>

            <div className="relative z-10 px-3 pb-2 pt-3">
              <p className="font-sora text-[15px] font-semibold text-white">
                Une vision.
              </p>
              <p className="font-sora text-[15px] font-semibold text-[#9587ff]">
                Des solutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sphères d'ambiance */}
        <motion.span
          className="absolute left-[18%] top-[18%] z-40 size-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5d9dff,#2415b8)] shadow-[0_0_20px_7px_rgba(70,80,255,.35)]"
          animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute right-[22%] top-[14%] z-40 size-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#a58aff,#391bd0)] shadow-[0_0_20px_7px_rgba(95,70,255,.35)]"
          animate={{ y: [7, -7, 7], x: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}