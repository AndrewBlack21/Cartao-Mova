import { useState } from "react";
import {
  Instagram,
  MapPin,
  User,
  ChevronRight,
  Download,
  X,
  Smartphone,
  CreditCard,
  FileText,
  Aperture,
  Camera,
  Video,
  Sparkles,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');`;

const SHUTTER_KEYFRAMES = `
@keyframes shutterIris {
  0% { clip-path: circle(75% at 50% 50%); opacity: 1; }
  48% { clip-path: circle(0% at 50% 50%); opacity: 1; }
  52% { clip-path: circle(0% at 50% 50%); opacity: 1; }
  100% { clip-path: circle(75% at 50% 50%); opacity: 1; }
}
@keyframes apertureSpin {
  to { transform: rotate(360deg); }
}
@keyframes softFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
`;

const CARD_URL = "https://cartao.movamaker.com.br";

const CONTACT = {
  name: "MOVA Storymaker & Videomaker",
  org: "MOVA",
  phone: "",
  phoneDisplay: "Em breve",
  email: "",
  site: "https://instagram.com/movamaker",
  city: "Santos",
  state: "SP",
};

function CameraLogo({ className = "w-9 h-9", color = "#2E1B13", accent = "#AD7A34" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <path d="M35 22 H25 Q19 22 19 28 V38" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M65 22 H75 Q81 22 81 28 V38" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M35 78 H25 Q19 78 19 72 V62" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M65 78 H75 Q81 78 81 72 V62" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M14 54 Q40 38 62 49 T88 44" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="88" cy="44" r="4.5" fill={accent} />
    </svg>
  );
}

const LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    value: "@movamaker",
    icon: Instagram,
    bg: "#AD7A34",
    href: "https://instagram.com/movamaker",
  },
  {
    key: "jose",
    label: "José Carllos",
    value: "@josecarllosmd",
    icon: Instagram,
    bg: "#2E1B13",
    href: "https://instagram.com/josecarllosmd",
  },
  {
    key: "kalyne",
    label: "Kalyne",
    value: "@kalynejag",
    icon: Instagram,
    bg: "#2E1B13",
    href: "https://instagram.com/kalynejag",
  },
  {
    key: "location",
    label: "Localização",
    value: "Santos - SP",
    icon: MapPin,
    bg: "#AD7A34",
    href: "https://maps.google.com/?q=Santos,SP",
  },
];

const SERVICES = [
  {
    title: "Storymaker",
    description: "Stories, cobertura e conteúdo para redes sociais.",
    icon: Camera,
  },
  {
    title: "Videomaker",
    description: "Captação, edição, reels e produção audiovisual.",
    icon: Video,
  },
];

function downloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${CONTACT.org};;;`,
    `FN:${CONTACT.name}`,
    `ORG:${CONTACT.org}`,
    CONTACT.phone ? `TEL;TYPE=CELL:${CONTACT.phone}` : null,
    CONTACT.email ? `EMAIL:${CONTACT.email}` : null,
    `URL:${CONTACT.site}`,
    `ADR;TYPE=WORK:;;${CONTACT.city};${CONTACT.state};;Brasil`,
    "END:VCARD",
  ].filter(Boolean).join("\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mova-storymaker-videomaker.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function downloadPdfCard() {
  const doc = new jsPDF({ unit: "mm", format: [90, 55] });
  doc.setFillColor(241, 231, 218);
  doc.rect(0, 0, 90, 55, "F");
  doc.setTextColor(46, 27, 19);
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("MOVA", 8, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(173, 122, 52);
  doc.text("STORYMAKER & VIDEOMAKER", 8, 21);
  doc.setTextColor(46, 27, 19);
  doc.setFontSize(8);
  doc.text("Conteúdo e produção audiovisual", 8, 32);
  doc.text(`${CONTACT.city} - ${CONTACT.state}`, 8, 37);
  doc.text("@movamaker", 8, 42);

  const qrDataUrl = await QRCode.toDataURL(CARD_URL, {
    margin: 0,
    color: { dark: "#2E1B13", light: "#F1E7DA" },
  });
  doc.addImage(qrDataUrl, "PNG", 64, 26, 20, 20);
  doc.save("cartao-mova.pdf");
}

function ViewToggle({ view, setView }) {
  return (
    <div className="mova-view-toggle">
      <span className={`mova-view-indicator ${view === "fisico" ? "is-physical" : ""}`} />
      <button className={view === "digital" ? "is-active" : ""} onClick={() => setView("digital")}>
        <Smartphone size={14} /> Digital
      </button>
      <button className={view === "fisico" ? "is-active" : ""} onClick={() => setView("fisico")}>
        <CreditCard size={14} /> Cartão físico
      </button>
    </div>
  );
}

function PhysicalCard() {
  const [flipped, setFlipped] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [spin, setSpin] = useState(false);

  function trigger() {
    if (shutter) return;
    setShutter(true);
    setSpin(true);
    setTimeout(() => setFlipped((current) => !current), 380);
  }

  return (
    <div className="physical-card-section">
      <div className="physical-card-wrap" onClick={trigger} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && trigger()}>
        <div className={`physical-card ${flipped ? "is-flipped" : ""}`}>
          <div className="physical-card-face physical-card-front">
            <CameraLogo className="w-10 h-10" />
            <div>
              <div className="physical-mova">MOVA</div>
              <div className="physical-role">STORYMAKER & VIDEOMAKER</div>
            </div>
          </div>
          <div className="physical-card-face physical-card-back">
            <div className="physical-qr">
              <QRCodeSVG value={CARD_URL} size={88} bgColor="#F1E7DA" fgColor="#2E1B13" level="M" />
            </div>
            <div>
              <strong>Escaneie o QR Code</strong>
              <p>Acesse o cartão virtual completo da MOVA.</p>
            </div>
          </div>
        </div>
        {shutter && <div className="shutter-overlay" style={{ animation: "shutterIris .76s ease-in-out" }} onAnimationEnd={() => setShutter(false)} />}
      </div>
      <div className="physical-hint">
        <Aperture size={14} className="gold-icon" style={spin ? { animation: "apertureSpin .76s ease-in-out" } : undefined} onAnimationEnd={() => setSpin(false)} />
        Toque no cartão para ver o verso
      </div>
    </div>
  );
}

export default function MovaVirtualCard() {
  const [showSave, setShowSave] = useState(false);
  const [view, setView] = useState("digital");

  return (
    <main className="mova-page">
      <style>{FONT_IMPORT}{SHUTTER_KEYFRAMES}</style>

      <div className="mova-shell">
        <section className="mova-hero">
          <div className="hero-glow hero-glow-gold" />
          <div className="hero-glow hero-glow-brown" />
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />

          <header className="hero-header">
            <div className="mova-brand">
              <CameraLogo className="brand-camera" />
              <div>
                <div className="brand-wordmark">MOVA</div>
                <div className="brand-mini">STORYMAKER & VIDEOMAKER</div>
              </div>
            </div>
            <span className="hero-pill">CARTÃO DIGITAL</span>
          </header>

          <div className="hero-content">
            <div className="hero-eyebrow"><Sparkles size={13} /> CONTEÚDO QUE CONECTA</div>
            <h1>Histórias que<br /><em>ganham vida.</em></h1>
            <p>
              Storymaking e videomaking para transformar momentos, marcas e experiências em conteúdo que merece ser visto.
            </p>
            <div className="hero-services">
              <span><Camera size={14} /> Storymaker</span>
              <i />
              <span><Video size={14} /> Videomaker</span>
            </div>
          </div>

          <div className="hero-bottom-line" />
        </section>

        <section className="mova-content">
          <div className="profile-intro">
            <div className="profile-avatar"><CameraLogo className="w-8 h-8" /></div>
            <div>
              <div className="profile-kicker">MOVA</div>
              <h2>Storymaker & Videomaker</h2>
              <p>Santos · São Paulo</p>
            </div>
          </div>

          <div className="section-heading">
            <span>01</span>
            <div>
              <p>O QUE FAZEMOS</p>
              <h3>Conteúdo com propósito.</h3>
            </div>
          </div>

          <div className="services-grid">
            {SERVICES.map(({ title, description, icon: Icon }, index) => (
              <article className="service-card" key={title}>
                <div className="service-topline">
                  <span>0{index + 1}</span>
                  <Icon size={19} />
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
                <div className="service-accent" />
              </article>
            ))}
          </div>

          <div className="section-heading section-heading-links">
            <span>02</span>
            <div>
              <p>CONECTE-SE</p>
              <h3>Encontre a MOVA.</h3>
            </div>
          </div>

          <div className="mova-links">
            {LINKS.map(({ key, label, value, icon: Icon, bg, href }) => (
              <a className="mova-link" href={href} target="_blank" rel="noreferrer" key={key}>
                <span className="link-icon" style={{ background: bg }}><Icon size={18} /></span>
                <span className="link-copy"><small>{label}</small><strong>{value}</strong></span>
                <ChevronRight size={17} className="link-arrow" />
              </a>
            ))}
          </div>

          <button className="save-contact" onClick={() => setShowSave(true)}>
            <span className="save-contact-icon"><User size={18} /></span>
            <span>Salvar contato</span>
            <ChevronRight size={17} />
          </button>

          <div className="section-heading section-heading-links">
            <span>03</span>
            <div>
              <p>CARTÃO FÍSICO</p>
              <h3>Leve a MOVA com você.</h3>
            </div>
          </div>

          <ViewToggle view={view} setView={setView} />
          {view === "digital" ? (
            <div className="qr-panel">
              <div className="qr-copy">
                <span className="qr-label">ACESSE DE QUALQUER LUGAR</span>
                <h3>Compartilhe a sua conexão.</h3>
                <p>Mostre este QR Code para abrir o cartão digital da MOVA.</p>
              </div>
              <div className="qr-frame"><QRCodeSVG value={CARD_URL} size={116} bgColor="#F1E7DA" fgColor="#2E1B13" level="M" /></div>
            </div>
          ) : <PhysicalCard />}

          <button className="pdf-button" onClick={downloadPdfCard}>
            <FileText size={16} /> Baixar cartão em PDF
          </button>

          <footer className="mova-footer">
            <span>MOVA</span>
            <span>STORYMAKER · VIDEOMAKER</span>
            <span>{CONTACT.city} · {CONTACT.state}</span>
          </footer>
        </section>
      </div>

      {showSave && (
        <div className="save-modal-backdrop" onClick={() => setShowSave(false)}>
          <div className="save-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSave(false)} aria-label="Fechar"><X size={19} /></button>
            <div className="modal-icon"><User size={22} /></div>
            <p className="modal-kicker">MOVA</p>
            <h3>Salvar contato</h3>
            <p className="modal-text">Adicione a MOVA aos seus contatos para manter os canais de atendimento sempre à mão.</p>
            <button className="modal-primary" onClick={downloadVCard}><Download size={17} /> Baixar contato</button>
            <button className="modal-secondary" onClick={() => setShowSave(false)}>Agora não</button>
          </div>
        </div>
      )}
    </main>
  );
}
