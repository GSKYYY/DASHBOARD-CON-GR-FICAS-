# Financial Insight AI Dashboard

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-Data%20Viz-green)](https://recharts.org/)

## Descripción General

**Financial Insight AI** es un dashboard analítico de alto rendimiento diseñado para ofrecer una experiencia de usuario (UX) premium mediante el uso de "Glassmorphism" y estética neón cyberpunk. A diferencia de los paneles administrativos tradicionales, este proyecto se centra en la visualización de datos inmersiva y la interactividad fluida.

Este proyecto demuestra capacidades de desarrollo Frontend Senior, incluyendo arquitectura modular, renderizado eficiente y manejo de estado complejo para filtrado de datos en tiempo real.

## Características Principales

*   **Arquitectura SPA:** Navegación fluida sin recargas de página utilizando gestión de estado interna.
*   **Visualización de Datos Interactiva:** Gráficos que responden a cambios de contexto temporal (Semana vs Mes) utilizando `recharts`.
*   **Filtrado Avanzado:** Tablas de datos con capacidad de búsqueda en tiempo real y filtrado por estado, optimizado con `useMemo` para evitar re-renderizados costosos.
*   **Diseño Responsivo & Glassmorphism:** Interfaz adaptativa que utiliza capas de transparencia y desenfoque (`backdrop-blur`) para crear profundidad visual.
*   **Componentes Modulares:** Código limpio y separado en vistas (`Dashboard`, `Finanzas`, `Analíticas`) y componentes UI reutilizables (`GlassCard`, `Sidebar`).
*   **Portales de React:** Uso de `createPortal` para manejar menús desplegables y modales que escapan del contexto de apilamiento CSS tradicional.

## Tecnologías y Decisiones de Diseño

### 1. React 19 & TypeScript
Se eligió la última versión de React para aprovechar las mejoras en el renderizado concurrente. TypeScript garantiza la seguridad de tipos en las interfaces de datos financieros (`Transaction`, `RevenueData`), reduciendo errores en tiempo de ejecución.

### 2. Recharts
Elegí **Recharts** sobre librerías como Chart.js por su naturaleza composicional basada en componentes de React. Esto permite:
*   Animaciones de entrada suaves y personalizables.
*   Tooltips completamente personalizados (ver `CustomTooltip` en `RevenueChart.tsx`) que coinciden con el sistema de diseño Glassmorphism.
*   Gradientes SVG definidos directamente en JSX para los efectos de neón en las áreas.

### 3. Tailwind CSS
Para el estilizado, Tailwind permite una iteración rápida y un control granular sobre las opacidades y colores necesarios para el efecto neón/glass.
*   Uso extensivo de `bg-white/5` y `border-white/10` para las tarjetas de vidrio.
*   Sombras personalizadas (`shadow-cyan-500/20`) para simular la luz neón.

### 4. Lucid React
Iconografía ligera y consistente que se escala perfectamente y permite personalización de `strokeWidth` para mantener la elegancia visual.

## Estructura del Proyecto

```
/
├── components/
│   ├── views/          # Vistas principales (Lazy loaded logic)
│   ├── GlassCard.tsx   # Contenedor base con estilos de vidrio
│   ├── Sidebar.tsx     # Navegación lateral
│   ├── ...             # Gráficos y tablas
├── types.ts            # Definiciones de TypeScript
├── App.tsx             # Entry point y Routing lógico
└── ...
```

## Próximos Pasos (Roadmap)
*   Integración con API real (actualmente usa Mock Data).
*   Modo claro (aunque el diseño está optimizado para Dark Mode).
*   Exportación de reportes a PDF real.

---
*Created by KVR - Senior Frontend Engineer*