export const archonContact = {
  companyName: "Archon Solutions",
  email: "info@archonsolution.com",
  emailHref: "mailto:info@archonsolution.com",
  phone: "+91 8136866266",
  phoneHref: "tel:+918136866266",
  whatsapp: "+91 9633401100",
  whatsappHref: "https://wa.me/919633401100",
  address:
    "AS Avenue, Old Cheranalllur Road, Bypass Junction, Ponekkara, Edappally, Ernakulam, Kerala 682024, opposite Kochi Lulu Mall",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=AS%20Avenue%2C%20Old%20Cheranalllur%20Road%2C%20Bypass%20Junction%2C%20Ponekkara%2C%20Edappally%2C%20Ernakulam%2C%20Kerala%20682024",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100092973462684",
    instagram: "https://www.instagram.com/archonsolutions/",
    linkedin: "https://www.linkedin.com/company/12894044",
    youtube: "https://www.youtube.com/watch?v=KBhxrfBQ7rQ&t=564s",
  },
} as const;

export function getWhatsAppEnquiryLink(message: string) {
  return `${archonContact.whatsappHref}?text=${encodeURIComponent(message)}`;
}
