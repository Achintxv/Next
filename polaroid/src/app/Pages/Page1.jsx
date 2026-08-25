"use client";

import { useState } from "react";
import Landing from "../Components/landing/Landing";
import CameraBooth from "../Components/camera/CameraBooth";
import PhotoPrint from "../Components/print/PhotoPrint";

export default function Page() {
  const [screen, setScreen] = useState("landing");
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const handleCaptureComplete = (image) => {
    setCapturedImage(image);

    // Give the camera animation time to finish
    setTimeout(() => {
      setShowPrint(true);
    }, 800);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {screen === "landing" && (
        <Landing
          onEnter={() => setScreen("camera")}
        />
      )}

      {screen === "camera" && (
        <CameraBooth
          onClose={() => setScreen("landing")}
          onCaptureComplete={handleCaptureComplete}
        />
      )}

      {showPrint && capturedImage && (
        <PhotoPrint
  image={capturedImage}
  onRetake={() => {
    setCapturedImage(null);
    setShowPrint(false);
    setScreen("camera");
  }}
/>
      )}
    </main>
  );
}