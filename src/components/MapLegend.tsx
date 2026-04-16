import { useRef, useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import type { Category } from '../types';
import { categoryLabels, categoryColors } from '../types';

interface MapLegendProps {
  selected: Category | null;
  onSelect: (cat: Category | null) => void;
}

export default function MapLegend({ selected, onSelect }: MapLegendProps) {
  const categories = Object.keys(categoryLabels) as Category[];
  const legendRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
  }, [pos]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, posX: pos.x, posY: pos.y };
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (cx: number, cy: number) => { const parent = legendRef.current?.parentElement; const maxX = parent ? parent.clientWidth - (legendRef.current?.offsetWidth || 160) - 8 : 600; const maxY = parent ? parent.clientHeight - (legendRef.current?.offsetHeight || 200) - 8 : 400;
      const newX = Math.min(maxX, Math.max(8, dragStart.current.posX + (cx - dragStart.current.x))); const newY = Math.min(maxY, Math.max(8, dragStart.current.posY - (cy - dragStart.current.y))); setPos({ x: newX, y: newY });
    };
    const onMM = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTM = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onEnd = () => setDragging(false);
    window.addEventListener('mousemove', onMM);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTM, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => { window.removeEventListener('mousemove', onMM); window.removeEventListener('mouseup', onEnd); window.removeEventListener('touchmove', onTM); window.removeEventListener('touchend', onEnd); };
  }, [dragging]);

  return (
    <Box
      ref={legendRef}
      sx={{
        position: 'absolute',
        bottom: Math.max(8, pos.y),
        left: Math.max(8, pos.x),
        zIndex: 10,
        borderRadius: 3,
        bgcolor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        userSelect: 'none',
        minWidth: 130,
      }}
    >
      <Box
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', gap: 0.5,
          px: 1.5,
          py: 0.8,
          cursor: dragging ? 'grabbing' : 'grab',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <DragIndicatorOutlinedIcon sx={{ fontSize: 14, color: 'rgba(0,0,0,0.25)' }} />
        <Typography variant="overline" sx={{ fontSize: '0.6rem', color: 'text.secondary', textAlign: 'center', width: '100%' }}>
          Filtros
        </Typography>
      </Box>

      <Box sx={{ p: 0.75 }}>
        {[{ key: null as Category | null, label: 'Todas', color: '#9E9E9E' }, ...categories.map(c => ({ key: c as Category | null, label: categoryLabels[c], color: categoryColors[c] }))].map(({ key, label, color }) => (
          <Box
            key={label}
            onClick={() => onSelect(selected === key ? null : key)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              cursor: 'pointer',
              bgcolor: selected === key ? 'rgba(0,0,0,0.06)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              transition: 'background 200ms',
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ fontWeight: selected === key ? 500 : 300, fontSize: '0.7rem', color: '#1B1B1B' }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
