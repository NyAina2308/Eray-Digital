import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

export type OrbitItem = {
  image: string
  alt: string
  size?: number
  radiusX: number
  radiusY: number
  duration: number
  delay?: number
  startAngle?: number
  zIndex?: number
}

type OrbitCardProps = OrbitItem

type OrbitGalleryProps = {
  logo: string
  logoAlt?: string
  cards: OrbitItem[]
}


/* =========================================================
   CARTE QUI TOURNE AUTOUR DU CENTRE
========================================================= */

function OrbitCard({
  image,
  alt,
  size = 125,
  radiusX,
  radiusY,
  duration,
  delay = 0,
  startAngle = 0,
  zIndex = 10,
}: OrbitCardProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radiusX * 2,
        height: radiusY * 2,
        marginLeft: -radiusX,
        marginTop: -radiusY,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      initial={{
        rotate: startAngle,
      }}
      animate={{
        rotate: startAngle + 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* ===================================================
          CARTE
      =================================================== */}

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: size,
          height: size * 0.72,
          marginLeft: -size / 2,
          marginTop: -(size * 0.72) / 2,
          transform: `translateX(${radiusX}px)`,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
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
          {/* Glow derrière la photo */}
          <div className="
            pointer-events-none
            absolute
            -inset-5
            rounded-full
            bg-[radial-gradient(circle,rgba(102,75,255,.35),transparent_70%)]
            blur-xl
          " />

          {/* Photo */}
          <img
            src={image}
            alt={alt}
            className="
              relative
              z-[1]
              h-full
              w-full
              rounded-[14px]
              object-cover
            "
          />

          {/* Reflet glass */}
          <div
            className="
              pointer-events-none
              absolute
              inset-[4px]
              z-[2]
              rounded-[14px]
              bg-[linear-gradient(135deg,rgba(255,255,255,.30),transparent_42%,rgba(77,53,255,.20))]
            "
          />
        </div>
      </motion.div>
    </motion.div>
  )
}


/* =========================================================
   PETIT POINT LUMINEUX SUR UNE ORBITE
========================================================= */

function OrbitDot({
  radiusX,
  radiusY,
  duration,
  delay = 0,
  startAngle = 0,
  size = 10,
}: {
  radiusX: number
  radiusY: number
  duration: number
  delay?: number
  startAngle?: number
  size?: number
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radiusX * 2,
        height: radiusY * 2,
        marginLeft: -radiusX,
        marginTop: -radiusY,
        transformStyle: 'preserve-3d',
      }}
      initial={{
        rotate: startAngle,
      }}
      animate={{
        rotate: startAngle + 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className="
          absolute
          left-1/2
          top-1/2
          rounded-full
          bg-[#715cff]
          shadow-[0_0_18px_6px_rgba(113,92,255,.55)]
        "
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          transform: `translateX(${radiusX}px)`,
        }}
      />
    </motion.div>
  )
}


/* =========================================================
   ORBIT GALLERY
========================================================= */

