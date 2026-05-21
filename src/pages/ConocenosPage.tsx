import { useRef, useEffect } from 'react';
import Footer from "../components/Footer";
import { Box, Typography, Container, Stack, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: 'React',
    description: 'Biblioteca de interfaces de usuario basada en componentes.',
  },
  {
    name: 'TypeScript',
    description: 'Superset tipado de JavaScript para mayor robustez.',
  },
  {
    name: 'Vite',
    description: 'Herramienta de construcción rápida para desarrollo moderno.',
  },
  {
    name: 'Material UI',
    description: 'Sistema de componentes basado en Material Design.',
  },
  {
    name: 'GSAP',
    description: 'Motor de animaciones de alto rendimiento para la web.',
  },
  {
    name: 'Marzipano',
    description: 'Visor de panoramas 360° de código abierto.',
  },
  {
    name: 'react-zoom-pan-pinch',
    description: 'Zoom y paneo interactivo para el mapa 2D del campus.',
  },
];

const teamMembers = [
  { name: 'Sebastián Fernández Gómez', initials: 'SF', color: '#FF051E' },
  { name: 'Laura Valentina Henao Torres', initials: 'LH', color: '#ae002d' },
  { name: 'Juan David Muñoz Sanchez', initials: 'JM', color: '#79102D' },
  { name: 'Andrey Daniel Valencia Samboní', initials: 'AV', color: '#1B1B1B' },
  { name: 'Alejandro Rivera Tovar', initials: 'AR', color: '#FF051E' },
];

export default function ConocenosPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const techRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
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
        gsap.from(section1Ref.current.querySelector('.section-text'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

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
        gsap.from(section2Ref.current.querySelector('.section-text'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

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
        const techItems = section3Ref.current.querySelectorAll('.tech-item');
        gsap.from(techItems, {
          x: 80,
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
        const members = section4Ref.current.querySelectorAll('.team-member');
        gsap.from(members, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
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
              Conócenos
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ height: 72 }} />

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
            Vive el deporte en la UAO
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

      <Box id="acerca-del-recorrido"
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
            Acerca del recorrido
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
            Vive el deporte en la UAO es una experiencia web multimedia que
            permite explorar el centro deportivo y de bienestar de la
            Universidad Autónoma de Occidente. A través de recorridos 360°
            inmersivos por el gimnasio, salón de yoga, sala de estiramiento,
            casilleros y zonas de descanso, el usuario puede conocer cada
            espacio sin estar físicamente allí.
          </Typography>
        </Container>
      </Box>

      <Box id="metodologia"
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
              Metodología
            </Typography>
            <Typography
              className="section-text"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
                color: 'rgba(27,27,27,0.7)',
                lineHeight: 1.85,
                ml: { md: 'auto' },
                maxWidth: 720,
              }}
            >
              El proyecto se desarrolló siguiendo la metodología de diseño de
              Sistemas Multimedia, integrando captura fotográfica 360° y
              navegación interactiva sobre un mapa 2D del campus. Los
              recorridos panorámicos se generaron con Marzipano y se sirven
              como contenido estático junto a la aplicación React. El diseño
              se basa en Material Design con tipografía Inter, iconografía
              outlined y los colores institucionales de la UAO.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box id="tecnologias"
        ref={section3Ref}
        sx={{
          position: 'relative',
          py: { xs: 8, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box sx={sectionNumberSx}>03</Box>
        <Container maxWidth="lg">
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
            Tecnologías utilizadas
          </Typography>

          <Box
            ref={techRowRef}
            sx={{
              display: 'flex',
              gap: { xs: 4, md: 6 },
              overflowX: 'auto', WebkitOverflowScrolling: 'touch',
              pb: 3,
              px: 1,
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255,5,30,0.2)',
                borderRadius: 3,
              },
            }}
          >
            {techStack.map((tech, i) => (
              <Box
                key={tech.name}
                className="tech-item"
                sx={{
                  minWidth: { xs: 160, md: 200 },
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.8rem', sm: '2.8rem', md: '4rem' },
                    color: '#FF051E',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    mb: 0.5,
                    opacity: 0.15,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: '#1B1B1B',
                    letterSpacing: '-0.02em',
                    mb: 1,
                  }}
                >
                  {tech.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.92rem',
                    color: 'rgba(27,27,27,0.55)',
                    lineHeight: 1.6,
                    maxWidth: 200,
                  }}
                >
                  {tech.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box id="equipo-de-trabajo"
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
          <Typography
            className="section-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3.2rem' },
              color: '#1B1B1B',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              mb: 6,
              textAlign: { xs: 'left', md: 'center' },
            }}
          >
            Equipo de trabajo
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 4, sm: 5 }}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            {teamMembers.map((member) => (
              <Box
                key={member.name}
                className="team-member"
                sx={{ textAlign: 'center', minWidth: 140 }}
              >
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    bgcolor: member.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {member.initials}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#1B1B1B',
                    mb: 0.5,
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    color: 'rgba(27,27,27,0.5)',
                  }}
                >
                  Ingeniería Multimedia — UAO
                </Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
