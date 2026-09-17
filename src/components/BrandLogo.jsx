export default function BrandLogo({ light = false, compact = false }) {
  return (
    <div
      className={`brand-logo ${compact ? "brand-logo--compact" : ""} ${light ? "brand-logo--light" : ""}`}
    >
      <div className="brand-mark">
        <span>Mova</span>
      </div>
      <div>
        <div className="brand-name">Mova</div>
        <div className="brand-subtitle">Storymaker</div>
      </div>
    </div>
  );
}
