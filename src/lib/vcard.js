import { card } from "../data/card";

export function downloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.company}`,
    `ORG:${card.company}`,
    `TEL;TYPE=CELL:${card.phone}`,
    `EMAIL:${card.email}`,
    `URL:${card.website}`,
    `ADR;TYPE=WORK:;;${card.address}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "can-group.vcf";
  link.click();
  URL.revokeObjectURL(url);
}
