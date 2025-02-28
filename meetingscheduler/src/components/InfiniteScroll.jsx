import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import './InfiniteScroll.css';

gsap.registerPlugin(Observer);

export default function InfiniteScroll({
  items = [],
  isTilted = true,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.4,
  autoplayDirection = "down",
  pauseOnHover = false,
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemHeight = firstItem.offsetHeight;
    const totalHeight = itemHeight * items.length;

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      gsap.set(child, { y: i * itemHeight });
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => (rafId = requestAnimationFrame(tick));

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => rafId && cancelAnimationFrame(rafId);
      }
    }
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover]);

 
    return (
        <div className="infinite-scroll-wrapper" ref={wrapperRef}>
          <div className="infinite-scroll-container" ref={containerRef}>
            {items.map((item, i) => (
              <div className="infinite-scroll-item" key={i}>
                {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
              </div>
            ))}
          </div>
        </div>
      );
      
  
}
