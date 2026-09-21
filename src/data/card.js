export const card = {
  company: "Mova StoryMaker & VideoMaker",
  slogan: "Histórias que ganham vida.",
  instagram: "https://www.instagram.com/movamaker/",
  instagramLabel: "@movamaker",
  whatsappNumber: "5513991628852", // troque pelo número oficial com DDI
  whatsappDisplay: "(13) 99162-8852",

  phone: "+55 13 991628852",
  address: "Santos - SP",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Santos%20SP",
};

export function whatsappUrl(message = "Olá! Gostaria de falar com a Mova.") {
  return `https://wa.me/${card.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
