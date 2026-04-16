import { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface GalleryViewerProps {
  images: string[];
  videos?: string[];
  alt: string;
}

export default function PhotoViewer({ images, videos = [], alt }: GalleryViewerProps) {
  // Combinar imágenes y videos en una sola galería
  const items: MediaItem[] = [
    ...images.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((src) => ({ type: 'video' as const, src })),
  ];

  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState('ken-burns-1');
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimClass(`ken-burns-${(idx % 3) + 1}`);
  }, []);

  const prev = useCallback(
    () => goTo(current === 0 ? items.length - 1 : current - 1),
    [current, items.length, goTo]
  );
  const next = useCallback(
    () => goTo(current === items.length - 1 ? 0 : current + 1),
    [current, items.length, goTo]
  );

  // Navegación por teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Auto-avance solo si el item actual no es un video
  useEffect(() => {
    if (items[current]?.type === 'video') return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, current, items]);

  // Pausar video cuando se cambia de slide
  useEffect(() => {
    if (videoRef.current && items[current]?.type !== 'video') {
      videoRef.current.pause();
    }
  }, [current, items]);

  if (items.length === 0) {
    return (
      <Box sx={{ width: '100%', height: '100%', bgcolor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        Sin contenido multimedia
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', bgcolor: '#111' }}>
      {/* Renderizar cada item (imagen o video) */}
      {items.map((item, i) => {
        if (item.type === 'video') {
          return (
            <Box
              key={item.src}
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: i === current ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#000',
              }}
            >
              <video
                ref={i === current ? videoRef : undefined}
                src={item.src}
                controls
                playsInline
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          );
        }

        return (
          <Box
            key={item.src}
            component="img"
            src={item.src}
            alt={`${alt} - ${i + 1}`}
            className={i === current ? animClass : ''}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}

      {/* Gradiente inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
          pointerEvents: 'none',
        }}
      />

      {/* Flechas de navegación */}
      {items.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 12,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              zIndex: 2,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton
            onClick={next}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 12,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              zIndex: 2,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </>
      )}

      {/* Miniaturas */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {items.map((item, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              position: 'relative',
              width: 48,
              height: 32,
              borderRadius: 1,
              border: i === current ? '2px solid #FF051E' : '2px solid rgba(255,255,255,0.4)',
              cursor: 'pointer',
              opacity: i === current ? 1 : 0.6,
              transition: 'all 0.3s',
              overflow: 'hidden',
              bgcolor: '#000',
              '&:hover': { opacity: 1 },
            }}
          >
            {item.type === 'image' ? (
              <Box
                component="img"
                src={item.src}
                alt=""
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0,0,0,0.7)',
                }}
              >
                <PlayCircleOutlineRoundedIcon sx={{ color: '#fff', fontSize: 18 }} />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Contador */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: 'rgba(0,0,0,0.5)',
          borderRadius: 2,
          px: 1.5,
          py: 0.3,
          zIndex: 2,
        }}
      >
        <Box component="span" sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 400 }}>
          {current + 1} / {items.length}
        </Box>
      </Box>

      {/* Ken Burns CSS */}
      <style>{`
        .ken-burns-1 { animation: kb1 8s ease-in-out infinite; }
        .ken-burns-2 { animation: kb2 8s ease-in-out infinite; }
        .ken-burns-3 { animation: kb3 8s ease-in-out infinite; }
        @keyframes kb1 { 0% { transform: scale(1) translate(0,0); } 100% { transform: scale(1.08) translate(-1%,-1%); } }
        @keyframes kb2 { 0% { transform: scale(1.05) translate(-1%,0); } 100% { transform: scale(1) translate(1%,-1%); } }
        @keyframes kb3 { 0% { transform: scale(1) translate(1%,1%); } 100% { transform: scale(1.1) translate(-1%,0); } }
        @media (prefers-reduced-motion: reduce) {
          .ken-burns-1, .ken-burns-2, .ken-burns-3 { animation: none; }
        }
      `}</style>
    </Box>
  );
}