export default function OrbitGallery({
  logo,
  logoAlt = 'Eray Digital',
  cards,
}: OrbitGalleryProps) {
  return (
    <div
      className="
        relative
        mx-auto
        h-[500px]
        w-full
        max-w-[620px]
        overflow-visible
        [perspective:1200px]
      "
    >
      {/* ===================================================
          GLOW CENTRAL
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          size-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(76,71,255,.30),rgba(96,68,255,.12)_40%,transparent_72%)]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          size-[210px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(42,127,255,.18),transparent_70%)]
          blur-2xl
        "
      />


      {/* ===================================================
          ORBITE EXTÉRIEURE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[270px]
          w-[510px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[50%]
          border
          border-[#7466ff]/20
        "
        style={{
          transform:
            'translate(-50%, -50%) rotateX(63deg) rotateZ(-12deg)',
          transformStyle: 'preserve-3d',
        }}
      />


      {/* ===================================================
          ORBITE MILIEU
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[220px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[50%]
          border
          border-[#4b8dff]/20
        "
        style={{
          transform:
            'translate(-50%, -50%) rotateX(66deg) rotateZ(25deg)',
          transformStyle: 'preserve-3d',
        }}
      />


      {/* ===================================================
          ORBITE VERTICALE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[330px]
          w-[270px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[50%]
          border
          border-[#a46cff]/15
        "
        style={{
          transform:
            'translate(-50%, -50%) rotateX(68deg) rotateZ(78deg)',
          transformStyle: 'preserve-3d',
        }}
      />


      {/* ===================================================
          PETITS POINTS — POSITIONS DIFFÉRENTES
      =================================================== */}

      <OrbitDot
        radiusX={255}
        radiusY={135}
        duration={18}
        startAngle={25}
        size={9}
      />

      <OrbitDot
        radiusX={210}
        radiusY={105}
        duration={23}
        startAngle={145}
        size={7}
      />

      <OrbitDot
        radiusX={165}
        radiusY={170}
        duration={27}
        startAngle={265}
        size={8}
      />


      {/* ===================================================
          CARTES PHOTOS
      =================================================== */}

      {cards.map((card, index) => (
        <OrbitCard
          key={`${card.alt}-${index}`}
          {...card}
        />
      ))}


      {/* ===================================================
          CARTE CENTRALE
      =================================================== */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          z-30
          w-[220px]
          -translate-x-1/2
          -translate-y-1/2
        "
        animate={{
          y: [-7, 7, -7],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          duration: 5,
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
          style={{
            transform:
              'perspective(1000px) rotateX(5deg) rotateY(-4deg)',
          }}
        >
          {/* Glow bleu */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              size-[170px]
              rounded-full
              bg-[#645cff]/35
              blur-3xl
            "
          />

          {/* Glow violet */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              size-[160px]
              rounded-full
              bg-[#327eff]/25
              blur-3xl
            "
          />

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
            {/* Formes décoratives */}
            <div
              className="
                absolute
                -left-12
                top-10
                h-[190px]
                w-[80px]
                rotate-[25deg]
                rounded-[50%]
                border
                border-[#6589ff]/20
              "
            />

            <div
              className="
                absolute
                -right-14
                bottom-5
                h-[190px]
                w-[90px]
                -rotate-[20deg]
                rounded-[50%]
                bg-[#5a4cff]/10
                blur-xl
              "
            />

            {/* Logo */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={logo}
                alt={logoAlt}
                className="
                  w-[125px]
                  rounded-[18px]
                  bg-white
                  p-2
                  shadow-[0_18px_40px_-12px_rgba(0,0,0,.55)]
                "
              />

              <span
                className="
                  mt-5
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[.25em]
                  text-white/50
                "
              >
                ERAY DIGITAL
              </span>
            </div>
          </div>

          {/* Texte */}
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


      {/* ===================================================
          SPHÈRES FLOTTANTES INDÉPENDANTES
      =================================================== */}

      <motion.span
        className="
          absolute
          left-[9%]
          top-[28%]
          size-5
          rounded-full
          bg-[radial-gradient(circle_at_30%_30%,#5d9dff,#2415b8)]
          shadow-[0_0_20px_7px_rgba(70,80,255,.35)]
        "
        animate={{
          y: [-8, 8, -8],
          x: [-4, 4, -4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.span
        className="
          absolute
          right-[12%]
          top-[18%]
          size-4
          rounded-full
          bg-[radial-gradient(circle_at_30%_30%,#a58aff,#391bd0)]
          shadow-[0_0_20px_7px_rgba(95,70,255,.35)]
        "
        animate={{
          y: [7, -7, 7],
          x: [3, -3, 3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.span
        className="
          absolute
          bottom-[17%]
          left-[36%]
          size-3
          rounded-full
          bg-[#b35cff]
          shadow-[0_0_18px_6px_rgba(179,92,255,.4)]
        "
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}