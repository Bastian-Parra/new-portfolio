# Portfolio Full-Stack Setup Guide

Este portfolio ahora es una aplicación full-stack que te permite gestionar proyectos, posts y experiencia de forma dinámica usando Supabase como backend.

## 🚀 Configuración Inicial

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Guarda las credenciales:
   - `Project URL`
   - `anon/public key`
   - `service_role key` (para operaciones administrativas)

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
PUBLIC_SUPABASE_URL=tu_url_de_supabase
PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 3. Ejecutar Migraciones de Base de Datos

Hay dos formas de aplicar el esquema de base de datos:

#### Opción A: Usando Supabase Dashboard (Recomendado)

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor**
3. Copia el contenido de `supabase/migrations/001_initial_schema.sql`
4. Pégalo en el editor y ejecuta

#### Opción B: Usando Supabase CLI

```bash
# Instalar Supabase CLI
npm install -g supabase

# Inicializar Supabase en el proyecto
supabase init

# Vincular con tu proyecto
supabase link --project-ref tu-project-ref

# Aplicar migraciones
supabase db push
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

## 📊 Estructura de Base de Datos

El proyecto incluye 4 tablas principales:

### `projects`
- Gestiona tus proyectos de portfolio
- Campos: título, descripción, imágenes, URLs, tecnologías, featured
- Soporta orden personalizado

### `posts`
- Blog posts con soporte para Markdown
- Campos: título, slug, contenido, tags, estado de publicación
- Generación automática de slugs

### `experience`
- Historial laboral y experiencia profesional
- Campos: empresa, posición, fechas, ubicación, tecnologías
- Soporte para posiciones actuales

### `tech_stack`
- Tecnologías que manejas
- Campos: nombre, icono, categoría, visibilidad
- Integrado con astro-icon

## 🎨 Panel de Administración

Accede al panel de administración en: `http://localhost:4321/admin`

### Funcionalidades:

#### **Projects Manager**
- ✅ Crear, editar y eliminar proyectos
- ✅ Marcar proyectos como destacados
- ✅ Agregar imágenes, demos y enlaces a GitHub
- ✅ Ordenar proyectos

#### **Posts Manager**
- ✅ Crear y editar posts de blog
- ✅ Soporte para Markdown
- ✅ Sistema de tags
- ✅ Publicar/despublicar posts
- ✅ Generación automática de slugs

#### **Experience Manager**
- ✅ Agregar experiencia laboral
- ✅ Marcar posiciones actuales
- ✅ Agregar tecnologías utilizadas
- ✅ Ordenar por fecha

#### **Tech Stack Manager**
- ✅ Gestionar tecnologías
- ✅ Configurar iconos (astro-icon)
- ✅ Categorizar tecnologías
- ✅ Mostrar/ocultar tecnologías

## 🔐 Autenticación (Próximamente)

Actualmente el panel de administración es público. Para producción, deberás:

1. Configurar Supabase Auth
2. Agregar protección de rutas en `/admin`
3. Implementar login/logout

### Implementación Rápida de Auth:

```typescript
// src/middleware.ts
import { supabase } from './lib/supabase';

export async function onRequest({ request, redirect }, next) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return redirect('/login');
    }
  }
  
  return next();
}
```

## 📝 Uso de Componentes

### Mostrar Proyectos

```astro
---
import Projects from '../components/Projects.astro';
---

<Projects />
```

### Mostrar Experiencia

```astro
---
import Experience from '../components/Experience.astro';
---

<Experience />
```

### Tech Stack (Ya integrado)

El componente `TechStack` ahora obtiene datos dinámicamente de Supabase.

## 🔧 API Endpoints

El proyecto expone los siguientes endpoints JSON:

- `GET /api/projects.json` - Lista todos los proyectos
- `GET /api/posts.json` - Lista posts publicados
- `GET /api/experience.json` - Lista experiencia laboral
- `GET /api/tech-stack.json` - Lista tecnologías visibles

## 🎯 Próximos Pasos

1. **Configurar Autenticación**: Proteger el panel de administración
2. **Agregar Páginas de Blog**: Crear páginas individuales para posts
3. **Subir Imágenes**: Integrar Supabase Storage para subir imágenes
4. **SEO**: Agregar meta tags dinámicos
5. **Analytics**: Integrar Google Analytics o similar

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Astro](https://docs.astro.build)
- [Astro Icon](https://www.astroicon.dev/)

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo

### Error de TypeScript en TechStack.astro
- Los errores de tipo se resolverán una vez que la base de datos esté configurada
- Son advertencias de TypeScript que no afectan la funcionalidad

### No se muestran datos
- Verifica que las migraciones se ejecutaron correctamente
- Agrega datos de prueba desde el panel de administración
- Revisa la consola del navegador para errores
