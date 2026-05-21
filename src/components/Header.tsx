import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Button,
} from '@mui/material';
import { FitnessCenterOutlined, Menu, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const scrollNavLinks = [
  { label: 'Áreas', section: 'zones' },
  { label: 'Mapa', section: 'map' },
  { label: 'Proyecto', section: 'about' },
];

const pageNavLinks = [
  { label: 'Conócenos', path: '/conocenos' },
  { label: 'Créditos', path: '/creditos' },
];

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollNav = useCallback(
    (section: string) => {
      setMobileOpen(false);
      if (isHome) {
        onNavigate(section);
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(
            `[data-section="${section}"]`
          );
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            onNavigate(section);
          }
        }, 300);
      }
    },
    [isHome, onNavigate, navigate]
  );

  const handlePageNav = useCallback(
    (path: string) => {
      setMobileOpen(false);
      navigate(path);
    },
    [navigate]
  );

  const handleLogoClick = useCallback(() => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [isHome, navigate]);

  const textColor = scrolled || !isHome ? '#1B1B1B' : '#FFFFFF';

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor:
            scrolled || !isHome
              ? 'rgba(255,255,255,0.92)'
              : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(16px)' : 'none',
          borderBottom:
            scrolled || !isHome
              ? '1px solid rgba(0,0,0,0.06)'
              : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: 72 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#FF051E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FitnessCenterOutlined sx={{ color: '#FFFFFF', fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: textColor,
                  transition: 'color 0.4s ease',
                  letterSpacing: '-0.02em',
                }}
              >
                Deporte UAO
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {scrollNavLinks.map((link) => (
                <Button
                  key={link.section}
                  onClick={() => handleScrollNav(link.section)}
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    px: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor:
                        scrolled || !isHome
                          ? 'rgba(255,5,30,0.06)'
                          : 'rgba(255,255,255,0.12)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {pageNavLinks.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => handlePageNav(link.path)}
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    px: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor:
                        scrolled || !isHome
                          ? 'rgba(255,5,30,0.06)'
                          : 'rgba(255,255,255,0.12)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: textColor,
                transition: 'color 0.4s ease',
              }}
            >
              <Menu sx={{ fontSize: 28 }} />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          bgcolor: '#FF051E',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#FFFFFF',
          }}
        >
          <Close sx={{ fontSize: 32 }} />
        </IconButton>

        <Stack spacing={3} alignItems="center">
          {scrollNavLinks.map((link) => (
            <Button
              key={link.section}
              onClick={() => handleScrollNav(link.section)}
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '2rem',
                textTransform: 'none',
                letterSpacing: '-0.02em',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              {link.label}
            </Button>
          ))}


          {pageNavLinks.map((link) => (
            <Button
              key={link.path}
              onClick={() => handlePageNav(link.path)}
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '2rem',
                textTransform: 'none',
                letterSpacing: '-0.02em',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </>
  );
}
