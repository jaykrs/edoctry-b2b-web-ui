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
    

]