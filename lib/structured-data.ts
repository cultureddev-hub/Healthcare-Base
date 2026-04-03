export const SITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://samuihomeclinic.com/#organization",
      name: "Samui Home Clinic",
      url: "https://samuihomeclinic.com",
      logo: "https://samuihomeclinic.com/Assets/SHC_Logo.png",
      telephone: "+66806696915",
      email: "info@samuihomeclinic.com",
      medicalSpecialty: [
        "GeneralPractice",
        "Pediatrics",
        "DermatologyAndDermatoPathology",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      location: [
        {
          "@type": "MedicalClinic",
          name: "Samui Home Clinic — Chaweng",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chaweng",
            addressRegion: "Koh Samui",
            addressCountry: "TH",
          },
          hasMap: "https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7",
          telephone: "+66806696915",
        },
        {
          "@type": "MedicalClinic",
          name: "Samui Home Clinic — Bangrak",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bangrak",
            addressRegion: "Koh Samui",
            addressCountry: "TH",
          },
          hasMap: "https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7",
          telephone: "+66922781988",
        },
        {
          "@type": "MedicalClinic",
          name: "Samui Home Clinic — Rajabhat University",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Koh Samui",
            addressRegion: "Surat Thani",
            addressCountry: "TH",
          },
          hasMap: "https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A",
          telephone: "+6677937288",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you accept my insurance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept most major insurance plans. You can verify your specific coverage during the booking process or by contacting our support team.",
          },
        },
        {
          "@type": "Question",
          name: "How do virtual consultations work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Virtual consultations are conducted via our secure, PDPA-compliant video platform. You'll receive a link via email and SMS before your appointment time.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get a prescription from a virtual visit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our doctors can prescribe medications during virtual visits when medically appropriate. Prescriptions are sent directly to your preferred pharmacy or our delivery service.",
          },
        },
        {
          "@type": "Question",
          name: "What if I need to cancel my appointment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you are unable to attend a booked appointment, please contact us as soon as possible. Email: info@samuihomeclinic.com Tel: +66-92-278-1988 or +66-77-937-288 Line ID: samuiclinic",
          },
        },
      ],
    },
  ],
};
