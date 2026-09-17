import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;
const FPS = 30;
const FRAME_DURATION = 1000 / FPS;

export default function AutoLoopCanvas({ className = "", onLoadComplete }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const loadedImages = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Pad to 4 digits (e.g. frame_0001.jpg)
      const frameIndex = i.toString().padStart(4, "0");
      img.src = `/hero-frames/frame_${frameIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT && onLoadComplete) {
          onLoadComplete(true);
        }
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [onLoadComplete]);

  // Animation Loop
  useEffect(() => {
    if (loadedCount < FRAME_COUNT || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set initial canvas resolution based on first frame
    canvas.width = images[0].width;
    canvas.height = images[0].height;

    let frameIndex = 0;
    let animationFrameId;
    let lastTime = performance.now();

    const draw = (time) => {
      const elapsed = time - lastTime;
      
      if (elapsed >= FRAME_DURATION) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
        
        frameIndex = (frameIndex + 1) % FRAME_COUNT;
        lastTime = time - (elapsed % FRAME_DURATION); // Adjust for smooth timing
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadedCount, images]);

  return (
    <canvas
      ref={canvasRef}
      className={`select-none ${className}`}
      style={{ objectFit: "cover" }}
      aria-label="Looping animation of Tedman flying"
    />
  );
}
