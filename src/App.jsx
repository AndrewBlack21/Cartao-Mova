import { useEffect, useState } from "react";
import ContactCard from "./components/ContactCard";
import LandingPage from "./components/LandingPage";
import "./landing.css";

const INTRO_VIDEO = "/videos/LogoVideoMova.mp4";
const INTRO_SEEN_KEY = "mova-intro-seen-v1";

function getInitialMode() {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return "card";
  }
  return "landing";
}

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  try {
    return !window.sessionStorage.getItem(INTRO_SEEN_KEY);
  } catch {
    return true;
  }
}

export default function App() {
  const [mode, setMode] = useState(getInitialMode);
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  useEffect(() => {
    if (!showIntro) return;
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      // A animação continua funcionando mesmo se o navegador bloquear o storage.
    }
  }, [showIntro]);

  function closeIntro() {
    setShowIntro(false);
  }

  return (
    <div className="mova-app">
      {mode === "landing"
        ? <LandingPage onOpenCard={() => setMode("card")} />
        : <ContactCard onOpenLanding={() => setMode("landing")} />}

      {showIntro && (
        <div className="mova-intro-overlay" role="dialog" aria-modal="true" aria-label="Apresentação da Mova">
          <video
            className="mova-intro-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={closeIntro}
            onError={closeIntro}
          >
            <source src={INTRO_VIDEO} type="video/mp4" />
          </video>
          <button className="mova-intro-skip" type="button" onClick={closeIntro}>
            Pular apresentação
          </button>
        </div>
      )}
    </div>
  );
}
