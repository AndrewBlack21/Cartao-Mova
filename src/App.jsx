import { useState } from "react";
import ContactCard from "./components/ContactCard";
import LandingPage from "./components/LandingPage";
import "./landing.css";

function getInitialMode() {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return "card";
  }
  return "landing";
}

export default function App() {
  const [mode, setMode] = useState(getInitialMode);

  return (
    <div className="mova-app">
      {mode === "landing"
        ? <LandingPage onOpenCard={() => setMode("card")} />
        : <ContactCard onOpenLanding={() => setMode("landing")} />}
    </div>
  );
}
