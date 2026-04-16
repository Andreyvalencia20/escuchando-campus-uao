import { useRef, useEffect } from 'react';
import Footer from "../components/Footer";
import { Box, Typography, Container, Stack, IconButton, Link } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const openSourceTechs = [
  { name: 'React', note: 'Meta Platforms, Inc. — Licencia MIT' },
  { name: 'Material UI', note: 'MUI SAS — Licencia MIT' },
  { name: 'GSAP', note: 'GreenSock, Inc. — Licencia propietaria con uso gratuito' },
  { name: 'krpano', note: 'krpano Gesellschaft mbH — Licencia comercial' },
  { name: 'Vite', note: 'Evan You — Licencia MIT' },
];

export default function CreditosPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      // Section 1 - from left
      if (section1Ref.current) {
        gsap.from(section1Ref.current.querySelector('.section-title'), {
          x: -120,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(section1Ref.current.querySelectorAll('.section-text'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Section 2 - from right
      if (section2Ref.current) {
        gsap.from(section2Ref.current.querySelector('.section-title'), {
          x: 120,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(section2Ref.current.querySelectorAll('.section-text'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Section 3 - from left
      if (section3Ref.current) {
        gsap.from(section3Ref.current.querySelector('.section-title'), {
          x: -120,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(section3Ref.current.querySelectorAll('.credit-item'), {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Section 4 - from right
      if (section4Ref.current) {
        gsap.from(section4Ref.current.querySelector('.section-title'), {
          x: 120,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section4Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        gsap.from(section4Ref.current.querySelectorAll('.tech-credit'), {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section4Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: containerRef }
  );

  const sectionNumberSx = {
    position: 'absolute' as const,
    top: { xs: 10, md: -30 },
    right: { xs: 10, md: 40 },
    fontSize: { xs: '4rem', sm: '6rem', md: '14rem' },
    fontWeight: 900,
    color: { xs: 'rgba(255,5,30,0.02)', md: 'rgba(255,5,30,0.04)' },
    lineHeight: 1,
    userSelect: 'none' as const,
    pointerEvents: 'none' as const,
    letterSpacing: '-0.06em',
  };

  return (
    <Box ref={containerRef} sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      {/* Top bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: 'rgba(250,250,250,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ height: 72 }}
          >
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: '#1B1B1B',
                '&:hover': { bgcolor: 'rgba(255,5,30,0.06)' },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#1B1B1B',
                letterSpacing: '-0.02em',
              }}
            >
              Créditos
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Spacer */}
      <Box sx={{ height: 72 }} />

      {/* Hero */}
      <Box
        sx={{
          pt: { xs: 8, md: 14 },
          pb: { xs: 4, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '4.2rem' },
              color: '#1B1B1B',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              mb: 2,
            }}
          >
            Créditos y reconocimientos
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: '#FF051E',
              borderRadius: 2,
              mx: 'auto',
            }}
          />
        </Container>
      </Box>

      {/* Section 01 - Universidad */}
      <Box
        ref={section1Ref}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box sx={sectionNumberSx}>01</Box>
        <Container maxWidth="md">
          <Typography
            className="section-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3.2rem' },
              color: '#1B1B1B',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              mb: 4,
            }}
          >
            Universidad Autónoma de Occidente
          </Typography>
          <Stack spacing={2.5}>
            <Typography
              className="section-text"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                color: 'rgba(27,27,27,0.7)',
                lineHeight: 1.85,
                maxWidth: 720,
              }}
            >
              Fundada en 1970 en Santiago de Cali, Colombia. Institución
              privada de educación superior con acreditación
              institucional de alta calidad.
            </Typography>
            <Typography
              className="section-text"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                color: 'rgba(27,27,27,0.7)',
                lineHeight: 1.85,
                maxWidth: 720,
              }}
            >
              Este proyecto fue desarrollado como parte de la materia Arquitectura
              de Sistemas Multimedia del programa de Ingeniería
              Multimedia, perteneciente a la Facultad de Ingeniería.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Section 02 - Recorridos 360 */}
      <Box
        ref={section2Ref}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 14 },
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ ...sectionNumberSx, right: 'auto', left: { xs: 10, md: 40 } }}>
          02
        </Box>
        <Container maxWidth="md">
          <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography
              className="section-title"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3.2rem' },
                color: '#1B1B1B',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                mb: 4,
              }}
            >
              Recorridos 360° — Centro de Innovación TIC
            </Typography>
            <Stack spacing={2.5} sx={{ ml: { md: 'auto' }, maxWidth: 720 }}>
              <Typography
                className="section-text"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                  color: 'rgba(27,27,27,0.7)',
                  lineHeight: 1.85,
                }}
              >
                Los recorridos panorámicos 360° utilizados en
                esta aplicación fueron originalmente desarrollados por el
                Centro de Innovación TIC (CIT) de la UAO, ahora conocido
                como CIMED (Centro de Innovación y Mediación
                Digital).
              </Typography>
              <Typography
                className="section-text"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                  color: 'rgba(27,27,27,0.7)',
                  lineHeight: 1.85,
                }}
              >
                El proyecto UAO-360 permite recorrer virtualmente las instalaciones
                del campus universitario.
              </Typography>
              <Typography
                className="section-text"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                  color: 'rgba(27,27,27,0.7)',
                  lineHeight: 1.85,
                }}
              >
                <Link
                  href="https://cit.uao.edu.co/uao-360"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#FF051E',
                    fontWeight: 600,
                    textDecorationColor: 'rgba(255,5,30,0.3)',
                    '&:hover': {
                      textDecorationColor: '#FF051E',
                    },
                  }}
                >
                  cit.uao.edu.co/uao-360
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Section 03 - Recursos multimedia */}
      <Box
        ref={section3Ref}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box sx={sectionNumberSx}>03</Box>
        <Container maxWidth="md">
          <Typography
            className="section-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3.2rem' },
              color: '#1B1B1B',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              mb: 6,
            }}
          >
            Recursos multimedia
          </Typography>
          <Stack spacing={4}>
            <Box className="credit-item">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#1B1B1B',
                  mb: 0.5,
                }}
              >
                Audio ambiente
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  color: 'rgba(27,27,27,0.6)',
                  lineHeight: 1.7,
                }}
              >
                Freesound.org — Biblioteca de sonidos con licencia Creative Commons.
              </Typography>
            </Box>
            <Box className="credit-item">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#1B1B1B',
                  mb: 0.5,
                }}
              >
                Fotografías de referencia
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  color: 'rgba(27,27,27,0.6)',
                  lineHeight: 1.7,
                }}
              >
                Unsplash — Imágenes de alta calidad con licencia libre.
              </Typography>
            </Box>
            <Box className="credit-item">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#1B1B1B',
                  mb: 0.5,
                }}
              >
                Plano del campus
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  color: 'rgba(27,27,27,0.6)',
                  lineHeight: 1.7,
                }}
              >
                Proporcionado por el CIT de la UAO.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Section 04 - Tecnologías open source */}
      <Box
        ref={section4Ref}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 14 },
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ ...sectionNumberSx, right: 'auto', left: { xs: 10, md: 40 } }}>
          04
        </Box>
        <Container maxWidth="md">
          <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography
              className="section-title"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3.2rem' },
                color: '#1B1B1B',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                mb: 6,
              }}
            >
              Tecnologías open source
            </Typography>
            <Stack spacing={3} sx={{ ml: { md: 'auto' }, maxWidth: 720 }}>
              {openSourceTechs.map((tech) => (
                <Box key={tech.name} className="tech-credit">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#1B1B1B',
                      mb: 0.3,
                    }}
                  >
                    {tech.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: 'rgba(27,27,27,0.55)',
                      lineHeight: 1.6,
                    }}
                  >
                    {tech.note}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
