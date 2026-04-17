import type { BlockProperties } from 'grapesjs';

export const generalBlocks: BlockProperties[] = [
  // Layout Blocks
  {
    id: '1-column',
    label: '1 Column',
    content: '<div style="width:100%; border:1px solid #ccc; padding:10px; text-align:center;" data-gjs-droppable="true">1 Column</div>',
    category: 'Layout'
  },
  {
    id: '2-column',
    label: '2 Columns',
    content: '<div style="display:flex; gap:10px;"><div style="flex:1; border:1px solid #ccc; padding:10px;">Column 1</div><div style="flex:1; border:1px solid #ccc; padding:10px;">Column 2</div></div>',
    category: 'Layout'
  },
  {
    id: '3-column',
    label: '3 Columns',
    content: '<div style="display:flex; gap:10px;" data-gjs-droppable="true"><div style="flex:1; border:1px solid #ccc; padding:10px;" data-gjs-droppable="true">Column 1</div><div style="flex:1; border:1px solid #ccc; padding:10px;" data-gjs-droppable="true">Column 2</div><div style="flex:1; border:1px solid #ccc; padding:10px;" data-gjs-droppable="true">Column 3</div></div>',
    category: 'Layout'
  },
  {
    id: 'section',
    label: 'Section',
    content: '<section style="padding:20px; border:2px dashed #999; text-align:center;" data-gjs-droppable="true">Section</section>',
    category: 'Layout'
  },
  {
    id: 'divider',
    label: 'Divider',
    content: '<hr style="border:none; border-top:2px solid #ccc; margin:20px 0;">',
    category: 'Layout'
  },
  {
    id: 'container',
    label: 'Container',
    content: '<div style="max-width:1200px; margin:0 auto; padding:20px; border:1px solid #ddd;" data-gjs-droppable="true">Container</div>',
    category: 'Layout'
  },
  {
    id: 'row',
    label: 'Row',
    content: '<div style="display:flex; gap:10px; border:1px dashed #aaa; padding:10px;" data-gjs-droppable="true">Row</div>',
    category: 'Layout'
  },
  {
    id: '2-row',
    label: '2 Row',
    content: `
    <div style="display:flex; flex-direction:column; gap:10px;" data-gjs-type="row">
      <div style="border:1px solid #ccc; padding:10px;" data-gjs-droppable="true">Row 1</div>
      <div style="border:1px solid #ccc; padding:10px;" data-gjs-droppable="true">Row 2</div>
    </div>
  `,
    category: 'Layout'
  }
  ,
  { id: 'h1', label: '<h1>H1</h1>', content: '<h1>Heading 1</h1>', category: 'Typography' },
  { id: 'h2', label: '<h2>H2</h2>', content: '<h2>Heading 2</h2>', category: 'Typography' },
  { id: 'h3', label: '<h3>H3</h3>', content: '<h3>Heading 3</h3>', category: 'Typography' },
  { id: 'h4', label: '<h4>H4</h4>', content: '<h4>Heading 4</h4>', category: 'Typography' },
  { id: 'h5', label: '<h5>H5</h5>', content: '<h5>Heading 5</h5>', category: 'Typography' },
  { id: 'h6', label: '<h6>H6</h6>', content: '<h6>Heading 6</h6>', category: 'Typography' },
  {
    id: 'link',
    label: 'Link',
    content: '<a href="#" data-gjs-droppable="true">Edit Me 3</a>',
    category: 'Typography',
  },
  { id: 'link-box', label: 'Link Box', content: '<div class="link-box" data-gjs-droppable="true"><a href="#" data-gjs-droppable="true">Link Box</a></div>', category: 'Typography' },

  // Media
  { id: 'image', label: 'Image', content: '<img src="https://via.placeholder.com/150" alt="Image"/>', category: 'Media' },
  { id: 'video', label: 'Video', content: '<video src="https://via.placeholder.com/150" controls></video>', category: 'Media' },
  { id: 'map', label: 'Map', content: '<iframe src="https://maps.google.com/?output=embed" frameborder="0"></iframe>', category: 'Media' },


  // Forms
  { id: 'form', label: 'Form', content: '<form><input type="text" placeholder="Text"/><button>Submit</button></form>', category: 'Forms' },
  { id: 'input', label: 'Input', content: '<input type="text" placeholder="Text">', category: 'Forms' },
  { id: 'textarea', label: 'Textarea', content: '<textarea placeholder="Textarea"></textarea>', category: 'Forms' },
  { id: 'select', label: 'Select', content: '<select><option>Option 1</option><option>Option 2</option></select>', category: 'Forms' },
  { id: 'button', label: 'Button', content: '<button class="button">Button</button>', category: 'Forms' },
  { id: 'checkbox', label: 'Checkbox', content: '<input type="checkbox"> Checkbox', category: 'Forms' },
  { id: 'radio', label: 'Radio', content: '<input type="radio"> Radio', category: 'Forms' },
  { id: 'label', label: 'Label', content: '<label>Label</label>', category: 'Forms' },
  // single row social media
  {
    id: 'social-media',
    label: `
    <div style="display:flex; gap:6px; justify-content:center; font-size:14px; color:#444;">
      Facebook
    </div>
  `,
    content: `
    <div class="social-media" style="display:flex; gap:12px; justify-content:center; font-size:20px;">
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
      <a href="#">Instagram</a>
    </div>
  `,
    category: 'Social Media',
  },

  // social media pack (with more spacing)
  {
    id: 'social-media-pack',
    label: `
    <div style="display:flex; gap:8px; justify-content:center; font-size:14px; color:#444;">
      <i class="fab fa-facebook"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
    </div>
  `,
    content: `
    <div class="social-media-pack" style="display:flex; gap:20px; justify-content:center; font-size:22px;">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
      <a href="#"><i class="fab fa-linkedin"></i></a>
      <a href="#"><i class="fa-brands fa-youtube"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
  `,
    category: 'Social Media',
  },

];

