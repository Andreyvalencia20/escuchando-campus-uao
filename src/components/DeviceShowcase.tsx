import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DeviceShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const devices = sectionRef.current.querySelectorAll('.device');
    gsap.fromTo(devices,
      { y: 80, opacity: 0, rotateY: -15 },
      {
        y: 0, opacity: 1, rotateY: 0,
        duration: 1, stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 14 },
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1B1B1B 50%, #0A0A0A 100%)',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography sx={{
            color: '#FF051E', fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.15em', textTransform: 'uppercase', mb: 1.5,
          }}>
            Dise&ntilde;o adaptativo
          </Typography>
          <Typography sx={{
            color: '#fff', fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.8rem' },
            lineHeight: 1.1, letterSpacing: '-0.03em', mb: 2,
          }}>
            Entrena tu mirada en cada pantalla
          </Typography>
          <Typography sx={{
            color: 'rgba(255,255,255,0.45)', fontWeight: 300,
            maxWidth: 480, mx: 'auto', fontSize: '0.95rem', lineHeight: 1.7,
          }}>
            Explora el centro deportivo desde cualquier dispositivo con la misma calidad visual
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: { xs: 2, md: 5 },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          transformStyle: 'preserve-3d',
        }}>

          <Box
            className="device"
            sx={{
              opacity: 0,
              order: { xs: 2, md: 1 },
              transform: 'rotateY(8deg)',
              transition: 'transform 400ms ease',
              '&:hover': { transform: 'rotateY(0deg) translateY(-10px)' },
            }}
          >
            <Box sx={{
              width: { xs: 140, md: 180 },
              height: { xs: 280, md: 360 },
              borderRadius: '24px',
              border: '4px solid #333',
              bgcolor: '#111',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(255,5,30,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
            }}>
              <Box sx={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 60, height: 20, bgcolor: '#111', borderRadius: '0 0 12px 12px', zIndex: 2,
              }} />
              {visible && (
                <iframe
                  src="/"
                  title="Vista móvil"
                  style={{ width: '375px', height: '750px', border: 'none', transform: 'scale(0.48)', transformOrigin: '0 0' }}
                />
              )}
            </Box>
            <Typography sx={{
              textAlign: 'center', mt: 2,
              color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 500,
            }}>
              M&oacute;vil
            </Typography>
          </Box>

          <Box
            className="device"
            sx={{
              opacity: 0,
              order: { xs: 1, md: 2 },
              transition: 'transform 400ms ease',
              '&:hover': { transform: 'translateY(-10px)' },
            }}
          >
            <Box sx={{
              width: { xs: 320, md: 480 },
              height: { xs: 200, md: 300 },
              borderRadius: '12px 12px 0 0',
              border: '4px solid #333',
              borderBottom: 'none',
              bgcolor: '#111',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(255,5,30,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
            }}>
              {visible && (
                <iframe
                  src="/"
                  title="Vista escritorio"
                  style={{ width: '1440px', height: '900px', border: 'none', transform: 'scale(0.333)', transformOrigin: '0 0' }}
                />
              )}
            </Box>
            <Box sx={{
              width: { xs: 120, md: 160 }, height: 4,
              bgcolor: '#333', mx: 'auto', borderRadius: '0 0 4px 4px',
            }} />
            <Box sx={{
              width: { xs: 180, md: 260 }, height: 12,
              bgcolor: '#2A2A2A', mx: 'auto', borderRadius: '0 0 8px 8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }} />
            <Typography sx={{
              textAlign: 'center', mt: 2,
              color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 500,
            }}>
              Escritorio
            </Typography>
          </Box>

          <Box
            className="device"
            sx={{
              opacity: 0,
              order: 3,
              transform: 'rotateY(-8deg)',
              transition: 'transform 400ms ease',
              '&:hover': { transform: 'rotateY(0deg) translateY(-10px)' },
            }}
          >
            <Box sx={{
              width: { xs: 180, md: 240 },
              height: { xs: 250, md: 320 },
              borderRadius: '16px',
              border: '4px solid #333',
              bgcolor: '#111',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(255,5,30,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
            }}>
              {visible && (
                <iframe
                  src="/"
                  title="Vista tablet"
                  style={{ width: '768px', height: '1024px', border: 'none', transform: 'scale(0.3125)', transformOrigin: '0 0' }}
                />
              )}
            </Box>
            <Typography sx={{
              textAlign: 'center', mt: 2,
              color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 500,
            }}>
              Tablet
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
