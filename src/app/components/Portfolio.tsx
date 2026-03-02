import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, FileText, Download, Code, Gamepad2, Server, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const projects = [
    {
    id: 1,
    titleEn: 'Web Hosting and Hypervisor Management',
    titleFr: 'Hébergement Web et Gestion d\'Hyperviseur',
    descriptionEn: 'Designed, deployed, and maintained a self-hosted infrastructure to experiment with DevOps practices, automation, and service reliability. Designed, deployed, and maintained a self-hosted infrastructure to experiment with DevOps practices, automation, and service reliability. Containerized and managed services using Docker and Docker Compose. Implemented network segmentation and isolation through VLANs and firewall rules. Configured reverse proxying and HTTPS termination for internal services. Set up automated backups and tested service recovery procedures. Performed monitoring, logging, troubleshooting, and Linux server administration, including performance tuning.',
    descriptionFr: 'Conception, déploiement et maintenance d’une infrastructure auto-hébergée afin d’expérimenter les pratiques DevOps, l’automatisation et la fiabilité des services. Conteneurisation et gestion de services à l’aide de Docker et Docker Compose. Mise en place de la segmentation et de l’isolation réseau à l’aide de VLAN et de règles de pare-feu. Configuration de proxys inverses et de la terminaison HTTPS pour les services internes. Mise en place de sauvegardes automatisées et tests de procédures de reprise de services. Surveillance, journalisation, dépannage des services en production ainsi qu’administration de serveurs Linux et optimisation des performances.',
    image: '',
    videoUrl: '',
    technologies: ['Linux', 'Proxmox', 'Docker', 'Docker Compose', 'NGINX', 'Infrastructure as Code (IaC)', 'Let\'s Encrypt', 'Networking', 'Git', 'Bash'],
  },
  {
    id: 2,
    titleEn: 'OpenGL Graphics Engine and Space Simulation',
    titleFr: 'Application OpenGL et Simulation Spatiale',
    descriptionEn: 'An application to create free bodies in space and simulate gravitational interactions between them in real-time using Java and an implementation of OpenGL in Java.',
    descriptionFr: 'Une application pour créer des corps libres dans l\'espace et simuler les interactions gravitationnelles entre eux en temps réel utilisant Java et une implémentation d\'OpenGL en Java.',
    image: '/images/GravitySimulationLogoBlack.png',
    videoUrl: '/videos/Final.mkv',
    technologies: ['Java', 'lwjgl (OpenGL)', 'GLSL', 'OOP', 'Real-Time Simulation', 'Physics Simulation', '3D Graphics'],
  },
  {
    id: 3,
    titleEn: 'Operating System Bootloader',
    titleFr: 'Chargeur de Démarrage pour Système d\'Exploitation',
    descriptionEn: 'Bootloader written in x86 assembly language that initializes the system and loads a simple operating system kernel from disk. The bootloader sets up the CPU, memory, and hardware interfaces to prepare for the execution of the operating system kernel. It demonstrates low-level programming and an understanding of computer architecture.',
    descriptionFr: 'Chargeur de démarrage écrit en langage d\'assemblage x86 qui initialise le système et charge un noyau de système d\'exploitation simple depuis le disque. Le chargeur de démarrage configure le CPU, la mémoire et les interfaces matérielles pour préparer l\'exécution du noyau du système d\'exploitation. Il démontre une programmation bas niveau et une compréhension de l\'architecture informatique.',
    image: '',
    videoUrl: '',
    technologies: ['Assembly', 'x86 Architecture', 'Bootloaders', 'Operating Systems', 'Low-Level Programming', 'Computer Architecture', 'BIOS', 'Hardware Initialization'],
  },
];

