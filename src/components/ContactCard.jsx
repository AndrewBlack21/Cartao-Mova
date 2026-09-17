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
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

/**
 * MOVA — Cartão Virtual (Storymaker & Videomaker)
 * -------------------------------------------------
 * Paleta da marca (extraída do logo):
 *   --mova-cream      : #F1E7DA  (fundo hero / cartão)
 *   --mova-cream-dark : #E4D6C4  (gradiente hero)
 *   --mova-brown       : #2E1B13 (texto principal, wordmark)
 *   --mova-gold        : #AD7A34 (acentos, "STORYMAKER", swoosh)
 * Tipografia:
 *   Serif (Cormorant/Playfair) -> wordmark "MOVA"
 *   Sans com tracking largo (Poppins) -> tagline, labels, botões
 *
 * Dependências: react, lucide-react, tailwindcss, qrcode.react, jspdf, qrcode
 *
 * ⚠️ Preencha antes de publicar:
 *  - CARD_URL: domínio final onde esse cartão vai ficar hospedado
 *  - CONTACT.phone / CONTACT.email: a MOVA não me passou esses dados ainda
 *  - Confirme a frase da tagline "REGISTRAR · CONECTAR · TRANSFORMAR"
 *    (a primeira palavra estava coberta pelos destaques na imagem)
 */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');`;

// Keyframes do efeito "obturador de câmera" no flip do cartão físico.
const SHUTTER_KEYFRAMES = `
@keyframes shutterIris {
  0%   { clip-path: circle(75% at 50% 50%); opacity: 1; }
  48%  { clip-path: circle(0% at 50% 50%); opacity: 1; }
  52%  { clip-path: circle(0% at 50% 50%); opacity: 1; }
  100% { clip-path: circle(75% at 50% 50%); opacity: 1; }
}
@keyframes apertureSpin {
  to { transform: rotate(360deg); }
}
`;

const CARD_URL = "https://cartao.movamaker.com.br"; // TODO: confirmar domínio final

const CONTACT = {
  name: "MOVA Storymaker",
  org: "MOVA",
  phone: "", // TODO: pedir número de WhatsApp pra equipe
  phoneDisplay: "Em breve",
  email: "", // TODO: pedir e-mail (se tiverem)
  site: "https://instagram.com/movamaker",
  city: "Santos",
  state: "SP",
};

function CameraLogo({
  className = "w-9 h-9",
  color = "#2E1B13",
  accent = "#AD7A34",
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* cantos de viewfinder */}
      <path
        d="M35 22 H25 Q19 22 19 28 V38"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M65 22 H75 Q81 22 81 28 V38"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M35 78 H25 Q19 78 19 72 V62"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M65 78 H75 Q81 78 81 72 V62"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* swoosh de movimento */}
      <path
        d="M14 54 Q40 38 62 49 T88 44"
        stroke={accent}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
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
  ]
    .filter(Boolean)
    .join("\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mova-storymaker.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function downloadPdfCard() {
  const doc = new jsPDF({ unit: "mm", format: [90, 55] });

  doc.setFillColor(241, 231, 218); // #F1E7DA
  doc.rect(0, 0, 90, 55, "F");

  doc.setTextColor(46, 27, 19); // #2E1B13
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("MOVA", 8, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(173, 122, 52); // #AD7A34
  doc.text("STORYMAKER & VIDEOMAKER Mobile", 8, 21);

  doc.setTextColor(46, 27, 19);
  doc.setFontSize(8);
  doc.text("Fotografia e videografia", 8, 32);
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
    <div className="relative flex bg-[#2E1B13] rounded-full p-1 text-[11px] font-medium">
      <span
        className="absolute top-1 bottom-1 w-1/2 rounded-full bg-[#AD7A34] transition-transform duration-300"
        style={{
          transform: view === "fisico" ? "translateX(100%)" : "translateX(0%)",
        }}
      />
      <button
        onClick={() => setView("digital")}
        className={`relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
          view === "digital" ? "text-[#2E1B13]" : "text-[#E4D6C4]"
        }`}
      >
        <Smartphone className="w-3.5 h-3.5" /> Digital
      </button>
      <button
        onClick={() => setView("fisico")}
        className={`relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
          view === "fisico" ? "text-[#2E1B13]" : "text-[#E4D6C4]"
        }`}
      >
        <CreditCard className="w-3.5 h-3.5" /> Cartão físico
      </button>
    </div>
  );
}

