# Mahajampur Hafizia Etimkhana Madrasah Website

## Overview
A full-stack React + Node.js website for a Bangladeshi Islamic madrasa with a dynamic admin dashboard.

**Location:** Mahajampur, Shamvugonj, Bangladesh  
**Phone:** 01728-825819  
**Facebook:** https://facebook.com/mhem1990

## Project Structure

```
client/                 # React frontend
  src/
    components/        # Reusable UI components
      navbar.tsx       # Navigation with logo
      hero-section.tsx # Hero section with madrasa info
      about-section.tsx # About section
      notices-section.tsx # Notices board
      contact-section.tsx # Contact information
      footer.tsx       # Site footer
      theme-provider.tsx # Dark mode support
      theme-toggle.tsx # Theme toggle button
    pages/
      home.tsx         # Public homepage
      admin/           # Admin dashboard pages
        login.tsx      # Admin login
        dashboard.tsx  # Dashboard layout
        hero-manage.tsx # Hero section editor
        about-manage.tsx # About section editor
        notices-manage.tsx # Notices CRUD
server/                 # Express backend
  routes.ts            # API endpoints
  storage.ts           # Database storage layer
  db.ts                # PostgreSQL connection
shared/
  schema.ts            # Drizzle schema + Zod validation
```

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Shadcn UI, TanStack Query
- **Backend:** Express.js, Drizzle ORM
- **Database:** PostgreSQL
- **Routing:** Wouter

## API Endpoints
- `GET /api/hero` - Get hero section data
- `POST /api/hero` - Update hero section
- `GET /api/about` - Get about section data
- `POST /api/about` - Update about section
- `GET /api/notices` - Get all notices
- `POST /api/notices` - Create a notice
- `PUT /api/notices/:id` - Update a notice
- `DELETE /api/notices/:id` - Delete a notice

## Admin Access
- **URL:** /admin
- **Username:** admin
- **Password:** admin123

## Design
- Islamic-themed teal/green color scheme matching the logo
- Bangla (Bengali) typography with Noto Sans Bengali font
- Dark mode support
- Responsive design

## Recent Changes
- December 2024: Initial implementation with PostgreSQL database
