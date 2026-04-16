import { useRef, useState } from 'react';
import { Box, Typography, Container, Chip, Stack, Grid } from '@mui/material';
import { Panorama, VolumeUp } from '@mui/icons-material';
import Tilt from 'react-parallax-tilt';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Zone, Category } from '../types';
import { categoryLabels, categoryColors } from '../types';

interface ZoneCardsProps {
  zones: Zone[];
  onZoneClick: (zone: Zone) => void;
}

const filterOptions: Array<{ key: Category | 'todas'; label: string }> = [
  { key: 'todas', label: 'Todas' },
  { key: 'academico', label: 'Académico' },
  { key: 'recreativo', label: 'Recreativo' },
  { key: 'social', label: 'Social' },
  { key: 'deportivo', label: 'Deportivo' },
];

export default function ZoneCards({ zones, onZoneClick }: ZoneCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Category | 'todas'>('todas');

  const filteredZones =
    activeFilter === 'todas'
      ? zones
      : zones.filter((z) => z.category === activeFilter);

  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.zone-card');
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === cardsContainerRef.current) t.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [activeFilter] }
  );

  return (
    <Box ref={sectionRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F5F5F5' }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
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
            Descubre
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#1B1B1B',
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.03em',
              mb: 2,
            }}
          >
            Zonas del campus
          </Typography>
          <Typography
            sx={{
              color: 'rgba(27,27,27,0.6)',
              fontSize: '1.1rem',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Descubre los espacios m00e1s representativos del campus. Selecciona una zona
            para explorarla en 360°.
          </Typography>
        </Box>

        {/* Filter chips */}
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 5, gap: 1 }}
        >
          {filterOptions.map((opt) => (
            <Chip
              key={opt.key}
              label={opt.label}
              onClick={() => setActiveFilter(opt.key)}
              sx={{
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 1,
                py: 2.5,
                borderRadius: '50px',
                bgcolor:
                  activeFilter === opt.key ? '#FF051E' : 'rgba(0,0,0,0.06)',
                color: activeFilter === opt.key ? '#FFFFFF' : '#1B1B1B',
                '&:hover': {
                  bgcolor:
                    activeFilter === opt.key
                      ? '#ae002d'
                      : 'rgba(0,0,0,0.1)',
                },
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Stack>

        {/* Cards grid */}
        <Grid container spacing={3} ref={cardsContainerRef} justifyContent="center">
          {filteredZones.map((zone) => (
            <Grid key={zone.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box className="zone-card" sx={{ opacity: 0 }}>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  scale={1.02}
                  transitionSpeed={400}
                  style={{ borderRadius: 20, overflow: 'hidden' }}
                >
                  <Box
                    onClick={() => onZoneClick(zone)}
                    sx={{
                      position: 'relative',
                      height: { xs: 300, md: 400 },
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '20px',
                      '&:hover .zone-image': {
                        transform: 'scale(1.08)',
                      },
                    }}
                  >
                    {/* Background image */}
                    <Box
                      className="zone-image"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${zone.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.6s ease',
                      }}
                    />

                    {/* Gradient overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 100%)',
                      }}
                    />

                    {/* Content overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        zIndex: 2,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label={categoryLabels[zone.category]}
                        size="small"
                        sx={{
                          bgcolor: categoryColors[zone.category],
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          mb: 1.5,
                          height: 26,
                        }}
                      />

                      <Typography
                        variant="h6"
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '1.3rem',
                          lineHeight: 1.2,
                          mb: 0.8,
                        }}
                      >
                        {zone.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 1.5,
                        }}
                      >
                        {zone.description}
                      </Typography>

                      {/* Badges */}
                      <Stack direction="row" spacing={1.5} justifyContent="center">
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Panorama
                            sx={{
                              fontSize: 16,
                              color: 'rgba(255,255,255,0.6)',
                            }}
                          />
                          <Typography
                            sx={{
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '0.75rem',
                            }}
                          >
                            360°
                          </Typography>
                        </Stack>
                        {zone.audio && (
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <VolumeUp
                              sx={{
                                fontSize: 16,
                                color: 'rgba(255,255,255,0.6)',
                              }}
                            />
                            <Typography
                              sx={{
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: '0.75rem',
                              }}
                            >
                              Audio
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                </Tilt>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
