# UNO MÁS UNO — versión consolidada

## 1. Instalar dependencias

```cmd
npm i
```

## 2. Ejecutar UNA sola migración en Supabase

Abrir **SQL Editor** y ejecutar:

`supabase/FINAL_20260924.sql`

> Si Supabase avisa que alguna policy ya existe, eliminá solo esa policy duplicada o ignorá esa sentencia y continuá. Las columnas se agregan con `IF NOT EXISTS`.

## 3. Usuario del CRM

En Supabase > Authentication > Users, crear (o usar) un usuario con email y contraseña.

Luego ingresar en:

`http://localhost:3000/admin/login`

## 4. Ejecutar

```cmd
npm run dev
```

## Qué quedó consolidado

- Hero del home con todos los proyectos que tengan hero/portada, crossfade suave y autoplay.
- Grilla estable: 4 desktop / 3 laptop / 2 tablet / 1 mobile.
- Croquis con zoom hover + corazón + contador existente.
- Menú mobile real con hamburguesa, overlay y cierre al navegar.
- Detalle de proyecto separado correctamente: título > hero > texto > galería propia > otros proyectos.
- Filtrado de assets globales y croquis ajenos en galerías (especialmente CASA MM).
- Flechas laterales anterior/siguiente con preview al hover.
- Menciones / Academia con layout original alternado.
- Nosotros con logo negro, textos, fotos y columnas alineadas.
- Footer con logo y contactos; los teléfonos abren WhatsApp.
- CRM funcional: proyectos, croquis, hero, galería, publicaciones, Academia, Nosotros, noticias y configuración.
- Recomendaciones de tamaño visibles al cargar imágenes.

## Tamaños recomendados en CRM

- Hero: 2400 × 1400 px o superior, horizontal.
- Croquis: 1400 × 1000 px, PNG/JPG, blanco o transparente.
- Galería: mínimo 1600 px en el lado mayor.
- Retratos Nosotros: 1200 × 1200 px.
- Editorial Menciones/Academia: 1600 px o superior.

## Antes de Vercel

Ejecutar:

```cmd
npm run build
```

Si compila, subir a GitHub/Vercel y configurar las mismas tres variables de `.env.local`.
