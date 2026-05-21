import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Fade from '@mui/material/Fade';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ThreeSixtyOutlinedIcon from '@mui/icons-material/ThreeSixtyOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { Zone } from '../types';
import { categoryLabels, categoryColors } from '../types';
import PhotoViewer from './PhotoViewer';

interface ZoneExplorerProps {
  zone: Zone;
  onClose: () => void;
}

export default function ZoneExplorer({ zone, onClose }: ZoneExplorerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [viewTab, setViewTab] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setViewTab(0);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  }, [zone.id]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play();
    setPlaying(!playing);
  };

  const fmt = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`;
  const color = categoryColors[zone.category];
  const hasGallery = !zone.hideGallery && ((zone.images && zone.images.length > 0) || (zone.videos && zone.videos.length > 0));
  const hasAudio = zone.audio && zone.audio.length > 0;
  const tour360Url = `${zone.tourBaseUrl || '/uao-360/'}?startscene=${zone.panoScene}&v=3`;

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          bgcolor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top bar - glassmorphism */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: { xs: 1.5, md: 3 },
            py: 1,
            bgcolor: 'rgba(10,10,10,0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              transition: 'all 200ms',
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <PlaceOutlinedIcon sx={{ color, fontSize: 18 }} />
          <Typography variant="body1" sx={{ color: '#fff', fontWeight: 400, flex: 1, fontSize: '0.95rem' }}>
            {zone.name}
          </Typography>
          <Chip
            label={categoryLabels[zone.category]}
            size="small"
            sx={{
              bgcolor: `${color}20`,
              color,
              border: `1px solid ${color}40`,
              fontWeight: 400,
              fontSize: '0.68rem',
              height: 26,
            }}
          />
        </Box>

        {/* Tab switcher - solo mostrar si hay galeria */}
        {hasGallery && (
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <Tabs
            value={viewTab}
            onChange={(_, v) => setViewTab(v)}
            centered
            sx={{
              minHeight: 38,
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.4)',
                minHeight: 38,
                py: 0.5,
                fontSize: '0.78rem',
                fontWeight: 300,
                gap: 0.5,
                transition: 'color 200ms',
              },
              '& .Mui-selected': { color: '#fff', fontWeight: 400 },
              '& .MuiTabs-indicator': { bgcolor: color, height: 2 },
            }}
          >
            <Tab icon={<ThreeSixtyOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="Recorrido 360°" />
            <Tab icon={<PhotoLibraryOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="Galería" />
          </Tabs>
        </Box>
        )}

        {/* Main content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
          {/* Viewer */}
          <Box sx={{ flex: 1, position: 'relative', minHeight: isMobile ? '42vh' : 'auto' }}>
            {(!hasGallery || viewTab === 0) ? (
              <iframe
                src={tour360Url}
                title={`Recorrido 360 - ${zone.name}`}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                allowFullScreen
              />
            ) : (
              <PhotoViewer images={zone.images} videos={zone.videos} alt={zone.name} />
            )}
          </Box>

          {/* Info panel */}
          <Box
            sx={{
              width: isMobile ? '100%' : 380,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#111111',
              borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderTop: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
              flexShrink: 0,
            }}
          >
            {/* Description */}
            <Box sx={{ flex: 1, p: { xs: 2.5, md: 3.5 }, overflow: 'auto' }}>
              <Typography variant="overline" sx={{ color, fontSize: '0.6rem' }}>
                {categoryLabels[zone.category]}
              </Typography>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 300, mt: 0.5, mb: 2.5, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                {zone.name}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.9rem' }}>
                {zone.description}
              </Typography>
            </Box>

            {/* Audio player - solo mostrar si hay audio */}
            {hasAudio && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(255,255,255,0.03)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <audio
                ref={audioRef}
                src={zone.audio}
                preload="metadata"
                onTimeUpdate={() => { if (audioRef.current) setProgress(audioRef.current.currentTime); }}
                onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
                onEnded={() => setPlaying(false)}
                onError={() => setPlaying(false)}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                <GraphicEqOutlinedIcon sx={{ color: `${color}80`, fontSize: 15 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, fontSize: '0.68rem' }}>
                  {zone.audioDescription}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={togglePlay}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: color,
                    color: '#fff',
                    '&:hover': { bgcolor: color, filter: 'brightness(1.15)' },
                    transition: 'filter 200ms',
                  }}
                >
                  {playing ? <PauseRoundedIcon sx={{ fontSize: 16 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />}
                </IconButton>

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', minWidth: 30, textAlign: 'center', fontSize: '0.68rem' }}>
                  {fmt(progress)}
                </Typography>

                <Slider
                  size="small"
                  value={progress}
                  max={duration || 1}
                  onChange={(_, v) => { if (audioRef.current) { audioRef.current.currentTime = v as number; setProgress(v as number); } }}
                  sx={{
                    flex: 1,
                    color,
                    '& .MuiSlider-thumb': { width: 10, height: 10 },
                    '& .MuiSlider-track': { opacity: 0.8 },
                    '& .MuiSlider-rail': { opacity: 0.15 },
                  }}
                />

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', minWidth: 30, textAlign: 'center', fontSize: '0.68rem' }}>
                  {fmt(duration)}
                </Typography>

                <IconButton
                  onClick={() => { setMuted(!muted); if (audioRef.current) audioRef.current.muted = !muted; }}
                  sx={{ color: 'rgba(255,255,255,0.3)', p: 0.5 }}
                >
                  {muted ? <VolumeOffOutlinedIcon sx={{ fontSize: 16 }} /> : <VolumeUpOutlinedIcon sx={{ fontSize: 16 }} />}
                </IconButton>

                <Slider
                  size="small"
                  value={muted ? 0 : volume}
                  max={1}
                  step={0.05}
                  onChange={(_, v) => { setVolume(v as number); if (audioRef.current) audioRef.current.volume = v as number; if ((v as number) > 0) setMuted(false); }}
                  sx={{ width: 44, color: 'rgba(255,255,255,0.25)', '& .MuiSlider-thumb': { width: 8, height: 8 } }}
                />
              </Box>
            </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
