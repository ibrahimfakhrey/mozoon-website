# Mozoon - Facilities Management Website

A modern, responsive website for Mozoon facilities management company featuring:

## Features
- **Responsive Design**: Works perfectly on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**:
  - Random services gallery with sequential display
  - Smooth scrolling navigation
  - Animated counters and progress bars
  - Contact form with validation
- **Performance Optimized**: Fast loading with lazy image loading
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Bilingual Experience**: Full English and Arabic site variants with a persistent language preference toggle

## Pages
- **Home**: Hero section with company overview (`index.html`, `index-ar.html`)
- **Services**: Comprehensive services with interactive image gallery (`services.html`, `services-ar.html`)
- **About**: Company information and team details (`about.html`, `about-ar.html`)
- **Clients**: Client testimonials and partnerships (`clients.html`, `clients-ar.html`)
- **Contact**: Contact form and location information (`contact.html`, `contact-ar.html`)

## Technologies Used
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- Google Fonts (Inter, Poppins, Tajawal)

## Deployment Options

### 1. GitHub Pages (Recommended)
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Your site will be deployed instantly with a custom URL

### 3. Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your project from GitHub or upload directly
3. Deploy with one click

## File Structure
```
├── index.html           # English homepage
├── index-ar.html        # Arabic homepage (RTL)
├── services.html        # English services page with image gallery
├── services-ar.html     # Arabic services page with image gallery
├── about.html           # English about page
├── about-ar.html        # Arabic about page
├── clients.html         # English clients page
├── clients-ar.html      # Arabic clients page
├── contact.html         # English contact page
├── contact-ar.html      # Arabic contact page
├── styles.css           # Main stylesheet with RTL support
├── script.js            # JavaScript functionality and language preference manager
├── services/            # Service images (1.jpg - 12.jpg)
└── *.jpg                # Other images and assets
```

## Local Development
To run locally:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
