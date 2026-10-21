import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type OrbitImage = {
  src: string
  alt: string
  position: string
  size?: string
  delay?: number
}

type StoryOrbitProps = {
  logo: string
  images: OrbitImage[]
  children?: ReactNode
}

const ORBIT_DURATION = 22

export default function StoryOrbit({
  logo,
  images,
}: StoryOrbitProps) {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[680px] [perspective:1200px]">

      {/* =========================================================
          HALO / LUMIÈRE DERRIÈRE LA COMPOSITION
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[430px] w-[430px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(100,70,255,.20),rgba(80,120,255,.08)_45%,transparent_72%)]
          blur-2xl
        "
      />

      {/* =========================================================
          ORBITE HORIZONTALE
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[330px] w-[610px]
          -translate-x-1/2 -translate-y-1/2
          rounded-[50%]
          border border-violet-300/30
          [transform:translate(-50%,-50%)_rotateX(62deg)]
          shadow-[0_0_40px_rgba(100,70,255,.08)]
        "
      />

      {/* =========================================================
          DEUXIÈME ORBITE INCLINÉE
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[280px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-[50%]
          border border-blue-300/20
          [transform:translate(-50%,-50%)_rotateX(62deg)_rotateZ(25deg)]
        "
      />

      {/* =========================================================
          ORBITE ANIMÉE
          Les cards sont positionnées dessus.
      ========================================================= */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: ORBIT_DURATION,
          repeat: Infinity,
          ease: 'linear',
        }}
      >

        {/* =====================================================
            CARD PHOTO 1
        ===================================================== */}
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute ${image.position}`}
          >
            {/* -------------------------------------------------
                Contre-rotation :
                la card tourne avec l'orbite mais son contenu
                reste droit.
            ------------------------------------------------- */}
            <motion.div
              className="relative"
              animate={{ rotate: -360 }}
              transition={{
                duration: ORBIT_DURATION,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Petite sphère associée à la card */}
              <span
                className="
                  absolute
                  -right-3
                  -top-3
                  z-[-1]
                  size-5
                  rounded-full
                  bg-[radial-gradient(circle_at_30%_25%,#b8a7ff,#6545ff_55%,#24127e)]
                  shadow-[0_0_18px_rgba(101,69,255,.75)]
                "
              />

              {/* Card glass */}
              <div
                className={`
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border border-white/70
                  bg-white/20
                  shadow-[0_25px_55px_-20px_rgba(60,40,180,.40)]
                  backdrop-blur-md
                  ${image.size ?? 'h-[145px] w-[110px]'}
                `}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                {/* reflet */}
                <span
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-[linear-gradient(135deg,rgba(255,255,255,.30),transparent_35%,rgba(91,70,255,.12))]
                  "
                />

                {/* bordure lumineuse */}
                <span
                  className="
                    pointer-events-none
                    absolute inset-0
                    rounded-[24px]
                    ring-1 ring-inset ring-white/40
                  "
                />
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* =========================================================
          CARTE CENTRALE
          Elle ne tourne PAS.
      ========================================================= */}
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          z-30
          h-[310px]
          w-[210px]
          -translate-x-1/2
          -translate-y-1/2
        "
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Ombre */}
        <div
          className="
            absolute
            -inset-8
            rounded-[45px]
            bg-violet-600/20
            blur-3xl
          "
        />

        {/* Carte */}
        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[30px]
            border border-white/20
            bg-[linear-gradient(155deg,#17185d,#15145b_45%,#202080)]
            shadow-[0_35px_80px_-25px_rgba(45,30,180,.70)]
          "
        >
          {/* décor intérieur */}
          <div
            className="
              absolute
              inset-[12px]
              rounded-[23px]
              border border-white/[0.07]
            "
          />

          {/* halo */}
          <div
            className="
              absolute
              left-1/2
              top-[34%]
              size-[150px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-violet-500/20
              blur-3xl
            "
          />

          {/* Logo */}
          <div
            className="
              absolute
              left-1/2
              top-[16%]
              flex
              h-[125px]
              w-[145px]
              -translate-x-1/2
              items-center
              justify-center
              overflow-hidden
              rounded-[20px]
              bg-white
              p-4
              shadow-[0_15px_30px_-10px_rgba(0,0,0,.35)]
            "
          >
            <img
              src={logo}
              alt="Eray Digital"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* badge */}
          <div
            className="
              absolute
              left-1/2
              top-[58%]
              -translate-x-1/2
              whitespace-nowrap
              rounded-full
              border border-white/10
              bg-white/[0.08]
              px-4
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white/50
            "
          >
            ERAY DIGITAL
          </div>

          {/* texte */}
          <div className="absolute bottom-7 left-6 right-6">
            <p className="font-sora text-[21px] font-semibold leading-[1.05] text-white">
              Une vision.
            </p>

            <p className="font-sora text-[21px] font-semibold leading-[1.05] text-violet-300">
              Des solutions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          PETITES SPHÈRES FIXES / DÉCOR
      ========================================================= */}
      <motion.span
        className="
          absolute
          left-[13%]
          top-[26%]
          z-10
          size-6
          rounded-full
          bg-[radial-gradient(circle_at_30%_25%,#aebdff,#315eea_55%,#17206c)]
          shadow-[0_0_20px_rgba(49,94,234,.6)]
        "
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.span
        className="
          absolute
          right-[15%]
          top-[17%]
          z-10
          size-5
          rounded-full
          bg-[radial-gradient(circle_at_30%_25%,#c0a9ff,#7044ff_55%,#26127c)]
          shadow-[0_0_20px_rgba(112,68,255,.7)]
        "
        animate={{
          y: [0, 8, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 2.7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.span
        className="
          absolute
          bottom-[15%]
          left-[49%]
          z-10
          size-3
          rounded-full
          bg-violet-500
          shadow-[0_0_14px_rgba(139,92,246,.9)]
        "
        animate={{
          y: [0, -12, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}