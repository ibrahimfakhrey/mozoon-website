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

## Pages
- **Home**: Hero section with company overview
- **Services**: Comprehensive services with interactive image gallery
- **About**: Company information and team details
- **Clients**: Client testimonials and partnerships
- **Contact**: Contact form and location information

## Technologies Used
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- Google Fonts (Inter & Poppins)

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
├── index.html          # Homepage
├── services.html       # Services page with image gallery
├── about.html          # About page
├── clients.html        # Clients page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── services/           # Service images (1.jpg - 12.jpg)
└── *.jpg              # Other images and assets
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