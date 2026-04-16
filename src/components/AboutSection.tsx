import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HearingOutlinedIcon from '@mui/icons-material/HearingOutlined';
import ThreeSixtyOutlinedIcon from '@mui/icons-material/ThreeSixtyOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <HearingOutlinedIcon sx={{ fontSize: 30 }} />,
    number: '01',
    title: 'Identidad sonora',
    description: 'Cada zona posee un paisaje sonoro único capturado in situ, que refleja la atmósfera real del espacio universitario.',
  },
  {
    icon: <ThreeSixtyOutlinedIcon sx={{ fontSize: 30 }} />,
    number: '02',
    title: 'Recorrido interactivo',
    description: 'Panoramas 360° de alta resolución que permiten explorar cada rincón del campus desde cualquier dispositivo.',
  },
  {
    icon: <MapOutlinedIcon sx={{ fontSize: 30 }} />,
    number: '03',
    title: 'Mapa del campus',
    description: 'Navegación visual con un mapa interactivo que conecta todas las zonas y puntos de interés del campus.',
  },
  {
    icon: <DevicesOutlinedIcon sx={{ fontSize: 30 }} />,
    number: '04',
    title: 'Multiplataforma',
    description: 'Diseñado para funcionar en cualquier navegador moderno, tanto en computadores de escritorio como en dispositivos móviles.',
  },
];

const stats = [
  { value: 500, prefix: '+', suffix: '', label: 'Puntos panorámicos' },
  { value: 6, prefix: '', suffix: '', label: 'Zonas interactivas' },
  { value: 360, prefix: '', suffix: '°', label: 'Visión completa' },
  { value: 100, prefix: '', suffix: '%', label: 'Recursos libres' },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef);

  useGSAP(() => {
    if (!featuresRef.current) return;
    const items = featuresRef.current.querySelectorAll('.feature-item');
    gsap.fromTo(items,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <Box ref={sectionRef} id="about">
      {/* Stats banner */}
      <Box
        ref={statsRef}
        sx={{
          py: { xs: 7, md: 10 },
          background: 'linear-gradient(135deg, #79102D 0%, #ae002d 50%, #FF051E 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -60, width: 280, height: 280, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.03)' }} />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={4}>
            {stats.map((s, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={s.label}>
                <Box
                  sx={{
                    textAlign: 'center',
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 700ms cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1, color: '#fff', letterSpacing: '-0.03em' }}>
                    {s.prefix}{statsVisible ? s.value : 0}{s.suffix}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', fontWeight: 400, mt: 0.5 }}>
                    {s.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features - horizontal timeline style */}
      <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: '#FAFAFA', position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography sx={{ color: '#FF051E', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', mb: 1.5 }}>
              Sobre el proyecto
            </Typography>
            <Typography sx={{ color: '#1B1B1B', fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Una experiencia inmersiva
            </Typography>
          </Box>

          {/* Features as alternating left-right blocks */}
          <Box ref={featuresRef}>
            {features.map((f, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Box
                  key={f.number}
                  className="feature-item"
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: isLeft ? 'row' : 'row-reverse' },
                    alignItems: 'center',
                    gap: { xs: 3, md: 8 },
                    mb: { xs: 6, md: 10 },
                    opacity: 0,
                  }}
                >
                  {/* Number + Icon side */}
                  <Box
                    sx={{
                      flex: '0 0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      flexDirection: { xs: 'row', md: isLeft ? 'row' : 'row-reverse' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '4rem', md: '6rem' },
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, #FF051E 0%, #ae002d 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.04em',
                        opacity: 0.15,
                      }}
                    >
                      {f.number}
                    </Typography>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #FF051E, #ae002d)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 8px 25px rgba(255,5,30,0.25)',
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </Box>
                  </Box>

                  {/* Connector line (desktop only) */}
                  <Box sx={{ display: { xs: 'none', md: 'block' }, width: 80, height: 2, bgcolor: 'rgba(255,5,30,0.15)', flexShrink: 0 }} />

                  {/* Text side */}
                  <Box sx={{ textAlign: { xs: 'center', md: isLeft ? 'left' : 'right' }, maxWidth: 420 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: '#1B1B1B', mb: 1, letterSpacing: '-0.01em' }}>
                      {f.title}
                    </Typography>
                    <Typography sx={{ color: '#616161', fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.7 }}>
                      {f.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
