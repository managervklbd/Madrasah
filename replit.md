# মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা Website

## Overview
A full-stack React + Node.js website for a Bangladeshi Islamic madrasa (Quran learning center) with a dynamic admin dashboard.

**Location:** Mohojompur, Mymensingh Sadar, Mymensingh, Bangladesh  
**Phone:** 01883-525652  
**Email:** mohojompureatimkhana1990@gmail.com  
**Facebook:** https://www.facebook.com/kamheatimkhanamadrasah

## Project Structure

```
client/                 # React frontend
  src/
    components/        # Reusable UI components
      navbar.tsx       # Navigation with logo
      hero-section.tsx # Hero section with madrasa info
      about-section.tsx # About section
      donation-section.tsx # Donation appeal with contact number
      gallery-section.tsx # Dynamic photo gallery with lightbox
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
        branding-manage.tsx # Site name & logo settings
        gallery-manage.tsx # Photo gallery CRUD
        hero-slides-manage.tsx # Hero carousel slides CRUD
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
- `GET /api/branding` - Get site branding (name, logo URL)
- `POST /api/branding` - Update site branding (protected)
- `GET /api/hero` - Get hero section data
- `POST /api/hero` - Update hero section (protected)
- `GET /api/hero-slides` - Get all hero carousel slides
- `POST /api/hero-slides` - Create a hero slide (protected)
- `PUT /api/hero-slides/:id` - Update a hero slide (protected)
- `DELETE /api/hero-slides/:id` - Delete a hero slide (protected)
- `GET /api/about` - Get about section data
- `POST /api/about` - Update about section (protected)
- `GET /api/notices` - Get all notices
- `POST /api/notices` - Create a notice (protected)
- `PUT /api/notices/:id` - Update a notice (protected)
- `DELETE /api/notices/:id` - Delete a notice (protected)
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add gallery image (protected)
- `PUT /api/gallery/:id` - Update gallery image (protected)
- `DELETE /api/gallery/:id` - Delete gallery image (protected)
- `POST /api/uploads/request-url` - Get presigned URL for file upload (protected)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

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
- December 2024: Added file upload support using Replit Object Storage (presigned URL flow)
- December 2024: Added hero carousel with multiple slides (images and videos), auto-play with navigation controls
- December 2024: Gallery now supports both images and videos with lightbox playback
- December 2024: Gallery items can be marked as "featured" to display first
- December 2024: Added hero slides admin page for carousel management (/admin - হিরো স্লাইড)
- December 2024: Added donation section with contact number (01883-525652) for zakat, sadaqah, and fitra
- December 2024: Added dynamic photo gallery with lightbox and admin management
- December 2024: Updated contact info (phone, email, Facebook, address)
- December 2024: Added branding management (logo & site name) to admin dashboard
- December 2024: Added server-side session authentication for security
- December 2024: Initial implementation with PostgreSQL database

## File Upload (Cloudinary)
- Uses Cloudinary for image and video uploads
- Environment variables required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- Upload endpoint: POST /api/upload (multipart form data)
- Files stored in 'madrasa' folder on Cloudinary

## Database Tables
- branding: Site name and logo URL
- hero_settings: Hero section text content
- hero_slides: Carousel slides with mediaUrl, mediaType, sortOrder
- about_settings: About section content
- notices: Announcements with title, description, date
- gallery_images: Gallery with title, imageUrl, caption, mediaType, isFeatured
