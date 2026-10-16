import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Instagram,
  Play,
  Video,
  X,
  Scissors,
} from "lucide-react";

const WHATSAPP =
  "https://wa.me/5513991628852?text=" +
  encodeURIComponent("Olá! Gostaria de conhecer o trabalho da Mova.");
const VIDEO_SRC = "/videos/mova-apresentacao.mp4";

function BrandMark() {
  return <img className="landing-logo-image" src="/assets/LogoMova.png" alt="MOVA Storymaker & Videomaker" />;
}

function IntroVideo({ compact = false }) {
  return (
    <section
      className={compact ? "mova-film mova-film-compact" : "mova-film"}
      aria-label="Vídeo de apresentação da Mova"
    >
      <div className="film-heading">
        <span className="landing-kicker">POR TRÁS DAS HISTÓRIAS</span>
        <span className="film-index">MOVA / FILM 001</span>
      </div>
      <div className="film-frame">
        <video
          controls
          playsInline
          preload="metadata"
          poster="/images/mova-video-poster.jpg"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
        <span className="film-caption">
          <Play size={13} fill="currentColor" /> UM OLHAR SOBRE A MOVA
        </span>
      </div>
      <p className="film-note">
        Adicione o vídeo de apresentação em{" "}
        <code>public/videos/mova-apresentacao.mp4</code>.
      </p>
    </section>
  );
}

