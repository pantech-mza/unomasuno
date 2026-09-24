# Implementación por etapas

## 1. Clon visual
La estructura pública ya replica:
- Header blanco minimalista
- Navegación Proyectos / Menciones / Academia / Nosotros
- Hero grande con etiqueta de proyecto
- Grilla de proyectos
- Detalle con título, hero, texto y galería
- Menciones / Academia en composición editorial
- Nosotros y equipo
- Footer oscuro

## 2. Responsive
Breakpoints incluidos:
- Desktop > 980 px
- Tablet <= 980 px
- Mobile <= 620 px

## 3. Supabase
Usar `supabase/schema.sql`.

## 4. Admin
Rutas base:
- /admin
- /admin/proyectos
- /admin/proyectos/nuevo
- /admin/noticias
- /admin/configuracion
- /admin/login

## 5. Próxima conexión
Reemplazar mock-data por consultas Supabase y activar:
- Auth
- CRUD
- Upload Storage
- Ordenamiento
- Publicado/Borrador
- Edición de contacto y textos