export function Portfolio() {
  const { language, setLanguage, t } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const projectWidth = container.scrollWidth / projects.length;
      container.scrollTo({
        left: projectWidth * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const projectWidth = container.scrollWidth / projects.length;
      const currentIndex = Math.round(scrollPosition / projectWidth);
      setActiveProject(currentIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <button
              onClick={() => scrollToSection('cv')}
              className="text-xl font-semibold text-slate-900 hover:text-slate-700 transition-colors"
            >
              Stefan Roman
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => scrollToSection('me')}
                className="px-4 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t('nav.me')}
              </button>
              <button
                onClick={() => scrollToSection('cv')}
                className="px-4 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t('nav.cv')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-4 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t('nav.projects')}
              </button>
            </nav>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden pb-4 flex gap-2 overflow-x-auto">
            <button
              onClick={() => scrollToSection('cv')}
              className="px-3 py-1.5 rounded-md text-sm whitespace-nowrap text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {t('nav.cv')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-3 py-1.5 rounded-md text-sm whitespace-nowrap text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {t('nav.projects')}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {/* ME Section */}
        <section id="me" className="mb-12 scroll-mt-20"></section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Name and Photo */}
        <section className="text-center mb-12">
          <div className="flex flex-col items-center gap-6">
            {/* Profile Photo */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Replace with your actual photo:
              <img src="/path-to-your-photo.jpg" alt="Stefan Roman" className="w-full h-full object-cover" />
              */}
            </div>

            {/* Name and Title */}
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">Stefan Roman</h1>
              <p className="text-xl text-slate-600">{t('hero.title')}</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="cv" className="mb-12 scroll-mt-20">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Left: Introduction */}
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('cv.introduction')}
                </p>
              </div>

              {/* Right: Skills/Specializations */}
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Web Development */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{t('skills.webDev')}</h3>
                      <p className="text-sm text-slate-600">{t('skills.webDevDesc')}</p>
                    </div>
                  </div>

                  {/* Game Development */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{t('skills.gameDev')}</h3>
                      <p className="text-sm text-slate-600">{t('skills.gameDevDesc')}</p>
                    </div>
                  </div>

                  {/* Server Infrastructure */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Server className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{t('skills.serverInfra')}</h3>
                      <p className="text-sm text-slate-600">{t('skills.serverInfraDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CV PDF Section */}
        <section className="space-y-6 mb-16">
          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full bg-slate-100 flex items-center justify-center" style={{ minHeight: '1400px', height: 'calc(100vh - 200px)' }}>
              <iframe
                src= {`cvs/${language === 'en' 
                  ? "stefan_roman_cv_2026_en.pdf" 
                  : "StefanR_CV.pdf"}#toolbar=0&navpanes=0&scrollbar=0#zoom=160`}
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              {t('cv.download')}
            </Button>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8 mt-16 scroll-mt-20">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{t('projects.title')}</h1>
            <p className="text-lg text-slate-600">{t('projects.subtitle')}</p>
          </div>

          {/* Horizontal Scroll Projects */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-6 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-none w-full snap-center"
                >
                  <Card className="overflow-hidden h-full">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Content */}
                      <div>
                        <CardHeader>
                          <CardTitle className="text-2xl">
                            {language === 'en' ? project.titleEn : project.titleFr}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {language === 'en' ? project.descriptionEn : project.descriptionFr}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Technologies */}
                          <div>
                            <h3 className="font-medium text-slate-900 mb-2">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <Button variant="outline" className="gap-2">
                              <Gamepad2 className="w-4 h-4" />
                              {t('projects.viewProject')}
                            </Button>
                          </div>
                        </CardContent>
                      </div>

                      {/* Media */}
                      <div className="space-y-4">
                        <div className="p-6 space-y-4">
                          {/* Screenshot */}
                          <div className="rounded-lg overflow-hidden shadow-md">
                            <ImageWithFallback
                              src={project.image}
                              alt={language === 'en' ? project.titleEn : project.titleFr}
                              className="w-full h-48 object-cover"
                            />
                          </div>

                          {/* Video Demo */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Play className="w-4 h-4 text-slate-700" />
                              <h3 className="font-medium text-slate-900">{t('projects.demo')}</h3>
                            </div>
                            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md">
                              {/* Replace with your actual video URL */}
                              <iframe
                                src={project.videoUrl}
                                className="w-full h-full"
                                title={`${language === 'en' ? project.titleEn : project.titleFr} Demo`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                              {/* For local videos, use:
                              <video controls className="w-full h-full">
                                <source src="/path-to-your-video.mp4" type="video/mp4" />
                              </video>
                              */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center items-center gap-3 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeProject === index
                      ? 'w-12 bg-slate-900'
                      : 'w-8 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Projects Section */}
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Additional Projects</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-slate-900 mb-2">Project {i}</h3>
                  <p className="text-sm text-slate-600 mb-3">Brief description of the project and its key features.</p>
                  <Button variant="ghost" size="sm" className="w-full gap-2">
                    <ExternalLink className="w-3 h-3" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div> */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Professional Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}