import type { BlockProperties } from 'grapesjs';

export const generalBlocks: BlockProperties[] = [
  // Layout Blocks
  { id: '1-column', label: '1 Column', content: '<div class="col-1">1 Column</div>', category: 'Layout' },
  { id: '2-column', label: '2 Columns', content: '<div class="row"><div class="col-6">Column 1</div><div class="col-6">Column 2</div></div>', category: 'Layout' },
  { id: '3-column', label: '3 Columns', content: '<div class="row"><div class="col-4">Column 1</div><div class="col-4">Column 2</div><div class="col-4">Column 3</div></div>', category: 'Layout' },
  { id: 'section', label: '<section class="section">Section</section>', content: '<section class="section">Section</section>', category: 'Layout' },
  { id: 'divider', label: 'Divider', content: '<hr>', category: 'Layout' },
  { id: 'container', label: 'Container', content: '<div class="container">Container</div>', category: 'Layout' },
  { id: 'row', label: 'Row', content: '<div class="row">Row</div>', category: 'Layout' },
  { id: '2-row', label: '2 Row', content: '<div class="row"><div class="col-6">Column 1</div><div class="col-6">Column 2</div></div>', category: 'Layout' },

  // Typography
  { id: 'h1', label: '<h1>H1</h1>', content: '<h1>Heading 1</h1>', category: 'Typography' },
  { id: 'h2', label: '<h2>H2</h2>', content: '<h2>Heading 2</h2>', category: 'Typography' },
  { id: 'h3', label: '<h3>H3</h3>', content: '<h3>Heading 3</h3>', category: 'Typography' },
  { id: 'h4', label: '<h4>H4</h4>', content: '<h4>Heading 4</h4>', category: 'Typography' },
  { id: 'h5', label: '<h5>H5</h5>', content: '<h5>Heading 5</h5>', category: 'Typography' },
  { id: 'h6', label: '<h6>H6</h6>', content: '<h6>Heading 6</h6>', category: 'Typography' },
  { id: 'link', label: '<a href="#">Link</a>', content: '<a href="#">Link</a>', category: 'Typography' },
  { id: 'link-box', label: 'Link Box', content: '<div class="link-box"><a href="#">Link Box</a></div>', category: 'Typography' },

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
      <i class="fab fa-facebook"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
    </div>
  `,
    content: `
    <div class="social-media" style="display:flex; gap:12px; justify-content:center; font-size:20px;">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
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
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
  `,
    category: 'Social Media',
  },

];

export const headerBlocks: BlockProperties[] = [
  {
    id: 'nav-minimal',
    label: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:250px;">
        <div style="font-size:12px; font-weight:bold;">Minimal Nav</div>
        <div style="width:100%; height:70px; border:1px solid #ddd; border-radius:4px;">
          <nav style="background:#fff; border-bottom:1px solid #eee;">
            <ul style="display:flex; justify-content:center; gap:20px; margin:0; padding:12px; list-style:none; font-size:12px;">
              <li>Home</li><li>About</li><li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    `,
    content: `
      <nav style="background:#fff; border-bottom:1px solid #eee; padding:15px;">
        <ul style="display:flex; justify-content:center; gap:25px; list-style:none; margin:0; padding:0;">
          <li style="transition:color 0.3s;"><a href="#" style="text-decoration:none; color:#333;">Home</a></li>
          <li style="transition:color 0.3s;"><a href="#" style="text-decoration:none; color:#333;">About</a></li>
          <li style="transition:color 0.3s;"><a href="#" style="text-decoration:none; color:#333;">Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li:hover a { color: #007BFF; }
      </style>
    `,
    category: 'Navigation'
  },

  // 2 - Logo + Links
  {
    id: 'nav-logo',
    label: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:250px;">
        <div style="font-size:12px; font-weight:bold;">Logo Nav</div>
        <div style="width:100%; height:70px; border:1px solid #ddd; border-radius:4px; display:flex; align-items:center; padding:4px;">
          <img src="https://via.placeholder.com/40" style="border-radius:50%;" />
          <ul style="display:flex; gap:10px; margin-left:10px; font-size:12px; list-style:none;">
            <li>Home</li><li>Shop</li><li>Blog</li>
          </ul>
        </div>
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
    id: 'hover-underline',
    label: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:250px;">
        <div style="font-size:12px; font-weight:bold;">Underline Hover</div>
        <div style="width:100%; height:70px; border:1px solid #ddd; border-radius:4px;">
          <ul style="display:flex; justify-content:center; gap:10px; list-style:none; font-size:12px; margin:0; padding:10px;">
            <li>Home</li><li>Portfolio</li><li>Contact</li>
          </ul>
        </div>
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
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:250px;">
        <div style="font-size:12px; font-weight:bold;">Gradient Nav</div>
        <div style="width:100%; height:70px; border:1px solid #ddd; border-radius:4px; background:linear-gradient(45deg,#6a11cb,#2575fc); color:white;">
          <ul style="display:flex; justify-content:center; gap:10px; list-style:none; font-size:12px; margin:0; padding:10px;">
            <li>Home</li><li>Services</li><li>About</li>
          </ul>
        </div>
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

  // 5 - Icon Nav
  {
    id: 'nav-icons',
    label: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:250px;">
        <div style="font-size:12px; font-weight:bold;">Icon Nav</div>
        <div style="width:100%; height:70px; border:1px solid #ddd; border-radius:4px;">
          <ul style="display:flex; justify-content:center; gap:10px; list-style:none; font-size:12px; margin:0; padding:10px;">
            <li>🏠</li><li>📦</li><li>📞</li>
          </ul>
        </div>
      </div>
    `,
    content: `
      <nav style="background:#fff; padding:15px;">
        <ul style="display:flex; justify-content:center; gap:25px; list-style:none; margin:0; padding:0; font-size:18px;">
          <li><a href="#" style="text-decoration:none; color:#333;">🏠 Home</a></li>
          <li><a href="#" style="text-decoration:none; color:#333;">📦 Products</a></li>
          <li><a href="#" style="text-decoration:none; color:#333;">📞 Contact</a></li>
        </ul>
      </nav>
      <style>
        nav ul li a:hover { color: #28A745; }
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:12px;font-weight:bold;">Simple Nav</div>
        <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;">
          <nav style="background:#ffffff;border-bottom:1px solid #eee;">
            <ul style="display:flex;justify-content:center;gap:20px;margin:0;padding:8px;list-style:none;font-size:12px;">
              <li>Home</li><li>Services</li><li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:12px;font-weight:bold;">Logo Left Nav</div>
        <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;">
          <nav style="background:#f8f9fa;display:flex;justify-content:space-between;align-items:center;padding:0 10px;font-size:10px;">
            <span>Logo</span>
            <ul style="display:flex;gap:10px;list-style:none;margin:0;padding:0;">
              <li>Home</li><li>Blog</li><li>About</li>
            </ul>
          </nav>
        </div>
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:12px;font-weight:bold;">Dark Nav</div>
        <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#222;color:#fff;">
          <nav style="padding:8px;">
            <ul style="display:flex;justify-content:center;gap:10px;margin:0;padding:0;list-style:none;font-size:10px;">
              <li>Home</li><li>Portfolio</li><li>Contact</li>
            </ul>
          </nav>
        </div>
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:12px;font-weight:bold;">Nav + Button</div>
        <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;">
          <nav style="background:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 10px;font-size:10px;">
            <span>Logo</span>
            <div style="display:flex;gap:8px;">
              <span>Links</span>
              <button style="background:#007bff;color:#fff;border:none;padding:2px 6px;border-radius:3px;">Sign Up</button>
            </div>
          </nav>
        </div>
      </div>
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:12px;font-weight:bold;">Colored Nav</div>
        <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#4cafef;color:#fff;">
          <nav style="padding:8px;">
            <ul style="display:flex;justify-content:center;gap:10px;margin:0;padding:0;list-style:none;font-size:10px;">
              <li>Home</li><li>Shop</li><li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
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
  <div style="width:100%; display:flex; align-items:center; justify-content:space-between; padding:12px 40px; box-sizing:border-box; font-family:Arial, sans-serif; border-bottom:1px solid #eee;">
    
    <!-- Left Logo -->
    <div style="flex-shrink:0;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BAE_Systems_logo.svg/2560px-BAE_Systems_logo.svg.png" alt="Logo" style="height:32px;">
    </div>
    
    <!-- Center Menu -->
    <div style="flex-grow:1; display:flex; justify-content:center; gap:28px;">
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        Who we are
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        What we do
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        Newsroom
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        Sustainability
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        Investors
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
      <a href="#" style="text-decoration:none; color:#333; font-size:15px; position:relative;">
        Careers
        <span style="position:absolute; left:0; bottom:-4px; width:0; height:2px; background:#d00; transition:all 0.3s;"></span>
      </a>
    </div>

    <!-- Right Links -->
    <div style="display:flex; align-items:center; gap:16px;">
      <a href="#" style="color:#777; font-size:14px; text-decoration:none;">Contact us</a>
      <a href="#" style="color:#000; font-size:14px; font-weight:600; text-decoration:none;">Global site</a>
      <span style="cursor:pointer; font-size:18px;">🔍</span>
    </div>
  </div>

  <style>
    a:hover span { width:100%; }
  </style>
`
,
    content: `
<div style="width:100%; display:flex; align-items:center; justify-content:space-between; padding:12px 40px; box-sizing:border-box; font-family:Arial, sans-serif; border-bottom:1px solid #eee;">

  <!-- Left Logo -->
  <div style="flex-shrink:0;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BAE_Systems_logo.svg/2560px-BAE_Systems_logo.svg.png" alt="Logo" style="height:32px;">
  </div>

  <!-- Center Menu -->
  <div style="flex-grow:1; display:flex; justify-content:center; gap:28px;">
    <a href="#" class="nav-link">Who we are<span></span></a>
    <a href="#" class="nav-link">What we do<span></span></a>
    <a href="#" class="nav-link">Newsroom<span></span></a>
    <a href="#" class="nav-link">Sustainability<span></span></a>
    <a href="#" class="nav-link">Investors<span></span></a>
    <a href="#" class="nav-link">Careers<span></span></a>
  </div>

  <!-- Right Links -->
  <div style="display:flex; align-items:center; gap:16px;">
    <a href="#" style="color:#777; font-size:14px; text-decoration:none;">Contact us</a>
    <a href="#" style="color:#000; font-size:14px; font-weight:600; text-decoration:none;">Global site</a>
    <span style="cursor:pointer; font-size:18px;">🔍</span>
  </div>
</div>

<!-- Inline Hover CSS -->
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

];

export const footerBlocks: BlockProperties[] = [
  {
    id: 'footer-bae',
    label: `
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:12px;font-weight:bold;">Footer</div>
      <div style="width:100%;height:40px;overflow:hidden;border:1px solid #ddd;border-radius:4px;background:#f5f5f5;color:#333;display:flex;align-items:center;justify-content:center;font-size:10px;">
        Footer Preview
      </div>
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
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;">
      <div style="font-size:12px;font-weight:bold;text-align:center;">Footer</div>
      
      <div style="width:100%;border:1px solid #ddd;border-radius:4px;background:#f5f5f5;color:#333;padding:6px;">
        
        <!-- Top Left -->
        <div style="font-size:8px;font-weight:bold;margin-bottom:4px;">BAE SYSTEMS</div>
        <div style="font-size:9px;margin-bottom:4px;">1,790.50 GBX</div>
        
        <!-- Links -->
        <div style="display:flex;justify-content:space-between;gap:10px;font-size:7px;line-height:1.4;">
          <div>
            <div style="font-weight:bold;">WHO WE ARE</div>
            <div>Leadership</div>
            <div>Locations</div>
          </div>
          <div>
            <div style="font-weight:bold;">WHAT WE DO</div>
            <div>Air</div>
            <div>Sea</div>
          </div>
          <div>
            <div style="font-weight:bold;">CAREERS</div>
            <div>Life at BAE</div>
            <div>Join us</div>
          </div>
        </div>
        
      </div>
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
    id: 'footer-bae-logo',
    label: `
    <div style="display:flex;flex-direction:column;gap:6px;width:100%;">
      <div style="font-size:12px;font-weight:bold;text-align:center;">Footer with Logo</div>
      
      <div style="width:100%;border:1px solid #ddd;border-radius:4px;background:#f5f5f5;color:#333;padding:6px;">
        
        <!-- Logo + Title -->
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BAE_Systems_logo.svg/2560px-BAE_Systems_logo.svg.png" style="height:10px;">
          <div style="font-size:8px;font-weight:bold;">BAE SYSTEMS</div>
        </div>
        
        <!-- Stock Info -->
        <div style="font-size:9px;margin-bottom:4px;">1,790.50 GBX</div>
        
        <!-- Links -->
        <div style="display:flex;justify-content:space-between;gap:10px;font-size:7px;line-height:1.4;">
          <div>
            <div style="font-weight:bold;">WHO WE ARE</div>
            <div>Leadership</div>
            <div>Locations</div>
          </div>
          <div>
            <div style="font-weight:bold;">WHAT WE DO</div>
            <div>Air</div>
            <div>Sea</div>
          </div>
          <div>
            <div style="font-weight:bold;">CAREERS</div>
            <div>Life at BAE</div>
            <div>Join us</div>
          </div>
        </div>
        
      </div>
    </div>
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
    <div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px; background:#f1f1f1; border-radius:6px; width:140px;">
      <div style="font-size:12px; font-weight:bold;">Footer with Logo</div>
      <div style="width:100%; height:30px; background:#ddd; display:flex; align-items:center; justify-content:center; font-size:10px;">
        LOGO + Icons
      </div>
    </div>
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


]
