"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDownload, FaRedo } from "react-icons/fa";

export default function PhotoPrint({
  image,
  onRetake,
}) {
  const [developed, setDeveloped] = useState(false);

  const now = new Date();

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeveloped(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const downloadImage = () => {
    const link = document.createElement("a");

    link.href = image;
    link.download = `kapture-${Date.now()}.png`;

    link.click();
  };

  return (
    <section
      className="
        fixed
        inset-0
        z-[300]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#F7F0E4]
        px-6
      "
    >

      {/* --------------------------------
          BACKGROUND
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0">

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-32
            top-10
            h-72
            w-72
            rounded-full
            bg-[#E8A6A6]/20
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-32
            bottom-10
            h-80
            w-80
            rounded-full
            bg-[#A9C7D8]/25
            blur-3xl
          "
        />

      </div>


      {/* --------------------------------
          CONTENT
      -------------------------------- */}

      <div className="
        relative
        flex
        w-full
        max-w-[1000px]
        flex-col
        items-center
        justify-center
        gap-12
        md:flex-row
        md:items-center
        md:gap-20
      ">


        {/* --------------------------------
            PRINT AREA
        -------------------------------- */}

        <div className="
          relative
          flex
          h-[520px]
          w-[340px]
          items-start
          justify-center
        ">


          {/* DESK SHADOW */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1,
              duration: 1,
            }}
            className="
              absolute
              bottom-4
              h-10
              w-[240px]
              rounded-full
              bg-[#292522]/10
              blur-xl
            "
          />


          {/* --------------------------------
              PRINTER
          -------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: -40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              top-5
              z-30
              h-[125px]
              w-[300px]
              rounded-[30px]
              border-[3px]
              border-[#292522]
              bg-[#FFF8EE]
              shadow-[9px_11px_0_#292522]
            "
          >

            {/* Brand */}

            <div className="
              absolute
              left-6
              top-5
              font-mono
              text-[9px]
              font-bold
              tracking-[0.3em]
            ">
              KAPTURE
            </div>


            {/* status */}

            <div className="
              absolute
              right-6
              top-5
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              tracking-[0.15em]
              text-[#756E67]"
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#AFC3A1]
                "
              />

              PRINTING

            </div>


            {/* slot */}

            <div className="
              absolute
              bottom-0
              left-1/2
              h-[18px]
              w-[210px]
              -translate-x-1/2
              translate-y-1/2
              rounded-full
              border-[3px]
              border-[#292522]
              bg-[#292522]"
            />

          </motion.div>


          {/* --------------------------------
              PHOTO
          -------------------------------- */}

          <motion.div
            initial={{
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: 175,
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
              duration: 2.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              top-[90px]
              z-20
              w-[220px]
              bg-white
              p-3
              pb-[58px]
              shadow-[0_15px_35px_rgba(41,37,34,0.16)]
            "
          >

            {/* PHOTO IMAGE */}

            <div className="
              relative
              aspect-[4/3]
              overflow-hidden
              bg-[#292522]"
            >

              <motion.img
                src={image}
                alt="Captured moment"
                initial={{
                  scale: 1.06,
                  filter: "blur(18px) grayscale(1)",
                }}
                animate={{
                  scale: developed ? 1 : 1.06,
                  filter: developed
                    ? "blur(0px) grayscale(0)"
                    : "blur(18px) grayscale(1)",
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                }}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* developing overlay */}

              <AnimatePresence>

                {!developed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0, 0.25, 0],
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      inset-0
                      bg-[#FFF8EE]
                    "
                  />
                )}

              </AnimatePresence>

            </div>


            {/* --------------------------------
                PHOTO LABEL
            -------------------------------- */}

            <div className="
              absolute
              bottom-3
              left-3
              right-3
              flex
              items-end
              justify-between
            ">

              <div>

                <div className="
                  font-mono
                  text-[8px]
                  font-bold
                  tracking-[0.2em]
                  text-[#292522]
                ">
                  KAPTURE
                </div>

                <div className="
                  mt-1
                  font-mono
                  text-[7px]
                  tracking-[0.08em]
                  text-[#756E67]
                ">
                  {date}
                </div>

              </div>

              <div className="
                font-mono
                text-[7px]
                text-[#756E67]
              ">
                {time}
              </div>

            </div>

          </motion.div>

        </div>


        {/* --------------------------------
            SIDE PANEL
        -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: developed ? 1 : 0,
            x: developed ? 0 : 30,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            flex
            w-full
            max-w-[300px]
            flex-col
            items-center
            text-center
            md:items-start
            md:text-left
          "
        >

          <div className="
            mb-4
            font-mono
            text-[9px]
            tracking-[0.3em]
            text-[#756E67]
          ">
            MOMENT CAPTURED
          </div>


          <h1 className="
            text-4xl
            font-semibold
            leading-[0.95]
            tracking-[-0.04em]
            text-[#292522]
            md:text-5xl
          ">
            Keep this
            <br />
            little moment.
          </h1>


          <p className="
            mt-5
            max-w-[260px]
            text-sm
            leading-6
            text-[#756E67]
          ">
            Your photograph has developed.
            Keep it somewhere you'll find it again.
          </p>


          {/* ACTIONS */}

          <div className="
            mt-8
            flex
            flex-col
            gap-3
            sm:flex-row
            md:flex-col"
          >

            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                y: 2,
              }}
              onClick={downloadImage}
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                border-[3px]
                border-[#292522]
                bg-[#F3D98B]
                px-7
                py-3
                font-mono
                text-[10px]
                font-bold
                tracking-[0.12em]
                shadow-[0_4px_0_#292522]
              "
            >

              <FaDownload />

              DOWNLOAD

            </motion.button>


            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                y: 2,
              }}
              onClick={onRetake}
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                border-2
                border-[#292522]
                bg-[#FFF8EE]
                px-7
                py-3
                font-mono
                text-[10px]
                font-bold
                tracking-[0.12em]
                shadow-[0_3px_0_#292522]
              "
            >

              <FaRedo />

              TAKE ANOTHER

            </motion.button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}