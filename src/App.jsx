import { useState } from "react";
import ContactCard from "./components/ContactCard";
import LandingPage from "./components/LandingPage";
import "./landing.css";

export default function App() {
  const [mode, setMode] = useState("card");

  return (
    <div className="mova-app">
      <nav className="mova-mode-nav" aria-label="Alternar experiência">
        <a className="mova-nav-brand" href="#inicio" onClick={() => setMode("landing")}>MOVA<span>STORYMAKER · VIDEOMAKER</span></a>
        <div className="mova-mode-switch">
          <button className={mode === "landing" ? "active" : ""} onClick={() => setMode("landing")}>Landing Page</button>
          <button className={mode === "card" ? "active" : ""} onClick={() => setMode("card")}>Cartão Virtual</button>
        </div>
      </nav>
      {mode === "landing" ? <LandingPage onOpenCard={() => setMode("card")} /> : <ContactCard />}
    </div>
  );
}
