INSTALLATION.md -->
# 🔧 INSTALLATION GUIDE

## 📦 Package Contents

Your download includes:

1. **Template Files** - HTML, CSS, JS files
2. **Documentation** - README, LICENSE, INSTALLATION guides
3. **Additional Pages** - About, Services, Contact, Blog pages
4. **Assets** - Images, icons, fonts
5. **Bonus Files** - Sketch file, PSD mockups (premium version)

## 🖥️ Local Installation

### Step 1: Extract Files
```bash
unzip nexa-site-template-v1.0.zip
```

Step 2: Open in Browser

```bash
cd nexa-site-template
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

Step 3: Start Editing

Open the folder in your favorite code editor:

· VS Code
· Sublime Text
· Atom
· WebStorm

🌐 Web Hosting Installation

Option A: Traditional FTP

1. Login to your hosting control panel (cPanel)
2. Navigate to File Manager
3. Upload all files to public_html folder
4. Visit your domain to see the website

Option B: Git Deployment

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repository-url]
git push -u origin master
```

Option C: Drag & Drop (Netlify/Vercel)

1. Go to netlify.com
2. Drag and drop the template folder
3. Get your live URL instantly


🛠️ Development Server

For local development with live reload:

Using Python (Simple)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Visit: http://localhost:8000

Using Node.js with Live Server

```bash
npm install -g live-server
live-server --port=8000
```

Using PHP

```bash
php -S localhost:8000
```

📱 Testing on Mobile Devices

Chrome DevTools

1. Open Chrome DevTools (F12)
2. Click Toggle Device Toolbar (Ctrl+Shift+M)
3. Choose device presets or set custom dimensions

Real Device Testing

1. Ensure devices are on same network
2. Find your computer's IP address
3. Access via: http://[your-ip]:8000

🔧 Build Tools Integration

With NPM/Node.js

```json
// package.json
{
  "scripts": {
    "dev": "live-server --port=3000",
    "build": "npm run minify-css && npm run minify-js",
    "minify-css": "cleancss -o style.min.css style.css",
    "minify-js": "uglifyjs script.js -o script.min.js"
  }
}
```

With Gulp

```javascript
// gulpfile.js
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('minify-css', () => {
  return gulp.src('style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', () => {
  return gulp.src('script.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});