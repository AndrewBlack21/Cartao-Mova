import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

const icons = {
  instagram: Instagram,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
  location: MapPin,
  whatsapp: MessageCircle,
};

export default function SocialButton({ type, label, href, onClick }) {
  const Icon = icons[type] || ArrowUpRight;

  return (
    <a
      className="social-button"
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      <span className="social-icon"><Icon size={20} strokeWidth={1.7} /></span>
      <span>{label}</span>
      <ArrowUpRight size={17} className="social-arrow" />
    </a>
  );
}
