import { useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Divider,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FooterLinkItem {
  label: string;
  action?: 'route' | 'external';
  target?: string;
}

interface FooterSection {
  title: string;
  links: FooterLinkItem[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Proyecto',
    links: [
      { label: 'Acerca del recorrido', action: 'route', target: '/conocenos#acerca-del-recorrido' },
      { label: 'Metodología', action: 'route', target: '/conocenos#metodologia' },
      { label: 'Tecnologías utilizadas', action: 'route', target: '/conocenos#tecnologias' },
      { label: 'Equipo de trabajo', action: 'route', target: '/conocenos#equipo-de-trabajo' },
    ],
  },
  {
    title: 'Licencias',
    links: [
      { label: 'Código: Licencia MIT', action: 'external', target: 'https://opensource.org/licenses/MIT' },
      { label: 'Recursos: Creative Commons (CC BY)', action: 'external', target: 'https://creativecommons.org/licenses/by/4.0/deed.es' },
    ],
  },
  {
    title: 'Créditos',
    links: [
      {
        label: 'Universidad Autónoma de Occidente',
        action: 'route',
        target: '/creditos',
      },
      {
        label: 'Facultad de Ingeniería',
        action: 'route',
        target: '/creditos',
      },
      {
        label: 'Programa de Ingeniería Multimedia',
        action: 'route',
        target: '/creditos',
      },
      {
        label: 'Centro de Innovación TIC',
        action: 'route',
        target: '/creditos',
      },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = useCallback(
    (item: FooterLinkItem) => {
      if (item.action === 'external' && item.target) { window.open(item.target, '_blank', 'noopener'); return; } if (item.action === 'route' && item.target) {
        const [path, hash] = item.target.split('#');
        navigate(path);
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          window.scrollTo(0, 0);
        }
      }
    },
    [navigate]
  );

  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#0A0A0A', pt: { xs: 6, md: 10 }, pb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Campus UAO
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              Recorrido virtual inmersivo de la Universidad Autónoma de
              Occidente. Panoramas 360°, identidad sonora y mapa
              interactivo.
            </Typography>
          </Grid>

          {/* Link columns */}
          {footerSections.map((section) => (
            <Grid key={section.title} size={{ xs: 6, sm: 4, md: 3 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#FFFFFF',
                  mb: 2.5,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((item) => (
                  <Link
                    key={item.label}
                    component={item.action ? 'button' : 'span'}
                    onClick={
                      item.action ? () => handleLinkClick(item) : undefined
                    }
                    underline="none"
                    sx={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.88rem',
                      transition: 'color 0.25s ease',
                      cursor: item.action ? 'pointer' : 'default',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      '&:hover': {
                        color: item.action ? '#FF051E' : 'rgba(255,255,255,0.45)',
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.08)',
            mt: 7,
            mb: 3,
          }}
        />

        {/* Bottom copyright row */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'center' }}
          spacing={1}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.82rem',
            }}
          >
            © {new Date().getFullYear()} Campus UAO. Todos los derechos
            reservados.
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.82rem',
            }}
          >
            Universidad Autónoma de Occidente — Cali, Colombia
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
