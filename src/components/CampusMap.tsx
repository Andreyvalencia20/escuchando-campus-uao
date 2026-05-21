import { useRef, useState } from 'react';
import { Box, Chip, Stack, Container } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Zone, Category } from '../types';
import { categoryColors } from '../types';

interface CampusMapProps {
  zones: Zone[];
  filter: Category | null;
  onFilterChange: (cat: Category | null) => void;
  onZoneClick: (zone: Zone) => void;
}

const MAP_WIDTH = 3920;
const MAP_HEIGHT = 1612;

const pinBounceKeyframes = `
@keyframes pinBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
`;

export default function CampusMap({
  zones,
  filter: _filter,
  onFilterChange: _onFilterChange,
  onZoneClick,
}: CampusMapProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);

  // Detectar marcadores que comparten posicion (clusters)
  const getClusterKey = (z: Zone) => `${z.mapPosition.x}_${z.mapPosition.y}`;
  const clusterMap = new Map<string, Zone[]>();
  zones.forEach((z) => {
    const key = getClusterKey(z);
    if (!clusterMap.has(key)) clusterMap.set(key, []);
    clusterMap.get(key)!.push(z);
  });

  // Calcular posicion con offset de ramillete
  const getDisplayPosition = (zone: Zone) => {
    const key = getClusterKey(zone);
    const cluster = clusterMap.get(key);
    if (!cluster || cluster.length <= 1) return zone.mapPosition;
    if (expandedCluster !== key) return zone.mapPosition;
    const idx = cluster.indexOf(zone);
    const total = cluster.length;
    const spread = 80;
    const angle = ((idx - (total - 1) / 2) / Math.max(total - 1, 1)) * Math.PI * 0.6 - Math.PI / 2;
    return {
      x: zone.mapPosition.x + Math.cos(angle) * spread,
      y: zone.mapPosition.y + Math.sin(angle) * spread - 30,
    };
  };

  const isInCluster = (zone: Zone) => {
    const key = getClusterKey(zone);
    const cluster = clusterMap.get(key);
    return cluster && cluster.length > 1;
  };

  const filteredZones = zones;

  useGSAP(
    () => {
      gsap.fromTo(
        mapWrapperRef.current,
        { y: 100, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === sectionRef.current) t.kill();
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <style>{pinBounceKeyframes}</style>
      <Box ref={sectionRef} sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          {/* Single category label */}
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Chip
              label="Gimnasio"
              sx={{
                fontWeight: 600,
                fontSize: '0.85rem',
                px: 1,
                py: 2.2,
                borderRadius: '50px',
                bgcolor: '#FF051E',
                color: '#FFFFFF',
              }}
            />
          </Stack>

          {/* 3D perspective map container */}
          <Box
            sx={{
              perspective: '1000px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              ref={mapWrapperRef}
              sx={{
                width: '100%',
                maxWidth: 1100,
                transform: 'rotateX(15deg)',
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                opacity: 0,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'rotateX(5deg)',
                },
              }}
            >
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
              >
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '65vh',
                  }}
                  contentStyle={{ width: '100%' }}
                >
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <svg
                      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      onMouseLeave={() => setExpandedCluster(null)}
                    >
                      <image
                        href="/mapa-uao.png"
                        x="0"
                        y="0"
                        width={MAP_WIDTH}
                        height={MAP_HEIGHT}
                      />

                      {/* Zone markers */}
                      {filteredZones.map((zone) => {
                        const isHovered = hoveredPin === zone.id;
                        const color = categoryColors[zone.category];
                        const pos = getDisplayPosition(zone);

                        return (
                          <g
                            key={zone.id}
                            style={{ cursor: 'pointer', transition: 'all 300ms ease' }}
                            onClick={() => onZoneClick(zone)}
                            onMouseEnter={() => {
                              setHoveredPin(zone.id);
                              if (isInCluster(zone)) setExpandedCluster(getClusterKey(zone));
                            }}
                            onMouseLeave={() => {
                              setHoveredPin(null);
                            }}
                          >
                            {/* Pin shadow */}
                            <ellipse
                              cx={pos.x}
                              cy={pos.y + 28}
                              rx={isHovered ? 18 : 14}
                              ry={isHovered ? 6 : 4}
                              fill="rgba(0,0,0,0.25)"
                              style={{
                                transition: 'all 0.3s ease',
                              }}
                            />

                            {/* Animated pin */}
                            <g
                              style={{
                                animation: isHovered
                                  ? 'pinBounce 0.6s ease-in-out infinite'
                                  : 'none',
                              }}
                            >
                              {/* Outer pulse ring */}
                              {isHovered && (
                                <circle
                                  cx={pos.x}
                                  cy={pos.y}
                                  r={30}
                                  fill="none"
                                  stroke={color}
                                  strokeWidth={2}
                                  opacity={0.4}
                                >
                                  <animate
                                    attributeName="r"
                                    from="20"
                                    to="40"
                                    dur="1s"
                                    repeatCount="indefinite"
                                  />
                                  <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1s"
                                    repeatCount="indefinite"
                                  />
                                </circle>
                              )}

                              {/* Pin circle */}
                              <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={isHovered ? 20 : 16}
                                fill={color}
                                stroke="#FFFFFF"
                                strokeWidth={3}
                                style={{
                                  transition: 'r 0.3s ease',
                                  filter: isHovered
                                    ? `drop-shadow(0 4px 8px ${color}66)`
                                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                }}
                              />

                              {/* Inner dot */}
                              <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={5}
                                fill="#FFFFFF"
                              />
                            </g>

                            {/* Label below pin */}
                            <rect
                              x={pos.x - 70}
                              y={pos.y + 32}
                              width={140}
                              height={28}
                              rx={14}
                              fill="rgba(0,0,0,0.75)"
                            />
                            <text
                              x={pos.x}
                              y={pos.y + 50}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize={13}
                              fontWeight={600}
                              fontFamily="inherit"
                            >
                              {zone.name.length > 18
                                ? zone.name.slice(0, 16) + '...'
                                : zone.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </Box>
                </TransformComponent>
              </TransformWrapper>
            </Box>
          </Box>

          {/* Legend */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          </Box>
        </Container>
      </Box>
    </>
  );
}
