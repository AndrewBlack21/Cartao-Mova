export const card = {
  company: "CAN GROUP",
  slogan: "Conectando pessoas e negócios.",
  instagram: "https://www.instagram.com/movamaker/",
  instagramLabel: "@movamaker",
  whatsappNumber: "5513999999999", // troque pelo número oficial com DDI
  whatsappDisplay: "(13) 99999-9999",
  
  phone: "+55 13 99999-9999",
  address: "Santos - SP",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Santos%20SP",

};

export function whatsappUrl(message = "Olá! Gostaria de falar com a CAN GROUP.") {
  return `https://wa.me/${card.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