export default function LandingPage({ onOpenCard }) {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main className="mova-landing" id="inicio">
      <section className="landing-hero">
        <div className="landing-hero-texture" />
        <header className="landing-header">
          <a className="landing-logo" href="#inicio" aria-label="Mova início">
            <BrandMark />
          </a>
          <div className="landing-header-actions">
            <a className="landing-header-link" href="#portfolio">
              Explorar trabalho <ArrowDownRight size={16} />
            </a>
            <button
              className="landing-mode-button"
              type="button"
              onClick={onOpenCard}
            >
              Cartão digital <ArrowUpRight size={15} />
            </button>
          </div>
        </header>
        <div className="landing-hero-content">
          <p className="landing-kicker">
            <span /> SANTOS · SP — CONTEÚDO EM MOVIMENTO
          </p>
          <h1>
            Não registramos
            <br />
            apenas momentos.
            <br />
            <em>Criamos histórias.</em>
          </h1>
          <div className="landing-hero-bottom">
            <p>
              Conteúdo autêntico, olhar criativo e produção audiovisual para
              transformar experiências em histórias que merecem ser vistas.
            </p>
            <a
              className="landing-circle-link"
              href="#sobre"
              aria-label="Conheça a Mova"
            >
              <ArrowDownRight size={28} />
            </a>
          </div>
        </div>
        <div
          className="landing-hero-image"
          role="img"
          aria-label="Equipamento de produção audiovisual em uma gravação"
        />
        <div className="landing-hero-stamp">
          <span>IDEIAS EM</span>
          <strong>MOVIMENTO</strong>
          <Clapperboard size={19} />
        </div>
      </section>

      <section className="landing-intro landing-section" id="sobre">
        <div className="landing-section-label">
          <span>01</span> QUEM SOMOS
        </div>
        <div className="landing-intro-copy">
          <p className="landing-kicker">CRIATIVIDADE COM INTENÇÃO</p>
          <h2>
            Um olhar atento.
            <br />
            <em>Uma história única.</em>
          </h2>
          <p>
            A Mova transforma ideias, marcas e momentos em conteúdo audiovisual
            com personalidade. Do registro à edição, cada detalhe é pensado para
            aproximar pessoas e comunicar com verdade.
          </p>
          <a className="landing-text-link" href={WHATSAPP}>
            Vamos criar juntos <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="landing-intro-visual">
          <img
            src="/assets/kalyne.png"
            alt="Kalyne, filmmaker da Mova"
            loading="lazy"
          />
          <span className="image-caption">
            01 / O PROCESSO TAMBÉM CONTA HISTÓRIAS
          </span>
        </div>
      </section>

      <section className="landing-work landing-section" id="portfolio">
        <div className="landing-section-label">
          <span>02</span> NOSSO UNIVERSO
        </div>
        <div className="landing-work-heading">
          <div>
            <p className="landing-kicker">O QUE COLOCAMOS EM MOVIMENTO</p>
            <h2>
              Ideias que viram
              <br />
              <em>experiência.</em>
            </h2>
          </div>
          <p>
            Produção pensada para acompanhar a energia de cada projeto — com
            agilidade, sensibilidade e atenção ao que faz cada história ser
            diferente.
          </p>
        </div>
        <div className="landing-services">
          <button
            type="button"
            className="landing-service landing-service-button"
            onClick={() =>
              setActiveVideo({
                title: "Storymaker",
                src: "/videos/storymaker.mp4",
              })
            }
          >
            <span>01 / AO VIVO</span>
            <Camera size={25} />
            <h3>Storymaker</h3>
            <p>
              Registros espontâneos, bastidores e conteúdos em tempo real para
              aproximar marcas e pessoas.
            </p>
            <span className="landing-service-play">
              <Play size={13} fill="currentColor" /> Assistir trabalhos
            </span>
          </button>
          <button
            type="button"
            className="landing-service landing-service-button"
            onClick={() =>
              setActiveVideo({
                title: "Videomaker",
                src: "/videos/videomaker.mp4",
              })
            }
          >
            <span>02 / AUDIOVISUAL</span>
            <Video size={25} />
            <h3>Videomaker</h3>
            <p>
              Captação, edição de vídeos verticais, reels e narrativas visuais
              feitas para conectar.
            </p>
            <span className="landing-service-play">
              <Play size={13} fill="currentColor" /> Assistir trabalhos
            </span>
          </button>
          <button
            type="button"
            className="landing-service landing-service-button"
            onClick={() =>
              setActiveVideo({
                title: "Edição de vídeo",
                src: "/videos/edicao-video.mp4",
              })
            }
          >
            <span>03 / PÓS-PRODUÇÃO</span>
            <Scissors size={25} />
            <h3>Edição de vídeo</h3>
            <p>
              Montagem, ritmo, cor e acabamento para transformar captações em
              histórias envolventes.
            </p>
            <span className="landing-service-play">
              <Play size={13} fill="currentColor" /> Assistir trabalhos
            </span>
          </button>
        </div>
      </section>

      <section className="landing-people landing-section">
        <div className="landing-section-label">
          <span>03</span> QUEM FAZ ACONTECER
        </div>
        <div className="landing-people-copy">
          <p className="landing-kicker">PESSOAS POR TRÁS DA CÂMERA</p>
          <h2>
            Boas histórias começam
            <br />
            <em>com boas conexões.</em>
          </h2>
          <p>
            Uma equipe criativa, próxima e apaixonada por transformar momentos
            em conteúdo. Conheça os profissionais da Mova e acompanhe seus
            trabalhos.
          </p>
        </div>
        <div className="landing-people-grid">
          <a
            className="landing-person"
            href="https://instagram.com/josecarllosmd"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/jose.png"
              alt="José Carllos, filmmaker da Mova"
              loading="lazy"
            />
            <span>01 / FILMMAKER</span>
            <strong>
              José Carllos <ArrowUpRight size={16} />
            </strong>
            <small>@josecarllosmd</small>
          </a>
          <a
            className="landing-person"
            href="https://instagram.com/kalynejag"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/kalyne.png"
              alt="Kalyne, filmmaker da Mova"
              loading="lazy"
            />
            <span>02 / FILMMAKER</span>
            <strong>
              Kalyne <ArrowUpRight size={16} />
            </strong>
            <small>@kalynejag</small>
          </a>
        </div>
        {/* <p className="landing-image-disclaimer">
          Imagens provisórias de referência — substituir pelos retratos reais da
          equipe Mova antes de publicar.
        </p> */}
      </section>

      <IntroVideo />

      <section className="landing-cta">
        <div>
          <p className="landing-kicker">SUA IDEIA PODE SER A PRÓXIMA</p>
          <h2>
            Vamos dar vida
            <br />
            <em>à sua história?</em>
          </h2>
        </div>
        <a href={WHATSAPP} target="_blank" rel="noreferrer">
          Fale com a Mova <ArrowUpRight size={19} />
        </a>
      </section>

      <footer className="landing-footer">
        <a className="landing-logo" href="#inicio" aria-label="Mova início">
          <BrandMark />
        </a>
        <span>SANTOS · SP</span>
        <a
          href="https://instagram.com/movamaker"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={16} /> @movamaker
        </a>
        <button onClick={onOpenCard}>
          Abrir cartão virtual <ArrowUpRight size={15} />
        </button>
      </footer>
      {activeVideo && (
        <div
          className="mova-video-modal-backdrop"
          onClick={() => setActiveVideo(null)}
        >
          <section
            className="mova-video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Vídeos de ${activeVideo.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="mova-video-modal-close"
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Fechar vídeo"
            >
              <X size={20} />
            </button>
            <p className="modal-kicker">PORTFÓLIO MOVA</p>
            <h3>{activeVideo.title}</h3>
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/mova-video-poster.jpg"
            >
              <source src={activeVideo.src} type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
            <small>
              Adicione o vídeo correspondente na pasta public/videos.
            </small>
          </section>
        </div>
      )}
    </main>
  );
}
