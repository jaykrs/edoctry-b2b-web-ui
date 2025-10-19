import type { BlockProperties } from 'grapesjs';

export const hero: BlockProperties[] = [
  {
    id: 'hero-without-img',
    label: `
    <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Hero Section
    </div>
  `,
    content: `
    <section style="background:#f0f8ff;padding:60px 20px;text-align:center;font-family:Arial,sans-serif;color:#222;">
      <div style="max-width:800px;margin:0 auto;">
        <h1 style="font-size:32px;font-weight:bold;margin-bottom:16px;">Welcome to Our Website</h1>
        <p style="font-size:16px;color:#555;margin-bottom:24px;">
          We provide the best solutions to help you grow and succeed.
        </p>
        <a href="#" style="display:inline-block;padding:12px 24px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:bold;">
          Get Started
        </a>
      </div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: 'hero-animated',
    label: `
    <div style="width:100%;height:60px;border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Animated Hero
    </div>
  `,
    content: `
    <style>
    :root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    --accent-pink: #ec4899;
    --accent-cyan: #06b6d4;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-light: #ffffff;
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-dark: #0f172a;
    --bg-card: rgba(255, 255, 255, 0.95);
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-tertiary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-elegant: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --glass: rgba(255, 255, 255, 0.15);
    --glass-border: rgba(255, 255, 255, 0.2);
}

body {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    line-height: 1.7;
    color: var(--text-primary);
    scroll-behavior: smooth;
    overflow-x: hidden;
    background: var(--bg-primary);
}

.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
        background: var(--gradient-elegant);
        position: relative;
        overflow: hidden;
      }
      .hero::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        animation: float 25s ease-in-out infinite;
        opacity: 0.7;
      }
      .hero::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        animation: pulse 4s ease-in-out infinite alternate;
      }
      .floating-shapes { position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; }
      .shape { position:absolute; background:rgba(255,255,255,0.1); border-radius:50%; }
      .shape-1 { width:80px; height:80px; top:20%; left:10%; animation: floatShape1 20s ease-in-out infinite; }
      .shape-2 { width:120px; height:120px; top:60%; right:15%; background:rgba(255,255,255,0.08); animation: floatShape2 25s ease-in-out infinite reverse; }
      .shape-3 { width:60px; height:60px; top:30%; right:25%; background:rgba(255,255,255,0.12); animation: floatShape3 18s ease-in-out infinite; }
      .shape-4 { width:100px; height:100px; bottom:25%; left:20%; background:rgba(255,255,255,0.06); border-radius:20px; animation: floatShape4 22s ease-in-out infinite; }
      .shape-5 { width:40px; height:40px; top:15%; right:40%; background:rgba(255,255,255,0.15); animation: floatShape5 16s ease-in-out infinite reverse; }
      .shape-6 { width:140px; height:140px; bottom:15%; right:10%; background:rgba(255,255,255,0.04); border-radius:30px; animation: floatShape6 28s ease-in-out infinite; }

      @keyframes floatShape1 { 0%,100%{transform:translateY(0) translateX(0) rotate(0);} 25%{transform:translateY(-30px) translateX(20px) rotate(90deg);} 50%{transform:translateY(-15px) translateX(-10px) rotate(180deg);} 75%{transform:translateY(-40px) translateX(15px) rotate(270deg);} }
      @keyframes floatShape2 { 0%,100%{transform:translateY(0) translateX(0) scale(1);} 33%{transform:translateY(25px) translateX(-20px) scale(1.1);} 66%{transform:translateY(-20px) translateX(25px) scale(0.9);} }
      @keyframes floatShape3 { 0%,100%{transform:translateY(0) translateX(0) rotate(0);} 50%{transform:translateY(-25px) translateX(-30px) rotate(180deg);} }
      @keyframes floatShape4 { 0%,100%{transform:translateY(0) translateX(0) rotate(0);} 25%{transform:translateY(20px) translateX(-15px) rotate(45deg);} 50%{transform:translateY(-10px) translateX(30px) rotate(90deg);} 75%{transform:translateY(15px) translateX(-20px) rotate(135deg);} }
      @keyframes floatShape5 { 0%,100%{transform:translateY(0) translateX(0) scale(1);} 50%{transform:translateY(-35px) translateX(20px) scale(1.2);} }
      @keyframes floatShape6 { 0%,100%{transform:translateY(0) translateX(0) rotate(0);} 33%{transform:translateY(-15px) translateX(10px) rotate(60deg);} 66%{transform:translateY(10px) translateX(-25px) rotate(120deg);} }

      @keyframes float { 0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-20px) rotate(1deg);} }
      @keyframes pulse { 0%{opacity:0.5;} 100%{opacity:0.8;} }

      .hero-content { text-align:center; color:var(--text-light); z-index:2; position:relative; max-width:900px; padding:0 2rem; }
      .hero-subtitle { font-size:1.1rem; font-weight:500; letter-spacing:2px; text-transform:uppercase; opacity:0; transform:translateY(30px); animation:fadeInUp 1s ease 0.2s forwards; margin-bottom:1rem; color:rgba(255,255,255,0.8); }
      .hero h1 { font-family:'Segoe UI','Roboto','Helvetica Neue','Arial',sans-serif; font-size:5rem; font-weight:700; margin-bottom:1.5rem; opacity:0; transform:translateY(30px); animation:fadeInUp 1s ease 0.4s forwards; line-height:1.1; letter-spacing:-1px; }
      .hero .subtitle { font-size:1.3rem; margin-bottom:3rem; opacity:0; transform:translateY(30px); animation:fadeInUp 1s ease 0.6s forwards; color:rgba(255,255,255,0.9); font-weight:400; max-width:600px; margin-left:auto; margin-right:auto; }
      .cta-button { display:inline-block; padding:1.2rem 3rem; background:rgba(255,255,255,0.2); color:var(--text-light); text-decoration:none; border-radius:50px; font-weight:600; font-size:1rem; transform:translateY(30px); opacity:0; animation:fadeInUp 1s ease 0.8s forwards; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); border:2px solid rgba(255,255,255,0.3); backdrop-filter:blur(10px); letter-spacing:0.5px; }
      .cta-button:hover { transform:translateY(-3px); background:rgba(255,255,255,0.25); box-shadow:0 20px 40px rgba(0,0,0,0.2); border-color:rgba(255,255,255,0.4); }

      @keyframes fadeInUp { to { opacity:1; transform:translateY(0); } }

      .scroll-indicator { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); width:30px; height:50px; border:2px solid rgba(255,255,255,0.6); border-radius:25px; cursor:pointer; transition:all 0.3s ease; }
      .scroll-indicator:hover { border-color:rgba(255,255,255,0.9); }
      .scroll-indicator::before { content:''; position:absolute; top:10px; left:50%; width:6px; height:6px; background:rgba(255,255,255,0.8); border-radius:50%; transform:translateX(-50%); animation:scroll 2s infinite; }
      @keyframes scroll { 0%{transform:translateX(-50%) translateY(0);opacity:1;} 100%{transform:translateX(-50%) translateY(20px);opacity:0;} }
    </style>

    <section id="home" class="hero">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
      <div class="hero-content">
        <div class="hero-subtitle">Creative Designer</div>
        <h1>Transforming Ideas Into Beautiful Experiences</h1>
        <p class="subtitle">I craft digital experiences that captivate, engage, and inspire through thoughtful design and innovative solutions</p>
        <a href="#portfolio" class="cta-button">Explore My Work</a>
      </div>
      <div class="scroll-indicator"></div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: 'neural-hero',
    label: `
    <div style="width:100%;height:60px;border:1px solid #ddd;border-radius:4px;
                background:linear-gradient(135deg,#2a004f,#000);
                display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#fff;">
      Neural Hero
    </div>
  `,
    content: `
    <style>
      .neural-hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(135deg, #2a004f, #000000 60%, #1a0033);
        color: #fff;
        padding: 60px 20px;
        font-family: 'Segoe UI', sans-serif;
        position: relative;
        overflow: hidden;
      }

      .neural-hero h5 {
        letter-spacing: 2px;
        font-size: 14px;
        font-weight: 500;
        color: #bbb;
        margin-bottom: 10px;
      }

      .neural-hero h1 {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 20px;
        background: linear-gradient(to right, #e4b4ff, #b37bff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .neural-hero p {
        font-size: 16px;
        max-width: 700px;
        margin: 0 auto 40px;
        color: #ccc;
        line-height: 1.6;
      }

      .neural-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin-bottom: 40px;
      }

      .neural-card {
        flex: 1 1 120px;
        max-width: 160px;
        padding: 20px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fff;
      }

      .neural-card h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 6px;
        background: linear-gradient(to right, #ffb8ec, #d08bff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .neural-card span {
        font-size: 12px;
        color: #bbb;
      }

      .neural-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
      }

      .neural-buttons a {
        padding: 12px 28px;
        border-radius: 25px;
        font-weight: 600;
        text-decoration: none;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .btn-pink {
        background: linear-gradient(to right, #ff4f9b, #ff77a9);
        color: #fff;
      }

      .btn-pink:hover {
        opacity: 0.9;
      }

      .btn-outline {
        border: 2px solid #bbb;
        color: #fff;
      }

      .btn-outline:hover {
        background: rgba(255,255,255,0.1);
      }
    </style>

    <section class="neural-hero">
      <h5>WELCOME TO THE FUTURE</h5>
      <h1>NEURAL INTERFACE</h1>
      <p>
        Experience the convergence of consciousness and technology through
        quantum-enhanced glassmorphism interfaces. Step into a reality where
        digital dreams become tangible experiences, transcending the
        boundaries between mind and machine.
      </p>

      <div class="neural-stats">
        <div class="neural-card">
          <h3>99.9%</h3>
          <span>NEURAL SYNC RATE</span>
        </div>
        <div class="neural-card">
          <h3>∞</h3>
          <span>PROCESSING POWER</span>
        </div>
        <div class="neural-card">
          <h3>0.001</h3>
          <span>LATENCY (MS)</span>
        </div>
        <div class="neural-card">
          <h3>24/7</h3>
          <span>NEURAL ACCESS</span>
        </div>
      </div>

      <div class="neural-buttons">
        <a href="#" class="btn-pink">INITIALIZE NEURAL LINK</a>
        <a href="#" class="btn-outline">EXPLORE MATRIX</a>
      </div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: 'hero-with-image',
    label: `
    <div style="width:100%;height:60px;border:1px solid #ddd;border-radius:4px;
                background:#f8f9ff;display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#333;">
      Hero w/ Image
    </div>
  `,
    content: `
    <style>
      .hero-img {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        padding: 60px 20px;
        background: linear-gradient(135deg, #f5f8ff, #eef2ff);
        font-family: 'Segoe UI', sans-serif;
        color: #222;
        flex-wrap: wrap;
      }

      .hero-img-content {
        flex: 1 1 400px;
        max-width: 600px;
      }

      .hero-img-content h1 {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 20px;
        background: linear-gradient(to right, #4a3aff, #8a7bff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero-img-content p {
        font-size: 16px;
        color: #555;
        margin-bottom: 28px;
        line-height: 1.6;
      }

      .hero-buttons {
        display: flex;
        gap: 16px;
      }

      .hero-buttons a {
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .btn-primary {
        background: #4a3aff;
        color: #fff;
      }

      .btn-primary:hover {
        background: #372acb;
      }

      .btn-secondary {
        border: 2px solid #4a3aff;
        color: #4a3aff;
      }

      .btn-secondary:hover {
        background: #f1f0ff;
      }

      .hero-img-graphic {
        flex: 1 1 300px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hero-img-graphic img {
        max-width: 100%;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }
    </style>

    <section class="hero-img">
      <div class="hero-img-content">
        <h1>Build the Future with Us</h1>
        <p>
          Unlock your potential with cutting-edge technology and solutions designed 
          to help you succeed. Join the revolution and explore endless opportunities.
        </p>
        <div class="hero-buttons">
          <a href="#" class="btn-primary">Get Started</a>
          <a href="#" class="btn-secondary">Learn More</a>
        </div>
      </div>
      <div class="hero-img-graphic">
        <img src="https://via.placeholder.com/500x350.png?text=Your+Hero+Image" alt="Hero Image" />
      </div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: 'hero-full-bg',
    label: `
    <div style="width:100%;height:60px;border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#333;">
      Hero Full BG
    </div>
  `,
    content: `
    <style>
      .hero-full-bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url('https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
          no-repeat center center/cover;
        display: flex;
        align-items: center;
        padding: 60px;
        box-sizing: border-box;
        color: #fff;
        font-family: 'Segoe UI', sans-serif;
      }

      .hero-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.35);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        max-width: 600px;
      }

      .hero-tag {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #ff4d4d;
        margin-bottom: 12px;
      }

      .hero-title {
        font-size: 42px;
        font-weight: 300;
        margin-bottom: 24px;
        line-height: 1.2;
      }

      .hero-btn {
        display: inline-block;
        padding: 12px 22px;
        background: #fff;
        color: #111;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.3s ease;
      }

      .hero-btn:hover {
        background: #f1f1f1;
      }
    </style>

    <section class="hero-full-bg">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-tag">INVESTORS</div>
        <h1 class="hero-title">2025 half year results</h1>
        <a href="#" class="hero-btn">SEE OUR RESULTS →</a>
      </div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: 'hero-with-editable-bs',
    label: `
    <div style="width:100%;height:60px;border:1px solid #ddd;border-radius:4px;
                background:#fafafa;display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#333;">
      Hero w/ Editable Img
    </div>
  `,
    content: `
    <div class="card" style="width: 18rem;">
      <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some example text with Bootstrap classes.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  `,
    category: 'Hero bootstrap'
  },
  {
    id: "image-card",
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div style="width:100%;height:60px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;">
        Background Image hero
      </div>
    </div>
    `,
    content: `
      <section style="position:relative; width:100%; max-width:100%; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
        <img src="https://via.placeholder.com/1200x400" alt="Card Image" style="width:100%; height:auto; display:block;" />
        
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; color:white; background:rgba(0,0,0,0.4); padding:20px; border-radius:8px;">
          <h2 style="margin:0; font-size:28px;">Card Title</h2>
          <p style="margin:10px 0; font-size:16px;">This is the description of the image card.</p>
          <button style="padding:10px 20px; background:#ff6600; color:white; border:none; border-radius:6px; cursor:pointer;">Click Me</button>
        </div>
      </section>
    `,
    category: "Hero",
  },
  {
    id: "About-card",
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div style="width:100%;height:60px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;">
        About Card
      </div>
    </div>
    `,
    content: `
    <style>
    :root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    --accent-pink: #ec4899;
    --accent-cyan: #06b6d4;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-light: #ffffff;
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-dark: #0f172a;
    --bg-card: rgba(255, 255, 255, 0.95);
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-tertiary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-elegant: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --glass: rgba(255, 255, 255, 0.15);
    --glass-border: rgba(255, 255, 255, 0.2);
}

body {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    line-height: 1.7;
    color: var(--text-primary);
    scroll-behavior: smooth;
    overflow-x: hidden;
    background: var(--bg-primary);
}

section {
    padding: 8rem 0;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    text-align: center;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 3.5rem;
    font-weight: 600;
    margin-bottom: 4rem;
    background: var(--gradient-elegant);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
}

.about {
    background: var(--bg-secondary);
    position: relative;
}

.about::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
}

.about-content {
    display: grid;

    grid-template-columns: 1fr 1.5fr;
    gap: 6rem;
    align-items: center;
    position: relative;
}

.about-image {
    width: 100%;
    height: 500px;
    background: url('images/smiling-girl-computer-desktop.jpg') center/cover;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-2xl);
    transform: rotate(-2deg);
    transition: transform 0.4s ease;
}

.about-image:hover {
    transform: rotate(0deg) scale(1.02);
}

.about-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%);
    transition: opacity 0.3s ease;
}

