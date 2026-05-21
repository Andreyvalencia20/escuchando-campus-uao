import { useRef } from 'react';
import { Box, Typography, Container, Chip, Stack, Grid } from '@mui/material';
import { Panorama } from '@mui/icons-material';
import Tilt from 'react-parallax-tilt';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Zone } from '../types';
import gymAreasData from '../data/gymAreas.json';

const gymAreas: Zone[] = gymAreasData as Zone[];

interface GymZoneSectionProps {
  onAreaClick: (zone: Zone) => void;
}

export default function GymZoneSection({ onAreaClick }: GymZoneSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.gym-card');
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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
    { scope: sectionRef }
  );

  return (
    <Box
      ref={sectionRef}
      id="gym-zone"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FFFFFF' }}
    >
      <Container maxWidth="lg">
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
            Zona del Gimnasio
          </Typography>
          <Typography
            sx={{
              color: 'rgba(27,27,27,0.6)',
              fontSize: '1.1rem',
              maxWidth: 560,
              mx: 'auto',
            }}
          >
            Recorre cada espacio de la zona deportiva y de bienestar del campus
            en 360°. Selecciona un punto para explorarlo.
          </Typography>
        </Box>

        <Grid container spacing={3} ref={cardsContainerRef} justifyContent="center">
          {gymAreas.map((area) => (
            <Grid key={area.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box className="gym-card" sx={{ opacity: 0 }}>
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
                    onClick={() => onAreaClick(area)}
                    sx={{
                      position: 'relative',
                      height: { xs: 260, md: 340 },
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '20px',
                      bgcolor: '#0d3d7a',
                      transition: 'all 0.4s ease',
                      '&:hover .gym-image': {
                        transform: 'scale(1.08)',
                      },
                    }}
                  >
                    <Box
                      className="gym-image"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(/gym-tour/tiles/${area.panoScene}/thumb.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.6s ease',
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 100%)',
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label="Deportivo"
                        size="small"
                        sx={{
                          bgcolor: '#1565C0',
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
                        {area.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 1.5,
                        }}
                      >
                        {area.description}
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                        <Panorama sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                          360°
                        </Typography>
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
