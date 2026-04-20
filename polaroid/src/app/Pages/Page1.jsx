"use client";
import { useState, useEffect, useRef } from "react";
import CameraShutter from "../Components/CameraShutter";
import Lenis from "lenis";
import PulseText from "../Components/PulseText";
import PhotoBoothPrint from "../Components/PhotoBoothPrint";
import Button from "../Components/Button";
import { FaDownload } from "react-icons/fa";
import SparklesText from "../Components/SparklesText";
import AnimatedContent from "../Components/AnimatedContent";
import CircularGallery from "../Components/CircularGallery";

export default function Page1() {
  const [printNow, setPrintNow] = useState(false);
  const [capturedFileData, setCapturedFileData] = useState(null);

  const handleCapture = () => {
    // reset first
    setPrintNow(false);
    // setCapturedFileData(null);
    // then trigger again
    setTimeout(() => {
      setPrintNow(true);
    }, 1000);
  };

  const downloadImage = async () => {
    if (!capturedFileData) {
      alert("No photo captured yet!");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 1000;

    // 2. Load the Background/Frame (The Polaroid/Reel image)
    const frameImg = new Image();
    frameImg.crossOrigin = "anonymous";
    frameImg.src = "/images/Film.png"; // Path to your frame

    // 3. Load the Captured Photo
    const photoImg = new Image();
    photoImg.src = capturedFileData;

    // Wait for both to load
    await Promise.all([
      new Promise((res) => (frameImg.onload = res)),
      new Promise((res) => (photoImg.onload = res)),
    ]);

    // 4. DRAWING SEQUENCE
    // Draw the Frame first
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

    // Apply a Grayscale filter just for the photo part if you want that vintage look
    ctx.filter = "grayscale(100%) contrast(1.2) sepia(20%)";

    // Draw the photo inside the frame's "window"
    // You'll need to adjust these coordinates (x, y, width, height)
    // to align perfectly with the hole in your Polaroid image.
    ctx.drawImage(photoImg, 50, 40, 700, 740);

    // Reset filter so it doesn't affect anything else
    ctx.filter = "none";

    // 5. TRIGGER DOWNLOAD
    const finalImage = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = finalImage;
    link.download = `kapture-print-${Date.now()}.png`;
    link.click();
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="h-screen bg-blue-400"> {/*bg-[#FFF5EC]*/}
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <h1 className="h-full flex items-center aftersick">
          {/* <PulseText text="Kapture" scale={1.2} /> */}

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={2}
            threshold={0}
            delay={0.5}
          >
            <div>
              <SparklesText
                text="Kapture"
                colors="first"
                sparkles-count="1"
                class="my-8"
              />
            </div>
          </AnimatedContent>
        </h1>
        <h1 className="text-green-900  flex items-end justify-end z-40">
          Frame your curiosity. Start the scroll
        </h1>

        <div className="absolute w-full h-screen flex items-end ">
          <div>
            <div className="h-1/2 w-full relative -bottom-0.5 overflow-hidden ">
              <AnimatedContent
                distance={-250}
                direction="horizontal"
                reverse={false}
                duration={2}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0}
                delay={0.5}
              >
                <img src="/images/Cloud3.png" className="h-70" alt="" />
              </AnimatedContent>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-screen flex items-end justify-end overflow-hidden">
          <div className="h-1/2 w-1/2 relative -bottom-0.5 -mr-12 flex items-end justify-end">
            <AnimatedContent
              distance={300}
              direction="horizontal"
              reverse={false}
              duration={2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0}
              delay={0.5}
            >
              <img src="/images/Cloud4.png" className="h-60" alt="" />
            </AnimatedContent>
          </div>
        </div>

        <div className="absolute w-full h-120 -mt-10 flex justify-center overflow-hidden">
          <div className="" style={{ height: "180px", width:"800px", position: "relative" }}>
            <CircularGallery
              bend={100}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              />
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-[#FFF5EC] flex items-center justify-center">
        {/* CENTER ANCHOR */}
        <div className="relative">
          <div className="relative">
            <img
              src="/images/Polaroid(1)(1).png"
              className="w-[360px] h-[320px] relative z-90 object-contain"
              alt=""
            />
            <PhotoBoothPrint
              start={printNow}
              onCaptureComplete={(data) => setCapturedFileData(data)}
            />
          </div>

          {/* BUTTON (positioned relative to image) */}
          <div className="absolute top-1/2 left-full ml-20">
            <CameraShutter onCapture={handleCapture} />
          </div>
        </div>
      </div>

      <div className="h-screen w-full bg-[#FFF5EC]">
        <div className="h-screen  pt-80 flex items-center justify-center">
          <Button onClick={downloadImage}>
            <FaDownload />
          </Button>
        </div>
      </div>
    </div>
  );
}

{
  /*EDE8D0, FAF9F6, F3DED7, DFBBB1, F7E1DE, FBEFEF, FFF5EC*/
}
