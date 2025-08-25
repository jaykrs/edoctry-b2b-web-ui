import type { BlockProperties } from 'grapesjs';

export const hero: BlockProperties[] = [
  {
    id: 'hero-without-img',
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div style="font-size:12px;font-weight:bold;">Hero Section</div>
      <div style="width:100%;height:60px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#f0f8ff;color:#333;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;gap:2px;">
        <div style="font-weight:bold;">Welcome to Our Website</div>
        <div>Subheading text here...</div>
        <button style="margin-top:2px;padding:2px 6px;font-size:9px;background:#007bff;color:#fff;border:none;border-radius:2px;">Get Started</button>
      </div>
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
    id: 'hero-bg-image',
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div style="font-size:12px;font-weight:bold;">Hero Section (BG Image)</div>
      <div style="width:100%;height:60px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:url('https://via.placeholder.com/300x100') center/cover no-repeat;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;gap:2px;">
        <div style="font-weight:bold;text-shadow:0 1px 2px rgba(0,0,0,0.6);">Welcome to Our Website</div>
        <div style="text-shadow:0 1px 2px rgba(0,0,0,0.6);">Subheading text here...</div>
        <button style="margin-top:2px;padding:2px 6px;font-size:9px;background:#007bff;color:#fff;border:none;border-radius:2px;">Get Started</button>
      </div>
    </div>
  `,
    content: `
    <section style="background:url('https://via.placeholder.com/1600x600') center/cover no-repeat;padding:80px 20px;text-align:center;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:800px;margin:0 auto;background:rgba(0,0,0,0.4);padding:40px;border-radius:8px;">
        <h1 style="font-size:36px;font-weight:bold;margin-bottom:16px;">Welcome to Our Website</h1>
        <p style="font-size:18px;color:#f0f0f0;margin-bottom:24px;">
          We provide the best solutions to help you grow and succeed.
        </p>
        <a href="#" style="display:inline-block;padding:12px 24px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;font-size:16px;font-weight:bold;">
          Get Started
        </a>
      </div>
    </section>
  `,
    category: 'Hero'
  },
  {
    id: "carousel-block",
    label: `
      <div style="text-align:center; font-size:12px;">
        <strong>Carousel</strong>
      </div>
    `,
    content: `
      <div class="custom-carousel" style="position:relative; overflow:hidden; width:100%; max-width:600px; margin:auto;">
        <div class="carousel-inner" style="display:flex; transition:transform 0.5s ease;">
          <img src="https://picsum.photos/id/1018/600/300" style="width:100%; flex-shrink:0;" class="carousel-img" />
          <img src="https://picsum.photos/id/1025/600/300" style="width:100%; flex-shrink:0;" class="carousel-img" />
          <img src="https://picsum.photos/id/1035/600/300" style="width:100%; flex-shrink:0;" class="carousel-img" />
        </div>
        <button class="prev" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); background:#000; color:#fff; border:none; padding:5px 10px; cursor:pointer;">❮</button>
        <button class="next" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:#000; color:#fff; border:none; padding:5px 10px; cursor:pointer;">❯</button>
      </div>
      <script>
        const carousels = document.querySelectorAll('.custom-carousel');
        carousels.forEach(carousel => {
          let index = 0;
          const inner = carousel.querySelector('.carousel-inner');
          const imgs = carousel.querySelectorAll('.carousel-img');
          const total = imgs.length;
          carousel.querySelector('.next').onclick = () => {
            index = (index + 1) % total;
            inner.style.transform = 'translateX(' + (-index * 100) + '%)';
          };
          carousel.querySelector('.prev').onclick = () => {
            index = (index - 1 + total) % total;
            inner.style.transform = 'translateX(' + (-index * 100) + '%)';
          };
        });
      </script>
    `,
  },
  {
    id: "image-card",
    label: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
        <div style="font-size:12px; font-weight:bold;">Image Card</div>
        <img src="https://via.placeholder.com/150" style="width:40px; border-radius:4px;" />
      </div>
    `,
    content: `
      <div style="position:relative; width:100%; max-width:100%; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
        <img src="https://via.placeholder.com/1200x400" alt="Card Image" style="width:100%; height:auto; display:block;" />
        
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; color:white; background:rgba(0,0,0,0.4); padding:20px; border-radius:8px;">
          <h2 style="margin:0; font-size:28px;">Card Title</h2>
          <p style="margin:10px 0; font-size:16px;">This is the description of the image card.</p>
          <button style="padding:10px 20px; background:#ff6600; color:white; border:none; border-radius:6px; cursor:pointer;">Click Me</button>
        </div>
      </div>
    `,
    category: "Custom Cards",
  },
  {
    id: 'Bea system',
    label: `
    <div style="display:flex; flex-direction:column; align-items:center; gap:4px; padding:8px;">
      <img src="https://via.placeholder.com/150x80" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
      <div style="font-size:12px; font-weight:bold; text-align:center;">Hero - Combat Air</div>
    </div>
  `,
    content: `
<div style="position: relative; width: 100%; overflow: hidden; font-family: Arial, sans-serif; color: white;">
  <!-- Background Image -->
  <img src="https://via.placeholder.com/1600x600" 
       alt="Hero Image" 
       style="width: 100%; height: auto; display: block; margin: 0; padding: 0;" />

  <!-- Overlay Content -->
  <div style="position: absolute; bottom: 60px; left: 60px; max-width: 600px;">
    <!-- Small Title -->
    <div style="font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
      <span style="width: 10px; height: 10px; background-color: #ff3b00; display: inline-block; border-radius: 2px;"></span>
      GLOBAL COMBAT AIR PROGRAMME
    </div>

    <!-- Main Heading -->
    <h1 style="font-size: 42px; font-weight: 300; line-height: 1.2; margin: 0 0 20px 0;">
      The future of combat air is here
    </h1>

    <!-- Button -->
    <a href="#" 
       style="display: inline-block; padding: 12px 24px; background: white; color: black; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 4px;">
      READ MORE →
    </a>
  </div>

  <!-- Slider Dots -->
  <div style="position: absolute; bottom: 20px; right: 40px; display: flex; gap: 10px; align-items: center;">
    <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #888; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #888; border-radius: 50%;"></div>
  </div>
</div>

  `,
    category: 'Hero'
  },
  {
    id: 'Bea three card container',
    label: `
  <div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px; width:180px;">
    <img src="https://via.placeholder.com/180x100" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
    <div style="display:flex; justify-content:space-between; gap:4px; width:100%; margin-top:6px;">
      <div style="flex:1; background:#f1f1f1; border-radius:4px; padding:6px; text-align:center; font-size:10px; font-weight:bold;">EMP</div>
      <div style="flex:1; background:#f1f1f1; border-radius:4px; padding:6px; text-align:center; font-size:10px; font-weight:bold;">ORDER</div>
      <div style="flex:1; background:#f1f1f1; border-radius:4px; padding:6px; text-align:center; font-size:10px; font-weight:bold;">CNTRY</div>
    </div>
    <div style="font-size:12px; font-weight:bold; text-align:center;">Stats - 3 Cards</div>
  </div>
`,

    content: `
<div style="position: relative; width: 100%; overflow: hidden; font-family: Arial, sans-serif;">
  <!-- Background Image -->
  <img src="https://via.placeholder.com/1600x600" 
       alt="Background" 
       style="width: 100%; height: auto; display: block; margin: 0; padding: 0;" />

  <!-- Content Overlay -->
  <div style="position: absolute; top: 40px; left: 60px; color: white; font-size: 14px; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
    <span style="width: 10px; height: 10px; background-color: #ff3b00; display: inline-block; border-radius: 2px;"></span>
    ABOUT BAE SYSTEMS
  </div>

  <!-- Cards Container -->
  <div style="position: absolute; top: 120px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; width: 90%;">
    
    <!-- Card 1 -->
    <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.85); border-radius: 10px; padding: 30px; text-align: center; max-width: 300px;">
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; color: #444;">EMPLOYEES</div>
      <div style="font-size: 42px; font-weight: 300; margin-bottom: 10px; color: #000;">~110,000</div>
      <div style="font-size: 14px; color: #333;">Our skilled workforce provides a competitive edge</div>
    </div>

    <!-- Card 2 -->
    <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.85); border-radius: 10px; padding: 30px; text-align: center; max-width: 300px;">
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; color: #444;">ORDER BACKLOG</div>
      <div style="font-size: 42px; font-weight: 300; margin-bottom: 10px; color: #000;">£75.4bn</div>
      <div style="font-size: 14px; color: #333;">Figure from our 2025 half year results</div>
    </div>

    <!-- Card 3 -->
    <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.85); border-radius: 10px; padding: 30px; text-align: center; max-width: 300px;">
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; color: #444;">COUNTRIES</div>
      <div style="font-size: 42px; font-weight: 300; margin-bottom: 10px; color: #000;">40+</div>
      <div style="font-size: 14px; color: #333;">We are one of the largest global defence companies</div>
    </div>

  </div>
</div>

  `,
    category: 'Hero'
  },
  {
    id: 'Bea news card container',
    label: `
  <div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px; width:200px;">
    <div style="display:flex; justify-content:space-between; gap:4px; width:100%;">
      <div style="flex:1;">
        <img src="https://via.placeholder.com/90x60" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
        <div style="font-size:10px; text-align:center; margin-top:2px;">News</div>
      </div>
      <div style="flex:1;">
        <img src="https://via.placeholder.com/90x60" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
        <div style="font-size:10px; text-align:center; margin-top:2px;">Stories</div>
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; gap:4px; width:100%;">
      <div style="flex:1;">
        <img src="https://via.placeholder.com/90x60" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
        <div style="font-size:10px; text-align:center; margin-top:2px;">Insights</div>
      </div>
      <div style="flex:1;">
        <img src="https://via.placeholder.com/90x60" style="width:100%; height:auto; border-radius:4px; object-fit:cover;" />
        <div style="font-size:10px; text-align:center; margin-top:2px;">Events</div>
      </div>
    </div>
    <div style="font-size:12px; font-weight:bold; text-align:center; margin-top:4px;">Newsroom - 4 Cards</div>
  </div>
`,
    content: `
<section style="padding:60px 40px; font-family:Arial, sans-serif; max-width:1200px; margin:0 auto;">
  <!-- Top Heading -->
  <div style="margin-bottom:40px;">
    <div style="font-size:12px; font-weight:bold; color:#c00; letter-spacing:1px; margin-bottom:8px;">
      ● NEWSROOM
    </div>
    <h2 style="font-size:40px; font-weight:300; margin:0; color:#222;">
      Latest news, stories and insights
    </h2>
  </div>

  <!-- 4 Cards -->
  <div style="display:flex; gap:24px; flex-wrap:wrap;">
    <!-- Card 1 -->
    <div style="flex:1; min-width:220px;">
      <img src="https://via.placeholder.com/400x250" 
           alt="News" 
           style="width:100%; height:auto; border-radius:8px; object-fit:cover;"/>
      <div style="margin-top:12px; font-size:18px; color:#222;">News</div>
    </div>

    <!-- Card 2 -->
    <div style="flex:1; min-width:220px;">
      <img src="https://via.placeholder.com/400x250" 
           alt="Stories" 
           style="width:100%; height:auto; border-radius:8px; object-fit:cover;"/>
      <div style="margin-top:12px; font-size:18px; color:#222;">Stories</div>
    </div>

    <!-- Card 3 -->
    <div style="flex:1; min-width:220px;">
      <img src="https://via.placeholder.com/400x250" 
           alt="Insights" 
           style="width:100%; height:auto; border-radius:8px; object-fit:cover;"/>
      <div style="margin-top:12px; font-size:18px; color:#222;">Insights</div>
    </div>

    <!-- Card 4 -->
    <div style="flex:1; min-width:220px;">
      <img src="https://via.placeholder.com/400x250" 
           alt="Events" 
           style="width:100%; height:auto; border-radius:8px; object-fit:cover;"/>
      <div style="margin-top:12px; font-size:18px; color:#222;">Events</div>
    </div>
  </div>
</section>
  `,
    category: 'Hero'
  },
  {
    id: 'Bea sign up card',
    label: `
  <div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px; width:220px; font-family:Arial, sans-serif;">
    
    <!-- First Row -->
    <div style="display:flex; justify-content:space-between; gap:6px; width:100%;">
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60" 
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px;">News</div>
      </div>
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60" 
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px;">Stories</div>
      </div>
    </div>
    
    <!-- Second Row -->
    <div style="display:flex; justify-content:space-between; gap:6px; width:100%;">
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60" 
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px;">Insights</div>
      </div>
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60" 
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px;">Events</div>
      </div>
    </div>
    
    <!-- Title -->
    <div style="font-size:12px; font-weight:bold; text-align:center; margin-top:6px; color:#333;">
      Newsroom – 4 Cards
    </div>
  </div>
`,
    content: `
<section style="width:100%; background:#fafafa; padding:80px 60px; font-family:Arial, sans-serif; box-sizing:border-box;">
  <div style="display:flex; align-items:center; justify-content:space-between; max-width:1300px; margin:0 auto; gap:40px; flex-wrap:wrap;">
    
    <!-- Left Content -->
    <div style="flex:1; min-width:320px;">
      <div style="font-size:12px; font-weight:bold; color:#c00; letter-spacing:1px; margin-bottom:12px;">
        ● COMING SOON
      </div>
      <h2 style="font-size:44px; font-weight:300; line-height:1.2; margin:0 0 20px 0; color:#222;">
        Defence Asset Management report: Technology truths behind the scenes of defence
      </h2>
      <p style="font-size:16px; line-height:1.6; color:#444; margin-bottom:28px;">
        Sign up now for early exclusive access to our upcoming global report on defence asset management: 
        <strong>Technology truths behind the scenes of defence</strong> (due August 2025).
      </p>
      <button style="background:#e03300; color:#fff; border:none; padding:14px 28px; font-size:16px; font-weight:bold; border-radius:6px; cursor:pointer; letter-spacing:0.5px;">
        SIGN UP NOW →
      </button>
    </div>

    <!-- Right Image -->
    <div style="flex:1; min-width:320px; text-align:center;">
      <img src="https://via.placeholder.com/500x350" 
           alt="Report Preview" 
           style="max-width:100%; height:auto; border-radius:8px; box-shadow:0 8px 20px rgba(0,0,0,0.2); "/>
    </div>

  </div>
</section>

  `,
    category: 'card'
  },
  {
    id: 'Bea last card',
    label: `
  <div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px; width:220px; font-family:Arial, sans-serif;">

    <!-- First Row -->
    <div style="display:flex; justify-content:space-between; gap:6px; width:100%;">
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60"
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px; color:#444;">News</div>
      </div>
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60"
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px; color:#444;">Stories</div>
      </div>
    </div>

    <!-- Second Row -->
    <div style="display:flex; justify-content:space-between; gap:6px; width:100%;">
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60"
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px; color:#444;">Insights</div>
      </div>
      <div style="flex:1; text-align:center;">
        <img src="https://via.placeholder.com/90x60"
             style="width:100%; height:auto; border-radius:6px; object-fit:cover;"/>
        <div style="font-size:11px; margin-top:4px; color:#444;">Events</div>
      </div>
    </div>

    <!-- Title -->
    <div style="font-size:12px; font-weight:bold; text-align:center; margin-top:6px; color:#222;">
      Newsroom – 4 Cards
    </div>
  </div>
`
    ,
    content: `
<div style="width:100%; background:#000; color:#fff; ">
  <div style="max-width:1200px; margin:0 auto; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:40px;">

    <!-- Left Column -->
    <div style="flex:1; min-width:300px; text-align:center;">
      <h2 style="font-size:36px; font-weight:bold; letter-spacing:2px; margin-bottom:8px;">MSCI</h2>
      <div style="font-size:18px; letter-spacing:1px; margin-bottom:20px;">ESG RATINGS</div>
      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <span style="background:#009688; color:#fff; font-weight:bold; padding:20px 40px; border-radius:50%; font-size:20px;">AA</span>
      </div>
      <p style="font-size:14px; max-width:400px; margin:0 auto; line-height:1.5;">
        BAE Systems has received an MSCI ESG Rating of AA since 2020 | 
        <a href="#" style="color:#e63946; text-decoration:underline;">MSCI Disclaimer</a>
      </p>
      <button style="margin-top:24px; padding:14px 28px; background:#fff; color:#000; font-weight:bold; border-radius:6px; border:none; cursor:pointer;">
        READ MORE ABOUT OUR SUSTAINABILITY AGENDA →
      </button>
    </div>

    <!-- Right Column -->
    <div style="flex:1; min-width:300px; text-align:center;">
      <img src="https://via.placeholder.com/240x140" alt="TISC Report" style="margin:0 auto 24px;" />
      <div style="margin-bottom:16px;">
        <a href="#" style="text-transform:uppercase; letter-spacing:1px; color:#e63946; font-size:14px; font-weight:bold; text-decoration:none;">
          Visit the TISC website →
        </a>
      </div>
      <button style="padding:14px 28px; background:#fff; color:#000; font-weight:bold; border-radius:6px; border:none; cursor:pointer;">
        UK MODERN SLAVERY ACT – STATEMENT 2025 →
      </button>
    </div>

  </div>
</div>
  `,
    category: 'card'
  },

]