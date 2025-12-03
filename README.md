# 🚀 Aniruddha Jadhav - Portfolio Website

A modern, fully responsive portfolio website with an admin panel built with HTML, CSS, JavaScript, and featuring animations using Animate.css and Tailwind CSS.

## 📋 Features

### 🎯 Main Website
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Powered by Animate.css and custom CSS animations
- **Multiple Sections**:
  - Home/Hero Section with call-to-action buttons
  - About Me with skills showcase
  - Resume with education, experience, and certifications
  - Projects Portfolio with filtering capabilities
  - Contact Form with localStorage integration
  - Social Media Links

### 🔐 Admin Panel
- **Secure Login** - Admin authentication with demo credentials
- **Dashboard** - Overview of website statistics
- **Message Management** - View and delete contact form messages
- **Project Management** - Add/edit projects
- **Skills Management** - Add technical skills with proficiency levels
- **Experience Management** - Manage work experience
- **Settings** - Update personal information and password

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: 
  - Custom CSS with CSS Grid and Flexbox
  - Tailwind CSS utilities
  - Animate.css for animations
- **Storage**: localStorage for data persistence
- **Icons**: Font Awesome 6.4.0

## 📁 Project Structure

```
PORTFOLIO/
├── index.html                 # Main portfolio page
├── css/
│   └── style.css             # Main stylesheet with animations
├── js/
│   └── script.js             # Main JavaScript functionality
├── admin/
│   ├── login.html            # Admin login page
│   ├── dashboard.html        # Admin dashboard
│   └── admin.css             # Admin styling (if separate)
└── assets/
    └── (profile images, CV, etc.)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality

### Installation

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd PORTFOLIO
   ```

2. **Open in Browser**
   - Simply double-click `index.html` to open in your default browser
   - Or right-click and select "Open with" to choose a specific browser

3. **Access Admin Panel**
   - Click "Admin" button in navigation
   - Use demo credentials:
     - **Username**: admin
     - **Password**: admin123

## 💡 Usage

### For Visitors
1. Navigate through different sections using the navbar
2. View projects and skills
3. Use the contact form to send messages
4. Access social media profiles via footer links

### For Admin
1. Login with admin credentials
2. View dashboard statistics
3. Manage messages, projects, skills, and experience
4. Update personal information in settings

## 🎨 Customization

### Update Personal Information
Edit `index.html` to replace:
- Name and title
- About me section
- Skills and proficiencies
- Projects and descriptions
- Contact information
- Social media links

### Modify Colors
Edit `css/style.css` - Update CSS variables:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... other colors ... */
}
```

### Add Your Photo
1. Place your photo in the `assets/` folder
2. Update the image paths in `index.html`

### Update Social Links
In `index.html`, modify the social media URLs:
```html
<a href="https://github.com/yourprofile" target="_blank">GitHub</a>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔒 Admin Panel Security

**Note**: This is a demo implementation using localStorage. For production:
- Implement backend authentication
- Use secure password hashing
- Add database for persistent storage
- Implement HTTPS
- Add rate limiting

## 📧 Contact Form

Messages are stored in browser's localStorage. To implement email functionality:
1. Set up a backend service (Node.js, Python, etc.)
2. Configure email service (SendGrid, Nodemailer, etc.)
3. Update the form submission handler in `js/script.js`

## 🌐 Deployment

### GitHub Pages
1. Push repository to GitHub
2. Enable GitHub Pages in repository settings
3. Access at `https://yourusername.github.io/portfolio`

### Netlify
1. Connect your GitHub repository
2. Deploy with one click
3. Access your live site

### Traditional Hosting
1. Upload files to your web server
2. Ensure proper file structure
3. Access via your domain

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ✨ Features Highlight

### Animations
- Scroll reveal animations on page load
- Hover effects on buttons and cards
- Smooth transitions throughout
- Floating elements and parallax effects

### Performance
- Lightweight CSS and JavaScript
- No external dependencies except CDN
- Fast load times
- Optimized animations

### SEO
- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Mobile-friendly design

## 🐛 Troubleshooting

### Admin panel not loading
- Check browser console for errors
- Ensure localStorage is enabled
- Clear browser cache and try again

### Animations not showing
- Verify Animate.css CDN is loading
- Check CSS is properly linked
- Try different browser

### Contact form not working
- Check browser console for errors
- Verify localStorage quota not exceeded
- Ensure JavaScript is enabled

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements.

## 📧 Contact

For questions or suggestions, reach out via:
- Email: aniruddha.jadhav@nii.ac.in
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Credits

- **Animate.css** - For amazing animations
- **Font Awesome** - For icons
- **Google Fonts** - For typography

---

**Made with ❤️ by Aniruddha Jadhav**

Last Updated: December 2024
