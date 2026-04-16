import { useRef } from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const stats = [
  { value: '6', label: 'Zonas' },
  { value: '129', label: 'Panoramas 360°' },
  { value: '6', label: 'Audios ambiente' },
];

const floatingCircleKeyframes = `
@keyframes floatCircle1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -40px) scale(1.1); }
  50% { transform: translate(-20px, -80px) scale(0.95); }
  75% { transform: translate(40px, -30px) scale(1.05); }
}
@keyframes floatCircle2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-40px, 30px) scale(1.05); }
  50% { transform: translate(30px, 60px) scale(0.9); }
  75% { transform: translate(-50px, 20px) scale(1.1); }
}
@keyframes floatCircle3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.08); }
  66% { transform: translate(-30px, 40px) scale(0.92); }
}
`;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { x: 120, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1 },
          '-=0.6'
        );
      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value');
      if (statElements) {
        statElements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-value') || '0', 10);
          const obj = { val: 0 };
          tl.fromTo(
            el,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.3'
          );
          tl.to(
            obj,
            {
              val: target,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                (el as HTMLElement).textContent = Math.round(obj.val).toString();
              },
            },
            '<'
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <>
      <style>{floatingCircleKeyframes}</style>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 600,
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(/media/hero-uao.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Red gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,5,30,0.85) 0%, rgba(174,0,45,0.9) 40%, rgba(121,16,45,0.95) 100%)',
            zIndex: 1,
          }}
        />

        {/* Floating circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            animation: 'floatCircle1 8s ease-in-out infinite',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            animation: 'floatCircle2 10s ease-in-out infinite',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '40%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            animation: 'floatCircle3 12s ease-in-out infinite',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pb: 16, pt: 12 }}>
          <Box sx={{ textAlign: 'center', mx: 'auto' }}>
            <Typography
              ref={titleRef}
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                mb: 3,
                opacity: 0,
              }}
            >
              Explora el campus
              <br />
              como nunca antes
            </Typography>

            <Typography
              ref={subtitleRef}
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: { xs: '1.1rem', md: '1.35rem' },
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 600, mx: 'auto',
                mb: 5,
                opacity: 0,
              }}
            >
              Recorrido virtual inmersivo con panoramas 360°, identidad sonora
              y mapa interactivo de la Universidad Autónoma de Occidente.
            </Typography>

          </Box>
        </Container>

        {/* Stats bar at bottom */}
        <Box
          ref={statsRef}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            bgcolor: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={{ xs: 4, md: 8 }}
              sx={{ py: 3 }}
            >
              {stats.map((stat) => (
                <Box key={stat.label} sx={{ textAlign: 'center' }}>
                  <Typography
                    className="stat-value"
                    data-value={parseInt(stat.value, 10) || 0}
                    sx={{
                      color: '#FFFFFF',
                      fontSize: { xs: '1.8rem', md: '2.4rem' },
                      fontWeight: 800,
                      lineHeight: 1,
                      opacity: 0,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: '0.8rem', md: '0.95rem' },
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
