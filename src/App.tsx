import { useRef, useState, useCallback, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Zone, Category } from './types';
import zonesData from './data/zones.json';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DeviceShowcase from './components/DeviceShowcase';
import GymZoneSection from './components/GymZoneSection';
import CampusMap from './components/CampusMap';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ZoneExplorer from './components/ZoneExplorer';
import ConocenosPage from './pages/ConocenosPage';
import CreditosPage from './pages/CreditosPage';

gsap.registerPlugin(ScrollTrigger);

const allZones: Zone[] = zonesData as Zone[];

// Solo mostramos el pin del gimnasio en el mapa
const mapZones: Zone[] = allZones.filter((z) => z.id === 'gimnasio');

const theme = createTheme({
  palette: {
    primary: { main: '#FF051E' },
    secondary: { main: '#ae002d' },
    background: { default: '#FFFFFF' },
    text: { primary: '#1B1B1B' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  shape: { borderRadius: 12 },
});

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [mapFilter, setMapFilter] = useState<Category | null>(null);

  const scrollToSection = useCallback((section: string) => {
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      zones: zonesRef,
      map: mapRef,
      about: aboutRef,
    };
    const target = refMap[section];
    if (target?.current) {
      target.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleZoneClick = useCallback((zone: Zone) => {
    setSelectedZone(zone);
  }, []);

  const handleCloseExplorer = useCallback(() => {
    setSelectedZone(null);
  }, []);

  const handleFilterChange = useCallback((cat: Category | null) => {
    setMapFilter(cat);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <Header onNavigate={scrollToSection} />

      {/* Hero */}
      <Box ref={heroRef}>
        <HeroSection />
      </Box>

      {/* Device showcase */}
      <DeviceShowcase />

      {/* Zona del Gimnasio (única sección de áreas) */}
      <Box ref={zonesRef}>
        <GymZoneSection onAreaClick={handleZoneClick} />
      </Box>

      {/* Mapa */}
      <Box ref={mapRef} sx={{ bgcolor: '#FFFFFF', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              className="reveal"
              variant="overline"
              sx={{
                color: '#FF051E',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                mb: 1,
                display: 'block',
              }}
            >
              Ubicación
            </Typography>
            <Typography
              className="reveal"
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#1B1B1B',
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.03em',
              }}
            >
              Encuentra el Gimnasio
            </Typography>
          </Box>
        </Container>

        <CampusMap
          zones={mapZones}
          filter={mapFilter}
          onFilterChange={handleFilterChange}
          onZoneClick={handleZoneClick}
        />
      </Box>

      {/* About */}
      <Box ref={aboutRef}>
        <AboutSection />
      </Box>

      <Footer />

      {selectedZone && (
        <ZoneExplorer zone={selectedZone} onClose={handleCloseExplorer} />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conocenos" element={<ConocenosPage />} />
          <Route path="/creditos" element={<CreditosPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