function PhysicalCard() {
  const [flipped, setFlipped] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [spin, setSpin] = useState(false);

  function trigger() {
    setShutter(true);
    setSpin(true);
    // no meio da animação do obturador (48%-52% do tempo), troca o lado
    setTimeout(() => setFlipped((f) => !f), 380);
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div
        className="relative w-full aspect-[16/10] cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={trigger}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRENTE */}
          <div
            className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(160deg, #F1E7DA 0%, #E4D6C4 100%)",
              border: "1px solid rgba(46,27,19,0.1)",
            }}
          >
            <CameraLogo className="w-9 h-9" />
            <div>
              <p
                className="text-[#2E1B13] text-2xl tracking-[0.15em]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                MOVA
              </p>
              <p className="text-[#AD7A34] text-[10px] tracking-[0.25em]">
                STORYMAKER
              </p>
            </div>
          </div>

          {/* VERSO */}
          <div
            className="absolute inset-0 rounded-2xl p-6 flex items-center gap-5 shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(160deg, #2E1B13 0%, #4a2e1f 100%)",
            }}
          >
            <div className="bg-[#F1E7DA] p-2 rounded-lg shrink-0">
              <QRCodeSVG
                value={CARD_URL}
                size={84}
                bgColor="#F1E7DA"
                fgColor="#2E1B13"
                level="M"
              />
            </div>
            <div>
              <p className="text-[#F1E7DA] text-sm font-medium mb-1">
                Escaneie o QR Code
              </p>
              <p className="text-[#E4D6C4] text-[11px] leading-relaxed">
                e acesse o cartão virtual completo da MOVA, com todos os canais.
              </p>
            </div>
          </div>
        </div>

        {/* overlay do "obturador" — dispara junto com o flip */}
        {shutter && (
          <div
            className="absolute inset-0 rounded-2xl bg-[#1a0f0a] pointer-events-none z-10"
            style={{ animation: "shutterIris 0.76s ease-in-out" }}
            onAnimationEnd={() => setShutter(false)}
          />
        )}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Aperture
          className="w-3.5 h-3.5 text-[#AD7A34]"
          style={
            spin ? { animation: "apertureSpin 0.76s ease-in-out" } : undefined
          }
          onAnimationEnd={() => setSpin(false)}
        />
        <p className="text-[10px] text-[#7a6a5c] tracking-wide">
          Toque no cartão para capturar o verso
        </p>
      </div>
    </div>
  );
}

