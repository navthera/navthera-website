# Navthera — Advanced Physiotherapy & Rehabilitation Centre Website

Navthera is a premium, responsive website for Jaipur's advanced physiotherapy and rehabilitation centre. Built with clean HTML, CSS, and vanilla JavaScript, it showcases services like Aquatherapy, neuro rehabilitation, cryotherapy, shockwave therapy, and more.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started (Local Development)](#getting-started-local-development)
- [How the Website Works](#how-the-website-works)
- [Deployment](#deployment)
- [Custom Domain Setup](#custom-domain-setup)
- [Performance & SEO](#performance--seo)

---

## Overview

**Navthera** is a fully responsive, SEO-optimized static website showcasing:
- Premium physiotherapy services
- Advanced rehabilitation equipment
- Specialized treatments (Aquatherapy, Neuro Rehab, Cryotherapy, etc.)
- Contact and inquiry system
- Professional branding with custom color palette

**Key Features:**
- 📱 Mobile-first responsive design
- 🎨 Premium custom branding (Navy, Teal, Cyan, Gold colors)
- ⚡ Fast static site (no backend required)
- 🔍 SEO optimized with meta tags and structured data
- 📧 Contact form integration ready
- ♿ Accessible HTML markup

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (vanilla) |
| **Fonts** | Google Fonts (Playfair Display, Inter, Cormorant Garamond) |
| **Images** | Static PNG/JPG assets in `/assets` folder |
| **Server** | Node.js with `serve` CLI |
| **Deployment** | Vercel (recommended), Netlify, or any static host |
| **Build** | No build step required (static site) |

---

## Project Structure

```
navthera-website/
├── index.html           # Homepage
├── about.html           # About us page
├── services.html        # Services overview
├── aquatherapy.html     # Aquatherapy service detail
├── contact.html         # Contact & inquiry form
├── package.json         # NPM metadata
├── vercel.json          # Vercel deployment config
├── .gitignore           # Git ignore rules
└── assets/              # Images and static files
    ├── Sports-equip.png
    ├── neuro-equipment.jpg
    └── Pelvic health and incontinence equipment.png
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v16+) installed on your system
- Git (to clone/manage the repository)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Kabir1618/navthera-website.git
cd navthera-website
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs the `serve` package used to run the local development server.

### Step 3: Start Local Server
```bash
npm start
# or
npm run dev
# or
npx serve .
```

The website will be available at **`http://localhost:3000`**

### Step 4: Edit & Develop
- All HTML files are in the root directory
- Styles are **inline** in each HTML file's `<style>` tag
- Add new assets to the `assets/` folder
- Changes reload automatically in the browser

---

## How the Website Works

### Page Architecture
Each page is a **standalone HTML file** with:
1. **HTML Markup** — Semantic structure with proper meta tags
2. **Inline CSS** — All styles embedded in `<style>` tag (no external CSS files)
3. **JavaScript** — Minimal vanilla JS for interactivity (navigation, modals, etc.)

### Navigation Flow
```
index.html (Homepage)
├── About Us → about.html
├── Services → services.html
│   └── Aquatherapy Detail → aquatherapy.html
├── Contact → contact.html
└── All pages → return to index
```

### Key Components

**Header/Navigation**
- Sticky navigation bar visible on all pages
- Logo and menu links to all sections
- Mobile hamburger menu on small screens

**Hero Section**
- Large, eye-catching banner with brand colors
- Call-to-action buttons for services and contact

**Service Cards**
- Showcase therapy types with icons/images
- Responsive grid layout (1 column on mobile, 3 on desktop)

**Contact Form**
- Collects inquiry information
- Ready for backend integration (currently static)

**Footer**
- Address, phone, email, hours
- Social media links
- Quick navigation

### Responsive Design
- **Mobile (< 768px):** Single-column layout, hamburger menu
- **Tablet (768px - 1024px):** Two-column layouts
- **Desktop (> 1024px):** Full multi-column layouts with advanced styling

---

## Deployment

### Option 1: Vercel (Recommended)

Vercel is the fastest, easiest option for static site deployment.

#### 1. Connect GitHub Repository
1. Sign up at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository (`navthera-website`)
4. Vercel auto-detects it's a static site

#### 2. Configure Project
- **Framework:** `Other`
- **Build Command:** (leave empty — no build needed)
- **Output Directory:** `.` (root)
- **Install Command:** `npm install` (optional)

#### 3. Deploy
- Click "Deploy"
- Your site is live at `https://navthera-website-{random}.vercel.app`

**No configuration needed** — `vercel.json` is already set up with:
- URL rewrites for clean routing
- Cache headers for assets
- Clean URLs (no `.html` extensions)

#### Example Vercel Deployment
```
Deploy Preview: https://navthera-website-git-main-kabir1618.vercel.app
Production: https://navthera-website.vercel.app (after domain setup)
```

---

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect GitHub repo
3. **Build settings:**
   - Build Command: (leave empty)
   - Publish Directory: `.` (root)
4. Deploy

---

### Option 3: Any Static Host (AWS S3, GitHub Pages, etc.)
Since this is a static site, you can deploy anywhere that serves static files:
- **AWS S3** + CloudFront
- **GitHub Pages**
- **Firebase Hosting**
- **DigitalOcean Static Site Hosting**

**Deployment:** Simply upload all files to the host.

---

## Custom Domain Setup

### Step 1: Purchase a Domain
Buy a domain from:
- GoDaddy
- Namecheap
- Google Domains
- Or any registrar

**Recommended:** `navthera.com` or `navthera.in` (for India audience)

### Step 2: Vercel Custom Domain (Recommended Path)

#### On Vercel Dashboard:
1. Go to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter your custom domain (e.g., `navthera.com`)
4. Choose DNS configuration method:

**Option A: Vercel Nameservers (Easiest)**
- Vercel provides 4 nameservers
- Log into your domain registrar
- Replace nameservers with Vercel's
- Wait 24-48 hours for DNS propagation
- Vercel auto-manages SSL certificate

**Option B: CNAME (If registrar doesn't allow nameserver change)**
- Vercel gives you a CNAME target
- Add CNAME record in domain registrar:
  ```
  CNAME: navthera.com → cname.vercel-dns.com
  ```
- Wait for DNS propagation

#### Example: Setup with Namecheap
1. Buy domain at Namecheap
2. Copy 4 Vercel nameservers from Vercel dashboard
3. In Namecheap → Domain Settings → Nameservers → "Custom DNS"
4. Paste Vercel nameservers
5. Click checkmark ✓
6. Vercel automatically provisions SSL (HTTPS)
7. Your site is live at `https://navthera.com`

### Step 3: Verify & Optimize

After domain setup (24-48 hrs):

```bash
# Check DNS propagation
nslookup navthera.com

# Verify HTTPS
curl -I https://navthera.com
# Should return: HTTP/2 200
```

### Step 4: Redirect `www` subdomain (Optional)

In Vercel dashboard, under **Domains**:
- Add `www.navthera.com`
- Set as redirect to `navthera.com`
- Vercel handles the redirect automatically

---

## SSL Certificate & HTTPS

✅ **Automatic** with Vercel:
- Free SSL certificate (Let's Encrypt)
- Auto-renewal
- HTTPS enabled by default
- Redirects HTTP → HTTPS

No manual configuration needed!

---

## Environment Variables (If Needed Later)

If you add backend features (contact form API, etc.):

1. Create `.env` file (don't commit to Git)
2. Add variables:
   ```
   REACT_APP_API_URL=https://api.example.com
   CONTACT_EMAIL=admin@navthera.com
   ```
3. In Vercel → **Settings** → **Environment Variables** → add the same

---

## Performance & SEO

### Current Optimizations ✅
- **Inline CSS:** No render-blocking requests
- **Static assets:** Cached aggressively (`max-age=31536000`)
- **Meta tags:** Title, description, Open Graph tags
- **Mobile-friendly:** Responsive, touch-optimized
- **Fast:** Pure HTML/CSS/JS (no framework overhead)

### Core Web Vitals (Expected)
- **LCP (Largest Contentful Paint):** < 1.5s ✅
- **FID (First Input Delay):** < 100ms ✅
- **CLS (Cumulative Layout Shift):** < 0.1 ✅

### SEO Checklist
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Meta descriptions on all pages
- [x] Open Graph tags (social sharing)
- [x] Mobile-responsive design
- [x] Fast load time
- [ ] Add structured data (schema.org) for local business
- [ ] Add sitemap.xml
- [ ] Add robots.txt

#### Add Structured Data (Optional)
Create `schema.json` embedded in each page:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Navthera",
  "image": "https://navthera.com/assets/logo.png",
  "description": "Advanced physiotherapy centre in Jaipur",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "...",
    "addressCountry": "India"
  },
  "telephone": "+91-XXXXXXXXXX",
  "url": "https://navthera.com"
}
</script>
```

---

## Maintenance & Updates

### Adding New Pages
1. Create `new-page.html` in root
2. Copy header/footer from existing page
3. Update navigation links on all pages to include the new page
4. Test locally: `npm start`
5. Commit and push to GitHub
6. Vercel auto-deploys!

### Updating Content
1. Edit `.html` files directly
2. No build step required
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update services section"
   git push origin main
   ```
4. Vercel redeploys automatically

### Monitoring Performance
- **Vercel Analytics:** Project → Analytics tab
- **Google Search Console:** Monitor indexing and search visibility
- **Google PageSpeed Insights:** Check performance metrics

---

## Contact & Support

For questions or updates:
- **Website:** https://navthera.com
- **GitHub:** https://github.com/Kabir1618/navthera-website
- **Contact Form:** Available on the website

---

## License

This project is private and proprietary to Navthera Physiotherapy & Rehabilitation Centre.

---

**Last Updated:** February 28, 2026
**Status:** Production Ready ✅
