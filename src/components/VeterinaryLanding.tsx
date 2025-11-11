import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  Stethoscope, 
  Shield, 
  Calendar, 
  Phone, 
  MapPin, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  ArrowRight,
  Users,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { 
  PawPrint, 
  BoneIcon, 
  HeartPaw, 
  DecorativeCircle, 
  PawDivider,
  FloatingPaw 
} from './PetDecorations';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';
import heroImage from '@/assets/hero-pets.jpg';
import missionVetImage from '@/assets/mission-vet.jpg';
import missionPetsImage from '@/assets/mission-pets.jpg';
import facilityFacade from '@/assets/facility-facade.jpg';
import facilityReception from '@/assets/facility-reception.jpg';
import facilityExamRoom from '@/assets/facility-exam-room.jpg';
import facilityWard from '@/assets/facility-ward.jpg';
import facilityGrooming from '@/assets/facility-grooming.jpg';
import facilityLaboratory from '@/assets/facility-laboratory.jpg';

const VeterinaryLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  // Scroll reveal animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observar todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-zoom, .stagger-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Stats animation
  const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(`counter-${end}`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return <span id={`counter-${end}`}>{count}</span>;
  };

  // Facility Carousel Component with Auto-play
  const FacilityCarousel = () => {
    const [api, setApi] = useState<CarouselApi>();

    const facilities = [
      { image: facilityFacade, alt: "Fachada moderna da clínica" },
      { image: facilityReception, alt: "Recepção aconchegante" },
      { image: facilityExamRoom, alt: "Sala de atendimento equipada" },
      { image: facilityWard, alt: "Área de internação" },
      { image: facilityGrooming, alt: "Espaço de banho e tosa" },
      { image: facilityLaboratory, alt: "Laboratório interno" },
    ];

    // Auto-play functionality
    useEffect(() => {
      if (!api) return;

      const intervalId = setInterval(() => {
        api.scrollNext();
      }, 8000); // 8 seconds between slides

      return () => clearInterval(intervalId);
    }, [api]);

    // Pause on hover
    useEffect(() => {
      if (!api) return;

      let intervalId: NodeJS.Timeout;

      const startAutoplay = () => {
        intervalId = setInterval(() => {
          api.scrollNext();
        }, 8000);
      };

      const stopAutoplay = () => {
        clearInterval(intervalId);
      };

      const container = api.rootNode();
      container.addEventListener('mouseenter', stopAutoplay);
      container.addEventListener('mouseleave', startAutoplay);

      startAutoplay();

      return () => {
        clearInterval(intervalId);
        container.removeEventListener('mouseenter', stopAutoplay);
        container.removeEventListener('mouseleave', startAutoplay);
      };
    }, [api]);

    return (
      <Carousel 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
          duration: 40,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent>
          {facilities.map((facility, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="relative rounded-xl overflow-hidden shadow-soft mx-2 hover-image-zoom">
                <img 
                  src={facility.image} 
                  alt={facility.alt}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-dark/80 to-transparent p-6">
                  <p className="text-primary-foreground text-xl font-semibold">{facility.alt}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? 'bg-primary/95 backdrop-blur-sm shadow-medium' : 'bg-primary'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-accent-highlight fill-current" />
              <span className="text-xl font-bold text-primary-foreground">PetCare Clinic</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-primary-foreground hover:text-accent-highlight transition-all duration-300 hover:scale-105"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-primary-foreground hover:text-accent-highlight transition-all duration-300 hover:scale-105"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-primary-foreground hover:text-accent-highlight transition-all duration-300 hover:scale-105"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-primary-foreground hover:text-accent-highlight transition-all duration-300 hover:scale-105"
              >
                Contato
              </button>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('services')}
                className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary hover-button"
              >
                Nossos Serviços
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary-dark hover:bg-primary-light text-primary-foreground hover-button"
              >
                Agendar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-primary-foreground hover:text-accent-highlight transition-smooth"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-smooth ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-primary-dark px-4 py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 text-primary-foreground hover:text-accent-highlight transition-smooth"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-primary-foreground hover:text-accent-highlight transition-smooth"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 text-primary-foreground hover:text-accent-highlight transition-smooth"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-primary-foreground hover:text-accent-highlight transition-smooth"
            >
              Contato
            </button>
            <div className="pt-4 space-y-2">
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('services')}
                className="w-full border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
              >
                Nossos Serviços
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-primary-dark hover:bg-primary-light text-primary-foreground"
              >
                Agendar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-16">
        {/* Decorative SVG Elements - Hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right floating paws */}
          <FloatingPaw size="small" className="absolute top-20 right-10 rotate-12" opacity={0.2} delay={0} />
          <FloatingPaw size="small" className="absolute top-32 right-24 -rotate-12" opacity={0.15} delay={0.5} />
          
          {/* Top left floating paws */}
          <FloatingPaw size="small" className="absolute top-24 left-16 -rotate-12" opacity={0.15} delay={1} />
          <FloatingPaw size="small" className="absolute top-40 left-32 rotate-12" opacity={0.2} delay={1.5} />
          <FloatingPaw size="medium" className="absolute top-52 left-12 rotate-45" opacity={0.12} delay={2} />
          
          {/* Large background circle */}
          <DecorativeCircle 
            size={400} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" 
            opacity={0.08} 
            gradient={true} 
          />
          
          {/* Background paws behind hero */}
          <PawPrint size="large" className="absolute top-1/3 right-1/4 rotate-12" opacity={0.08} />
          <PawPrint size="large" className="absolute bottom-1/3 left-1/4 -rotate-12" opacity={0.08} />
          
          {/* Additional decorative paws - hidden on mobile */}
          <div className="hidden md:block">
            <PawPrint size="medium" className="absolute top-60 right-40 rotate-45" opacity={0.1} />
            <PawPrint size="medium" className="absolute bottom-40 left-40 -rotate-45" opacity={0.1} />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Bem-vindos à
                <span className="block text-accent-highlight">PetCare Clinic</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Cuidados veterinários de excelência para seus companheiros mais queridos. 
                Nossa equipe dedicada oferece tratamentos modernos em um ambiente acolhedor e profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('services')}
                  className="bg-accent-highlight hover:bg-accent-highlight/90 text-primary-foreground font-semibold hover-button"
                >
                  Nossos Serviços
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                  className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary hover-button"
                >
                  Sobre Nós
                </Button>
              </div>
            </div>

            <div className="relative scroll-zoom">
              <div className="relative z-10 hover-image-zoom rounded-2xl shadow-large">
                <img 
                  src={heroImage} 
                  alt="Pets felizes na clínica veterinária" 
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[42px] fill-background"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Paw Divider */}
      <PawDivider />

      {/* Mission Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-slide-left space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="hover-image-zoom rounded-2xl shadow-soft">
                  <img 
                    src={missionVetImage} 
                    alt="Veterinária examinando filhote" 
                    className="rounded-2xl"
                  />
                </div>
                <div className="hover-image-zoom rounded-2xl shadow-soft mt-8">
                  <img 
                    src={missionPetsImage} 
                    alt="Pets saudáveis e felizes" 
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="scroll-slide-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-6">
                O Que Fazemos
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Na PetCare Clinic, nossa missão é proporcionar cuidados veterinários 
                excepcionais com compaixão e dedicação. Acreditamos que cada pet merece 
                o melhor tratamento possível, e nossa equipe está comprometida em oferecer 
                serviços de alta qualidade em todas as especialidades.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Combinamos tecnologia de ponta com um toque humano caloroso, garantindo 
                que tanto os pets quanto seus tutores se sintam confortáveis e seguros 
                em nossa clínica. Nosso compromisso é com a saúde e felicidade de cada 
                animal que cuidamos.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-paw" />
                  <span className="font-semibold text-primary-dark">Cuidado Personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-paw" />
                  <span className="font-semibold text-primary-dark">Tecnologia Moderna</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-paw" />
                  <span className="font-semibold text-primary-dark">Equipe Experiente</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-paw" />
                  <span className="font-semibold text-primary-dark">Ambiente Acolhedor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 bg-secondary">
        {/* Decorative paws for services section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <PawPrint size="small" className="absolute top-32 right-20 rotate-12" opacity={0.08} />
          <PawPrint size="small" className="absolute top-48 left-24 -rotate-12" opacity={0.08} />
          <PawPrint size="small" className="absolute bottom-32 right-32 rotate-45" opacity={0.08} />
          <PawPrint size="small" className="absolute bottom-48 left-28 -rotate-45" opacity={0.08} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              Oferecemos os Melhores Serviços
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossa clínica oferece uma ampla gama de serviços veterinários especializados 
              para garantir a saúde e bem-estar do seu pet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="rotate-12" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Stethoscope className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Consultas Gerais</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Exames completos de rotina e diagnósticos precisos para manter 
                seu pet sempre saudável e feliz.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Service Card 2 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="-rotate-12" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Vacinação</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Programas completos de vacinação para proteger seu pet contra 
                doenças e manter a imunidade em dia.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Service Card 3 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="rotate-45" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Heart className="h-8 w-8 text-primary-foreground fill-current" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Cirurgias</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Procedimentos cirúrgicos seguros com equipamentos modernos e 
                técnicas minimamente invasivas.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Service Card 4 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="rotate-12" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Emergências 24h</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Atendimento de emergência disponível 24 horas para situações 
                que requerem cuidados imediatos.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Service Card 5 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="-rotate-12" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Check-ups Preventivos</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Exames regulares para detecção precoce e prevenção de problemas 
                de saúde em seu pet.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Service Card 6 */}
            <div className="stagger-item card-gradient rounded-xl p-8 shadow-soft hover-card relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-3 right-3 pointer-events-none">
                <PawPrint size="small" opacity={0.15} className="rotate-45" />
              </div>
              
              <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Consultoria Pet</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Orientações especializadas sobre nutrição, comportamento e 
                cuidados gerais para seu pet.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-accent-paw hover:text-primary-dark font-semibold hover-link"
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Paw Divider */}
      <PawDivider />

      {/* Facility Carousel Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12 scroll-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-6">
              🏥 Conheça Nossa Estrutura de Cuidado e Conforto
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa clínica foi projetada para oferecer conforto, tecnologia e segurança — tanto para você quanto para seu pet. 
              Cada espaço foi pensado para transmitir tranquilidade e confiança, desde a recepção acolhedora até as salas de 
              atendimento equipadas com tecnologia veterinária de ponta.
            </p>
          </div>

          <FacilityCarousel />

          <div className="text-center mt-12 scroll-slide-up">
            <p className="text-xl font-semibold text-primary-dark mb-6">
              🎯 Agende uma visita e conheça nossa estrutura pessoalmente!
            </p>
            <Button 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-accent-highlight hover:bg-accent-highlight/90 text-primary-foreground font-semibold hover-button"
            >
              Agendar Visita
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        {/* Decorative elements for CTA */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <HeartPaw className="absolute top-10 left-10 rotate-12" opacity={0.12} />
          <HeartPaw className="absolute bottom-10 right-10 -rotate-12" opacity={0.12} />
          <DecorativeCircle size={200} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" opacity={0.08} />
          <DecorativeCircle size={200} className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2" opacity={0.08} />
          <PawPrint size="medium" className="absolute top-20 right-1/4 rotate-45" opacity={0.1} />
          <PawPrint size="medium" className="absolute bottom-20 left-1/4 -rotate-45" opacity={0.1} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="scroll-fade-in max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
              Pronto para Cuidar do Seu Pet?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Agende uma consulta hoje e garanta que seu companheiro receba os melhores cuidados 
              veterinários em um ambiente profissional e acolhedor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-accent-highlight hover:bg-accent-highlight/90 text-primary-foreground font-semibold hover-button"
                >
                Agendar Consulta
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-button"
              >
                Ver Todos os Serviços
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative bg-primary-dark text-primary-foreground py-16">
        {/* Footer decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <PawPrint size="medium" className="absolute bottom-8 left-8 rotate-12" opacity={0.1} />
          <PawPrint size="medium" className="absolute bottom-8 right-8 -rotate-12" opacity={0.1} />
          <BoneIcon className="absolute bottom-16 left-1/4 rotate-45" opacity={0.12} />
          <BoneIcon className="absolute bottom-16 right-1/4 -rotate-45" opacity={0.12} />
          <div className="hidden lg:block">
            <PawPrint size="small" className="absolute top-12 left-16 rotate-12" opacity={0.08} />
            <PawPrint size="small" className="absolute top-12 right-16 -rotate-12" opacity={0.08} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-accent-highlight fill-current" />
                <span className="text-xl font-bold">PetCare Clinic</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Cuidados veterinários de excelência para seus companheiros mais queridos. 
                Tecnologia moderna com toque humano caloroso.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/60 hover:text-accent-highlight transition-all duration-300 hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent-highlight transition-all duration-300 hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent-highlight transition-all duration-300 hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth"
                  >
                    Serviços
                  </button>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Serviços</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth">
                    Consultas Gerais
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth">
                    Vacinação
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth">
                    Cirurgias
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-accent-highlight transition-smooth">
                    Emergências 24h
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-accent-highlight mt-1 flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm leading-relaxed">
                    Rua dos Pets, 123<br />
                    Bairro Feliz, São Paulo - SP<br />
                    CEP: 01234-567
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent-highlight" />
                  <span className="text-primary-foreground/80">(11) 9999-8888</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent-highlight" />
                  <span className="text-primary-foreground/80">contato@petcareclinic.com.br</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
                © 2024 PetCare Clinic. Todos os direitos reservados. CNPJ: 12.345.678/0001-99
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-primary-foreground/60 hover:text-accent-highlight transition-smooth">
                  Política de Privacidade
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent-highlight transition-smooth">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => {
          const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta na PetCare Clinic.");
          window.open(`https://wa.me/5511999998888?text=${message}`, "_blank");
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Fale conosco
        </span>
      </button>
    </div>
  );
};

export default VeterinaryLanding;