import { useRef, useEffect, useState } from 'react';

export default function CanvasScrollSection({ onLoadComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // FFmpeg extracted 240 frames
  const frameCount = 240; 
  const imagesRef = useRef([]);

  // 1. Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(4, '0');
      img.src = `/scroll-frames/frame_${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
          if (onLoadComplete) onLoadComplete(true);
        }
      };
      
      imgArray.push(img);
    }
    
    imagesRef.current = imgArray;
  }, [onLoadComplete]);

  // 2. Handle scroll drawing
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const container = containerRef.current;
    const textElement = textRef.current;
    const buttonElement = buttonRef.current;
    const images = imagesRef.current;
    
    // Draw initial frame
    if (images[0]) {
      context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    }

    let requestAnimationFrameId;

    const handleScroll = () => {
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
      
      requestAnimationFrameId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        
        // Calculate scroll progress (0.0 to 1.0)
        const scrollableDistance = rect.height - window.innerHeight;
        let progress = -rect.top / scrollableDistance;
        progress = Math.max(0, Math.min(progress, 1));
        
        // Pick frame
        const frameIndex = Math.min(
          frameCount - 1, 
          Math.floor(progress * frameCount)
        );
        
        // Draw frame
        if (images[frameIndex]) {
          context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
        }

        // Adjust text opacity based on progress (fades in the middle)
        if (textElement) {
          // Fade in between 10% and 30%, fade out between 70% and 90%
          let opacity = 0;
          if (progress > 0.1 && progress < 0.9) {
            opacity = Math.min(
              1, 
              (progress - 0.1) * 5, // Fade in
              (0.9 - progress) * 5  // Fade out
            );
          }
          textElement.style.opacity = opacity.toString();
          textElement.style.transform = `translateY(${50 - (progress * 100)}px)`;
        }

        // Button fades out immediately at the start (gone by 15% scroll)
        if (buttonElement) {
          let btnOpacity = Math.max(0, 1 - (progress * 6.66));
          buttonElement.style.opacity = btnOpacity.toString();
          buttonElement.style.pointerEvents = btnOpacity > 0.1 ? 'auto' : 'none';
        }

        // Scroll Indicator fades out within the first 10%
        if (scrollIndicatorRef.current) {
          let indicatorOpacity = Math.max(0, 1 - (progress * 10));
          scrollIndicatorRef.current.style.opacity = indicatorOpacity.toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger immediately
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-ink">
      
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-umber">
        
        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-ink">
            <svg className="w-12 h-12 text-ember animate-spin mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-serif text-parchment text-lg">Mending memories... {loadingProgress}%</p>
          </div>
        )}

        {/* Video Canvas */}
        <canvas 
          ref={canvasRef}
          width={1280}
          height={720}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Start Button Overlay (Left Side) */}
        <div 
          ref={buttonRef}
          className="absolute inset-y-0 left-0 flex items-center pl-8 md:pl-16 lg:pl-24 z-20"
        >
          <a
            href="#chat-section"
            className="inline-flex items-center gap-3 bg-ember text-ink font-bold text-lg px-8 py-4 rounded-2xl border-2 border-mustard shadow-[0_6px_25px_rgba(255,217,160,0.45)] hover:shadow-[0_8px_35px_rgba(255,217,160,0.65)] hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-6 h-6 fill-current text-ink" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0h-2v2h2V9z" fillRule="evenodd" />
            </svg>
            Talk to Teddy
          </a>
        </div>

        {/* Floating Text Overlay */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0"
        >
          <div className="bg-ink/80 backdrop-blur-md border-4 border-mustard p-8 rounded-lg text-center max-w-3xl mx-4 shadow-[0_0_40px_rgba(217,154,52,0.3)]">
            <h2 
              className="text-lg sm:text-xl lg:text-2xl text-parchment mb-6 leading-loose uppercase"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Your friendly <br/><span className="text-mustard inline-block mt-4">neighbourhood</span> <br/><span className="inline-block mt-4">teddy.</span>
            </h2>
            <p 
              className="text-xs sm:text-sm text-parchment/80 uppercase leading-loose"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Always watching over you,<br className="hidden sm:block" /> even when the world feels dark.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
        >
          <p className="text-parchment/80 text-sm mb-2 font-medium tracking-wide">Scroll down to chat</p>
          <svg className="w-6 h-6 text-mustard animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>
    </section>
  );
}
