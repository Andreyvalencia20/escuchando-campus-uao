import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Map3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const viewer = document.createElement('model-viewer');
    viewer.setAttribute('src', '/media/mapauao.glb');
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('auto-rotate', '');
    viewer.setAttribute('auto-rotate-delay', '0');
    viewer.setAttribute('rotation-per-second', '6deg');
    viewer.setAttribute('shadow-intensity', '0.5');
    viewer.setAttribute('exposure', '1.2');
    viewer.setAttribute('environment-image', 'neutral');
    viewer.setAttribute('camera-orbit', '30deg 60deg auto');
    viewer.setAttribute('field-of-view', '45deg');
    viewer.setAttribute('min-field-of-view', '20deg');
    viewer.setAttribute('max-field-of-view', '90deg');
    viewer.setAttribute('interaction-prompt', 'none');
    viewer.setAttribute('loading', 'eager');
    viewer.style.width = '100%';
    viewer.style.height = '100%';
    viewer.style.display = 'block';
    viewer.style.setProperty('--poster-color', 'transparent');

    viewer.addEventListener('load', () => setLoading(false));
    viewer.addEventListener('error', () => setError(true));

    container.appendChild(viewer);

    return () => {
      if (container.contains(viewer)) container.removeChild(viewer);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        minHeight: 400,
        borderRadius: { xs: 0, md: 3 },
        overflow: 'hidden',
        bgcolor: '#e8efe8',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: '100%',
        }}
      />

      {loading && !error && (
        <Box sx={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: 'rgba(232,239,232,0.9)',
        }}>
          <Typography sx={{ color: '#1B1B1B', fontWeight: 500 }}>
            Cargando mapa 3D...
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: 'rgba(232,239,232,0.9)',
        }}>
          <Typography sx={{ color: '#FF051E', fontWeight: 500 }}>
            Error al cargar el modelo 3D
          </Typography>
        </Box>
      )}

      <Box sx={{
        position: 'absolute', bottom: 14, right: 14,
        px: 2, py: 0.6, borderRadius: 50,
        bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
      }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 400 }}>
          Arrastra para rotar &middot; Scroll para zoom
        </Typography>
      </Box>
    </Box>
  );
}
