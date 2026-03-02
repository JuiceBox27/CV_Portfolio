import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.me': 'Me',
    'nav.cv': 'CV',
    'nav.projects': 'Projects',
    
    // Hero Section
    'hero.title': 'Software Developer',
    
    // CV Page
    'cv.introduction': 'Welcome to my professional portfolio. I am a technology enthusiast, particularly passionate about web technologies and game development. Below you will find my comprehensive CV highlighting my work experiences and education, followed by some personal projects I have undertaken to demonstrate my skills and passion for software development.',
    'cv.download': 'Download PDF',
    'cv.loading': 'Loading CV...',
    'cv.placeholder': 'Your CV will be displayed here. Upload your CV PDF to replace this placeholder.',
    
    // Skills
    'skills.webDev': 'Web Development',
    'skills.webDevDesc': 'Full-stack applications',
    'skills.gameDev': 'Game Development',
    'skills.gameDevDesc': 'Interactive experiences',
    'skills.serverInfra': 'Server Infrastructure',
    'skills.serverInfraDesc': 'Cloud, DevOps & more',
    
    // Projects Page
    'projects.title': 'My Projects',
    'projects.subtitle': 'A showcase of my work and applications',
    'projects.demo': 'Demo Video',
    'projects.viewProject': 'View Project',
  },
  fr: {
    // Navigation
    'nav.me': 'Moi',
    'nav.cv': 'CV',
    'nav.projects': 'Projets',
    
    // Hero Section
    'hero.title': 'Développeur Logiciel',
    
    // CV Page
    'cv.introduction': 'Bienvenue sur mon portfolio professionnel. Je suis un passionné de la technologie, surtout la technologie web ainsi que le développement de jeux vidéos. Vous trouverez ci-dessous mon CV complet mettant en évidence mes expériences de travail et mes études, suivi de quelques projets personnels que j\'ai réalisés pour démontrer mes compétences et ma passion pour le développement logiciel.',
    'cv.download': 'Télécharger PDF',
    'cv.loading': 'Chargement du CV...',
    'cv.placeholder': 'Votre CV sera affiché ici. Téléchargez votre CV PDF pour remplacer cet espace réservé.',
    
    // Skills
    'skills.webDev': 'Développement Web',
    'skills.webDevDesc': 'Applications full-stack',
    'skills.gameDev': 'Développement de Jeux',
    'skills.gameDevDesc': 'Expériences interactives',
    'skills.serverInfra': 'Infrastructure Serveur',
    'skills.serverInfraDesc': 'Cloud, DevOps & plus',
    
    // Projects Page
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Une vitrine de mon travail et applications',
    'projects.demo': 'Vidéo de démonstration',
    'projects.viewProject': 'Voir le projet',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}