# Design Guidelines: Mahajampur Hafizia Etimkhana Madrasah

## Design Approach
**System-Based Approach**: Clean, content-focused design prioritizing readability and accessibility for an educational institution. Drawing from Material Design principles with adaptations for cultural context and bilingual (Bangla/English) content presentation.

## Core Design Elements

### Typography
**Font Families**:
- Primary (Bangla): Noto Sans Bengali (Google Fonts)
- Secondary (English/Numbers): Inter (Google Fonts)
- Headings: Font weight 600-700
- Body text: Font weight 400
- Size scale: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl

### Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, m-8, gap-6, etc.)
**Container**: max-w-6xl centered with px-4 responsive padding
**Grid patterns**: Single column mobile, 2-3 columns desktop where appropriate

### Component Library

**Navigation**:
- Fixed top navbar with logo (left), navigation links (center), contact button (right)
- Logo height: h-12 to h-16
- Transparent background with backdrop-blur when scrolled
- Mobile: Hamburger menu with slide-in drawer

**Hero Section**:
- Full-width with large background image showing madrasa building/Islamic patterns
- Logo placement: Centered at top of hero (h-24 to h-32)
- Madrasa name: Large heading (text-4xl lg:text-5xl) below logo
- Slogan in Bangla: Medium size (text-xl lg:text-2xl)
- Description: Readable size (text-base lg:text-lg)
- CTA button with backdrop-blur-md background
- Overall hero height: min-h-screen or 80vh

**About/Mission Section**:
- Two-column layout on desktop (text left, supporting element right)
- Icon or decorative element representing education/faith
- Generous padding (py-16 lg:py-24)
- Text in readable blocks with max-w-prose

**Notices Board**:
- Card-based layout in grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Each notice card:
  - Elevated shadow (shadow-md hover:shadow-lg)
  - Rounded corners (rounded-lg)
  - Padding p-6
  - Title (font-semibold text-lg)
  - Date badge (smaller, text-sm)
  - Description (text-base)
  - Border-left accent (border-l-4)

**Contact Section**:
- Split layout: Contact info left, embedded Facebook/map right
- Icons from Heroicons
- Phone clickable with tel: link
- Facebook button with external link
- Location with address details

**Footer**:
- Three-column layout (desktop): About, Quick Links, Contact
- Copyright and established year
- Social media icons (Facebook)
- Mobile: Stacked single column

**Admin Dashboard**:
- Sidebar navigation (fixed left, w-64)
- Main content area with white background
- Form inputs: Outlined style with focus states
- Tables for notices with action buttons
- Success/error toast notifications
- Login page: Centered card (max-w-md) with simple form

### Images

**Required Images**:
1. **Hero Background**: Large, high-quality image of the madrasa building exterior or Islamic geometric patterns. Should be 1920x1080 minimum. Place as full-width background with overlay for text readability.

2. **Logo**: The provided logo image - use in navbar (h-12) and centered in hero section (h-24 lg:h-32).

3. **About Section**: Optional decorative image or illustration of students studying/madrasa activities (if available).

**Image Treatment**:
- Hero image: Apply gradient overlay (from-black/50 to-transparent)
- Buttons on images: Use backdrop-blur-md bg-white/10 with border border-white/20
- All images: object-cover for proper scaling

### Accessibility & UX
- All interactive elements have min 44px touch target
- Form labels clearly associated with inputs
- Skip-to-content link for keyboard navigation
- RTL support consideration for Arabic/Bangla text
- High contrast text ratios
- Loading states for dynamic content
- Error states for failed API calls

### Animations
**Minimal Usage**:
- Smooth scroll behavior
- Hover state transitions (transition-all duration-200)
- Card lift on hover (transform hover:-translate-y-1)
- Modal/drawer slide-in animations
- No parallax or complex scroll effects

### Responsive Breakpoints
- Mobile-first approach
- sm: 640px (tablet)
- md: 768px (small desktop)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)

### Dashboard-Specific Design
- Clean admin interface with clear section headings
- Form fields: Full width on mobile, constrained on desktop (max-w-2xl)
- Edit buttons: Primary action style
- Delete buttons: Destructive style with confirmation
- Data tables: Responsive with horizontal scroll on mobile
- Save changes: Sticky action bar at bottom