export const headerBlocks: BlockProperties[] = [
  {
    id: 'Bajirao',
    label: `    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Bajirao Library Header (Double stack)          
    </div>`,
    category: 'Bajirao Library Header',
    content: `
        <header class="main-header fixed-top transition-all">
        <!-- Top Bar (Header 1) -->
        <div class="top-bar d-none d-lg-block">
            <div class="container d-flex justify-content-between align-items-center">
                <div class="contact-info">
                    <span class="me-4"><a href="tel:+919525298482" class="text-white text-decoration-none"><i
                                class="fas fa-phone-alt"></i> +91 9525298482</a></span>
                    <span><a href="mailto:bajiraosir1993@gmail.com" class="text-white text-decoration-none"><i
                                class="fas fa-envelope"></i> bajiraosir1993@gmail.com</a></span>
                </div>
                <div class="social-links">
                    <a href="#" class="text-white me-3"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-white me-3"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/919525298482" target="_blank" class="text-white"><i
                            class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>

        <!-- Main Navbar (Header 2) -->
        <nav id="main-nav" class="navbar navbar-expand-lg transition-all">
            <div class="container">
                <a class="navbar-brand serif fw-bold" href="#home">
                    <img src="images/logo.png" alt="Bajirao Library Logo" class="navbar-logo">
                    <span class="d-none d-md-inline text-nowrap"><span class="text-gold">B</span>AJIRAO <span
                            class="text-gold">L</span>IBRARY</span>
                </a>
                <button class="navbar-toggler border-0 bg-gold" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto text-uppercase small fw-bold tracking-wider">
                        <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#facilities">Facilities</a></li>
                        <li class="nav-item"><a class="nav-link" href="#pricing">Plans</a></li>
                        <li class="nav-item"><a class="nav-link" href="#testimonials">Voices</a></li>
                        <li class="nav-item"><a class="nav-link btn-gold-outline ms-lg-3 px-4"
                                href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    `
  },
  {
    id: 'Readers Library Header',
    label: `            
    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Readers Library Header           
    </div>`,
    content: `        <header
            class="top-header d-none d-md-flex  justify-content-between align-items-center px-4 bg-danger">
            <div class="contact-info d-flex align-items-center">

                <!-- Phone Link -->
                <i class="fa fa-phone-alt me-2 text-light"></i>
                <a href="tel:+919334339046"
                    class="text-light text-decoration-none me-3">
                    +91 9334339046
                </a>

                <!-- Email Link -->
                <i class="fa fa-envelope mx-2 text-light"></i>
                <a href="mailto:info@readersrejoice.com"
                    class="text-light text-decoration-none">
                    info@readersrejoice.com
                </a>

            </div>

            <div class="social-links d-flex align-items-center">
                <a href="#" class="me-3"><i
                        class="fab fa-facebook-f text-light"></i></a>
                <a href="#" class="me-3"><i
                        class="fab fa-twitter text-light"></i></a>
                <a href="#" class="me-3"><i
                        class="fab fa-instagram text-light"></i></a>
                <a href="#"><i
                        class="fab fa-linkedin-in text-light hover:text-success"></i></a>
            </div>
        </header>`,
    category: 'Readers Library Navbar'
  },
  {
    id: 'Readers Library NAVBAR',
    label: `            
    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Readers Library navbar          
    </div>`,
    content: `        <nav id="navbar" class="bg-light">
            <div class="nav-container">
                <div class="logo d-flex align-items-center">
                    <img
                        src="https://edgeadmin.teqtoeducation.com/uploads/Screenshot_2026_01_24_142644_0b74380d73.png"
                        alt="Logo"
                        style="height: 60px;">
                    <h1 class="d-none d-md-block">Reader's Rejoice</h1>
                </div>

                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#portfolio">Our Facilities</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>

                <div class="mobile-menu-toggle" id="mobileMenuToggle">
                    <div class="hamburger"></div>
                    <div class="hamburger"></div>
                    <div class="hamburger"></div>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobileMenu">
            <ul class="mobile-nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#portfolio">Our Facilities</a></li>
                <li><a href="#contact">Contact Us</a></li>
            </ul>
        </div>`,
    category: 'Readers Library Navbar'
  },
  {
    id: 'gallery-preview-navbar',
    label: `
    <div style="padding:10px;border:1px solid #ddd;border-radius:4px;text-align:center;">
      Gallery Preview Navbar
    </div>
  `,
    category: 'Readers Library Navbar',
    content: `
    <nav class="bg-dark py-3">
      <div class="container d-flex align-items-center justify-content-between">

        <div class="text-white fw-semibold">
          Gallery Preview
        </div>

        <div class="text-center flex-grow-1">
          <img 
            src="/images/img1.JPG"
            alt="Logo"
            style="height:60px; cursor:pointer;"
            data-gjs-editable="true"
            data-gjs-resizable="true"
            data-gjs-removable="true"
          >
        </div>

<div class="text-center "><a href="index.html" class="btn btn-secondary">Back To Home</a></div>

      </div>
    </nav>
  `
  },
  {
    id: 'Library Header',
    label: `            
    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Library Top Navbar           
    </div>`,
    content: `<div class="top-info-bar">
  <div class="container-fluid px-5">
    <div class="row align-items-center">

      <!-- LEFT -->
      <div class="col-lg-6 d-flex gap-4">
        <div class="info-item">
          <span class="icon-wrap"><i class="fa-solid fa-location-dot"></i></span>
          <span>123 Street, New York, USA</span>
        </div>
        <div class="info-item">
          <span class="icon-wrap"><i class="fa-regular fa-clock"></i></span>
          <span>Mon - Fri : 09.00 AM - 09.00 PM</span>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="col-lg-6 d-flex justify-content-end align-items-center gap-4">
        <div class="info-item">
          <span class="icon-wrap"><i class="fa-solid fa-phone"></i></span>
          <span>+012 345 6789</span>
        </div>

        <div class="social-wrap">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
    category: 'Readers Library Header'
  },
  {
    id: 'Library Navbar',
    label: `  
    <style>
.top-info-bar {
  background: #f5f5f5;
  font-size: 14px;
  padding: 8px 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.icon-wrap {
  width: 26px;
  height: 26px;
  background: #dc3545;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
}

.social-wrap a {
  width: 28px;
  height: 28px;
  background: #fff;
  color: #dc3545;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  margin-left: 6px;
  text-decoration: none;
}

.main-navbar {
  height: 80px;
}

.logo-icon {
  font-size: 34px;
  color: #dc3545;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  color: #dc3545;
}

.nav-link {
  font-weight: 600;
  font-size: 15px;
  color: #111 !important;
}

.nav-link.active {
  color: #dc3545 !important;
}

.quote-btn {
  background: #dc3545;
  color: #fff;
  padding: 22px 40px;
  font-weight: 700;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
          
    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Library Navbar           
    </div>`,
    content: `    <div class="container-fluid sticky-top">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light border-bottom border-2 border-white">
                <a href="index.html" class="navbar-brand">
                    <h1>iSTUDIO</h1>
                </a>
                <button type="button" class="navbar-toggler ms-auto me-0" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <a href="index.html" class="nav-item nav-link active">Home</a>
                        <a href="about.html" class="nav-item nav-link">About</a>
                        <a href="service.html" class="nav-item nav-link">Services</a>
                        <a href="project.html" class="nav-item nav-link">Projects</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu bg-light mt-2">
                                <a href="feature.html" class="dropdown-item">Features</a>
                                <a href="team.html" class="dropdown-item">Our Team</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
  `,
    category: 'Library Navbar'
  },
  {
    id: 'Dance class',
    label: `            
    <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
            Dance Class Navbar           
    </div>`,
    content: `
           
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
       


       
        <div class="container-fluid bg-secondary px-5 d-none d-lg-block">
            <div class="row gx-0 align-items-center" style="height: 45px;">
                <div class="col-lg-8 text-center text-lg-start mb-lg-0">
                    <div class="d-flex flex-wrap">
                        <a href="#" class="text-light me-4"><i class="fas fa-map-marker-alt text-primary me-2"></i>Find A Location</a>
                        <a href="#" class="text-light me-4"><i class="fas fa-phone-alt text-primary me-2"></i>+01234567890</a>
                        <a href="#" class="text-light me-0"><i class="fas fa-envelope text-primary me-2"></i>Example@gmail.com</a>
                    </div>
                </div>
                <div class="col-lg-4 text-center text-lg-end">
                    <div class="d-flex justify-content-end">
                        <div class="border-end border-start py-1">
                            <a href="#" class="btn text-primary"><i class="fab fa-facebook-f"></i></a>
                        </div>
                        <div class="border-end py-1">
                            <a href="#" class="btn text-primary"><i class="fab fa-twitter"></i></a>
                        </div>
                        <div class="border-end py-1">
                            <a href="#" class="btn text-primary"><i class="fab fa-instagram"></i></a>
                        </div>
                        <div class="border-end py-1">
                            <a href="#" class="btn text-primary"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       


        
        <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">
                <a href="#" class="navbar-brand p-0">
                    <h1 class="text-primary m-0"><i class="fas fa-biohazard me-3"></i>JustDance</h1>
                    <!-- <img src="img/logo.png" alt="Logo"> -->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="index.html" class="nav-item nav-link active">Home</a>
                        <a href="about.html" class="nav-item nav-link">About</a>
                        <a href="event.html" class="nav-item nav-link">Events</a>
                        <a href="blog.html" class="nav-item nav-link">Blogs</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <a href="classes.html" class="dropdown-item">Our classes</a>
                                <a href="training.html" class="dropdown-item">Dance Training</a>
                                <a href="team.html" class="dropdown-item">Our Team</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="gallery.html" class="dropdown-item">Dance Gallery</a>
                                <a href="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact Us</a>
                    </div>
                    <a href="#" class="btn btn-primary rounded-pill text-white py-2 px-4 flex-wrap flex-sm-shrink-0">Register Now</a>
                </div>
            </nav>
        </div>
       
  `,
    category: 'Zay Navbar'
  },
  // 2 - Logo + Links
  {
    id: 'nav-logo',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              With Logo
            </div>
  `,
    content: `
      <nav style="display:flex; align-items:center; background:#fff; border-bottom:1px solid #eee; padding:10px 20px;">
        <img src="https://via.placeholder.com/50" style="border-radius:50%; transition:transform 0.3s;" />
        <ul style="display:flex; gap:20px; margin-left:20px; list-style:none;">
          <li><a href="#" style="text-decoration:none; color:#333;">Home</a></li>
          <li><a href="#" style="text-decoration:none; color:#333;">Shop</a></li>
          <li><a href="#" style="text-decoration:none; color:#333;">Blog</a></li>
        </ul>
      </nav>
      <style>
        nav img:hover { transform: rotate(10deg) scale(1.1); }
        nav ul li a:hover { color: #FF5733; }
      </style>
    `,
    category: 'Navigation'
  },

  // 3 - Underline Hover
  {
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Hover Underline
            </div>
  `,
    content: `
      <nav style="background:#fff; padding:15px; border-bottom:1px solid #eee;">
        <ul style="display:flex; justify-content:center; gap:25px; list-style:none; margin:0; padding:0;">
          <li><a href="#" style="position:relative; text-decoration:none; color:#333; padding-bottom:4px;">Home</a></li>
          <li><a href="#" style="position:relative; text-decoration:none; color:#333; padding-bottom:4px;">Portfolio</a></li>
          <li><a href="#" style="position:relative; text-decoration:none; color:#333; padding-bottom:4px;">Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #007BFF;
          transition: width 0.3s;
        }
        nav ul li a:hover::after {
          width: 100%;
        }
      </style>
    `,
    category: 'Navigation'
  },

  // 4 - Gradient Background
  {
    id: 'nav-gradient',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Gradient BG nav
            </div>
    `,
    content: `
      <nav style="background:linear-gradient(45deg,#6a11cb,#2575fc); padding:15px;">
        <ul style="display:flex; justify-content:center; gap:25px; list-style:none; margin:0; padding:0; color:white;">
          <li><a href="#" style="text-decoration:none; color:white;">Home</a></li>
          <li><a href="#" style="text-decoration:none; color:white;">Services</a></li>
          <li><a href="#" style="text-decoration:none; color:white;">About</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { color: #FFD700; }
      </style>
    `,
    category: 'Navigation'
  },


  {
    id: 'nav-bea',
    category: 'Navigation',
    label: 'Header Navigation',
    content: `<header id="header" x-data="header" x-ref="header" class="top-0 z-50 relative lg:sticky" data-root="/en" data-path="/en">
<div id="page-top-items-cb2ddc94-9595-4c9e-8391-658c9b84e9dd" class="relative z-20 bg-white md:block" aria-hidden="false">
<div class="container static z-50 px-5 py-2 md:px-0">
<div class="flex flex-row items-center justify-end p-0 my-0 ml-0 topLinks" aria-hidden="false">
<div class="relative flex gap-3">
<a id="topLink-1e7c2d86-9ea1-49cf-88de-405f539bd875" href="/en/contact-us" class="topLink text-sm block cursor-pointer hover:text-primary focus:text-primary text-secondary-300 pr-3 relative">
Contact us
</a>
</div>
<div id="region-selector" class="ml-1 z-60 w-44" x-data="dropdown" @keydown.escape.prevent.stop="close($refs.button)" @focusin.window="!$refs.panel.contains($event.target) &amp;&amp; close()">
<button class="inline-flex items-center justify-between w-full py-1 pl-3 pr-2 bg-white" type="button" x-ref="button" @click="toggle()" :aria-expanded="open" aria-controls="dropdown-button-cb2ddc94-9595-4c9e-8391-658c9b84e9dd" aria-expanded="false">
<span class="inline-block py-1 text-sm font-semibold font-baeBold">Global site</span>
<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-secondary shrink-0">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.62785 2.38181C7.46512 2.20606 7.20132 2.20606 7.03861 2.38181L3.99994 5.66358L0.961272 2.38181C0.79855 2.20606 0.534749 2.20606 0.372038 2.38181C0.209326 2.55755 0.209315 2.84245 0.372038 3.01818L3.70538 6.61819C3.7835 6.70257 3.88949 6.75 4 6.75C4.11051 6.75 4.21649 6.70256 4.29462 6.61819L7.62796 3.01818C7.79068 2.84244 7.79068 2.55753 7.62796 2.38181L7.62785 2.38181Z" fill="inherit"></path>
</svg>
</button>
<div x-ref="panel" x-show="open" x-transition.origin.top.left="" @click.outside="close($refs.button)" id="dropdown-button-cb2ddc94-9595-4c9e-8391-658c9b84e9dd" style="display: none;" class="absolute left-0 right-0 mt-2 overflow-hidden bg-white shadow-md">
<div class="relative px-5 md:container">
<div class="grid grid-cols-12 py-10 gap-7 ">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block z-[99]" title="Close" type="button" x-ref="button" @click.prevent="close($refs.button)">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-secondary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="region__col relative md:col-span-2 col-span-full">
<div id="region-links-48f1eb43-32a4-4387-b707-c93268a5059b" class="region-links flex flex-col md:gap-2 gap-5 w-full py-2 md:py-0 border-b border-white md:border-none border-solid">
<h3>
<span class="region-title font-baeBold tracking-widest text-sm uppercase tracking-widest flex flex-row flex-nowrap items-center justify-between mb-4">Global</span>
</h3>
<a class="region-link font-baeNormal" href="/en/">Global site</a>
</div>
</div>
<div class="region__col relative md:col-span-2 col-span-full">
<div id="region-links-3791dd2a-fa12-4735-9827-6d93f10e5c02" class="region-links flex flex-col md:gap-2 gap-5 w-full py-2 md:py-0 border-b border-white md:border-none border-solid">
<h3>
<span class="region-title font-baeBold tracking-widest text-sm uppercase tracking-widest flex flex-row flex-nowrap items-center justify-between mb-4">Americas</span>
</h3>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-us/">United States</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-br/">Brazil</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-ca/">Canada</a>
</div>
</div>
<div class="region__col relative md:col-span-2 col-span-full">
<div id="region-links-3841639d-9ec5-415f-9fd5-723c8f9a28c7" class="region-links flex flex-col md:gap-2 gap-5 w-full py-2 md:py-0 border-b border-white md:border-none border-solid">
<h3>
<span class="region-title font-baeBold tracking-widest text-sm uppercase tracking-widest flex flex-row flex-nowrap items-center justify-between mb-4">Europe</span>
</h3>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-uk/">United Kingdom</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-pl/">Poland</a>
</div>
</div>
<div class="region__col relative md:col-span-2 col-span-full">
<div id="region-links-313a3e8b-ca0e-4c58-94d4-59993615b1d1" class="region-links flex flex-col md:gap-2 gap-5 w-full py-2 md:py-0 border-b border-white md:border-none border-solid">
<h3>
<span class="region-title font-baeBold tracking-widest text-sm uppercase tracking-widest flex flex-row flex-nowrap items-center justify-between mb-4">Middle East</span>
</h3>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-sa/">Saudi Arabia</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/ar-sa/">المملكة العربية السعودية</a>
</div>
</div>
<div class="region__col relative md:col-span-2 col-span-full">
<div id="region-links-871069bb-497b-4840-9ab1-8ac6bd2f4894" class="region-links flex flex-col md:gap-2 gap-5 w-full py-2 md:py-0 border-b border-white md:border-none border-solid">
<h3>
<span class="region-title font-baeBold tracking-widest text-sm uppercase tracking-widest flex flex-row flex-nowrap items-center justify-between mb-4">Asia Pacific</span>
</h3>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-aus/">Australia</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/en-jp/">Japan</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/ja-jp/">日本</a>
<a class="region-link font-baeNormal" href="https://www.baesystems.com/ko-kr/">대한민국</a>
</div>
</div>
<div class="region__col relative md:col-span-2 col-span-full"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div id="page-navigation" data-module="pageNavigation" aria-hidden="false" class="relative z-10 w-full border-b bg-white border-grey">
<div class="container static">
<div role="navigation" class="flex flex-row">
<a href="/en/" class="logo">
<img src="/.resources/bae-systems-theme/img/logo-red.svg" alt="" width="155" height="24" title="BAE Systems" loading="lazy" class="w-40 h-full py-4 md:py-0">
</a>
<div class="hidden md:flex flex-nowrap ">
<ul class="hidden px-4 -mb-px md:flex flex-nowrap ">
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f">
<span class="navigation-link-text">Who we are</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-company" class="navigation-link-lv1">Our company</a>
</div><div class="header-menu-links-lv1">
<a href="/en/our-company/our-strategy" class="navigation-link-lv1">Our strategy</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-businesses" class="navigation-link-lv1">Our businesses</a>
</div><div class="header-menu-links-lv1">
<a href="/en/leadership" class="navigation-link-lv1">Our leadership</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://heritage.baesystems.com/" class="navigation-link-lv1">Our history</a>
</div><div class="header-menu-links-lv1">
<a href="/en/locations" class="navigation-link-lv1">Our locations</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554">
<span class="navigation-link-text">What we do</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/air" class="navigation-link-lv1">Air</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/land" class="navigation-link-lv1">Land</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/sea" class="navigation-link-lv1">Sea</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/space" class="navigation-link-lv1">Space</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/cyber" class="navigation-link-lv1">Cyber</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/battlespace-integration" class="navigation-link-lv1">Battlespace Integration</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/digital-and-data-services" class="navigation-link-lv1">Digital and data services</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/electronics" class="navigation-link-lv1">Electronics</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/innovation" class="navigation-link-lv1">Innovation</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/operational-support" class="navigation-link-lv1">Operational support</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/weapon-systems" class="navigation-link-lv1">Weapon systems</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/all-capabilities" class="navigation-link-lv1">All capabilities</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2">
<span class="navigation-link-text">Newsroom</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom" class="navigation-link-lv1">Newsroom home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/newsroom/news-releases" class="navigation-link-lv1">News releases</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/stories" class="navigation-link-lv1">Stories</a>
</div><div class="header-menu-links-lv1">
<a href="/en/insights" class="navigation-link-lv1">Insights</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/events" class="navigation-link-lv1">Events</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/regulatory-news" class="navigation-link-lv1">Regulatory news</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom/global-media-contacts" class="navigation-link-lv1">Contacts</a>
</div></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd">
<span class="navigation-link-text">Sustainability</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability" class="navigation-link-lv1">Sustainability home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/people-and-culture" class="navigation-link-lv1">Our people and culture</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/supporting-our-communities" class="navigation-link-lv1">Supporting our communities</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/climate-and-environment" class="navigation-link-lv1">Climate and environment</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/responsible-business" class="navigation-link-lv1">Responsible business</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/sustainability-reporting" class="navigation-link-lv1">Sustainability reporting</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0">
<span class="navigation-link-text">Investors</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/" class="navigation-link-lv1">Investors home</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/why-invest-in-bae-systems" class="navigation-link-lv1">Why invest in BAE Systems?</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-centre" class="navigation-link-lv1">2025 half year results</a>
</div><div class="header-menu-links-lv1">
<a href="https://annualreport.baesystems.com/" class="navigation-link-lv1">2024 annual report</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/capital-markets-days" class="navigation-link-lv1">Investor events</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/financial-calendar" class="navigation-link-lv1">Financial calendar</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-reports-events-archive" class="navigation-link-lv1">Results, reports &amp; events archive</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2">
<span class="navigation-link-text">Careers</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Australia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Canada</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Malaysia</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Poland</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Qatar</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Saudi Arabia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Singapore</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">United Kingdom</a>
</div><div class="header-menu-links-lv1">
<a rel="nofollow" target="_blank" href="https://jobs.baesystems.com/" class="navigation-link-lv1">United States</a>
</div></div>
</div>
</div>
</div> </li>
</ul>
<ul x-ref="submenu" class="menu-level1 md:hidden">
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f">
<span class="navigation-link-text">Who we are</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-company" class="navigation-link-lv1">Our company</a>
</div><div class="header-menu-links-lv1">
<a href="/en/our-company/our-strategy" class="navigation-link-lv1">Our strategy</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-businesses" class="navigation-link-lv1">Our businesses</a>
</div><div class="header-menu-links-lv1">
<a href="/en/leadership" class="navigation-link-lv1">Our leadership</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://heritage.baesystems.com/" class="navigation-link-lv1">Our history</a>
</div><div class="header-menu-links-lv1">
<a href="/en/locations" class="navigation-link-lv1">Our locations</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554">
<span class="navigation-link-text">What we do</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/air" class="navigation-link-lv1">Air</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/land" class="navigation-link-lv1">Land</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/sea" class="navigation-link-lv1">Sea</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/space" class="navigation-link-lv1">Space</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/cyber" class="navigation-link-lv1">Cyber</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/battlespace-integration" class="navigation-link-lv1">Battlespace Integration</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/digital-and-data-services" class="navigation-link-lv1">Digital and data services</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/electronics" class="navigation-link-lv1">Electronics</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/innovation" class="navigation-link-lv1">Innovation</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/operational-support" class="navigation-link-lv1">Operational support</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/weapon-systems" class="navigation-link-lv1">Weapon systems</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/all-capabilities" class="navigation-link-lv1">All capabilities</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2">
<span class="navigation-link-text">Newsroom</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom" class="navigation-link-lv1">Newsroom home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/newsroom/news-releases" class="navigation-link-lv1">News releases</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/stories" class="navigation-link-lv1">Stories</a>
</div><div class="header-menu-links-lv1">
<a href="/en/insights" class="navigation-link-lv1">Insights</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/events" class="navigation-link-lv1">Events</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/regulatory-news" class="navigation-link-lv1">Regulatory news</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom/global-media-contacts" class="navigation-link-lv1">Contacts</a>
</div></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd">
<span class="navigation-link-text">Sustainability</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability" class="navigation-link-lv1">Sustainability home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/people-and-culture" class="navigation-link-lv1">Our people and culture</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/supporting-our-communities" class="navigation-link-lv1">Supporting our communities</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/climate-and-environment" class="navigation-link-lv1">Climate and environment</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/responsible-business" class="navigation-link-lv1">Responsible business</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/sustainability-reporting" class="navigation-link-lv1">Sustainability reporting</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0">
<span class="navigation-link-text">Investors</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/" class="navigation-link-lv1">Investors home</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/why-invest-in-bae-systems" class="navigation-link-lv1">Why invest in BAE Systems?</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-centre" class="navigation-link-lv1">2025 half year results</a>
</div><div class="header-menu-links-lv1">
<a href="https://annualreport.baesystems.com/" class="navigation-link-lv1">2024 annual report</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/capital-markets-days" class="navigation-link-lv1">Investor events</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/financial-calendar" class="navigation-link-lv1">Financial calendar</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-reports-events-archive" class="navigation-link-lv1">Results, reports &amp; events archive</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2">
<span class="navigation-link-text">Careers</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Australia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Canada</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Malaysia</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Poland</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Qatar</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Saudi Arabia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Singapore</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">United Kingdom</a>
</div><div class="header-menu-links-lv1">
<a rel="nofollow" target="_blank" href="https://jobs.baesystems.com/" class="navigation-link-lv1">United States</a>
</div></div>
</div>
</div>
</div> </li>
</ul>
</div>
<div class="flex flex-nowrap -mr-5">
<div class="w-8 pr-2 h-17" x-data="search" x-bind="bindSearch">
<button class="relative flex flex-row items-center justify-center block w-full h-full -outline-offset-2" aria-label="Open search area" x-ref="button" @click="toggle" aria-controls="search-button-4437f082-4051-49ce-b1d6-a17544799ebc" :aria-expanded="open" aria-expanded="false">
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-secondary shrink-0">
<path fill="inherit" d="M7.40001 0.199997C3.64844 0.199997 0.600006 3.24843 0.600006 7C0.600006 10.7516 3.64844 13.8 7.40001 13.8C8.88438 13.8 10.2563 13.3219 11.375 12.5125L16.6375 17.7625L17.7625 16.6375L12.5625 11.425C13.5844 10.2344 14.2 8.68906 14.2 7C14.2 3.24843 11.1516 0.199997 7.40001 0.199997ZM7.40001 0.999997C10.7188 0.999997 13.4 3.68125 13.4 7C13.4 10.3187 10.7188 13 7.40001 13C4.08126 13 1.40001 10.3187 1.40001 7C1.40001 3.68125 4.08126 0.999997 7.40001 0.999997Z"></path>
</svg>
</button>
<div x-ref="panel" x-show="open" x-transition:enter="transition ease duration-300 transform" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease duration-300 transform" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4" @click.outside="close($refs.button)" id="search-button-4437f082-4051-49ce-b1d6-a17544799ebc" style="display: none;" class="absolute left-0 right-0 overflow-x-hidden overflow-y-auto transform bg-white border-t border-solid shadow-xl top-full rounded-b-0 md:rounded-b-lg translate-px border-grey">
<div class="relative w-full max-w-screen-xl px-4 mx-auto">
<div class="grid items-center grid-cols-12 py-5 gap-7 md:pt-8 md:pb-10">
<div role="heading" aria-level="2" class="col-span-10 text-2xl font-baeBold">Search</div>
<div class="col-span-2">
<button class="hidden w-auto p-2 ml-auto cursor-pointer md:block" title="Close" @click.prevent="close($refs.button)">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-secondary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
</div>
<form action="/en/search-results" method="GET" class="col-span-11 md:col-span-full">
<div class="relative flex flex-col gap-3 sm:flex-row flex-nowrap">
<div class="relative flex flex-col w-full flex-nowrap md:flex-1 md:w-auto">
<input x-ref="search-input" class="relative flex-1 px-3 pt-2 pl-10 outline-none search-text placeholder-secondary font-baeRegular text-secondary" name="searchQuery" type="text" placeholder="Search" value="" required="">
<span class="search-icon">Search</span>
</div>
<div class="relative flex flex-row w-full gap-3 flex-nowrap md:w-auto">
<button type="reset" @click.prevent="resetSearch()" class="min-w-0 btn btn-clear">Clear All</button>
<button class="w-auto min-w-0 btn btn-outline-light btn-follow text-secondary" type="submit">Search</button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
<div x-data="mobileMenu" class="block w-12 md:hidden" @close-menu.window="open = false">
<button class="menu-icon -outline-offset-2 fill-secondary" :class="open ? 'open fill-primary':'fill-secondary'" x-bind="bindMenu">
<template x-if="!open">
<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-inherit">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 8.3125C0.170898 7.79473 0.609426 7.375 1.15038 7.375H17.9414C18.4824 7.375 18.9209 7.79473 18.9209 8.3125C18.9209 8.83027 18.4824 9.25 17.9414 9.25H1.15038C0.609426 9.25 0.170898 8.83027 0.170898 8.3125Z" fill="inherit"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 1.4375C0.170898 0.919733 0.609426 0.5 1.15038 0.5H17.9414C18.4824 0.5 18.9209 0.919733 18.9209 1.4375C18.9209 1.95527 18.4824 2.375 17.9414 2.375H1.15038C0.609426 2.375 0.170898 1.95527 0.170898 1.4375Z" fill="inherit"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 15.1875C0.170898 14.6697 0.609426 14.25 1.15038 14.25H17.9414C18.4824 14.25 18.9209 14.6697 18.9209 15.1875C18.9209 15.7053 18.4824 16.125 17.9414 16.125H1.15038C0.609426 16.125 0.170898 15.7053 0.170898 15.1875Z" fill="inherit"></path>
</svg>
</template><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-inherit">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 8.3125C0.170898 7.79473 0.609426 7.375 1.15038 7.375H17.9414C18.4824 7.375 18.9209 7.79473 18.9209 8.3125C18.9209 8.83027 18.4824 9.25 17.9414 9.25H1.15038C0.609426 9.25 0.170898 8.83027 0.170898 8.3125Z" fill="inherit"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 1.4375C0.170898 0.919733 0.609426 0.5 1.15038 0.5H17.9414C18.4824 0.5 18.9209 0.919733 18.9209 1.4375C18.9209 1.95527 18.4824 2.375 17.9414 2.375H1.15038C0.609426 2.375 0.170898 1.95527 0.170898 1.4375Z" fill="inherit"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.170898 15.1875C0.170898 14.6697 0.609426 14.25 1.15038 14.25H17.9414C18.4824 14.25 18.9209 14.6697 18.9209 15.1875C18.9209 15.7053 18.4824 16.125 17.9414 16.125H1.15038C0.609426 16.125 0.170898 15.7053 0.170898 15.1875Z" fill="inherit"></path>
</svg>
<template x-if="open">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-inherit">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.54645 17.0339C1.17427 17.4025 1.14913 18.0274 1.49029 18.4296C1.83146 18.8318 2.40974 18.859 2.78192 18.4903L10 11.3402L17.2181 18.4903C17.5903 18.859 18.1685 18.8318 18.5097 18.4296C18.8509 18.0274 18.8257 17.4025 18.4535 17.0339L11.3529 10L18.4535 2.96614C18.8257 2.59747 18.8509 1.97255 18.5097 1.57036C18.1685 1.16816 17.5903 1.14099 17.2181 1.50967L10 8.65984L2.78193 1.50967C2.40975 1.14099 1.83147 1.16816 1.4903 1.57036C1.14914 1.97255 1.17428 2.59747 1.54646 2.96614L8.64711 9.99999L1.54645 17.0339Z" fill="inherit"></path>
</svg>
</template>
</button>
<div x-show="open" class="menu-side" x-ref="menu-side" x-transition:enter="transition ease duration-300 transform" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease duration-300 transform" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4" style="display: none;">
<ul class="hidden px-4 -mb-px md:flex flex-nowrap ">
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f">
<span class="navigation-link-text">Who we are</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-company" class="navigation-link-lv1">Our company</a>
</div><div class="header-menu-links-lv1">
<a href="/en/our-company/our-strategy" class="navigation-link-lv1">Our strategy</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-businesses" class="navigation-link-lv1">Our businesses</a>
</div><div class="header-menu-links-lv1">
<a href="/en/leadership" class="navigation-link-lv1">Our leadership</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://heritage.baesystems.com/" class="navigation-link-lv1">Our history</a>
</div><div class="header-menu-links-lv1">
<a href="/en/locations" class="navigation-link-lv1">Our locations</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554">
<span class="navigation-link-text">What we do</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/air" class="navigation-link-lv1">Air</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/land" class="navigation-link-lv1">Land</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/sea" class="navigation-link-lv1">Sea</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/space" class="navigation-link-lv1">Space</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/cyber" class="navigation-link-lv1">Cyber</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/battlespace-integration" class="navigation-link-lv1">Battlespace Integration</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/digital-and-data-services" class="navigation-link-lv1">Digital and data services</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/electronics" class="navigation-link-lv1">Electronics</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/innovation" class="navigation-link-lv1">Innovation</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/operational-support" class="navigation-link-lv1">Operational support</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/weapon-systems" class="navigation-link-lv1">Weapon systems</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/all-capabilities" class="navigation-link-lv1">All capabilities</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2">
<span class="navigation-link-text">Newsroom</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom" class="navigation-link-lv1">Newsroom home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/newsroom/news-releases" class="navigation-link-lv1">News releases</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/stories" class="navigation-link-lv1">Stories</a>
</div><div class="header-menu-links-lv1">
<a href="/en/insights" class="navigation-link-lv1">Insights</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/events" class="navigation-link-lv1">Events</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/regulatory-news" class="navigation-link-lv1">Regulatory news</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom/global-media-contacts" class="navigation-link-lv1">Contacts</a>
</div></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd">
<span class="navigation-link-text">Sustainability</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability" class="navigation-link-lv1">Sustainability home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/people-and-culture" class="navigation-link-lv1">Our people and culture</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/supporting-our-communities" class="navigation-link-lv1">Supporting our communities</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/climate-and-environment" class="navigation-link-lv1">Climate and environment</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/responsible-business" class="navigation-link-lv1">Responsible business</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/sustainability-reporting" class="navigation-link-lv1">Sustainability reporting</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0">
<span class="navigation-link-text">Investors</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/" class="navigation-link-lv1">Investors home</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/why-invest-in-bae-systems" class="navigation-link-lv1">Why invest in BAE Systems?</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-centre" class="navigation-link-lv1">2025 half year results</a>
</div><div class="header-menu-links-lv1">
<a href="https://annualreport.baesystems.com/" class="navigation-link-lv1">2024 annual report</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/capital-markets-days" class="navigation-link-lv1">Investor events</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/financial-calendar" class="navigation-link-lv1">Financial calendar</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-reports-events-archive" class="navigation-link-lv1">Results, reports &amp; events archive</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2">
<span class="navigation-link-text">Careers</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Australia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Canada</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Malaysia</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Poland</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Qatar</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Saudi Arabia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Singapore</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">United Kingdom</a>
</div><div class="header-menu-links-lv1">
<a rel="nofollow" target="_blank" href="https://jobs.baesystems.com/" class="navigation-link-lv1">United States</a>
</div></div>
</div>
</div>
</div> </li>
</ul>
<ul x-ref="submenu" class="menu-level1 md:hidden">
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f">
<span class="navigation-link-text">Who we are</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-4efe1321-76d4-4e7e-9f8f-8f6944c51b9f" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-company" class="navigation-link-lv1">Our company</a>
</div><div class="header-menu-links-lv1">
<a href="/en/our-company/our-strategy" class="navigation-link-lv1">Our strategy</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/our-businesses" class="navigation-link-lv1">Our businesses</a>
</div><div class="header-menu-links-lv1">
<a href="/en/leadership" class="navigation-link-lv1">Our leadership</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://heritage.baesystems.com/" class="navigation-link-lv1">Our history</a>
</div><div class="header-menu-links-lv1">
<a href="/en/locations" class="navigation-link-lv1">Our locations</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554">
<span class="navigation-link-text">What we do</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-2753926f-3be2-49be-b030-4bf3eefa9554" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/air" class="navigation-link-lv1">Air</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/land" class="navigation-link-lv1">Land</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/sea" class="navigation-link-lv1">Sea</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/space" class="navigation-link-lv1">Space</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/cyber" class="navigation-link-lv1">Cyber</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/battlespace-integration" class="navigation-link-lv1">Battlespace Integration</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/digital-and-data-services" class="navigation-link-lv1">Digital and data services</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/electronics" class="navigation-link-lv1">Electronics</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/innovation" class="navigation-link-lv1">Innovation</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/operational-support" class="navigation-link-lv1">Operational support</a>
</div><div class="header-menu-links-lv1">
<a href="/en/what-we-do/weapon-systems" class="navigation-link-lv1">Weapon systems</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/what-we-do/all-capabilities" class="navigation-link-lv1">All capabilities</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2">
<span class="navigation-link-text">Newsroom</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-d750c21f-8d88-4274-9124-4fff0888fde2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom" class="navigation-link-lv1">Newsroom home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/newsroom/news-releases" class="navigation-link-lv1">News releases</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/stories" class="navigation-link-lv1">Stories</a>
</div><div class="header-menu-links-lv1">
<a href="/en/insights" class="navigation-link-lv1">Insights</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/events" class="navigation-link-lv1">Events</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/regulatory-news" class="navigation-link-lv1">Regulatory news</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/newsroom/global-media-contacts" class="navigation-link-lv1">Contacts</a>
</div></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd">
<span class="navigation-link-text">Sustainability</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-30e8f18b-2c1e-4674-a06c-b0cf4b28befd" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability" class="navigation-link-lv1">Sustainability home</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/people-and-culture" class="navigation-link-lv1">Our people and culture</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/supporting-our-communities" class="navigation-link-lv1">Supporting our communities</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/climate-and-environment" class="navigation-link-lv1">Climate and environment</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="/en/sustainability/responsible-business" class="navigation-link-lv1">Responsible business</a>
</div><div class="header-menu-links-lv1">
<a href="/en/sustainability/sustainability-reporting" class="navigation-link-lv1">Sustainability reporting</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0">
<span class="navigation-link-text">Investors</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b8bd4287-164c-424c-8fe6-9ec36f24a4e0" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/" class="navigation-link-lv1">Investors home</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/why-invest-in-bae-systems" class="navigation-link-lv1">Why invest in BAE Systems?</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-centre" class="navigation-link-lv1">2025 half year results</a>
</div><div class="header-menu-links-lv1">
<a href="https://annualreport.baesystems.com/" class="navigation-link-lv1">2024 annual report</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/capital-markets-days" class="navigation-link-lv1">Investor events</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/financial-calendar" class="navigation-link-lv1">Financial calendar</a>
</div><div class="header-menu-links-lv1">
<a href="https://investors.baesystems.com/results-reports-events-archive" class="navigation-link-lv1">Results, reports &amp; events archive</a>
</div></div>
<div class="col-span-3 md:space-y-4"></div>
</div>
</div>
</div> </li>
<li class="navigation-item w-full" x-data="{showChildren:false}" @click.away="showChildren=false" @keyup.escape="showChildren=false">
<button id="header-menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-link" @click.prevent="showChildren=!showChildren" aria-controls="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2">
<span class="navigation-link-text">Careers</span>
<span class="menu-chevron flex md:hidden" :class="showChildren ? 'open':''" role="button">
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2557 4.15668C14.9302 3.8052 14.4026 3.8052 14.0772 4.15668L7.99988 10.7202L1.92254 4.15668C1.5971 3.8052 1.0695 3.8052 0.744076 4.15668C0.418653 4.50816 0.418631 5.07797 0.744076 5.42943L7.41075 12.6294C7.567 12.7982 7.77897 12.8931 8 12.8931C8.22102 12.8931 8.43297 12.7982 8.58924 12.6294L15.2559 5.42942C15.5814 5.07794 15.5814 4.50813 15.2559 4.15668L15.2557 4.15668Z" fill="inherit"></path>
</svg>
</span>
</button>
<div id="menu-links-b3813fb9-56b7-404b-a04e-12d9a52d9ab2" class="navigation-submenu" :class="showChildren ? 'open':''" style="display: none;" x-show="showChildren">
<div class="md:container md:px-4">
<div class="md:grid md:grid-cols-12 gap-7 md:pt-8 md:pb-10">
<button class="right-0 hidden absolute cursor-pointer text-grey md:block" title="Close" type="button" x-ref="button" @click.prevent="showChildren=!showChildren">
<span class="flex flex-col items-center justify-center block w-6 h-6 menu-close">
<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-primary">
<path fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M0.773225 8.51693C0.587136 8.70127 0.574564 9.01372 0.745147 9.21482C0.915729 9.41592 1.20487 9.4295 1.39096 9.24516L5 5.67008L8.60904 9.24516C8.79513 9.4295 9.08427 9.41592 9.25485 9.21482C9.42544 9.01372 9.41286 8.70127 9.22677 8.51693L5.67644 5L9.22677 1.48307C9.41286 1.29873 9.42543 0.986276 9.25485 0.785179C9.08427 0.584082 8.79513 0.570497 8.60904 0.754836L5 4.32992L1.39096 0.754836C1.20487 0.570497 0.915734 0.584082 0.745152 0.785179C0.57457 0.986276 0.587141 1.29873 0.77323 1.48307L4.32356 5L0.773225 8.51693Z"></path>
</svg>
</span>
</button>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Australia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Canada</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Malaysia</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Poland</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Qatar</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Saudi Arabia</a>
</div><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">Singapore</a>
</div></div>
<div class="col-span-3 md:space-y-4"><div class="header-menu-links-lv1">
<a href="https://careers.baesystems.com/" class="navigation-link-lv1">United Kingdom</a>
</div><div class="header-menu-links-lv1">
<a rel="nofollow" target="_blank" href="https://jobs.baesystems.com/" class="navigation-link-lv1">United States</a>
</div></div>
</div>
</div>
</div> </li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</header>`
  },
  {
    id: 'nav-simple',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Nav-simple            </div>
    `,
    content: `
      <nav style="background:#ffffff;border-bottom:1px solid #eee;">
        <ul style="display:flex;justify-content:center;gap:20px;margin:0;padding:12px;list-style:none;">
          <li><a href="#" style="text-decoration:none;color:#333;transition:color 0.3s;">Home</a></li>
          <li><a href="#" style="text-decoration:none;color:#333;transition:color 0.3s;">Services</a></li>
          <li><a href="#" style="text-decoration:none;color:#333;transition:color 0.3s;">Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { color: #007bff; }
      </style>
    `,
    category: 'Navigation'
  },

  {
    id: 'nav-logo-left',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Nav + Logo (left)
            </div>
    `,
    content: `
      <nav style="background:#f8f9fa;display:flex;justify-content:space-between;align-items:center;padding:0 20px;height:60px;">
        <div style="font-weight:bold;font-size:20px;">MyBrand</div>
        <ul style="display:flex;gap:20px;list-style:none;margin:0;padding:0;">
          <li><a href="#" style="color:#333;text-decoration:none;">Home</a></li>
          <li><a href="#" style="color:#333;text-decoration:none;">Blog</a></li>
          <li><a href="#" style="color:#333;text-decoration:none;">About</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { color: #007bff; }
      </style>
    `,
    category: 'Navigation'
  },


  {
    id: 'nav-dark',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              nav-dark Bg
            </div>
    `,
    content: `
      <nav style="background:#222;padding:12px;">
        <ul style="display:flex;justify-content:center;gap:30px;list-style:none;margin:0;padding:0;">
          <li><a href="#" style="color:#fff;text-decoration:none;transition:color 0.3s;">Home</a></li>
          <li><a href="#" style="color:#fff;text-decoration:none;transition:color 0.3s;">Portfolio</a></li>
          <li><a href="#" style="color:#fff;text-decoration:none;transition:color 0.3s;">Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { color: #ff9800; }
      </style>
    `,
    category: 'Navigation'
  },


  {
    id: 'nav-with-button',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Nav with button            </div>
    `,
    content: `
      <nav style="background:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 20px;height:60px;border-bottom:1px solid #eee;">
        <div style="font-weight:bold;font-size:20px;">MyBrand</div>
        <div style="display:flex;gap:20px;align-items:center;">
          <a href="#" style="color:#333;text-decoration:none;">Home</a>
          <a href="#" style="color:#333;text-decoration:none;">Services</a>
          <button style="background:#007bff;color:#fff;border:none;padding:8px 14px;border-radius:4px;cursor:pointer;">Sign Up</button>
        </div>
      </nav>
      <style>
        nav a:hover { color: #007bff; }
        nav button:hover { background: #0056b3; }
      </style>
    `,
    category: 'Navigation'
  },


  {
    id: 'nav-colored',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Nav with Bg            </div>
    `,
    content: `
      <nav style="background:#4cafef;padding:14px;">
        <ul style="display:flex;justify-content:center;gap:40px;list-style:none;margin:0;padding:0;">
          <li><a href="#" style="color:#fff;text-decoration:none;transition:opacity 0.3s;">Home</a></li>
          <li><a href="#" style="color:#fff;text-decoration:none;transition:opacity 0.3s;">Shop</a></li>
          <li><a href="#" style="color:#fff;text-decoration:none;transition:opacity 0.3s;">Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { opacity: 0.7; }
      </style>
    `,
    category: 'Navigation'
  },
  {
    id: 'bea nav',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Nav Bea System            </div>
`,
    content: `
<div style="width:100%; display:flex; align-items:center; justify-content:space-between; padding:12px 40px; box-sizing:border-box; font-family:Arial, sans-serif; border-bottom:1px solid #eee;">
  <div style="flex-shrink:0;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BAE_Systems_logo.svg/2560px-BAE_Systems_logo.svg.png" alt="Logo" style="height:32px;">
  </div>
  <div style="flex-grow:1; display:flex; justify-content:center; gap:28px;">
    <a href="#" class="nav-link">Who we are<span></span></a>
    <a href="#" class="nav-link">What we do<span></span></a>
    <a href="#" class="nav-link">Newsroom<span></span></a>
    <a href="#" class="nav-link">Sustainability<span></span></a>
    <a href="#" class="nav-link">Investors<span></span></a>
    <a href="#" class="nav-link">Careers<span></span></a>
  </div>
  <div style="display:flex; align-items:center; gap:16px;">
    <a href="#" style="color:#777; font-size:14px; text-decoration:none;">Contact us</a>
    <a href="#" style="color:#000; font-size:14px; font-weight:600; text-decoration:none;">Global site</a>
    <span style="cursor:pointer; font-size:18px;"></span>
  </div>
</div>
<style>
  .nav-link {
    position: relative;
    text-decoration: none;
    color: #333;
    font-size: 15px;
    padding-bottom: 4px;
    transition: color 0.3s;
  }
  .nav-link span {
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: #d00;
    transition: width 0.3s;
  }
  .nav-link:hover {
    color: #000;
  }
  .nav-link:hover span {
    width: 100%;
  }
</style>
    `,
    category: 'Bea Systems'
  },
  {
    id: 'Personal Shape',
    label: `
             <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Nav Personal Shape
            </div>
`,
    content: ` 
    <style>
    nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

nav.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-lg);
    padding: 0.75rem 0;
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    background: var(--gradient-elegant);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2.5rem;
    align-items: center;
}

.nav-links a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding: 0.5rem 0;
}

.nav-links a:hover {
    color: var(--primary-color);
    transform: translateY(-1px);
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background: var(--gradient-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
    border-radius: 1px;
}

.nav-links a:hover::after {
    width: 100%;
}

/* Mobile Menu */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
}

.hamburger {
    width: 25px;
    height: 3px;
    background: var(--text-primary);
    margin: 3px 0;
    transition: all 0.3s ease;
    border-radius: 1px;
}

.mobile-menu-toggle.active .hamburger:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.mobile-menu-toggle.active .hamburger:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active .hamburger:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
}

.mobile-menu.active {
    right: 0;
}

.mobile-nav-links {
    list-style: none;
    text-align: center;
}

.mobile-nav-links li {
    margin: 2rem 0;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.active .mobile-nav-links li {
    opacity: 1;
    transform: translateY(0);
}

.mobile-menu.active .mobile-nav-links li:nth-child(1) {
    transition-delay: 0.1s;
}

.mobile-menu.active .mobile-nav-links li:nth-child(2) {
    transition-delay: 0.2s;
}

.mobile-menu.active .mobile-nav-links li:nth-child(3) {
    transition-delay: 0.3s;
}

.mobile-menu.active .mobile-nav-links li:nth-child(4) {
    transition-delay: 0.4s;
}

.mobile-nav-links a {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--text-light);
    text-decoration: none;
    transition: all 0.3s ease;
    background: var(--gradient-elegant);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.mobile-nav-links a:hover {
    transform: scale(1.05);
}

    </style>
       <nav id="navbar">
        <div class="nav-container">
            <div class="logo">Personal Shape</div>
            <ul class="nav-links">
                <li><a href="./index.html" data-gjs-type="link">Home</a></li>
                <li><a href="./about.html" data-gjs-type="link">About</a></li>
                <li><a href="./portfolio.html" data-gjs-type="link">Portfolio</a></li>
                <li><a href="./contact.html" data-gjs-type="link">Contact</a></li>
            </ul>
            <div class="mobile-menu-toggle" id="mobileMenuToggle">
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
            </div>
        </div>
    </nav>`,
    category: 'Personal Shape'
  },
  {
    id: 'navbar Zay',
    label: `            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Zay NavBar            </div>`,
    content: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#" data-gjs-droppable="true">MyShop</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
    category: 'Zay Navbar'
  }

];

export const footerBlocks: BlockProperties[] = [
  {
id: 'Bajirao Footer',
label: `            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Bajirao Footer with copyright
            </div>
  `,
    content: `
        <footer class="footer-main">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-brand mb-4">
                        <img src="images/logo.png" alt="Bajirao Library Logo" class="footer-logo mb-3">
                        <h5 class="footer-heading serif">BAJIRAO LIBRARY</h5>
                    </div>
                    <p class="small leading-relaxed mb-4">The most trusted self-study center in Rajendra Nagar, Patna.
                        Providing a sanctuary of silence and comfort for dedicated students.</p>
                    <div class="social-links mt-4">
                        <a href="#" class="me-3 fs-5"><i class="fab fa-facebook-f text-gold"></i></a>
                        <a href="#" class="me-3 fs-5"><i class="fab fa-instagram text-gold"></i></a>
                        <a href="https://wa.me/919525298482" target="_blank" class="fs-5"><i
                                class="fab fa-whatsapp text-gold"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="footer-heading serif">Quick Links</h5>
                    <ul class="footer-links">
                        <li><a href="#home"><i class="fas fa-chevron-right me-2 small"></i> Home</a></li>
                        <li><a href="#about"><i class="fas fa-chevron-right me-2 small"></i> About Us</a></li>
                        <li><a href="#facilities"><i class="fas fa-chevron-right me-2 small"></i> Facilities</a></li>
                        <li><a href="#pricing"><i class="fas fa-chevron-right me-2 small"></i> Membership</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="footer-heading serif">Our Features</h5>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fas fa-chevron-right me-2 small"></i> 24/7 AC Zone</a></li>
                        <li><a href="#"><i class="fas fa-chevron-right me-2 small"></i> High-Speed WiFi</a></li>
                        <li><a href="#"><i class="fas fa-chevron-right me-2 small"></i> Wide Desk Spaces</a></li>
                        <li><a href="#"><i class="fas fa-chevron-right me-2 small"></i> Girls Only Rows</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="footer-heading serif">Get In Touch</h5>
                    <div class="footer-contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Add - Rajendra Nagar Bahadurpur gumati,near raj fresh, Patna 16</span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <span><a href="tel:+919525298482" class="text-white text-decoration-none">+91
                                9525298482</a></span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <span><a href="tel:+919199701015" class="text-white text-decoration-none">+91
                                9199701015</a></span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-envelope"></i>
                        <span><a href="mailto:bajiraosir1993@gmail.com"
                                class="text-white text-decoration-none">bajiraosir1993@gmail.com</a></span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="footer-bottom text-center">
        <div class="container">
            <p class="mb-0 poppins">
                &copy; 2026 BAJIRAO LIBRARY. All Rights Reserved. |
                <span>Designed By
                    <a href="https://www.teqtoeducation.com/" target="_blank"
                        style="text-decoration: none; color: #ffc107; font-weight: 400;">
                        Teqto Edge
                    </a>
                </span>
            </p>
        </div>
    </div>
  `,
    category: 'Bajirao Footer'

  },
  {
    id: 'footer-dance',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Dance Footer
            </div>
  `,
    content: `        <footer class="footer">
            <div class="footer-container">

                <!-- Column 1 -->
                <div class="footer-col">
                    <img
                        src="https://edgeadmin.teqtoeducation.com/uploads/Screenshot_2026_01_24_142644_0b74380d73.png"
                        alt>
                    <h2 class="footer-logo text-danger">Reader’s Rejoice</h2>
                    <p>
                        Reader’s Rejoice Library provides a peaceful study
                        environment with AC,
                        WiFi, lockers and separate cabins for students.
                    </p>

                </div>

                <!-- Column 2 -->
                <div class="footer-col">
                    <h3>Get In Touch</h3>

                    <p><i class="fa fa-map-marker-alt me-3"></i> Kankarbagh,
                        Patna, Bihar</p>
                    <p><i class="fa fa-phone-alt me-3"></i> +91 9334339046</p>
                    <p><i class="fa fa-envelope me-3"></i>
                        info@readersrejoice.co.in</p>

                    <div class="d-flex pt-2">
                        <a
                            class="btn btn-outline-danger btn-square border-2 me-2"
                            href><i class="fa-brands fa-x-twitter"></i></a>
                        <a
                            class="btn btn-outline-danger btn-square border-2 me-2"
                            href><i class="fab fa-facebook-f"></i></a>
                        <a
                            class="btn btn-outline-danger btn-square border-2 me-2"
                            href><i class="fab fa-youtube"></i></a>
                        <a
                            class="btn btn-outline-danger btn-square border-2 me-2"
                            href><i class="fab fa-instagram"></i></a>
                        <a
                            class="btn btn-outline-danger btn-square border-2 me-2"
                            href><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <!-- Column 3 -->
                <div class="footer-col">
                    <h3>Popular Link</h3>
                    <ul>
                        <li><a href="#home">› Home</a></li>
                        <li><a href="#about">› About Us</a></li>
                        <li><a href="#contact">› Contact Us</a></li>
                        <li><a href="#blog">› Blog</a></li>
                    </ul>
                </div>

                <!-- Column 4 -->
                <div class="footer-col">
                    <h3>Our Facilities</h3>
                    <ul>
                        <li><a href="#portfolio">› Separate Cabins</a></li>
                        <li><a href="#portfolio">› AC Study Zone</a></li>
                        <li><a href="#portfolio">› Locker Facility</a></li>
                        <li><a href="#portfolio">› 200 Mbps WiFi</a></li>
                        <li><a href="#portfolio">› 24×7 Service</a></li>
                    </ul>
                </div>

            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom">
                <p>
                    © Reader’s Rejoice Library, All Rights Reserved.
                    Designed By <a href="https://www.teqtoeducation.com/">Teqto
                        Education</a>
                </p>
            </div>
        </footer>
  `,
    category: 'Readers Footers'
  },
  {
    id: 'footer-dance',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Dance Footer
            </div>
  `,
    content: `
        <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <div class="footer-item">
                                <h4 class="text-white mb-4">JustDanc</h4>
                                <p class="text-white mb-3">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                                <div class="d-flex">
                                    <a class="btn btn-lg-square btn-primary rounded-circle me-2" href=""><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fab fa-instagram"></i></a>
                                    <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-white mb-4">Address</h4>
                            <div class="d-flex align-items-center mb-3">
                                <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fas fa-map-marker-alt"></i></a>
                                <div class="text-white ms-2">
                                    <p class="mb-0">0123.. Street, New York, USA</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fa fa-phone-alt"></i></a>
                                <div class="text-white ms-2">
                                    <p class="mb-0">+012 345 67890</p>
                                    <p class="mb-0">+012 345 67890</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <a class="btn btn-lg-square btn-primary rounded-circle mx-2" href=""><i class="fas fa-envelope"></i></a>
                                <div class="text-white ms-2">
                                    <p class="mb-0">info@example.com</p>
                                    <p class="mb-0">info@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-white mb-4">Quick Links</h4>
                            <a href="#" class="footer-link"> About Us</a>
                            <a href="#" class="footer-link"> Classes</a>
                            <a href="#" class="footer-link"> Privacy Policy</a>
                            <a href="#" class="footer-link"> Terms & Conditions</a>
                            <a href="#" class="footer-link"> Schedule</a>
                            <a href="#" class="footer-link"> FAQ</a>
                            <a href="#" class="footer-link"> Contact Us</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <div class="footer-item">
                                <h4 class="text-white mb-4">Newsletter</h4>
                                <p class="text-white mb-3">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                                <div class="position-relative mx-auto rounded-pill">
                                    <input class="form-control rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your email">
                                    <button type="button" class="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">SignUp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->

        
        <!-- Copyright Start -->
        <div class="container-fluid copyright py-4">
            <div class="container">
                <div class="row g-4 align-items-center">
                    <div class="col-md-6 text-center text-md-start mb-md-0">
                        <span class="text-white"><a href="#" class="border-bottom text-white"><i class="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right reserved.</span>
                    </div>
                    <div class="col-md-6 text-center text-md-end text-white">
                        <!--/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. ***/-->
                        <!--/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, ***/-->
                        <!--/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ***/-->
                        Designed By <a class="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Copyright End -->


        <!-- Back to Top -->
        <a href="#" class="btn btn-primary btn-lg-square back-to-top"><i class="fa fa-arrow-up"></i></a>   

        
    <!-- JavaScript Libraries -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/counterup/counterup.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/lightbox/js/lightbox.min.js"></script>
    

    <!-- Template Javascript -->
    <script src="js/main.js"></script>
  `,
    category: 'Footers'
  },
  {
    id: 'footer-bae',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Simple Footer
            </div>
  `,
    content: `
    <footer style="background:#eee;padding:30px 40px;font-family:Arial,sans-serif;color:#222;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;">
        
        <!-- Left Section -->
        <div style="flex:1;min-width:220px;">
          <h3 style="font-size:14px;font-weight:bold;margin-bottom:10px;">BAE SYSTEMS</h3>
          <div style="font-size:20px;font-weight:bold;margin-bottom:6px;">1,790.50 GBX</div>
          <p style="font-size:12px;margin:4px 0;">Visit our investor centre</p>
          <p style="font-size:11px;line-height:1.4;color:#555;">
            Data is from the London Stock Exchange and may be delayed by 15 minutes or more. Share price data collected at 02:42 PM
          </p>
          <div style="margin-top:10px;display:flex;gap:8px;font-size:14px;">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-youtube"></i></a>
          </div>
        </div>

        <!-- Links Section -->
        <div style="flex:3;display:flex;flex-wrap:wrap;gap:40px;min-width:400px;">

          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHO WE ARE</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Leadership</li>
              <li>Our businesses</li>
              <li>Locations</li>
              <li>History</li>
              <li>Pensions</li>
              <li>Sustainability</li>
              <li>Suppliers</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHAT WE DO</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Air</li>
              <li>Land</li>
              <li>Sea</li>
              <li>Space</li>
              <li>Cyber</li>
              <li>Digital and data services</li>
              <li>All capabilities</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">NEWSROOM</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>News</li>
              <li>Events</li>
              <li>Media contacts</li>
            </ul>

            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">INVESTORS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Investors</li>
            </ul>

            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">CONTACT US</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Contact us</li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">CAREERS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Life at BAE Systems</li>
              <li>Experienced professionals</li>
              <li>Students, graduates and career changers</li>
              <li>Join us</li>
              <li>Search and apply</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  `,
    category: 'Footers'
  },
  {
    id: 'footer-bae 2',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              BAE Footer
  `,
    content: `
    <footer style="background:#eee;padding:30px 40px;font-family:Arial,sans-serif;color:#222;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;">
        <!-- Left Section -->
        <div style="flex:1;min-width:220px;">
          <h3 style="font-size:14px;font-weight:bold;margin-bottom:10px;">BAE SYSTEMS</h3>
          <div style="font-size:20px;font-weight:bold;margin-bottom:6px;">1,790.50 GBX</div>
          <p style="font-size:12px;margin:4px 0;">Visit our investor centre</p>
          <p style="font-size:11px;line-height:1.4;color:#555;">
            Data is from the London Stock Exchange and may be delayed by 15 minutes or more. Share price data collected at 02:42 PM
          </p>
          <div style="margin-top:10px;display:flex;gap:8px;font-size:14px;">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-youtube"></i></a>
          </div>
        </div>

        <!-- Links Section -->
        <div style="flex:3;display:flex;flex-wrap:wrap;gap:40px;min-width:400px;">
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHO WE ARE</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Leadership</li>
              <li>Our businesses</li>
              <li>Locations</li>
              <li>History</li>
              <li>Pensions</li>
              <li>Sustainability</li>
              <li>Suppliers</li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHAT WE DO</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Air</li>
              <li>Land</li>
              <li>Sea</li>
              <li>Space</li>
              <li>Cyber</li>
              <li>Digital and data services</li>
              <li>All capabilities</li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">NEWSROOM</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>News</li>
              <li>Events</li>
              <li>Media contacts</li>
            </ul>
            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">INVESTORS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Investors</li>
            </ul>
            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">CONTACT US</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">CAREERS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li>Life at BAE Systems</li>
              <li>Experienced professionals</li>
              <li>Students, graduates and career changers</li>
              <li>Join us</li>
              <li>Search and apply</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
    category: 'Footers'
  },
  {
    id: 'footer-bae-logo',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              BAE Logo Footer
  `,
    content: `
    <footer style="background:#eee;padding:30px 40px;font-family:Arial,sans-serif;color:#222;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;">
        
        <!-- Left Section with Logo -->
        <div style="flex:1;min-width:220px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BAE_Systems_logo.svg/2560px-BAE_Systems_logo.svg.png" style="height:20px;">
            <h3 style="font-size:14px;font-weight:bold;margin:0;">BAE SYSTEMS</h3>
          </div>
          <div style="font-size:20px;font-weight:bold;margin-bottom:6px;">1,790.50 GBX</div>
          <p style="font-size:12px;margin:4px 0;">Visit our investor centre</p>
          <p style="font-size:11px;line-height:1.4;color:#555;">
            Data is from the London Stock Exchange and may be delayed by 15 minutes or more. Share price data collected at 02:42 PM
          </p>
          <div style="margin-top:10px;display:flex;gap:8px;font-size:14px;">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-youtube"></i></a>
          </div>
        </div>

        <!-- Links Section -->
        <div style="flex:3;display:flex;flex-wrap:wrap;gap:40px;min-width:400px;">
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHO WE ARE</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Our businesses</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Pensions</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Suppliers</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">WHAT WE DO</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">Air</a></li>
              <li><a href="#">Land</a></li>
              <li><a href="#">Sea</a></li>
              <li><a href="#">Space</a></li>
              <li><a href="#">Cyber</a></li>
              <li><a href="#">Digital and data services</a></li>
              <li><a href="#">All capabilities</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">NEWSROOM</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">News</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Media contacts</a></li>
            </ul>
            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">INVESTORS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">Investors</a></li>
            </ul>
            <h4 style="font-size:12px;font-weight:bold;margin:12px 0 8px;">CONTACT US</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:12px;font-weight:bold;margin-bottom:8px;">CAREERS</h4>
            <ul style="list-style:none;margin:0;padding:0;font-size:12px;line-height:1.8;">
              <li><a href="#">Life at BAE Systems</a></li>
              <li><a href="#">Experienced professionals</a></li>
              <li><a href="#">Students, graduates and career changers</a></li>
              <li><a href="#">Join us</a></li>
              <li><a href="#">Search and apply</a></li>
            </ul>
          </div>
        </div>
      </div>

      <style>
        footer a { color:#222; text-decoration:none; transition:color 0.3s; }
        footer a:hover { color:#0073e6; }
      </style>
    </footer>
  `,
    category: 'Footers'
  },
  {
    id: 'footer-with-logo',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Footer With Logo            </div>
  `,
    category: 'Footers',
    content: `
    <footer style="background:#111; color:#fff; padding:40px 20px; text-align:center;">
      <div style="margin-bottom:20px;">
        <img src="https://via.placeholder.com/180x60?text=Logo" alt="Logo" style="max-width:180px;">
      </div>
      <div style="display:flex; justify-content:center; gap:25px; flex-wrap:wrap;">
        <a href="#" style="color:#fff; text-decoration:none; font-size:14px; display:flex; align-items:center; gap:6px;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="20" alt="Facebook"> Facebook
        </a>
        <a href="#" style="color:#fff; text-decoration:none; font-size:14px; display:flex; align-items:center; gap:6px;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="20" alt="Twitter"> Twitter
        </a>
        <a href="#" style="color:#fff; text-decoration:none; font-size:14px; display:flex; align-items:center; gap:6px;">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="20" alt="Instagram"> Instagram
        </a>
        <a href="#" style="color:#fff; text-decoration:none; font-size:14px; display:flex; align-items:center; gap:6px;">
          <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="20" alt="LinkedIn"> LinkedIn
        </a>
        <a href="#" style="color:#fff; text-decoration:none; font-size:14px; display:flex; align-items:center; gap:6px;">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="20" alt="YouTube"> YouTube
        </a>
      </div>
    </footer>
  `,
  },
  {
    id: 'Footers Personal Shape',
    label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              Footer Personal Shape
            </div>
  `,
    category: 'Footers Personal Shape',
    content: `
    <style>
    .footer {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%);
    color: var(--text-light);
    padding: 3rem 0 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="footer-grid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23footer-grid)"/></svg>');
    opacity: 0.4;
}

.footer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    position: relative;
    z-index: 2;
}

.footer-left p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: 0;
}

.footer-right {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.footer-right a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    position: relative;
}

.footer-right a:hover {
    color: var(--text-light);
    transform: translateY(-1px);
}

.footer-right a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -3px;
    left: 0;
    background: var(--primary-color);
    transition: width 0.3s ease;
}

.footer-right a:hover::after {
    width: 100%;
}

/* Footer Mobile Responsiveness */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }

    .footer-right {
        justify-content: center;
        gap: 1.5rem;
    }

    .footer-right a {
        font-size: 0.85rem;
    }
}

@media (max-width: 480px) {
    .footer-right {
        flex-direction: column;
        gap: 1rem;
    }
}

    </style>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-left">
                    <p>&copy; 2025 Personal Shape. All rights reserved.</p>
                </div>
                <div class="footer-right">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Use</a>
                    <a href="#sitemap">Sitemap</a>
                    <a href="https://templatemo.com" target="_blank" rel="noopener nofollow">Provided by TemplateMo</a>
                </div>
            </div>
        </div>
    </footer>
  `,
  },
  {
    id: 'footer',
    label: `            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
Zay Footer            </div>`,
    content: `
    <footer class="bg-dark text-light pt-5 pb-4">
      <div class="container text-center text-md-left">
        <div class="row text-center text-md-left">
          <!-- About -->
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Zay Shop</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus, expedita.
            </p>
          </div>

          <!-- Products -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
            <p><a href="#" class="text-light text-decoration-none">Shoes</a></p>
            <p><a href="#" class="text-light text-decoration-none">Clothing</a></p>
            <p><a href="#" class="text-light text-decoration-none">Watches</a></p>
            <p><a href="#" class="text-light text-decoration-none">Accessories</a></p>
          </div>

          <!-- Useful links -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Useful Links</h5>
            <p><a href="#" class="text-light text-decoration-none">Your Account</a></p>
            <p><a href="#" class="text-light text-decoration-none">Become an Affiliate</a></p>
            <p><a href="#" class="text-light text-decoration-none">Shipping Rates</a></p>
            <p><a href="#" class="text-light text-decoration-none">Help</a></p>
          </div>

          <!-- Contact -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i class="bi bi-house-door-fill"></i> New York, NY 10012, US</p>
            <p><i class="bi bi-envelope-fill"></i> info@example.com</p>
            <p><i class="bi bi-phone-fill"></i> + 01 234 567 88</p>
            <p><i class="bi bi-printer-fill"></i> + 01 234 567 89</p>
          </div>
        </div>

        <hr class="mb-4" />

        <div class="row align-items-center">
          <div class="col-md-7 col-lg-8">
            <p class="text-center text-md-left">
              © 2025 Zay Shop. All rights reserved.
            </p>
          </div>
          <div class="col-md-5 col-lg-4">
            <div class="text-center text-md-right">
              <a href="#" class="text-light me-2"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-light me-2"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-light me-2"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-light"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
    category: 'Zay / Footer'
  },

]

export const emailBlocks: BlockProperties[] = [
  {
    id: "email-template-1",
    label: `
      <div style="
        border:1px solid #ddd;
        border-radius:4px;
        padding:10px;
        font-size:12px;
        text-align:center;
        background:#fafafa;">
        📧 Email Template 1
      </div>
    `,
    content: `
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:20px;font-family:Arial;">
            <h2>Hello 👋</h2>
            <p>This is your email template.</p>
            <a href="#" style="
              background:#2563eb;
              color:#fff;
              padding:10px 16px;
              text-decoration:none;
              border-radius:4px;
              display:inline-block;
            ">
              Call To Action
            </a>
          </td>
        </tr>
      </table>
    `,
    category: "Emails",
  },
  {
    id: "email-header-logo-nav",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🔝 Header · Logo + Links
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:20px;font-family:Arial;text-align:center">
          <img src="https://via.placeholder.com/120x40?text=Logo" width="120" />
          <div style="margin-top:10px">
            <a href="#" style="margin:0 8px;color:#2563eb;text-decoration:none">Home</a>
            <a href="#" style="margin:0 8px;color:#2563eb;text-decoration:none">About</a>
            <a href="#" style="margin:0 8px;color:#2563eb;text-decoration:none">Contact</a>
          </div>
        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-hero-image-cta",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🖼 Hero · Image + CTA
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="text-align:center;font-family:Arial">
          <img src="https://via.placeholder.com/600x250" width="100%" />
        </td>
      </tr>
      <tr>
        <td style="padding:20px;text-align:center;font-family:Arial">
          <h2>Some title here</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <a href="#" style="
            background:#2563eb;
            color:#fff;
            padding:10px 18px;
            text-decoration:none;
            border-radius:4px;
            display:inline-block;
          ">
            Call to action
          </a>
        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-product-card",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🛒 Product · Card
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:20px;font-family:Arial;text-align:center">
          <img src="https://via.placeholder.com/200" width="200" />
          <h3>Product Name</h3>
          <p><strong>₹999</strong></p>
          <a href="#" style="
            background:#000;
            color:#fff;
            padding:8px 14px;
            text-decoration:none;
            border-radius:4px;
            display:inline-block;
          ">
            Buy Now
          </a>
        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-two-column-image-text",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      📐 Layout · 2 Column
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding:15px;text-align:center">
          <img src="https://via.placeholder.com/250" width="100%" />
        </td>
        <td width="50%" style="padding:15px;font-family:Arial">
          <h3>Section title</h3>
          <p>Description text goes here.</p>
        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-social-icons",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🌐 Social · Icons
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td style="padding:20px;text-align:center">
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="24" /></a>
        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-footer-basic",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🔻 Footer · Simple
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td style="padding:20px;text-align:center;font-family:Arial;color:#666;font-size:12px">
          © 2026 Your Company. All rights reserved.<br/>
          <a href="#" style="color:#2563eb">Unsubscribe</a>
        </td>
      </tr>
    </table>
  `,
  },
  /* ===================== 17. MULTI PURPOSE CARD ===================== */
  {
    id: "email-card-multipurpose",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🧩 Card · Multi Purpose
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="max-width:520px;border:1px solid #e5e7eb;border-radius:6px">
            <tr>
              <td style="padding:20px;font-family:Arial">
                <h3 style="margin-top:0">Card Title</h3>
                <p style="color:#555">
                  This card can be used for announcements, updates or content blocks.
                </p>
                <a href="#" style="
                  background:#2563eb;
                  color:#fff;
                  padding:8px 16px;
                  border-radius:4px;
                  text-decoration:none;
                  display:inline-block;
                ">
                  Learn More
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `,
  },

  /* ===================== 18. PRODUCT CARD ===================== */
  {
    id: "email-card-product",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🛒 Card · Product
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="max-width:300px;border:1px solid #e5e7eb;border-radius:6px">
            <tr>
              <td align="center">
                <img src="https://via.placeholder.com/300x200" width="100%" />
              </td>
            </tr>
            <tr>
              <td style="padding:16px;font-family:Arial;text-align:center">
                <h4 style="margin:0">Product Name</h4>
                <p style="margin:8px 0;color:#555">Short product description</p>
                <p style="font-size:18px;font-weight:bold">₹999</p>
                <a href="#" style="
                  background:#000;
                  color:#fff;
                  padding:8px 14px;
                  border-radius:4px;
                  text-decoration:none;
                  display:inline-block;
                ">
                  Buy Now
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `,
  },

  /* ===================== 19. PROMOTION CARD ===================== */
  {
    id: "email-card-promotion",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🎯 Card · Promotion
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="max-width:520px;background:#fef3c7;border-radius:6px">
            <tr>
              <td style="padding:20px;font-family:Arial;text-align:center">
                <h3 style="margin-top:0;color:#92400e">
                  🎉 Limited Time Offer
                </h3>
                <p style="color:#78350f">
                  Get flat <strong>30% OFF</strong> on all products.
                </p>
                <a href="#" style="
                  background:#f59e0b;
                  color:#000;
                  padding:10px 18px;
                  border-radius:4px;
                  text-decoration:none;
                  display:inline-block;
                  font-weight:bold;
                ">
                  Shop Now
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `,
  },

  /* ===================== 20. PRODUCT CARD HORIZONTAL ===================== */
  {
    id: "email-card-product-horizontal",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🛍 Card · Product Horizontal
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="max-width:520px;border:1px solid #e5e7eb;border-radius:6px">
            <tr>
              <td width="40%">
                <img src="https://via.placeholder.com/200" width="100%" />
              </td>
              <td width="60%" style="padding:16px;font-family:Arial">
                <h4 style="margin-top:0">Product Name</h4>
                <p style="color:#555">Short description for the product.</p>
                <p style="font-weight:bold">₹1,299</p>
                <a href="#" style="
                  background:#2563eb;
                  color:#fff;
                  padding:8px 14px;
                  border-radius:4px;
                  text-decoration:none;
                  display:inline-block;
                ">
                  View Product
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `,
  },

  /* ===================== 21. DISCOUNT COUPON CARD ===================== */
  {
    id: "email-card-coupon",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🎟 Card · Coupon
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="max-width:420px;border:2px dashed #2563eb;border-radius:6px">
            <tr>
              <td style="padding:20px;font-family:Arial;text-align:center">
                <h3>Use Code</h3>
                <p style="font-size:20px;font-weight:bold;letter-spacing:2px">
                  SAVE20
                </p>
                <p style="color:#555">Valid till 31 Dec</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `,
  },
  /* ===================== 22. CAR CARD ===================== */
  {
    id: "email-card-car",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🚗 Card · Car Listing
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%">
      <tr>
        <td align="center" style="padding:20px">
          <table width="100%" style="
            max-width:520px;
            border:1px solid #e5e7eb;
            border-radius:6px;
            background:#ffffff;
          ">
            
            <!-- Car Image -->
            <tr>
              <td>
                <img 
                  src="https://via.placeholder.com/520x280?text=Car+Image"
                  width="100%"
                  style="border-top-left-radius:6px;border-top-right-radius:6px"
                />
              </td>
            </tr>

            <!-- Car Details -->
            <tr>
              <td style="padding:16px;font-family:Arial">
                <h3 style="margin:0 0 6px 0">
                  Hyundai Creta 2024
                </h3>

                <p style="margin:0 0 10px 0;color:#555;font-size:14px">
                  Petrol • Automatic • 12,000 km
                </p>

                <table width="100%" style="font-size:14px;color:#333">
                  <tr>
                    <td>📍 Location</td>
                    <td align="right"><strong>Delhi</strong></td>
                  </tr>
                  <tr>
                    <td>💰 Price</td>
                    <td align="right"><strong>₹12,50,000</strong></td>
                  </tr>
                </table>

                <div style="margin-top:14px;text-align:center">
                  <a href="#" style="
                    background:#2563eb;
                    color:#fff;
                    padding:10px 18px;
                    border-radius:4px;
                    text-decoration:none;
                    display:inline-block;
                    font-weight:bold;
                  ">
                    View Car
                  </a>
                </div>

              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `,
  },
  /* ===================== 22. CARD GRID · 4 IN A ROW ===================== */
  {
    id: "email-card-grid-4",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🧱 Cards · 4 in a Row
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:20px">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
            <tr>

              <!-- CARD 1 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td style="padding:14px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 8px">Card 1</h4>
                      <p style="font-size:13px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 2 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td style="padding:14px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 8px">Card 2</h4>
                      <p style="font-size:13px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 3 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td style="padding:14px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 8px">Card 3</h4>
                      <p style="font-size:13px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 4 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td style="padding:14px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 8px">Card 4</h4>
                      <p style="font-size:13px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

            </tr>
          </table>

        </td>
      </tr>
    </table>
  `,
  },
  {
    id: "email-card-grid-4-image",
    label: `
    <div style="border:1px solid #ddd;padding:10px;text-align:center">
      🧱 Cards · 4 Image Cards
    </div>
  `,
    category: "Emails",
    content: `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:20px">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
            <tr>

              <!-- CARD 1 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td align="center">
                      <img src="https://via.placeholder.com/150" width="100%" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 6px;font-size:14px">Product 1</h4>
                      <p style="margin:0 0 8px;font-size:12px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 2 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td align="center">
                      <img src="https://via.placeholder.com/150" width="100%" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 6px;font-size:14px">Product 2</h4>
                      <p style="margin:0 0 8px;font-size:12px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 3 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td align="center">
                      <img src="https://via.placeholder.com/150" width="100%" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 6px;font-size:14px">Product 3</h4>
                      <p style="margin:0 0 8px;font-size:12px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- CARD 4 -->
              <td width="25%" valign="top" style="padding:6px">
                <table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
                  <tr>
                    <td align="center">
                      <img src="https://via.placeholder.com/150" width="100%" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px;font-family:Arial;text-align:center">
                      <h4 style="margin:0 0 6px;font-size:14px">Product 4</h4>
                      <p style="margin:0 0 8px;font-size:12px;color:#555">
                        Short description
                      </p>
                      <a href="#" style="
                        background:#2563eb;
                        color:#fff;
                        padding:6px 12px;
                        border-radius:4px;
                        text-decoration:none;
                        display:inline-block;
                        font-size:12px;
                      ">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

            </tr>
          </table>

        </td>
      </tr>
    </table>
  `,
  },

];

