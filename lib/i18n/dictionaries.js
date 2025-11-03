export const SUPPORTED_LANGUAGES = ["fr", "en"];

export const dictionaries = {
  fr: {
    localeLabel: "Français",
    navigation: {
      home: "Accueil",
      services: "Nos services",
      faq: "FAQ",
      contact: "Contact",
      signin: "Connexion",
      signup: "Inscription",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      menu: "Menu",
    },
    hero: {
      title: "Gérez vos chalets haut de gamme en toute sérénité",
      subtitle:
        "Chalet Manager centralise la gestion des locations, simplifie la relation avec les clients et vous aide à offrir une expérience mémorable.",
      cta: "Découvrir nos services",
    },
    services: {
      title: "Nos services sur mesure",
      intro:
        "Nous accompagnons propriétaires et locataires dans chaque étape : mise en ligne des biens, gestion des demandes, suivi des disponibilités et assistance personnalisée.",
      ownerTitle: "Pour les propriétaires",
      ownerItems: [
        "Création et mise à jour de la fiche chalet",
        "Intégration des calendriers de disponibilité",
        "Publication contrôlée par un super administrateur",
      ],
      tenantTitle: "Pour les locataires",
      tenantItems: [
        "Recherche simplifiée selon vos envies",
        "Suivi des demandes de location",
        "Accompagnement premium par notre équipe",
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Comment devenir propriétaire partenaire ?",
          answer:
            "Inscrivez-vous, complétez la fiche de votre chalet et soumettez-la pour validation. Un super administrateur vous accompagnera jusqu'à la publication.",
        },
        {
          question: "Puis-je gérer mes demandes de location ?",
          answer:
            "Oui, le tableau de bord locataire vous permet d'ajouter, modifier ou supprimer vos souhaits de séjour à tout moment.",
        },
        {
          question: "L'application est-elle disponible hors connexion ?",
          answer:
            "La version PWA permet aux administrateurs de consulter les informations clés même avec une connexion limitée.",
        },
      ],
    },
    contact: {
      title: "Entrer en contact",
      description:
        "Notre équipe répond à vos questions et vous accompagne dans la gestion de vos chalets de prestige.",
      emailLabel: "Écrivez-nous",
      phoneLabel: "Appelez-nous",
      email: "support@chaletmanager.com",
      phone: "+33 4 50 00 00 00",
    },
    auth: {
      signinTitle: "Connexion",
      signupTitle: "Créer un compte",
      submit: "Valider",
      welcomeBack: "Ravi de vous revoir",
      welcomeNew: "Rejoignez la communauté Chalet Manager",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Adresse e-mail",
      password: "Mot de passe",
      roleQuestion: "Je suis...",
      tenant: "Locataire",
      owner: "Propriétaire",
      accept: "J'accepte les conditions générales et la politique de confidentialité",
      alreadyAccount: "Déjà un compte ?",
      needAccount: "Besoin d'un compte ?",
    },
    terms: {
      title: "Conditions générales de vente",
      content:
        "Ces conditions encadrent l'utilisation de la plateforme Chalet Manager. Les propriétaires s'engagent à fournir des informations exactes et à respecter la réglementation locale.",
    },
    privacy: {
      title: "Politique de confidentialité",
      content:
        "Nous collectons uniquement les données nécessaires à la gestion de vos locations et les protégeons conformément au RGPD.",
    },
    footer: {
      notice: "© Chalet Manager. Tous droits réservés.",
      brand: {
        name: "Chalet Manager",
        description:
          "Gestion experte des chalets de prestige avec un accompagnement dédié pour les propriétaires et les voyageurs.",
      },
      contact: {
        email: "support@chaletmanager.com",
        phone: "+33 4 50 00 00 00",
        locationLines: ["74 avenue des Alpes", "74000 Annecy, France"],
      },
      navigation: {
        services: {
          title: "Services",
          links: [
            { name: "Gestion locative complète", href: "/services#owners" },
            { name: "Accompagnement voyageurs", href: "/services#guests" },
            { name: "Support personnalisé", href: "/contact" },
          ],
        },
        company: {
          title: "Entreprise",
          links: [
            { name: "Espace propriétaires", href: "/signup" },
            { name: "Connexion", href: "/signin" },
            { name: "Assistance", href: "/contact" },
          ],
        },
      },
      newsletter: {
        title: "Newsletter",
        description: "Recevez nos conseils pour optimiser la gestion de vos chalets de luxe.",
        placeholder: "Votre adresse e-mail",
        button: "S'inscrire",
        followUs: "Suivez-nous",
      },
      bottomBar: {
        copyright: "Tous droits réservés.",
      },
      bottomLinks: [
        { name: "CGV", href: "/terms" },
        { name: "Confidentialité", href: "/privacy" },
        { name: "Support", href: "/contact" },
      ],
      adminLoginLink: {
        name: "Connexion admin",
        href: "/signin",
      },
    },
  },
  en: {
    localeLabel: "English",
    navigation: {
      home: "Home",
      services: "Services",
      faq: "FAQ",
      contact: "Contact",
      signin: "Sign in",
      signup: "Sign up",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
    },
    hero: {
      title: "Manage your luxury chalets with confidence",
      subtitle:
        "Chalet Manager centralises bookings, streamlines client communication and helps you deliver unforgettable stays.",
      cta: "Explore our services",
    },
    services: {
      title: "Tailored services",
      intro:
        "We guide owners and guests through every step: property onboarding, enquiry management, availability tracking and bespoke assistance.",
      ownerTitle: "For owners",
      ownerItems: [
        "Create and maintain a complete chalet listing",
        "Sync availability calendars via iCal",
        "Publish with the support of our super administrators",
      ],
      tenantTitle: "For guests",
      tenantItems: [
        "Share your travel preferences",
        "Track and adjust your rental requests",
        "Enjoy premium support from our team",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How do I become a partner owner?",
          answer:
            "Create an account, complete your chalet profile and submit it for review. A super admin will help you all the way to publication.",
        },
        {
          question: "Can I manage my rental enquiries?",
          answer:
            "Yes, the tenant dashboard lets you create, edit and remove your stay requests whenever you like.",
        },
        {
          question: "Is the platform available offline?",
          answer:
            "The PWA mode keeps key information accessible for administrators even with limited connectivity.",
        },
      ],
    },
    contact: {
      title: "Get in touch",
      description:
        "Our team answers your questions and supports you in managing high-end chalet rentals.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      email: "support@chaletmanager.com",
      phone: "+41 22 000 00 00",
    },
    auth: {
      signinTitle: "Sign in",
      signupTitle: "Create an account",
      submit: "Submit",
      welcomeBack: "Welcome back",
      welcomeNew: "Join the Chalet Manager community",
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      password: "Password",
      roleQuestion: "I am...",
      tenant: "Guest",
      owner: "Owner",
      accept: "I accept the terms and privacy policy",
      alreadyAccount: "Already have an account?",
      needAccount: "Need an account?",
    },
    terms: {
      title: "Terms & Conditions",
      content:
        "These terms govern the use of the Chalet Manager platform. Owners commit to providing accurate information and complying with local regulations.",
    },
    privacy: {
      title: "Privacy policy",
      content:
        "We collect only the data required to manage your rentals and protect it in line with GDPR.",
    },
    footer: {
      notice: "© Chalet Manager. All rights reserved.",
      brand: {
        name: "Chalet Manager",
        description:
          "Expert management for luxury chalets with dedicated support for owners and discerning guests.",
      },
      contact: {
        email: "support@chaletmanager.com",
        phone: "+41 22 000 00 00",
        locationLines: ["74 Alpine Avenue", "1200 Geneva, Switzerland"],
      },
      navigation: {
        services: {
          title: "Services",
          links: [
            { name: "Owner solutions", href: "/services#owners" },
            { name: "Guest experience", href: "/services#guests" },
            { name: "Premium support", href: "/contact" },
          ],
        },
        company: {
          title: "Company",
          links: [
            { name: "Owner area", href: "/signup" },
            { name: "Sign in", href: "/signin" },
            { name: "Help center", href: "/contact" },
          ],
        },
      },
      newsletter: {
        title: "Newsletter",
        description: "Get insights to elevate your luxury chalet management.",
        placeholder: "Your email address",
        button: "Subscribe",
        followUs: "Follow us",
      },
      bottomBar: {
        copyright: "All rights reserved.",
      },
      bottomLinks: [
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
        { name: "Support", href: "/contact" },
      ],
      adminLoginLink: {
        name: "Admin login",
        href: "/signin",
      },
    },
  },
};

export function getDictionary(lang) {
  return dictionaries[lang] || dictionaries.en;
}