.about-image:hover::before {
    opacity: 0.7;
}

.about-image::after {}

.about-text h3 {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
    font-weight: 500;
    line-height: 1.3;
}

.about-text p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.8;
}

.skills {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 3rem;
}

.skill-tag {
    padding: 0.75rem 1.5rem;
    background: var(--bg-card);
    color: var(--primary-color);
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid rgba(99, 102, 241, 0.2);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.skill-tag:hover {
    background: var(--primary-color);
    color: var(--text-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
    </style>
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title fade-in">About Me</h2>
            <div class="about-content">
                <img src="images/smiling-girl-computer-desktop.jpg" class="about-image slide-in-left" alt="About Me">
                <div class="about-text slide-in-right">
                    <h3>Passionate about creating meaningful digital experiences</h3>
                    <p>With over 5 years of experience in digital design, I specialize in creating user-centered solutions that bridge the gap between functionality and aesthetics. My approach combines strategic thinking with creative execution to deliver impactful results.</p>
                    <p>I believe that great design is not just about how it looks, but how it works and how it makes people feel. Every project is an opportunity to solve problems and create connections that matter.</p>
                    <p>When I'm not designing, you'll find me exploring new technologies, sketching ideas, or seeking inspiration in nature and architecture.</p>
                    <div class="skills">
                        <span class="skill-tag">UI/UX Design</span>
                        <span class="skill-tag">Web Development</span>
                        <span class="skill-tag">Brand Identity</span>
                        <span class="skill-tag">Motion Graphics</span>
                        <span class="skill-tag">Prototyping</span>
                        <span class="skill-tag">Design Systems</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    category: "Card",
  },
  {
    id: 'Portfolio',
    label: `
    <div style="width:100px; height:70px; background:#fff; border:1px solid #ddd; border-radius:4px; padding:6px; display:grid; grid-template-columns:repeat(3,1fr); gap:4px;">
      <div style="background:#bbb; height:100%; border-radius:2px;"></div>
      <div style="background:#bbb; height:100%; border-radius:2px;"></div>
      <div style="background:#bbb; height:100%; border-radius:2px;"></div>
    </div>
  `,
    content: `<div style="width:100%; background:#f9f9f9; padding:60px 20px; font-family:Arial, sans-serif; box-sizing:border-box;">
  <div style="max-width:1100px; margin:0 auto; text-align:center;">
    <!-- Heading -->
    <h2 style="font-size:32px; font-weight:bold; margin-bottom:10px; color:#333;">My Portfolio</h2>
    <p style="font-size:16px; color:#555; margin-bottom:40px;">
      Here are some of my recent projects showcasing my skills and creativity.
    </p>

    <!-- Portfolio Grid -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
      
      <!-- Card 1 -->
      <div style="background:#fff; border-radius:12px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden; text-align:left;">
     <img src="https://via.placeholder.com/300" 
           alt="Image" 
           style="max-width:100%; height:auto;"
           data-gjs-type="image" />        <div style="padding:20px;">
          <h3 style="font-size:20px; margin-bottom:10px; color:#222;">Project One</h3>
          <p style="font-size:14px; color:#666; margin-bottom:15px;">A modern e-commerce website built using React and MongoDB.</p>
          <a href="#" style="display:inline-block; padding:10px 16px; background:#007bff; color:#fff; text-decoration:none; border-radius:6px;">View Project</a>
        </div>
      </div>

      <!-- Card 2 -->
      <div style="background:#fff; border-radius:12px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden; text-align:left;">
     <img src="https://via.placeholder.com/300" 
           alt="Image" 
           style="max-width:100%; height:auto;"
           data-gjs-type="image" />        <div style="padding:20px;">
          <h3 style="font-size:20px; margin-bottom:10px; color:#222;">Project Two</h3>
          <p style="font-size:14px; color:#666; margin-bottom:15px;">A responsive blog platform with admin panel integration.</p>
          <a href="#" style="display:inline-block; padding:10px 16px; background:#007bff; color:#fff; text-decoration:none; border-radius:6px;">View Project</a>
        </div>
      </div>

      <!-- Card 3 -->
      <div style="background:#fff; border-radius:12px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden; text-align:left;">
     <img src="https://via.placeholder.com/300" 
           alt="Image" 
           style="max-width:100%; height:auto;"
           data-gjs-type="image" />        <div style="padding:20px;">
          <h3 style="font-size:20px; margin-bottom:10px; color:#222;">Project Three</h3>
          <p style="font-size:14px; color:#666; margin-bottom:15px;">A mobile app created with Flutter and Firebase backend.</p>
          <a href="#" style="display:inline-block; padding:10px 16px; background:#007bff; color:#fff; text-decoration:none; border-radius:6px;">View Project</a>
        </div>
      </div>

    </div>
  </div>
</div>
`,
    category: 'Portfolio Blog',
  },
  {
    id: "Contact-card ",
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div style="width:100%;height:60px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;">
        Contact Card
      </div>
    </div>
    `,

    content: `
    <style>
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #f59e0b;
  --accent-pink: #ec4899;
  --accent-cyan: #06b6d4;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-light: #ffffff;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-dark: #0f172a;
  --bg-card: rgba(255, 255, 255, 0.95);
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-elegant: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

body {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.7;
  color: var(--text-primary);
  scroll-behavior: smooth;
  background: var(--bg-primary);
  margin: 0;
  padding: 0;
}

/* Custom container (Bootstrap free) */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact {
  background: linear-gradient(135deg, #3b4cb8 0%, #4a2c65 50%, #9c35a8 100%);
  color: var(--text-light);
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="contact-grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23contact-grid)"/></svg>');
  animation: contactFloat 30s ease-in-out infinite;
  opacity: 0.6;
}

.contact::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  animation: contactPulse 6s ease-in-out infinite alternate;
}

.contact-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.contact .section-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-form {
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.form-group label {
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 1.2rem;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 15px;
  background: rgba(255,255,255,0.08);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  background: rgba(255,255,255,0.12);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-btn {
  padding: 1.2rem 3rem;
  background: var(--gradient-primary);
  color: var(--text-light);
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(99,102,241,0.3);
}

/*  Animations */
@keyframes contactFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes contactPulse {
  0% { opacity: 0.4; }
  100% { opacity: 0.7; }
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact .section-title {
    font-size: 2.2rem;
  }
}
</style>

<section id="contact" class="contact">
  <div class="container">
    <div class="contact-content">
      <h2 class="section-title">Let's Work Together</h2>
      <p>Ready to bring your vision to life? Let's discuss how we can create something amazing together.</p>
      <form class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your full name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
          </div>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="What's this about?" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" placeholder="Tell me about your project..." required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</section>

    `,
    category: "Contact Card",
  },
  {
    id: 'hero-slider',
    label: 'Hero Slider',
    content: `
    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://via.placeholder.com/1920x600" class="d-block w-100" alt="Slide 1">
          <div class="carousel-caption d-none d-md-block">
            <h5>First Slide Heading</h5>
            <p>Some representative placeholder content for the first slide.</p>
            <a href="#" class="btn btn-primary">Shop Now</a>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://via.placeholder.com/1920x600" class="d-block w-100" alt="Slide 2">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second Slide Heading</h5>
            <p>Some representative placeholder content for the second slide.</p>
            <a href="#" class="btn btn-success">Explore</a>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://via.placeholder.com/1920x600" class="d-block w-100" alt="Slide 3">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third Slide Heading</h5>
            <p>Some representative placeholder content for the third slide.</p>
            <a href="#" class="btn btn-warning">Contact Us</a>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `,
    category: 'Zay / Hero'
  },
  {
    id: 'featured-products',
    label: 'Featured Products',
    content: `
    <section class="py-5">
      <div class="container">
        <div class="row text-center mb-4">
          <div class="col-lg-6 m-auto">
            <h1 class="h1">Featured Products</h1>
            <p>
              Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>
        <div class="row">
          <!-- Product 1 -->
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <a href="#"><img src="https://via.placeholder.com/600x400" class="card-img-top" alt="Product 1"></a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-muted fa fa-star"></i><i class="text-muted fa fa-star"></i></li>
                  <li class="text-muted text-right">$240.00</li>
                </ul>
                <a href="#" class="h2 text-decoration-none text-dark">Product Title</a>
                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                </p>
                <p class="text-muted">Reviews (24)</p>
              </div>
            </div>
          </div>
          <!-- Product 2 -->
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <a href="#"><img src="https://via.placeholder.com/600x400" class="card-img-top" alt="Product 2"></a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-muted fa fa-star"></i></li>
                  <li class="text-muted text-right">$480.00</li>
                </ul>
                <a href="#" class="h2 text-decoration-none text-dark">Product Title</a>
                <p class="card-text">
                  Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.
                </p>
                <p class="text-muted">Reviews (48)</p>
              </div>
            </div>
          </div>
          <!-- Product 3 -->
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <a href="#"><img src="https://via.placeholder.com/600x400" class="card-img-top" alt="Product 3"></a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i></li>
                  <li class="text-muted text-right">$360.00</li>
                </ul>
                <a href="#" class="h2 text-decoration-none text-dark">Product Title</a>
                <p class="card-text">
                  Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum.
                </p>
                <p class="text-muted">Reviews (74)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / Featured Products'
  },
  {
    id: 'call-to-action',
    label: 'Call to Action',
    content: `
    <section class="py-5 bg-light">
      <div class="container my-4">
        <div class="row text-center py-3">
          <div class="col-lg-9 m-auto">
            <h1 class="h1">Call to Action</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, earum!
              Voluptatem asperiores consectetur, molestiae voluptatum, quaerat minima.
            </p>
          </div>
          <div class="col-lg-3 m-auto">
            <a class="btn btn-primary btn-lg" href="#">Shop Now</a>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / Call-to-Action'
  },
  {
    id: 'about-us-top',
    label: 'About Us Top',
    content: `
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row py-5">
          <div class="col-lg-12 text-center">
            <h1 class="h1">About Us</h1>
            <p class="lead">
              <a href="#" class="text-decoration-none text-muted">Home</a> / About Us
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / About Us'
  },
  {
    id: 'about-us-content',
    label: 'About Us Content',
    content: `
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="https://via.placeholder.com/600x400" alt="About Us" class="img-fluid rounded shadow">
          </div>
          <div class="col-lg-6">
            <h2 class="h2">Our Story</h2>
            <p class="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, dicta!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet malesuada, 
              sapien sapien varius orci, in facilisis lorem enim ut nulla. Integer vel orci nec velit luctus 
              tincidunt non a magna.
            </p>
            <a href="#" class="btn btn-outline-primary mt-3">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / About Us'
  },
  {
    id: 'contact-top',
    label: 'Contact Top',
    content: `
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row py-5">
          <div class="col-lg-12 text-center">
            <h1 class="h1">Contact Us</h1>
            <p class="lead">
              <a href="#" class="text-decoration-none text-muted">Home</a> / Contact Us
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / Contact'
  },
  {
    id: 'contact-form',
    label: 'Contact Form',
    content: `
    <section class="py-5">
      <div class="container">
        <div class="row">
          <!-- Contact Form -->
          <div class="col-lg-6 mb-4">
            <h2 class="h2">Get In Touch</h2>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Your Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Your Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email">
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea class="form-control" id="message" rows="5" placeholder="Write your message"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>

          <!-- Map -->
          <div class="col-lg-6">
            <h2 class="h2">Find Us</h2>
            <div class="ratio ratio-16x9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509619!2d144.95373631531593!3d-37.81627974202106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE5LjQiRQ!5e0!3m2!1sen!2sin!4v1614312741234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / Contact'
  },
  {
    id: 'shop-top',
    label: 'Shop Top',
    content: `
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row py-5">
          <div class="col-lg-12 text-center">
            <h1 class="h1">Shop</h1>
            <p class="lead">
              <a href="#" class="text-decoration-none text-muted">Home</a> / Shop
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
    category: 'Zay / Shop'
  },
  {
    id: 'shop-products',
    label: 'Shop Products',
    content: `
    <section class="py-5">
      <div class="container">
        <div class="row">

          <!-- Product Card 1 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <img src="https://via.placeholder.com/400x300" class="card-img-top" alt="Product">
              <div class="card-body">
                <h5 class="card-title">Product Name</h5>
                <p class="card-text">Short description of the product.</p>
                <p class="text-primary">$49.00</p>
                <a href="#" class="btn btn-outline-primary">Add to Cart</a>
              </div>
            </div>
          </div>

          <!-- Product Card 2 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <img src="https://via.placeholder.com/400x300" class="card-img-top" alt="Product">
              <div class="card-body">
                <h5 class="card-title">Product Name</h5>
                <p class="card-text">Short description of the product.</p>
                <p class="text-primary">$59.00</p>
                <a href="#" class="btn btn-outline-primary">Add to Cart</a>
              </div>
            </div>
          </div>

          <!-- Product Card 3 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <img src="https://via.placeholder.com/400x300" class="card-img-top" alt="Product">
              <div class="card-body">
                <h5 class="card-title">Product Name</h5>
                <p class="card-text">Short description of the product.</p>
                <p class="text-primary">$69.00</p>
                <a href="#" class="btn btn-outline-primary">Add to Cart</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
    category: 'Zay / Shop'
  },
  {
    id: 'shop-products-client-lib-trial',
    label: 'Shop Products - Client Lib Trial',
    content: `
    <nav id="navbar">
        <div class="nav-container">
            <div class="logo">Personal Shape</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
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
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
            <div class="shape shape-5"></div>
            <div class="shape shape-6"></div>
        </div>
        <div class="hero-content">
            <div class="hero-subtitle">Creative Designer</div>
            <h1>Transforming Ideas Into Beautiful Experiences</h1>
            <p class="subtitle">I craft digital experiences that captivate, engage, and inspire through thoughtful design and innovative solutions</p>
            <a href="#portfolio" class="cta-button">Explore My Work</a>
        </div>
        <div class="scroll-indicator" onclick="document.getElementById('about').scrollIntoView()"></div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title fade-in">About Me</h2>
            <div class="about-content">
                <div class="about-image slide-in-left"></div>
                <div class="about-text slide-in-right">
                    <h3>Passionate about creating meaningful digital experiences</h3>
                    <p>With over 5 years of experience in digital design, I specialize in creating user-centered solutions that bridge the gap between functionality and aesthetics. My approach combines strategic thinking with creative execution to deliver impactful results.</p>
                    <p>I believe that great design is not just about how it looks, but how it works and how it makes people feel. Every project is an opportunity to solve problems and create connections that matter.</p>
                    <p>When I'm not designing, you'll find me exploring new technologies, sketching ideas, or seeking inspiration in nature and architecture.</p>
                    <div class="skills">
                        <span class="skill-tag">UI/UX Design</span>
                        <span class="skill-tag">Web Development</span>
                        <span class="skill-tag">Brand Identity</span>
                        <span class="skill-tag">Motion Graphics</span>
                        <span class="skill-tag">Prototyping</span>
                        <span class="skill-tag">Design Systems</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="portfolio">
        <div class="container">
            <h2 class="section-title fade-in">Featured Work</h2>
            <div class="portfolio-grid">
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>E-commerce Platform</h4>
                        <p>A modern, responsive e-commerce solution with focus on user experience and conversion optimization. Built with scalability and performance in mind.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Node.js</span>
                            <span class="tech-tag">MongoDB</span>
                            <span class="tech-tag">Stripe</span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>Brand Identity System</h4>
                        <p>Complete visual identity redesign for a tech startup, including logo, guidelines, and digital assets. Creating a cohesive brand experience across all touchpoints.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">Illustrator</span>
                            <span class="tech-tag">Photoshop</span>
                            <span class="tech-tag">Figma</span>
                            <span class="tech-tag">After Effects</span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>Mobile App Design</h4>
                        <p>Intuitive mobile app interface for a fitness tracking application with focus on accessibility and user engagement through gamification.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">Figma</span>
                            <span class="tech-tag">Principle</span>
                            <span class="tech-tag">React Native</span>
                            <span class="tech-tag">Lottie</span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>Dashboard Interface</h4>
                        <p>Clean and functional dashboard design for data analytics platform with complex information architecture and real-time data visualization.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">Vue.js</span>
                            <span class="tech-tag">D3.js</span>
                            <span class="tech-tag">SCSS</span>
                            <span class="tech-tag">Chart.js</span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>Marketing Website</h4>
                        <p>Modern marketing website with interactive animations and optimized conversion funnels. Built for maximum performance and SEO.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">Next.js</span>
                            <span class="tech-tag">Framer Motion</span>
                            <span class="tech-tag">Tailwind CSS</span>
                            <span class="tech-tag">Vercel</span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-image"></div>
                    <div class="portfolio-content">
                        <h4>Creative Portfolio</h4>
                        <p>Artistic portfolio website featuring immersive galleries, smooth transitions, and creative storytelling for a digital artist.</p>
                        <div class="portfolio-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Three.js</span>
                            <span class="tech-tag">GSAP</span>
                            <span class="tech-tag">WebGL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="contact-floating-shapes">
            <div class="contact-shape contact-shape-1"></div>
            <div class="contact-shape contact-shape-2"></div>
            <div class="contact-shape contact-shape-3"></div>
            <div class="contact-shape contact-shape-4"></div>
            <div class="contact-shape contact-shape-5"></div>
            <div class="contact-shape contact-shape-6"></div>
        </div>
        <div class="container">
            <div class="contact-content">
                <h2 class="section-title fade-in">Let's Work Together</h2>
                <p class="fade-in">Ready to bring your vision to life? Let's discuss how we can create something amazing together. I'm always excited to take on new challenges and collaborate on innovative projects.</p>
                <form class="contact-form fade-in">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your full name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="What's this about?" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="6" placeholder="Tell me about your project..." required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    </section>


`,
    category: 'Zay / Shop client lib trial'
  },

















]