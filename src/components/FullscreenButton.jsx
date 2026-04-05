import { useState, useEffect, useRef } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenButton() {
  const [isFs, setIsFs] = useState(false);
  const [btnOpacity, setBtnOpacity] = useState(1);
  const timerRef = useRef(null);

  // Track fullscreen state
  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Fade button on mouse inactivity
  useEffect(() => {
    const handleMove = () => {
      setBtnOpacity(1);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setBtnOpacity(0), 4000);
    };
    window.addEventListener("mousemove", handleMove);
    timerRef.current = setTimeout(() => setBtnOpacity(0), 4000);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearTimeout(timerRef.current);
    };
  }, []);

  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed", top: 96, right: 16, zIndex: 1001,
        width: 38, height: 38,
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10,
        color: "#fff", padding: 0, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: btnOpacity, transition: "opacity 0.5s ease",
      }}
    >
      {isFs ? <Minimize size={16} /> : <Maximize size={16} />}
    </button>
  );
}
