# Escuchando el Campus UAO

Aplicacion web multimedia adaptiva para explorar la identidad sonora y visual de la Universidad Autonoma de Occidente (Cali, Colombia).

**URL:** http://62.171.135.154:3008

## Descripcion

El proyecto permite explorar al menos 7 zonas del campus universitario a traves de:

- Recorridos panoramicos 360 grados interactivos (129 escenas)
- Galeria de fotografias y videos de cada zona
- Audio ambiente grabado in situ
- Mapa 2D interactivo del campus con marcadores
- Mapa 3D del campus (modelo GLB)
- Descripcion de cada espacio

## Tecnologias

- **Frontend:** React 19 + TypeScript + Vite
- **UI:** Material UI (MUI) 7
- **Animaciones:** GSAP + ScrollTrigger
- **Panoramas 360:** krpano 1.19
- **Modelos 3D:** @google/model-viewer
- **Efectos:** react-parallax-tilt, react-zoom-pan-pinch
- **Routing:** React Router DOM
- **Servidor:** Nginx + Node.js + PM2 (Ubuntu 24.04)

## Zonas del campus

| Zona | Recorrido 360 | Galeria | Audio |
|------|:---:|:---:|:---:|
| Zonas Verdes (Lago y Acacias) | Si | Si | Si |
| Cafeteria | Si | Si | Si |
| Sotanos | Si | Si | Si |
| Biblioteca | Si | - | - |
| Plazoleta Central (Plaza Agora) | Si | - | - |
| Canchas Deportivas | Si | - | - |
| Auditorio Quincha | Si | - | - |

## Instalacion

```bash
npm install
npm run dev
```

## Build para produccion

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## Estructura del proyecto

```
src/
  App.tsx                    # Componente principal con rutas
  main.tsx                   # Punto de entrada
  types/index.ts             # Tipos TypeScript
  data/zones.json            # Datos de las zonas del campus
  theme/uaoTheme.ts          # Tema MUI con colores UAO
  components/
    Header.tsx               # Barra de navegacion
    HeroSection.tsx          # Seccion hero con imagen de fondo
    ZoneCards.tsx             # Tarjetas de zonas con filtros
    CampusMap.tsx             # Mapa 2D interactivo
    Map3DViewer.tsx           # Visor del mapa 3D (GLB)
    MapLegend.tsx             # Leyenda del mapa
    ZoneExplorer.tsx          # Explorador de zona (360 + galeria + audio)
    PhotoViewer.tsx           # Galeria de fotos y videos
    AboutSection.tsx          # Seccion sobre el proyecto
    Footer.tsx                # Pie de pagina
  pages/
    ConocenosPage.tsx         # Pagina Conocenos
    CreditosPage.tsx          # Pagina Creditos
public/
  mapa-uao.png               # Plano 2D del campus
  favicon.svg                # Icono de la aplicacion
  media/                     # Archivos multimedia (fotos, videos, audio, modelo 3D)
```

## Equipo de trabajo

- Laura Valentina Henao Torres
- Juan David Munoz Sanchez
- Gabriela Reyes Urbina
- Andrey Daniel Valencia Samboni
- Sebastian Fernandez Gomez

**Materia:** Arquitectura de Sistemas Multimedia
**Programa:** Ingenieria Multimedia
**Facultad:** Ingenieria
**Universidad:** Autonoma de Occidente - Cali, Colombia - 2026

## Licencias

- **Codigo fuente:** [MIT License](LICENSE)
- **Recursos multimedia:** [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.es)

## Creditos

- **Recorridos 360:** Centro de Innovacion TIC (CIT/CIMED) - Universidad Autonoma de Occidente
- **Audio ambiente:** [Freesound.org](https://freesound.org) (Creative Commons)
- **Plano del campus:** CIT - Universidad Autonoma de Occidente
- **Motor de panoramas:** [krpano](https://krpano.com)