export default function MovaVirtualCard() {
  const [showSave, setShowSave] = useState(false);
  const [view, setView] = useState("digital");

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center py-10 px-4"
      style={{ background: "#F1E7DA", fontFamily: "'Poppins', sans-serif" }}
    >
      <style>
        {FONT_IMPORT}
        {SHUTTER_KEYFRAMES}
      </style>

      <div className="w-full max-w-sm rounded-[28px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(46,27,19,0.35)] bg-[#F1E7DA]">
        {/* HERO */}
        <div
          className="relative px-7 pt-8 pb-16 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #F1E7DA 0%, #E4D6C4 70%, #ddccb6 100%)",
          }}
        >
          <div className="absolute -right-10 -top-16 w-52 h-52 rounded-full bg-[#AD7A34]/10 blur-2xl" />
          <div className="absolute -left-16 bottom-0 w-40 h-40 rounded-full bg-[#2E1B13]/5 blur-xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CameraLogo className="w-7 h-7" />
              <div className="leading-none">
                <p
                  className="text-[#2E1B13] tracking-[0.25em] text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  MOVA
                </p>
                <p className="text-[8px] tracking-[0.3em] text-[#AD7A34]">
                  STORYMAKER
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#2E1B13]/70 border border-[#2E1B13]/20 rounded-full px-3 py-1">
              Cartão virtual
            </span>
          </div>

          <p className="relative text-[10px] tracking-[0.2em] text-[#AD7A34] mt-8 mb-1 uppercase">
            Storymaker & Videomaker Mobile
          </p>
          <h1
            className="relative text-[#2E1B13] text-2xl leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Registrar · Conectar · Transformar
          </h1>
          <p className="relative text-[#5c4a3c] text-sm leading-relaxed max-w-[90%] mb-1">
            Fotografia e videografia. Cobertura de momentos em tempo real ✨
          </p>
          <p className="relative text-[#5c4a3c] text-xs leading-relaxed max-w-[90%] mb-6">
            Stories • Reels • Eventos • Bastidores
          </p>

          <ViewToggle view={view} setView={setView} />
        </div>

        {/* CARD */}
        <div className="relative -mt-8 bg-[#F1E7DA] rounded-t-[28px] px-6 pt-7 pb-8">
          <div className="flex flex-col items-center text-center mb-5">
            <CameraLogo className="w-8 h-8 mb-2" />
            <h2
              className="text-[#2E1B13] text-lg tracking-[0.1em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              MOVA
            </h2>
            <p className="text-[#8a7a6c] text-xs mt-0.5">
              By @josecarllosmd e @kalynejag
            </p>
          </div>

          {view === "digital" ? (
            <>
              <div className="flex flex-col gap-2.5 mb-5">
                {LINKS.map(({ key, label, value, icon: Icon, bg, href }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-white/60 hover:bg-white transition-colors rounded-2xl px-4 py-3 border border-[#2E1B13]/10"
                  >
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[#2E1B13] text-sm font-medium">
                        {label}
                      </span>
                      <span className="block text-[#8a7a6c] text-[11px] truncate">
                        {value}
                      </span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#AD7A34]" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => setShowSave(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#2E1B13] hover:bg-[#221309] transition-colors text-[#F1E7DA] text-sm font-medium py-3.5 rounded-full"
              >
                <User className="w-4 h-4" />
                Salvar Contato
              </button>
            </>
          ) : (
            <PhysicalCard />
          )}

          <div className="flex items-center justify-center gap-5 mt-6">
            <a
              href="https://instagram.com/movamaker"
              className="text-[#2E1B13]"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-center text-[10px] tracking-[0.15em] text-[#8a7a6c] mt-3 uppercase">
            MOVA · Registrar · Conectar · Transformar
          </p>
        </div>
      </div>

      {/* MODAL SALVAR CONTATO */}
      {showSave && (
        <div
          className="fixed inset-0 bg-[#1a0f0a]/60 flex items-center justify-center px-4 z-50"
          onClick={() => setShowSave(false)}
        >
          <div
            className="bg-[#2E1B13] w-full max-w-xs rounded-3xl p-6 text-[#F1E7DA] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSave(false)}
              className="absolute top-4 right-4 text-[#AD7A34]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center mb-5">
              <span className="w-12 h-12 rounded-full border border-[#AD7A34]/50 flex items-center justify-center mb-3">
                <User className="w-5 h-5 text-[#AD7A34]" />
              </span>
              <h3
                className="text-base"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Salvar Contato
              </h3>
              <p className="text-[11px] text-[#E4D6C4] mt-1">
                Adicione a MOVA diretamente na sua agenda.
              </p>
            </div>

            <dl className="text-xs space-y-2.5 mb-5">
              {[
                ["Nome", "MOVA"],
                ["Instagram", "@movamaker"],
                ["Equipe", "José Carllos e Kalyne"],
                ["Endereço", "Santos - SP"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-[#AD7A34]/15 pb-2"
                >
                  <dt className="text-[#AD7A34]">{k}</dt>
                  <dd className="text-[#F1E7DA] text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <button
              onClick={downloadVCard}
              className="w-full flex items-center justify-center gap-2 bg-[#F1E7DA] text-[#2E1B13] text-sm font-medium py-3 rounded-full"
            >
              <Download className="w-4 h-4" />
              Baixar vCard
            </button>

            <button
              onClick={downloadPdfCard}
              className="w-full flex items-center justify-center gap-2 text-[#E4D6C4] text-xs mt-3 hover:text-[#F1E7DA] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              ou baixar cartão em PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
