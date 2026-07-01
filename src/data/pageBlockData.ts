import type { BlockProperties } from 'grapesjs';

export const hero: BlockProperties[] = [

        {
    id: 'Hero-erps',
    label:`
        <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Template - 0001
    </div>
    `,
    category: "full page",
    content: `

      <header class="hero-section section-layer" id="hero">
    <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
    <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="section-badge">Enterprise education cloud</span>
          <h1 class="hero-title">Run every institution workflow from one command center.</h1>
          <p class="hero-copy">Edge-ERP unifies ERP, CRM, finance, communication, admissions, websites, and support into a secure operating layer built for premium schools, colleges, and universities.</p>
          <div class="hero-actions">
            <a class="btn btn-saas-primary magnetic" href="https://u.payu.in/PAYUMN/xJZ9E6UfhpdY" target="_blank" rel="noopener noreferrer">Join Us</a>
            <a class="btn btn-saas-secondary magnetic" href="#hero-enquiry">Request Demo</a>
          </div>
          <div class="proof-row">
            <div><strong>5-7</strong><span>Working days delivery</span></div>
            <div><strong>₹4,999</strong><span>ERP with website</span></div>
            <div><strong>1 Year</strong><span>Free AMC included</span></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-enquiry-card premium-float" id="hero-enquiry" data-depth="0.06">
            <div class="console-toolbar">
              <span></span><span></span><span></span>
              <small>Free Demo Enquiry</small>
            </div>
            <div class="enquiry-grid">
              <div class="mini-console">
                <div class="panel-kicker">Edge-ERP Unified Ecosystem</div>
                <h3>ERP + CRM + Custom Website</h3>
                <div class="mini-flow">
                  <span><i class="fa-solid fa-user-graduate"></i> Students</span>
                  <span><i class="fa-solid fa-users-gear"></i> Staff</span>
                  <span><i class="fa-solid fa-building-columns"></i> Campus</span>
                  <span><i class="fa-solid fa-globe"></i> Website</span>
                </div>
              </div>
              <form id="contactForm" class="enquiry-form">
                <label>
                  Institution Name
                  <input type="text" id="institution" name="institution" placeholder="Your institute / library name" required>
                </label>
                <label>
                  Contact Person
                  <input type="text" id="name" name="name" placeholder="Your name" required>
                </label>
                <label>
                  Email Address
                  <input type="email" id="email" name="email" placeholder="Your email address" required>
                </label>
                <label>
                  Mobile / WhatsApp
                  <input type="tel" id="phone" name="phone" placeholder="9313065972" required>
                </label>
                <label>
                  Requirement
                  <select id="requirement" name="requirement">
                    <option>Complete ERP + CRM + Custom Website</option>
                    <option>ERP and institution management</option>
                    <option>Website builder, blog and domain setup</option>
                    <option>Support, AMC and database security</option>
                  </select>
                </label>
                <div class="g-recaptcha my-3" data-sitekey="6LeCCTAtAAAAAFX3oyGlt7kThhKRbaq1QeWzXHXG"></div>
                <button type="submit" class="btn btn-saas-primary magnetic">Get Free Demo</button>
                <p>Call: 9925253513 | WhatsApp only: 9313065972</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <section class="executive-strip">
    <div class="container">
      <div class="strip-grid">
        <div><i class="fa-solid fa-circle-check"></i><span>Streamline Operations</span></div>
        <div><i class="fa-solid fa-user-graduate"></i><span>Empower Students</span></div>
        <div><i class="fa-solid fa-bolt"></i><span>Optimize Resources</span></div>
      </div>
    </div>
  </section>

  <section id="centralized-platform" class="section-pad workflow-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Platform core</span>
        <h2>A Centralized Platform for Modern Education</h2>
        <p>Replace fragmented tools with one governed operating system where every role, workflow, and decision shares the same source of truth.</p>
      </div>
      <div class="workflow-lanes">
        <article class="workflow-step">
          <span>01</span>
          <i class="fa-solid fa-diagram-project"></i>
          <h3>Streamline</h3>
          <p>Drastically reduce manual work and paperwork through intelligent administrative automation.</p>
        </article>
        <article class="workflow-step elevated">
          <span>02</span>
          <i class="fa-solid fa-people-arrows"></i>
          <h3>Empower</h3>
          <p>Provide a seamless integrated digital experience for staff, students, and parents.</p>
        </article>
        <article class="workflow-step">
          <span>03</span>
          <i class="fa-solid fa-chart-line"></i>
          <h3>Optimize</h3>
          <p>Improve overall academic and operational efficiency with centralized data.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="dual-engines" class="section-pad split-engine reveal-fade-up">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5">
          <span class="section-badge">Platform infrastructure</span>
          <h2>The Dual Engines of Institutional Growth</h2>
          <p class="section-copy">Edge-ERP separates the back-office operating engine from the engagement growth engine, while keeping both connected through shared identity, permissions, and analytics.</p>
        </div>
        <div class="col-lg-7">
          <div class="engine-board">
            <div class="engine-card">
              <div class="engine-icon"><i class="fa-solid fa-server"></i></div>
              <h3>ERP Engine</h3>
              <ul>
                <li>Student lifecycle records</li>
                <li>Staff duties and departments</li>
                <li>Attendance, assets, and files</li>
                <li>Academic operations dashboard</li>
              </ul>
            </div>
            <div class="engine-core">
              <div class="core-ring"></div>
              <i class="fa-solid fa-cubes"></i>
              <span>Shared Data Fabric</span>
            </div>
            <div class="engine-card">
              <div class="engine-icon"><i class="fa-solid fa-users-viewfinder"></i></div>
              <h3>CRM Engine</h3>
              <ul>
                <li>Admissions lead pipeline</li>
                <li>Campaign and newsletter tools</li>
                <li>Support ticketing workflows</li>
                <li>Parent and alumni engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="why-upgrade" class="section-pad impact-section reveal-fade-up">
    <div class="container">
      <div class="section-intro">
        <span class="section-badge">Value proposition</span>
        <h2>Why Upgrade to Edge-ERP?</h2>
      </div>
      <div class="impact-grid">
        <article>
          <i class="fa-solid fa-clock-rotate-left"></i>
          <h3>Save Time</h3>
          <p>Reduce daily administrative loops and manual reconciliation.</p>
        </article>
        <article>
          <i class="fa-solid fa-comments"></i>
          <h3>Enhance Communication</h3>
          <p>Keep staff, students, and parents aligned through governed channels.</p>
        </article>
        <article>
          <i class="fa-solid fa-chart-line"></i>
          <h3>Improve Efficiency</h3>
          <p>Use clean operational data to spot bottlenecks before they spread.</p>
        </article>
        <article>
          <i class="fa-solid fa-shield-halved"></i>
          <h3>Secure and Scalable</h3>
          <p>Grow safely with role-based access and cloud-ready architecture.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="centralized-activity" class="section-pad topology-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Topology architecture</span>
        <h2>A Centralized Platform For Every Activity</h2>
        <p>A symmetrical hub-and-spoke architecture where critical institutional functions stay connected to one premium education platform core.</p>
      </div>

      <div class="topology-diagram" data-topology>
        <svg class="topology-svg" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#5de2ff" stop-opacity="0.2" />
              <stop offset="48%" stop-color="#f7d879" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#5de2ff" stop-opacity="0.2" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path id="path-im" class="connector-line" d="M600 360 C520 300 430 226 310 186" />
          <path id="path-ch" class="connector-line" d="M600 360 C520 420 430 494 310 534" />
          <path id="path-dp" class="connector-line" d="M600 360 C680 300 770 226 890 186" />
          <path id="path-fm" class="connector-line" d="M600 360 C680 420 770 494 890 534" />
          <path class="connector-glow" d="M600 360 C520 300 430 226 310 186" />
          <path class="connector-glow" d="M600 360 C520 420 430 494 310 534" />
          <path class="connector-glow" d="M600 360 C680 300 770 226 890 186" />
          <path class="connector-glow" d="M600 360 C680 420 770 494 890 534" />
          <circle class="data-particle particle-one" r="5" filter="url(#softGlow)"><animateMotion dur="3.6s" repeatCount="indefinite"><mpath href="#path-im" /></animateMotion></circle>
          <circle class="data-particle particle-two" r="5" filter="url(#softGlow)"><animateMotion dur="3.8s" begin=".4s" repeatCount="indefinite"><mpath href="#path-ch" /></animateMotion></circle>
          <circle class="data-particle particle-three" r="5" filter="url(#softGlow)"><animateMotion dur="3.5s" begin=".8s" repeatCount="indefinite"><mpath href="#path-dp" /></animateMotion></circle>
          <circle class="data-particle particle-four" r="5" filter="url(#softGlow)"><animateMotion dur="3.9s" begin="1.1s" repeatCount="indefinite"><mpath href="#path-fm" /></animateMotion></circle>
        </svg>

        <article class="topology-card node-im">
          <span class="node-icon"><i class="fa-solid fa-building-columns"></i></span>
          <div>
            <h3>Institutional Management</h3>
            <p>Departments, roles, classrooms, timetables, and approvals managed through a governed operating model.</p>
          </div>
        </article>
        <article class="topology-card node-ch">
          <span class="node-icon"><i class="fa-solid fa-bullhorn"></i></span>
          <div>
            <h3>Communication Hub</h3>
              <p>Email, subscribers, support, direct messaging pathways, internal alerts, and parent-teacher updates.</p>
          </div>
        </article>
        <div class="central-hub-node">
          <div class="hub-halo"></div>
          <i class="fa-solid fa-circle-nodes"></i>
          <h3>Education Platform</h3>
          <span>Unified Control Plane</span>
        </div>
        <article class="topology-card node-dp">
          <span class="node-icon"><i class="fa-solid fa-display"></i></span>
          <div>
            <h3>Digital Presence</h3>
              <p>Dynamic website builder, website authoring, integrated blog management, and seamless domain mapping.</p>
          </div>
        </article>
        <article class="topology-card node-fm">
          <span class="node-icon"><i class="fa-solid fa-wallet"></i></span>
          <div>
            <h3>Financial Modules</h3>
              <p>Invoice generation, automated billing, fee tracking, assets, reminders, and finance reporting workflows.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="ecosystem-modules" class="section-pad matrix-section reveal-fade-up">
    <div class="container">
      <div class="section-intro">
        <span class="section-badge">Framework matrix</span>
        <h2>All In One Framework Ecosystem</h2>
      </div>
      <div class="module-matrix">
        <article class="matrix-column">
          <h3><i class="fa-solid fa-cube"></i> Core Management</h3>
          <p>Student databases, staff allocation, library logs, biometric attendance, academic records, and operational permissions.</p>
        </article>
        <article class="matrix-column featured">
          <h3><i class="fa-solid fa-globe"></i> Digital Identity</h3>
          <p>Website builder, campus blogs, custom domains, course authoring, SEO pages, and branded public-facing portals.</p>
        </article>
        <article class="matrix-column">
          <h3><i class="fa-solid fa-gears"></i> Operations Core</h3>
          <p>Invoices, email campaigns, helpdesk logs, department tasks, asset registers, and management reporting.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="digital-identity" class="section-pad identity-section reveal-fade-up">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5">
          <span class="section-badge">Hub 2: Modern digital identity</span>
          <h2>Your institution website, blog and domain in one stack.</h2>
          <p class="section-copy">Edge-ERP includes a digital identity layer for institutions that need a professional web presence connected to their operating system.</p>
          <div class="identity-features">
            <article><b>Feature 1</b><span>Dynamic Website Builder and Website Authoring</span><small>Included: 4 informatics pages + 1 blog page</small></article>
            <article><b>Feature 2</b><span>Integrated Blog Management</span><small>Publish updates, notices, articles, and institution news.</small></article>
            <article><b>Feature 3</b><span>Seamless Domain Mapping</span><small>Domain mapping included in the architecture.</small></article>
          </div>
          <p class="identity-note">Please provide a soft copy of all details and information to be placed into the web design.</p>
        </div>
        <div class="col-lg-7">
          <div class="website-preview tilt-card">
            <div class="browser-top"><span></span><span></span><span></span><small>www.educationsite.com</small></div>
            <div class="campus-hero">
              <div>
                <h3>University Campus</h3>
                <p>Admissions, programs, research, news, blogs and contact pages ready for launch.</p>
                <button type="button">Read More</button>
              </div>
            </div>
            <div class="website-content">
              <div><strong>About Institution</strong><span>Custom content sections</span></div>
              <div><strong>Programs</strong><span>Informational pages</span></div>
              <div><strong>Blog</strong><span>Integrated publishing</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="core-features" class="section-pad dashboard-section reveal-fade-up">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5">
          <span class="section-badge">Deep modules</span>
          <h2>Core System Features</h2>
          <p class="section-copy">Purpose-built screens for academic leaders, finance teams, administrators, and faculty with no unnecessary noise.</p>
        </div>
        <div class="col-lg-7">
          <div class="dashboard-preview">
            <div class="dash-sidebar">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="dash-main">
              <div class="dash-header">
                <div><small>Student Performance Tracker</small><strong>9.4 GPA Average</strong></div>
                <span>Live</span>
              </div>
              <div class="dash-bars">
                <b style="width: 82%"></b>
                <b style="width: 94%"></b>
                <b style="width: 71%"></b>
              </div>
              <div class="dash-cards">
                <div><i class="fa-solid fa-user-graduate"></i><strong>Student Management</strong><small>Lifecycle, progress, attendance, parent logs</small></div>
                <div><i class="fa-solid fa-user-tie"></i><strong>Staff Management</strong><small>Recruitment, duties, departments, roster health</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="operations-features" class="section-pad timeline-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Automation tools</span>
        <h2>Operations and Admin Modules</h2>
      </div>
      <div class="ops-timeline">
        <article><span>01</span><h3>Resource and Asset</h3><p>Track labs, classrooms, libraries, devices, and procurement movement.</p></article>
        <article><span>02</span><h3>Attendance</h3><p>Automate sheets, alerts, exception queues, RFID, and biometric workflows.</p></article>
        <article><span>03</span><h3>Task Management</h3><p>Assign, monitor, audit, and close department work with ownership clarity.</p></article>
        <article><span>04</span><h3>File and Support</h3><p>Secure document pathways and support tickets with SLA visibility.</p></article>
      </div>
    </div>
  </section>

  <section id="engagement-hub" class="section-pad engagement-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Hub 3: Seamless operations and engagement</span>
        <h2>From billing to communication to issue resolution.</h2>
      </div>
      <div class="engagement-flow">
        <article><i class="fa-solid fa-file-invoice-dollar"></i><h3>Invoice Generation</h3><p>Automated billing and fee tracking.</p></article>
        <article><i class="fa-solid fa-bullhorn"></i><h3>Subscriber Communicator</h3><p>Direct messaging pathways.</p></article>
        <article><i class="fa-solid fa-envelope-open-text"></i><h3>Email Campaign Management</h3><p>Targeted outreach for growth.</p></article>
        <article><i class="fa-solid fa-headset"></i><h3>Task and Support Management</h3><p>Internal accountability and issue resolution.</p></article>
      </div>
    </div>
  </section>

  <section id="security-infrastructure" class="section-pad security-section reveal-fade-up">
    <div class="container">
      <div class="security-panel">
        <div>
          <span class="section-badge">Security infrastructure</span>
          <h2>Secure, scalable, and supported.</h2>
          <p>Teqto runs on a 100% cloud-based platform with highly scalable architecture designed to grow alongside your institution and robust database security protocols to protect sensitive student and staff data.</p>
        </div>
        <div class="security-stack">
          <span><i class="fa-solid fa-cloud"></i> 100% cloud-based platform</span>
          <span><i class="fa-solid fa-layer-group"></i> Scalable institution architecture</span>
          <span><i class="fa-solid fa-database"></i> Robust database security</span>
          <span><i class="fa-solid fa-handshake"></i> Total ownership data guarantee</span>
        </div>
      </div>
    </div>
  </section>

  <section id="safety-net" class="section-pad safety-section reveal-fade-up">
    <div class="container">
      <div class="safety-card">
        <div>
          <span class="section-badge">The 1-Year Edge-ERP Safety Net</span>
          <h2>Free AMC for the first year.</h2>
          <p>Comprehensive Annual Maintenance Contract included completely free for the first year.</p>
        </div>
        <div class="safety-list">
          <span>If there is any problem inside the website, we will fix it.</span>
          <span>Technical troubleshooting and debugging.</span>
          <span>CMS troubleshooting and minor changes.</span>
          <span>Robust database security monitoring.</span>
          <strong>Rapid SLA: Problems solved within 24 to 72 hours, except major structural work.</strong>
        </div>
      </div>
    </div>
  </section>

  <section id="delivery-cycle" class="section-pad delivery-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Timeline to transformation</span>
        <h2>5 to 7 working days delivery cycle.</h2>
        <p>A highly optimized deployment cycle designed for fast institutional launch.</p>
      </div>
      <div class="delivery-track">
        <div class="delivery-rail" aria-hidden="true">
          <span class="rail-fill"></span>
          <span class="rail-arrow arrow-one"></span>
          <span class="rail-arrow arrow-two"></span>
        </div>
        <article>
          <span class="day-node">Day 1</span>
          <h3>Project Approval and Resource Handover</h3>
        </article>
        <article>
          <span class="day-node">Days 2-5</span>
          <h3>Configuration, Website Design, and Database Setup</h3>
        </article>
        <article>
          <span class="day-node">Day 5-7</span>
          <h3>Final Delivery and System Launch</h3>
        </article>
      </div>
    </div>
  </section>

  <section id="pricing-section" class="section-pad pricing-section reveal-fade-up">
    <div class="container">
      <div class="pricing-card">
        <div>
          <span class="section-badge">Transparent, disruptive investment</span>
          <h2>₹4,999 INR only.</h2>
          <p>Proposed price includes ERP with website. Complete ERP + CRM + custom website within one unified digital ecosystem.</p>
          <div class="payment-split">
            <span><b>70%</b> Down Payment at the time of project approval.</span>
            <span><b>30%</b> Final Payment at the time of final delivery after website contents and images are complete.</span>
          </div>
        </div>
        <a class="btn btn-saas-primary magnetic" href="https://u.payu.in/PAYUMN/xJZ9E6UfhpdY" target="_blank" rel="noopener noreferrer">Plan My Rollout</a>
      </div>
    </div>
  </section>

  <section id="terms-section" class="section-pad terms-section reveal-fade-up">
    <div class="container">
      <div class="section-intro">
        <span class="section-badge">Clear terms and seamless scalability</span>
        <h2>Transparent scope for launch and growth.</h2>
      </div>
      <div class="terms-grid">
        <article>
          <h3>Scalability and Add-ons</h3>
          <ul>
            <li>Extra website pages created at ₹1,000 per page.</li>
            <li>Content writing, creative banners, and custom graphics are available at an extra charge.</li>
            <li>Domain booking charges are extra.</li>
            <li>Any extra feature requested carries an extra charge.</li>
          </ul>
        </article>
        <article>
          <h3>Operational Terms</h3>
          <ul>
            <li>Website design is final once approved. Changes post-approval incur charges.</li>
            <li>Working hours: 10 A.M. to 6 P.M., Monday to Friday.</li>
            <li>cPanel is not provided to ensure core system integrity.</li>
          </ul>
        </article>
      </div>
      <div class="data-guarantee"><i class="fa-solid fa-shield-halved"></i> If you decide to discontinue our services in the future, all your data will be securely provided to you.</div>
    </div>
  </section>

  <section id="why-choose" class="section-pad choose-section reveal-fade-up">
    <div class="container">
      <div class="section-intro narrow">
        <span class="section-badge">Why choose Edge-ERP?</span>
        <h2>Helping institutes and libraries go digital - research based.</h2>
      </div>
      <div class="choose-grid">
        <article><h3>Unmatched Capabilities</h3><p>Complete ERP + CRM + custom website within one unified digital ecosystem.</p></article>
        <article class="featured"><h3>Unbeatable Value</h3><p>At just ₹4,999, it offers the highest return on investment in the education technology sector.</p></article>
        <article><h3>Unwavering Support</h3><p>Secure cloud architecture backed by a 1-year free Annual Maintenance Contract.</p></article>
      </div>
    </div>
  </section>

    `
  },

{
    id: 'Hero',
    label:`
        <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Template - 0002
    </div>
    `,
    category: "full page",
    content: `
       
    <!-- Hero Section -->
    <header id="home" class="hero-section position-relative overflow-hidden d-flex align-items-center">
        <!-- Glowing background blobs -->
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>

        <div class="container position-relative z-2">
            <div class="row min-vh-75 align-items-center py-5">
                <div class="col-lg-7 text-center text-lg-start hero-content-block">
                    <div class="badge-pill mb-3 inline-block">
                        <span class="badge-text"><i class="bi bi-shield-check text-gold me-2"></i>Govt. Approved &amp;
                            Registered</span>
                    </div>
                    <h1 class="hero-title display-3 fw-bold text-white mb-3">
                        GRAVITY <span class="text-teal">CLASSES</span>
                    </h1>
                    <h2 class="hero-subtitle h4 text-gold-light mb-4">
                        Success in Life with Trust
                    </h2>
                    <p class="hero-description lead text-muted-light mb-5">
                        Empowering students in Patna with quality education, experienced guidance, and personalized
                        learning paths. Admissions for the academic session 2026-27 are now open. Secure your seat
                        today!
                    </p>

                    <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                        <a href="#contact" class="btn btn-premium-teal py-3 px-4">Enroll Today <i
                                class="bi bi-arrow-right ms-2"></i></a>
                        <a href="#classes" class="btn btn-outline-gold py-3 px-4">Explore Courses</a>
                    </div>

                    <div class="row mt-5 pt-4 border-top border-teal-muted text-start d-none d-md-flex">
                        <div class="col-sm-4">
                            <h3 class="fw-bold text-white mb-0 h4">4th - 12th</h3>
                            <span class="text-muted-light small text-uppercase tracking-wider">Comprehensive
                                Batches</span>
                        </div>
                        <div class="col-sm-4">
                            <h3 class="fw-bold text-white mb-0 h4">Separate</h3>
                            <span class="text-muted-light small text-uppercase tracking-wider">Hindi &amp; English
                                Batches</span>
                        </div>
                        <div class="col-sm-4">
                            <h3 class="fw-bold text-white mb-0 h4">Personalized</h3>
                            <span class="text-muted-light small text-uppercase tracking-wider">Batch Sizes for
                                Growth</span>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5 mt-5 mt-lg-0 text-center position-relative">
                    <div class="logo-showcase-container">
                        <div class="logo-glow-halo"></div>
                        <div class="logo-orbit-ring ring-1"></div>
                        <div class="logo-orbit-ring ring-2"></div>
                        <img src="logo.png" alt="Gravity Classes Patna" class="hero-logo-large img-fluid shadow-lg">
                    </div>
                    <!-- Micro Floating Card -->
                    <div class="floating-info-card glass-card p-3 d-flex align-items-center gap-3">
                        <div class="icon-circle bg-gold-gradient">
                            <i class="bi bi-clock-fill text-dark"></i>
                        </div>
                        <div class="text-start">
                            <h6 class="mb-0 text-white font-weight-bold">Seats Filling Fast</h6>
                            <small class="text-gold-light">Limited Batch Size</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="about-section py-6 position-relative">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="about-image-wrapper position-relative">
                        <div class="about-accent-box"></div>
                        <div class="glass-card overflow-hidden p-0 rounded-4 shadow-2xl">
                            <div
                                class="p-4 bg-teal-dark border-bottom border-gold-muted d-flex align-items-center justify-content-between">
                                <h4 class="mb-0 text-white d-flex align-items-center gap-2">
                                    <i class="bi bi-patch-check-fill text-teal"></i> Legacy of Trust
                                </h4>
                                <span class="badge bg-gold text-dark py-2 px-3 fw-bold">Est. 2026-27 Session</span>
                            </div>
                            <div class="p-4 text-muted-light">
                                <p class="mb-4">
                                    <strong>Gravity Classes</strong>, Patna is dedicated to creating a nurturing and
                                    result-driven academic environment. Operating under the umbrella of <strong>ABHA
                                        foundation
                                    </strong> as a Govt. registered academic institution, we stand as a
                                    beacon of excellence and integrity.
                                </p>
                                <p class="mb-4">
                                    Our philosophy centers on building a solid conceptual foundation, fostering critical
                                    thinking, and ensuring every student believes in their potential. We combine
                                    rigorous academic curriculums with modern teaching techniques to help students scale
                                    new heights.
                                </p>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="bi bi-shield-check text-gold"></i>
                                            <span class="text-white small">Registered Foundation</span>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="bi bi-people-fill text-gold"></i>
                                            <span class="text-white small">Expert Mentorship</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 ps-lg-5">
                    <span class="section-subtitle">About Us</span>
                    <h2 class="section-title text-white mb-4">Welcome to GRAVITY CLASSES PATNA</h2>
                    <p class="lead text-muted-light mb-4">
                        GRAVITY CLASSES PATNA is committed to providing quality education and academic excellence. Our
                        aim is to build strong concepts and help students achieve their goals through expert guidance
                        and regular assessment.
                    </p>

                    <div class="accordion accordion-custom" id="aboutAccordion">
                        <div class="accordion-item glass-card mb-3 border-0">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true">
                                    <i class="bi bi-journal-bookmark-fill me-2 text-gold"></i> Our Mission
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show"
                                data-bs-parent="#aboutAccordion">
                                <div class="accordion-body text-muted-light">
                                    To provide high-quality education and target-oriented preparation that equips
                                    students with the knowledge, confidence, and trust necessary to succeed in life's
                                    competitive exams and academic pursuits.
                                    <ul>
                                        <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Concept-based
                                            learning</li>
                                        <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Individual attention
                                        </li>
                                        <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Regular tests and
                                            assessments</li>
                                        <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Affordable quality
                                            education</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item glass-card mb-3 border-0">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false">
                                    <i class="bi bi-eye-fill me-2 text-gold"></i>Our Vision
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                                <div class="accordion-body text-muted-light">
                                    To empower students with knowledge, confidence, and skills for lifelong success.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item glass-card mb-3 border-0">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false">
                                    <i class="bi bi-award-fill me-2 text-gold"></i> Registered Academic Legacy
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                                <div class="accordion-body text-muted-light">
                                    Being a Govt. approved and registered institute managed by ABHA foundation allows us
                                    to
                                    run specialized educational initiatives, support outstanding learners, and align our
                                    resources directly towards high-scoring results and trust-driven learning.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Classes Section -->
    <section id="classes" class="classes-section py-6 position-relative bg-teal-darker">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-subtitle text-center">Academic Programs</span>
                <h2 class="section-title text-white text-center">Classes Available</h2>
                <div class="section-divider mx-auto"></div>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- Class 4th to 10th Card -->
                <div class="col-md-6 col-lg-5">
                    <div class="course-card glass-card h-100 position-relative overflow-hidden">
                        <div class="course-banner-accent"></div>
                        <div class="p-5">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <span class="badge bg-teal-soft py-2 px-3 text-teal">Foundation Division</span>
                                <i class="bi bi-layers-half text-gold fs-3"></i>
                            </div>
                            <h3 class="course-title text-white mb-3">Classes 4<sup>th</sup> to 10<sup>th</sup></h3>
                            <h4 class="course-subjects text-gold-light mb-4">All Subjects Covered</h4>
                            <p class="text-muted-light mb-4">
                                Focus on primary base building, conceptual clarity in mathematics and science, and
                                comprehensive coverage of languages and social sciences. Perfect alignment with school
                                curricula.
                            </p>
                            <ul class="course-features-list list-unstyled mb-5">
                                <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Strong mathematical
                                    foundations</li>
                                <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Interactive science learning
                                </li>
                                <li><i class="bi bi-check-circle-fill text-teal me-2"></i> Writing and analytical skills
                                </li>
                            </ul>
                            <a href="#contact" class="btn btn-premium-gold w-100 py-3">Inquire for Batch Timings</a>
                        </div>
                    </div>
                </div>

                <!-- Class 11th & 12th Card -->
                <div class="col-md-6 col-lg-5">
                    <div class="course-card glass-card h-100 position-relative overflow-hidden">
                        <div class="course-banner-accent banner-gold"></div>
                        <div class="p-5">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <span class="badge bg-gold-soft py-2 px-3 text-gold">Higher Secondary Division</span>
                                <i class="bi bi-mortorboard-fill text-teal fs-3"></i>
                            </div>
                            <h3 class="course-title text-white mb-3">Classes 11<sup>th</sup> &amp; 12<sup>th</sup></h3>
                            <h4 class="course-subjects text-teal-light mb-4">All Stream Core</h4>
                            <p class="text-muted-light mb-4">
                                Rigorous training program for students in the science stream, strictly categorized into
                                focused topics and advanced syllabus coverage to match board expectations.
                            </p>
                            <div class="row g-2 mb-4">
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-calculator me-2"></i>Math</div>
                                </div>
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-lightning-charge me-2"></i>Physics</div>
                                </div>
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-flask me-2"></i> Chemistry </div>
                                </div>
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-activity me-2"></i>Biology</div>
                                </div>
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-palette me-2"></i>Arts</div>
                                </div>
                                <div class="col-6">
                                    <div class="subject-tag"><i class="bi bi-house-heart me-2"></i>Home science</div>
                                </div>
                            </div>
                            <a href="#contact" class="btn btn-premium-teal w-100 py-3">Inquire for Batch Timings</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Language Batches Highlight -->
            <div class="row mt-5">
                <div class="col-lg-8 mx-auto text-center">
                    <div class="medium-highlight-banner glass-card py-3 px-4 d-inline-flex align-items-center gap-3">
                        <span class="badge bg-gold text-dark py-2 px-3 fw-bold">Important</span>
                        <span class="text-white">We offer <strong>Hindi Medium &amp; English Medium Separate
                                Batches</strong> to ensure comfortable learning environments for all.</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Special Preparation Section -->
    <section id="special-prep" class="special-prep-section py-6 position-relative">
        <div class="glow-orb orb-3"></div>
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-subtitle text-center">Competitive Edge</span>
                <h2 class="section-title text-white text-center">Special Preparation For</h2>
                <div class="section-divider mx-auto"></div>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- NEET -->
                <div class="col-6 col-md-3">
                    <div
                        class="prep-card glass-card text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div class="prep-icon-box mb-3 bg-red-soft text-danger">
                            <i class="bi bi-heart-pulse-fill"></i>
                        </div>
                        <h4 class="h5 text-white mb-2 font-weight-bold">NEET</h4>
                        <p class="text-muted-light small mb-0">Medical Entrance Guidance</p>
                    </div>
                </div>

                <!-- NTSE -->
                <div class="col-6 col-md-3">
                    <div
                        class="prep-card glass-card text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div class="prep-icon-box mb-3 bg-purple-soft text-purple">
                            <i class="bi bi-trophy-fill"></i>
                        </div>
                        <h4 class="h5 text-white mb-2 font-weight-bold">NTSE</h4>
                        <p class="text-muted-light small mb-0">National Talent Search</p>
                    </div>
                </div>

                <!-- Olympiads -->
                <div class="col-6 col-md-3">
                    <div
                        class="prep-card glass-card text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div class="prep-icon-box mb-3 bg-blue-soft text-info">
                            <i class="bi bi-award-fill"></i>
                        </div>
                        <h4 class="h5 text-white mb-2 font-weight-bold">OLYMPIAD</h4>
                        <p class="text-muted-light small mb-0">National &amp; International</p>
                    </div>
                </div>

                <!-- Bihar Board -->
                <div class="col-6 col-md-3">
                    <div
                        class="prep-card glass-card text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div class="prep-icon-box mb-3 bg-gold-soft text-gold">
                            <i class="bi bi-book-half"></i>
                        </div>
                        <h4 class="h5 text-white mb-2 font-weight-bold">BIHAR BOARD</h4>
                        <p class="text-muted-light small mb-0">High-scoring strategy</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-choose-us" class="why-choose-us-section py-6 position-relative bg-teal-darker">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5 mb-5 mb-lg-0">
                    <span class="section-subtitle">Our Strengths</span>
                    <h2 class="section-title text-white mb-4">Why Choose Us</h2>
                    <p class="text-muted-light mb-4">
                        At Gravity Classes, we maintain a standards-driven methodology that blends strict educational
                        discipline with approachable teaching practices.
                    </p>
                    <div class="quote-card glass-card p-4 border-start border-gold border-4">
                        <p class="text-gold-light italic mb-2">"Gravity classes built the trust in me that I can crack
                            my dream board and competitive exams."</p>
                        <cite class="text-white small">- Gravity Scholar</cite>
                    </div>
                </div>

                <div class="col-lg-7 ps-lg-5">
                    <div class="row g-4">
                        <!-- Experienced Teachers -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-person-workspace"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Experienced Faculty</h4>
                                <p class="text-muted-light small mb-0">Learn from seasoned educators who understand
                                    board patterns and student psyches.</p>
                            </div>
                        </div>

                        <!-- Regular Tests & Doubt Classes -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-journals"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Study Materials &amp; Notes</h4>
                                <p class="text-muted-light small mb-0">Weekly tests to evaluate comprehension combined
                                    with dedicated doubt resolving classes.</p>
                            </div>
                        </div>

                        <!-- Small Batch Size -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-people-fill"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Small Batch Size</h4>
                                <p class="text-muted-light small mb-0">We intentionally keep batch numbers restricted so
                                    that classrooms remain active and non-crowded.</p>
                            </div>
                        </div>

                        <!-- Personal Attention -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-zoom-in"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Parent-Teacher Interaction</h4>
                                <p class="text-muted-light small mb-0">Every student is monitored closely. Regular
                                    feedback reports are shared with parents.</p>
                            </div>
                        </div>

                        <!-- Weekly Tests -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-zoom-in"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Weekly Tests</h4>
                            </div>
                        </div>

                        <!-- Doubt Clearing Sessions -->
                        <div class="col-sm-6">
                            <div class="why-card glass-card p-4 h-100">
                                <div class="why-icon text-gold mb-3 fs-3">
                                    <i class="bi bi-chat-dots"></i>
                                </div>
                                <h4 class="h5 text-white mb-2 font-weight-bold">Doubt Clearing Sessions</h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section py-6 position-relative">
        <div class="glow-orb orb-4"></div>
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-subtitle text-center">Get in Touch</span>
                <h2 class="section-title text-white text-center">Contact Us &amp; Admissions</h2>
                <div class="section-divider mx-auto"></div>
            </div>

            <div class="row g-4 align-items-stretch">

                <!--Info & Map Column -->
                <div class="col-lg-5">
                    <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="h4 text-white mb-4">Office Information</h3>

                            <!-- Address -->
                            <div class="d-flex align-items-start gap-3 mb-4">
                                <div class="contact-icon bg-teal-soft text-teal p-3 rounded-3">
                                    <i class="bi bi-geo-alt-fill fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="text-gold-light mb-1">Location Address</h6>
                                    <p class="text-white small mb-0">Shaligram Market, Khemnichak, Patna-800027</p>
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="d-flex align-items-start gap-3 mb-4">
                                <div class="contact-icon bg-teal-soft text-teal p-3 rounded-3">
                                    <i class="bi bi-telephone-fill fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="text-gold-light mb-1">Direct Helpline</h6>
                                    <p class="text-white mb-0"><a href="tel:+919470405071"
                                            class="text-white text-decoration-none">+91 9431257894</a></p>
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="d-flex align-items-start gap-3 mb-4">
                                <div class="contact-icon bg-teal-soft text-teal p-3 rounded-3">
                                    <i class="bi bi-envelope-fill fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="text-gold-light mb-1">Email Support</h6>
                                    <p class="text-white mb-0"><a href="mailto:agieducare@gmail.com"
                                            class="text-white text-decoration-none">agieducare@gmail.com</a></p>
                                </div>
                            </div>

                            <!-- Director / Head -->
                            <div class="d-flex align-items-start gap-3 mb-4">
                                <div class="contact-icon bg-gold-soft text-gold p-3 rounded-3">
                                    <i class="bi bi-person-badge-fill fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="text-gold-light mb-1">Director</h6>
                                    <p class="text-white small mb-0">S. Anand</p>
                                </div>
                            </div>
                        </div>

                        <!-- Map -->
                        <div class="map-container overflow-hidden rounded-3 border border-teal-muted">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.6366034177573!2d85.1608128!3d25.5804413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a7d95dc48c3b%3A0x38f8b65907bc6d2b!2sGRAVITY%20CLASSES!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%" height="220" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

                <!-- Inquiry Form Column -->
                <div class="col-lg-7">
                    <div class="glass-card p-5 h-100">
                        <h3 class="h4 text-white mb-2">Admission Inquiry Form</h3>
                        <p class="text-muted-light mb-4">Fill out this quick form, and our coordinator will reach out to
                            schedule an interaction session.</p>

                        <form id="inquiryForm" class="needs-validation" novalidate>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="studentName" class="form-label text-white-50 small">Student Name</label>
                                    <input type="text" class="form-control premium-input" id="studentName"
                                        placeholder="Enter full name" required>
                                    <div class="invalid-feedback">Please enter your name.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="parentName" class="form-label text-white-50 small">Parent/Guardian
                                        Name</label>
                                    <input type="text" class="form-control premium-input" id="parentName"
                                        placeholder="Enter parent name" required>
                                    <div class="invalid-feedback">Please enter parent/guardian name.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNo" class="form-label text-white-50 small">Contact Number</label>
                                    <input type="tel" class="form-control premium-input" id="contactNo"
                                        placeholder="10-digit mobile number" pattern="[0-9]{10}" required>
                                    <div class="invalid-feedback">Please enter a valid 10-digit mobile number.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="studentEmail" class="form-label text-white-50 small">Email
                                        Address</label>
                                    <input type="email" class="form-control premium-input" id="studentEmail"
                                        placeholder="Enter email address" required>
                                    <div class="invalid-feedback">Please enter a valid email address.</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="targetClass" class="form-label text-white-50 small">Target Class</label>
                                    <select class="form-select premium-input" id="targetClass" required>
                                        <option value="" disabled selected>Select class</option>
                                        <option value="4th-10th">Class 4th to 10th</option>
                                        <option value="11th-12th">Class 11th &amp; 12th</option>
                                    </select>
                                    <div class="invalid-feedback">Please select a class group.</div>
                                </div>
                                <div class="col-12">
                                    <label for="mediumPreference" class="form-label text-white-50 small">Medium
                                        Preference</label>
                                    <div class="d-flex gap-4">
                                        <div class="form-check">
                                            <input class="form-check-input premium-check" type="radio" name="medium"
                                                id="mediumEnglish" value="English" checked>
                                            <label class="form-check-label text-white" for="mediumEnglish">English
                                                Medium</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input premium-check" type="radio" name="medium"
                                                id="mediumHindi" value="Hindi">
                                            <label class="form-check-label text-white" for="mediumHindi">Hindi
                                                Medium</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="additionalNotes" class="form-label text-white-50 small">Any query /
                                        Specific Subject Interests</label>
                                    <textarea class="form-control premium-input" id="additionalNotes" rows="3"
                                        placeholder="Let us know what you want to prepare for (e.g. NEET, Board, Olympiads)"></textarea>
                                </div>

                                <div class="g-recaptcha mb-3" data-sitekey="6LehVC8tAAAAALRuPqTA8AZMKsjmwIcH_qQ7rvH1"
                                    data-theme="dark">
                                </div>
                                <div id="captchaError" class="text-danger small mb-2" style="display:none;">
                                    Please verify that you are not a robot.
                                </div>
                                <button type="submit" class="btn btn-premium-teal w-100 py-3">
                                    Submit Inquiry <i class="bi bi-send ms-2"></i>

                                </button>
                            </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    </section>


    <section id="more" class="more-section py-6 position-relative">
        <div class="glow-orb orb-more"></div>
        <div class="container">

            <!-- Section Header -->
            <div class="text-center mb-5">
                <span class="section-subtitle text-center">Resources</span>
                <h2 class="section-title text-white text-center">Study Materials</h2>
                <p class="text-muted-light text-center mx-auto" style="max-width:600px;">
                    Download free study resources curated by our faculty — PDF notes, previous year question papers, and
                    sample papers to sharpen your exam preparation.
                </p>
                <div class="section-divider mx-auto"></div>
            </div>

            <!-- Filter Tabs -->
            <div class="d-flex justify-content-center gap-2 flex-wrap mb-5" id="materialTabs">
                <button class="mat-tab-btn active" data-filter="notes">PDF Notes</button>
                <button class="mat-tab-btn" data-filter="question">Question Papers</button>
                <button class="mat-tab-btn" data-filter="sample">Sample Papers</button>
            </div>

            <!-- Materials Grid -->
            <div class="row g-4" id="materialsGrid">

                <!-- ── PDF NOTES ── -->
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 4</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 5</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 6</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 7</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 8</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 9</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 10</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 11</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="notes">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-notes">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-notes">PDF Notes</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 12</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-gold w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Notes
                        </a>
                    </div>
                </div>

                <!-- ── QUESTION PAPERS ── -->
                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 4 </h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 5 </h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 6 </h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 7</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 8 </h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 9</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 10</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>


                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 11</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>


                <div class="col-sm-6 col-lg-4 mat-item" data-type="question">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-question">
                                <i class="bi bi-patch-question-fill"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-question">Question Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 12</h5>

                        <a href="#" class="btn btn-premium-teal w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Paper
                        </a>
                    </div>
                </div>

                <!-- ── SAMPLE PAPERS ── -->
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 4</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 5</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 6</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 7</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 8</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 9</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 10</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 11</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-4 mat-item" data-type="sample">
                    <div class="mat-card glass-card h-100 p-4 d-flex flex-column">
                        <div class="mat-card-header d-flex align-items-center gap-3 mb-3">
                            <div class="mat-icon-box mat-icon-sample">
                                <i class="bi bi-journal-text"></i>
                            </div>
                            <div>
                                <span class="mat-badge mat-badge-sample">Sample Paper</span>
                                <p class="text-muted-light small mb-0"></p>
                            </div>
                        </div>
                        <h5 class="text-white mb-2">Class 12</h5>
                        <p class="text-muted-light small flex-grow-1 mb-3">

                        </p>

                        <a href="#" class="btn mat-sample-btn w-100 py-2 mat-download-btn">
                            <i class="bi bi-download me-2"></i>Download Sample
                        </a>
                    </div>
                </div>

            </div><!-- /row -->



            <!-- Bottom CTA Banner -->
            <div class="row mt-5">
                <div class="col-lg-10 mx-auto">
                    <div
                        class="mat-cta-banner glass-card p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="mat-cta-icon">
                                <i class="bi bi-bell-fill text-gold fs-3"></i>
                            </div>
                            <div>
                                <h5 class="text-white mb-1">Want More Study Material?</h5>
                                <p class="text-muted-light small mb-0">New papers and notes are uploaded regularly.
                                    Contact
                                    us or WhatsApp for subject-specific resources.</p>
                            </div>
                        </div>
                        <a href="#contact" class="btn btn-premium-teal px-4 py-2 flex-shrink-0">Request Material <i
                                class="bi bi-arrow-right ms-1"></i></a>
                    </div>
                </div>
            </div>

            <section id="gallery" class="more-section py-5">
                <div class="container">

                    <div class="text-center mb-5">
                        <span class="section-subtitle">Gallery</span>
                        <h2 class="section-title">Our Gallery</h2>
                        <p class="section-desc">
                            Explore classrooms, activities, and memorable moments.
                        </p>
                    </div>

                    <div class="row g-4">

                        <div class="col-md-6 col-lg-4">
                            <div class="gallery-card">
                                <img src="images/gallery1.jpg" class="gallery-img">
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-4">
                            <div class="gallery-card">
                                <img src="images/gallery1.jpg" class="gallery-img">
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-4">
                            <div class="gallery-card">
                                <img src="images/gallery1.jpg" class="gallery-img">
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <section id="results" class="more-section py-5">
                <div class="container">

                    <div class="text-center mb-5">
                        <span class="section-subtitle">Results</span>
                        <h2 class="section-title">Class-wise Results</h2>
                        <p class="section-desc">
                            Download result PDFs from Class 4 to Class 12.
                        </p>
                    </div>

                    <div class="row g-4">

                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 4 Result</h5>

                                <a href="results/class4.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 5 Result</h5>

                                <a href="results/class5.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 6 Result</h5>

                                <a href="results/class6.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 7 Result</h5>

                                <a href="results/class7.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 8 Result</h5>

                                <a href="results/class8.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 9 Result</h5>

                                <a href="results/class9.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 10 Result</h5>

                                <a href="results/class10.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 11 Result</h5>

                                <a href="results/class11.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="result-card">
                                <i class="bi bi-file-earmark-pdf-fill pdf-icon"></i>
                                <h5>Class 12 Result</h5>

                                <a href="results/class12.pdf" target="_blank" class="btn result-btn">
                                    View Result
                                </a>
                            </div>
                        </div>

                        <!-- Copy till Class 12 -->

                    </div>

                </div>
            </section>


        </div>
    </section>


    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content glass-card border-gold overflow-hidden">
                <div class="modal-body text-center p-5">
                    <div class="success-icon-wrapper mb-4">
                        <i class="bi bi-check-circle-fill text-gold fs-1"></i>
                    </div>
                    <h4 class="text-white mb-2">Inquiry Submitted Successfully</h4>
                    <p class="text-muted-light small mb-4">Thank you for contacting Gravity Classes. Sadanand Kumar or
                        one of our counselors will contact you shortly at the provided number.</p>
                    <button type="button" class="btn btn-premium-gold px-4 py-2" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `
  },

  {
    id: 'Hero',
    label:`
        <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Bajirao INDEX
    </div>
    `,
    category: "Bajirao",
    content: `
       <header id="home" class="hero-section">
        <div class="container text-center z-index-1">
            <h1 class="display-3 serif fw-700 mb-4 reveal active hero-text-shadow">Your Ultimate <br><span
                    class="text-gold">Self-Study Haven in Patna</span></h1>
            <p class="lead poppins fw-300 mb-5 tracking-wide reveal active delay-100 mx-auto hero-text-shadow"
                style="max-width: 800px;">Experience a peaceful, 24/7 air-conditioned environment with high-speed WiFi
                and spacious desks &mdash; designed entirely for your success.</p>
            <div class="d-flex justify-content-center gap-3 reveal active delay-200">
                <a href="#about" class="btn btn-gold btn-lg text-uppercase fw-bold tracking-wider">Explore Features</a>
                <a href="#contact" class="btn btn-gold-outline btn-lg text-uppercase fw-bold tracking-wider">Join
                    Now</a>
            </div>
        </div>
        <div class="overlay"></div>
    </header>

    <section id="about" class="py-10 bg-white">
        <div class="container">
            <div class="row align-items-center gx-5">
                <div class="col-md-6 mb-5 mb-md-0 reveal">
                    <div class="image-reveal">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
                            class="img-fluid rounded shadow" alt="Bajirao Library Study Zone">
                    </div>
                </div>
                <div class="col-md-6 ps-md-5 reveal delay-100">
                    <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Welcome to Bajirao Library
                    </h6>
                    <h2 class="display-5 serif fw-700 mb-4">A Legacy of Focus & Excellence</h2>
                    <p class="text-muted poppins leading-relaxed mb-4">Bajirao Library is more than just a place to sit;
                        it's a dedicated ecosystem for serious aspirants. Located in the heart of Rajendra Nagar, we
                        offer a sanctuary of silence for individual study.</p>
                    <p class="text-muted poppins leading-relaxed mb-5">Our mission is to provide the most comfortable
                        and distraction-free environment in Patna, equipped with modern amenities that allow students to
                        study for long hours without fatigue.</p>
                    <a href="#contact" class="btn btn-gold text-uppercase fw-bold tracking-wider">Visit Us Today</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FACILITIES SECTION -->
    <section id="facilities" class="py-10 bg-soft">
        <div class="container">
            <div class="text-center mb-10 reveal">
                <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Our Facilities</h6>
                <h2 class="display-5 serif fw-700">Optimized for Deep Work</h2>
            </div>
            <div class="row g-4">
                <div class="col-lg-3 col-md-6 reveal">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-snowflake"></i></div>
                        <h5 class="serif fw-bold mb-3">24/7 Air-Conditioned</h5>
                        <p class="small text-muted">A perfectly cool environment to keep you fresh during the longest
                            study sessions.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-100">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-table"></i></div>
                        <h5 class="serif fw-bold mb-3">Wide Desk Space</h5>
                        <p class="small text-muted">Spacious seating with extra-wide desks for all your books and
                            equipment.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-200">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-wifi"></i></div>
                        <h5 class="serif fw-bold mb-3">High-Speed WiFi</h5>
                        <p class="small text-muted">Blazing fast internet connectivity for online lectures and digital
                            research.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-300">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-venus"></i></div>
                        <h5 class="serif fw-bold mb-3">Safe & Secure</h5>
                        <p class="small text-muted">Separate rows and dedicated washrooms for female students' comfort.
                        </p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-clock"></i></div>
                        <h5 class="serif fw-bold mb-3">24&times;7 Service</h5>
                        <p class="small text-muted">Whether it's early morning or late night, we are open whenever
                            inspiration strikes.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-100">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-bolt"></i></div>
                        <h5 class="serif fw-bold mb-3">Full Power Backup</h5>
                        <p class="small text-muted">Uninterrupted electricity support ensuring no breaks in your
                            preparation.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-200">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-tint"></i></div>
                        <h5 class="serif fw-bold mb-3">RO Drinking Water</h5>
                        <p class="small text-muted">Clean and chilled RO water available to keep you hydrated and
                            healthy.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 reveal delay-300">
                    <div class="facility-card">
                        <div class="facility-icon"><i class="fas fa-newspaper"></i></div>
                        <h5 class="serif fw-bold mb-3">Newspaper & More</h5>
                        <p class="small text-muted">Daily newspapers and magazines to keep you updated with current
                            affairs.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- PRICING SECTION -->
    <section id="pricing" class="py-10 bg-white">
        <div class="container">
            <div class="text-center mb-10 reveal">
                <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Membership Plans</h6>
                <h2 class="display-5 serif fw-700">Simple & Transparent</h2>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-md-4 reveal">
                    <div class="pricing-card">
                        <h4 class="serif mb-1">5-Hour Shift</h4>
                        <div class="price-tag">₹400<span>/mo</span></div>
                        <ul class="list-unstyled mb-5">
                            <li class="check-item"><i class="fas fa-check"></i> Standard Desk Assignment</li>
                            <li class="check-item"><i class="fas fa-check"></i> High Speed WiFi & AC</li>
                            <li class="check-item"><i class="fas fa-check"></i> Clean Environment</li>
                        </ul>
                        <a href="#contact"
                            class="btn btn-gold-outline w-100 text-uppercase fw-bold tracking-wider">Select Slot</a>
                    </div>
                </div>
                <div class="col-md-4 reveal delay-100">
                    <div class="pricing-card featured">
                        <div class="badge bg-gold position-absolute top-0 end-0 m-4 px-3 py-2 text-dark fw-bold small">
                            POPULAR</div>
                        <h4 class="serif mb-1">Full-Day (15H)</h4>
                        <div class="price-tag">₹900<span>/mo</span></div>
                        <ul class="list-unstyled mb-5">
                            <li class="check-item"><i class="fas fa-check"></i> Dedicated Wide Desk</li>
                            <li class="check-item"><i class="fas fa-check"></i> Power Sockets at Seat</li>
                            <li class="check-item"><i class="fas fa-check"></i> Priority Reservations</li>
                            <li class="check-item"><i class="fas fa-check"></i> Unlimited WiFi & AC</li>
                        </ul>
                        <a href="#contact" class="btn btn-gold w-100 text-uppercase fw-bold tracking-wider">Register
                            Now</a>
                    </div>
                </div>
                <div class="col-md-4 reveal delay-200">
                    <div class="pricing-card">
                        <h4 class="serif mb-1">Round-the-Clock</h4>
                        <div class="price-tag">₹1100<span>/mo</span></div>
                        <ul class="list-unstyled mb-5">
                            <li class="check-item"><i class="fas fa-check"></i> 24&times;7 Full Access</li>
                            <li class="check-item"><i class="fas fa-check"></i> Permanent Desk Lock</li>
                            <li class="check-item"><i class="fas fa-check"></i> Preferred Seating Selection</li>
                            <li class="check-item"><i class="fas fa-check"></i> Concierge Support</li>
                        </ul>
                        <a href="#contact" class="btn btn-gold-outline w-100 text-uppercase fw-bold tracking-wider">Go
                            Unlimited</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- GALLERY SECTION -->
    <section id="gallery" class="gallery-section bg-soft">
        <div class="container">
            <div class="text-center mb-10 reveal">
                <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Visual Tour</h6>
                <h2 class="display-5 serif fw-700">A Glimpse of Our Sanctuary</h2>
            </div>

            <div class="gallery-grid">
                <div class="gallery-item reveal">
                    <img src="images/library_entrance_6.png" class="gallery-img" alt="Library Entrance">
                    <div class="gallery-info">
                        <h5 class="serif">The Entrance</h5>
                        <p>Step into focus</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-100">
                    <img src="images/library_zone_2.png" class="gallery-img" alt="Main Study Zone">
                    <div class="gallery-info">
                        <h5 class="serif">Study Zone</h5>
                        <p>Spacious and serene</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-200">
                    <img src="images/library_desk_1.png" class="gallery-img" alt="Premium Desk">
                    <div class="gallery-info">
                        <h5 class="serif">Premium Desk</h5>
                        <p>Dedicated to excellence</p>
                    </div>
                </div>
                <div class="gallery-item reveal">
                    <img src="images/library_female_zone_4.png" class="gallery-img" alt="Girls Section">
                    <div class="gallery-info">
                        <h5 class="serif">Safe Space</h5>
                        <p>Dedicated zones for female students</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-100">
                    <img src="images/library_quiet_corner_3.png" class="gallery-img" alt="Quiet Corner">
                    <div class="gallery-info">
                        <h5 class="serif">Quiet Corner</h5>
                        <p>Perfect for long reads</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-200">
                    <img src="images/library_focus_5.png" class="gallery-img" alt="Student Focus">
                    <div class="gallery-info">
                        <h5 class="serif">Deep Work</h5>
                        <p>Where focus becomes achievement</p>
                    </div>
                </div>
            </div>

            <div class="text-center reveal">
                <a href="gallery.html" class="btn btn-gold btn-lg text-uppercase fw-bold tracking-wider">Show More
                    Gallery</a>
            </div>
        </div>
    </section>


    <section id="testimonials" class="py-10 bg-soft">
        <div class="container">
            <div class="text-center mb-10 reveal">
                <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Testimonials</h6>
                <h2 class="display-5 serif fw-700">Voice of Our Aspirants</h2>
            </div>
            <div class="row gx-5">
                <div class="col-md-4 mb-5 mb-md-0 reveal">
                    <div class="testimonial-card">
                        <p class="testimonial-text">"The best self-study center in Rajendra Nagar. The 24/7 AC and
                            peaceful atmosphere are perfect for UPSC preparation."</p>
                        <div class="testimonial-author">
                            <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Amit Verma">
                            <div>
                                <h6 class="mb-1 fw-bold">Amit Verma</h6>
                                <p>UPSC Candidate</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-5 mb-md-0 reveal delay-100">
                    <div class="testimonial-card">
                        <p class="testimonial-text">"Wide desks and comfortable chairs help me study for 10 hours
                            straight. Highly recommend Bajirao Library for serious students."</p>
                        <div class="testimonial-author">
                            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Roshni Kumari">
                            <div>
                                <h6 class="mb-1 fw-bold">Roshni Kumari</h6>
                                <p>CAT Aspirant</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 reveal delay-200">
                    <div class="testimonial-card">
                        <p class="testimonial-text">"Very safe and comfortable for girls. The dedicated rows and
                            peaceful environment make it a top choice in Patna."</p>
                        <div class="testimonial-author">
                            <img src="https://randomuser.me/api/portraits/women/24.jpg" alt="Shikha Singh">
                            <div>
                                <h6 class="mb-1 fw-bold">Shikha Singh</h6>
                                <p>BPSC Aspirant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="py-10 bg-white">
        <div class="container">
            <div class="row gx-lg-5">
                <!-- Info Column -->
                <div class="col-lg-5 mb-5 mb-lg-0 reveal">
                    <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Contact Us</h6>
                    <h2 class="display-5 serif fw-700 mb-5">Start Your Journey with <br>Bajirao Library</h2>

                    <div class="contact-info">
                        <div class="d-flex mb-4">
                            <div class="icon-box me-4"><i class="fas fa-map-marker-alt text-gold fs-4"></i></div>
                            <div>
                                <h6 class="serif fw-bold mb-1">Visit Us</h6>
                                <p class="poppins text-muted small leading-relaxed">Bahadurpur Gumati, Rajendra Nagar,
                                    Patna, Bihar 800016</p>
                            </div>
                        </div>
                        <div class="d-flex mb-4">
                            <div class="icon-box me-4"><i class="fas fa-phone text-gold fs-4"></i></div>
                            <div>
                                <h6 class="serif fw-bold mb-1">Call Us</h6>
                                <p class="poppins text-muted small leading-relaxed"><a href="tel:+919525298482"
                                        class="text-muted text-decoration-none">+91 9525298482</a></p>
                            </div>
                        </div>
                        <div class="d-flex mb-4">
                            <div class="icon-box me-4"><i class="fas fa-mobile-alt text-gold fs-4"></i></div>
                            <div>
                                <h6 class="serif fw-bold mb-1">Office</h6>
                                <p class="poppins text-muted small leading-relaxed"><a href="tel:+919199701015"
                                        class="text-muted text-decoration-none">+91 9199701015</a></p>
                            </div>
                        </div>
                        <div class="d-flex mb-5">
                            <div class="icon-box me-4"><i class="fas fa-envelope text-gold fs-4"></i></div>
                            <div>
                                <h6 class="serif fw-bold mb-1">Email Us</h6>
                                <p class="poppins text-muted small leading-relaxed"><a
                                        href="mailto:bajiraosir1993@gmail.com"
                                        class="text-muted text-decoration-none">bajiraosir1993@gmail.com</a></p>
                            </div>
                        </div>
                        <div class="p-4 rounded-3 border bg-soft">
                            <h6 class="text-uppercase tracking-widest fw-bold x-small text-gold mb-2">Operating Hours
                            </h6>
                            <p class="poppins text-dark mb-0 fw-bold">Open 7 Days a Week</p>
                            <p class="poppins text-muted small mb-0">24x7 Full Accessibility</p>
                        </div>
                    </div>
                </div>

                <!-- Form Column -->
                <div class="col-lg-7 reveal delay-100">
                    <div class="contact-card">
                        <form id="contactForm" class="premium-form">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label-gold">Full Name</label>
                                        <input type="text" id="name" class="form-control" placeholder="Enter your name"
                                            required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label-gold">Email Address</label>
                                        <input type="email" id="email" class="form-control"
                                            placeholder="example@mail.com" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label-gold">Phone Number</label>
                                        <input type="tel" id="phone" class="form-control" placeholder="+91 00000 00000"
                                            required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label-gold">Select Subject</label>
                                        <select id="subject" class="form-control" required>
                                            <option value="" disabled selected>Nature of Inquiry</option>
                                            <option value="New Admission">New Admission</option>
                                            <option value="Seat Availability">Seat Availability</option>
                                            <option value="Facilities Query">Facilities Query</option>
                                            <option value="Pricing/Plans">Pricing/Plans</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label class="form-label-gold">Choose Your Shift</label>
                                        <select id="shift" class="form-control">
                                            <option value="" disabled selected>Preferred Study Shift</option>
                                            <option value="5-Hour Shift">5-Hour Shift (Morning/Evening)</option>
                                            <option value="15-Hour Shift">15-Hour Shift (Full Day)</option>
                                            <option value="24/7 Access">24/7 Unlimited Access</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label class="form-label-gold">Your Message</label>
                                        <textarea id="message" class="form-control"
                                            placeholder="How can we help you?"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="g-recaptcha mb-4" data-sitekey="6LdpN7AsAAAAABalMqgiU98EHQHA26P56IP5RIcw"></div>
                            <button type="submit"
                                class="btn btn-gold btn-lg text-uppercase fw-bold tracking-wider w-100 py-3">Send
                                Inquiry</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
  },
  {
    id:'Gallery',
    label:`    <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Bajirao Gallery
    </div>`,
    category: "Bajirao",
    content: `
      <section class="py-10 bg-soft mt-5">
        <div class="container text-center">
            <h6 class="text-gold text-uppercase fw-bold tracking-widest mb-3 small">Our Collections</h6>
            <h1 class="display-3 serif fw-700 mb-4">A Visual Journey Through Focus</h1>
            <p class="lead poppins fw-300 mx-auto" style="max-width: 700px;">Explore our world-class facilities designed
                for the ultimate self-study experience.</p>
        </div>
    </section>

    <!-- Main Gallery Grid -->
    <section class="py-10">
        <div class="container">
            <div class="gallery-grid">
                <!-- Row 1 -->
                <div class="gallery-item reveal">
                    <img src="images/library_entrance_6.png" class="gallery-img" alt="Library Entrance">
                    <div class="gallery-info">
                        <h5 class="serif">The Entrance</h5>
                        <p>Welcome to silence</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-100">
                    <img src="images/library_zone_2.png" class="gallery-img" alt="Main Study Zone">
                    <div class="gallery-info">
                        <h5 class="serif">Study Zone</h5>
                        <p>Spacious seating</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-200">
                    <img src="images/library_desk_1.png" class="gallery-img" alt="Premium Desk">
                    <div class="gallery-info">
                        <h5 class="serif">Premium Desk</h5>
                        <p>High focus desks</p>
                    </div>
                </div>

                <!-- Row 2 -->
                <div class="gallery-item reveal">
                    <img src="images/library_female_zone_4.png" class="gallery-img" alt="Girls Section">
                    <div class="gallery-info">
                        <h5 class="serif">Safe Space</h5>
                        <p>Female-only sections</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-100">
                    <img src="images/library_quiet_corner_3.png" class="gallery-img" alt="Quiet Corner">
                    <div class="gallery-info">
                        <h5 class="serif">Quiet Corner</h5>
                        <p>Sanctuary for readers</p>
                    </div>
                </div>
                <div class="gallery-item reveal delay-200">
                    <img src="images/library_focus_5.png" class="gallery-img" alt="Student Focus">
                    <div class="gallery-info">
                        <h5 class="serif">Deep Work</h5>
                        <p>Concentration at its best</p>
                    </div>
                </div>

                <!-- Repeating or Adding more if desired, for now let's use the 6 we have -->
                <!-- To show "More", I'll just repeat some or create a few more placeholders if needed, but 6 is good for now. -->
            </div>

            <div class="text-center mt-5 reveal">
                <a href="index.html" class="btn btn-gold btn-lg text-uppercase fw-bold tracking-wider">Back to Home</a>
            </div>
        </div>
    </section>
    `
  },
  {
    id: 'Readers INDEX',
    label: `
    <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#f9f9f9;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#555;">
      Readers INDEX
    </div>
  `,
    content: `
        <section id="home" class="hero ">
            <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
                <div class="shape shape-5"></div>
                <div class="shape shape-6"></div>
            </div>

            <div class="hero-content">
                <div class="hero-subtitle">Reader’s Rejoice Library</div>

                <h1>A Peaceful & Modern Study Space in Patna</h1>

                <p class="subtitle">
                    Separate cabins, AC facility, lockers, 200 Mbps WiFi and
                    24×7 service —
                    the perfect environment for focused study.
                </p>

                <a href="#portfolio" class="cta-button">Explore Facilities</a>
            </div>

            <div class="scroll-indicator"
                onclick="document.getElementById('about').scrollIntoView()"></div>
        </section>

        <!-- About Section -->
        <section id="about" class="about">
            <div class="container">
                <h2 class="section-title fade-in">About Us</h2>

                <div class="about-content">
                    <div class="about-image slide-in-left"></div>

                    <div class="about-text slide-in-right">
                        <h3>Reader’s Rejoice Library – Study With Comfort &
                            Discipline</h3>

                        <p>
                            Reader’s Rejoice Library provides the best study
                            atmosphere in Patna.
                            Our library is designed for students preparing for
                            competitive exams,
                            academics, and career growth.
                        </p>

                        <p>
                            We offer separate cabins for each student, fully
                            air-conditioned
                            halls, and separate study zones for boys and girls.
                        </p>

                        <p>
                            With modern facilities like power backup, lockers,
                            free WiFi,
                            newspapers, and RO water — you can focus only on
                            your success.
                        </p>

                        <div class="skills">
                            <span class="skill-tag">Separate Cabins</span>
                            <span class="skill-tag">Fully AC Facility</span>
                            <span class="skill-tag">Locker Available</span>
                            <span class="skill-tag">200 Mbps WiFi</span>
                            <span class="skill-tag">RO Water</span>
                            <span class="skill-tag">24×7 Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Facilities Section -->
        <section id="portfolio" class="portfolio">
            <div class="container">
                <h2 class="section-title fade-in">Our Facilities</h2>

                <div class="portfolio-grid">

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/cabin2.jpeg" alt="Cabin">
                        </div>
                        <div class="portfolio-content">
                            <h4>Separate Cabin for Each Student</h4>
                            <p>Enjoy personal cabins designed for complete focus
                                and distraction-free study.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">Private Desk</span>
                                <span class="tech-tag">Silent Zone</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/img21.jpg" alt="AC">
                        </div>
                        <div class="portfolio-content">
                            <h4>Fully Air-Conditioned Library</h4>
                            <p>Comfortable AC environment for long study hours
                                in every season.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">AC Facility</span>
                                <span class="tech-tag">Comfort Seating</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/wifihigh.png" alt="WiFi">
                        </div>
                        <div class="portfolio-content">
                            <h4>High-Speed WiFi (200 Mbps+)</h4>
                            <p>Stay connected with superfast internet for online
                                classes and research.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">WiFi</span>
                                <span class="tech-tag">Online Study</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/img24.jpg" alt="Locker">
                        </div>
                        <div class="portfolio-content">
                            <h4>Locker Facility & Full Shift Plan</h4>
                            <p>Full shift membership with locker available at
                                just ₹749/month.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">₹749/month</span>
                                <span class="tech-tag">Locker Included</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/img6.jpg"
                                alt="Power Backup">
                        </div>
                        <div class="portfolio-content">
                            <h4>24×7 Service & Power Backup</h4>
                            <p>Study anytime with uninterrupted electricity and
                                genset backup.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">Power Backup</span>
                                <span class="tech-tag">24 Hours Open</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-item">
                        <div class="portfolio-image">
                            <img class="portfolio-img" src="images/Demo.png" alt="Demo">
                        </div>
                        <div class="portfolio-content">
                            <h4>15 Days Free Demo Available</h4>
                            <p>Try our library free for 15 days and experience
                                the best study environment.</p>
                            <div class="portfolio-tech">
                                <span class="tech-tag">Free Trial</span>
                                <span class="tech-tag">Limited Offer</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Blog Section -->
        <section id="blog" class="blog-section">
            <div class="container">

                <h2 class="section-title fade-in pb-4">Our Blog</h2>

                <div
                    class="blog-plate row g-0 align-items-stretch overflow-hidden">

                    <!-- ================= LEFT Carousel ================= -->
                    <div class="col-lg-8">

                        <div id="blogCarousel"
                            class="carousel slide h-100"
                            data-bs-ride="carousel">

                            <div class="carousel-inner h-100">

                                <!-- Slide 1 -->
                                <div class="carousel-item active h-100"
                                    data-title="Silent Study Cabins"
                                    data-desc="Experience distraction-free study in personal cabins designed for deep focus.">

                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1750530064487-5e979173d281?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnklMjBzdHVkeSUyMHJvb20lMjBzaWxlbnR8ZW58MHx8MHx8fDA%3D"
                                        class="d-block w-100 h-100"
                                        alt="Cabin">
                                </div>

                                <!-- Slide 2 -->
                                <div class="carousel-item h-100"
                                    data-title="Modern Study Hall"
                                    data-desc="Spacious halls with AC comfort and peaceful seating for long study hours.">

                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1683135203198-9104af9b7aac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGxpYnJhcnklMjBzdHVkeSUyMGhhbGx8ZW58MHx8MHx8fDA%3D"
                                        class="d-block w-100 h-100"
                                        alt="Hall">
                                </div>

                                <!-- Slide 3 -->
                                <div class="carousel-item h-100"
                                    data-title="High-Speed WiFi Zone"
                                    data-desc="Superfast 200 Mbps WiFi for online classes, research and productivity.">

                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1661963922072-b32afe6248d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SGlnaC1TcGVlZCUyMFdpRmklMjBab25lJTIwaW4lMjBzdHVkeSUyMGhhbGx8ZW58MHx8MHx8fDA%3D"
                                        class="d-block w-100 h-100"
                                        alt="WiFi">
                                </div>

                                <!-- Slide 4 -->
                                <div class="carousel-item h-100"
                                    data-title="Peaceful Library Environment"
                                    data-desc="A calm and inspiring atmosphere that keeps students consistent and motivated.">

                                    <img
                                        src="https://images.unsplash.com/photo-1763890965393-1cea435581ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBlYWNlZnVsJTIwTGlicmFyeSUyMEVudmlyb25tZW50fGVufDB8fDB8fHww"
                                        class="d-block w-100 h-100"
                                        alt="Library">
                                </div>

                            </div>

                            <!-- Controls -->
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#blogCarousel"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>

                            <button class="carousel-control-next" type="button"
                                data-bs-target="#blogCarousel"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>

                        </div>
                    </div>

                    <!-- ================= RIGHT Info Box ================= -->
                    <div class="col-lg-4">

                        <div class="blog-info h-100">
                            <h1 class="font-size-2xl"><i
                                    class="fa-solid fa-quote-left fa-3x text-danger"></i>
                            </h1>
                            <h3 id="blogTitle">Silent Study Cabins</h3>

                            <p id="blogDesc">
                                Experience distraction-free study in personal
                                cabins designed for deep focus.
                            </p>

                            <a href="#contact" class="blog-btn">
                                Visit Library
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Blog Section End -->
                <section class="py-5 bg-light">
            <div class="container">
                <h2 class="section-title fade-in pb-4">Our Gallery</h2>
                <div class="row g-4">

                    <!-- Image 1 -->
                    <div class="col-md-4 col-sm-6">
                        <div class="overflow-hidden rounded shadow-sm"
                            style="height:250px;">
                            <img src="/images/img24.jpg"
                                class="w-100 h-100 object-fit-cover"
                                alt>
                        </div>
                    </div>

                    <!-- Image 2 -->
                    <div class="col-md-4 col-sm-6">
                        <div class="overflow-hidden rounded shadow-sm"
                            style="height:250px;">
                            <img src="/images/img12.jpg"
                                class="w-100 h-100 object-fit-cover"
                                alt>
                        </div>
                    </div>

                    <!-- Image 3 -->
                    <div class="col-md-4 col-sm-6">
                        <div class="overflow-hidden rounded shadow-sm"
                            style="height:250px;">
                            <img src="/images/img13.jpg"
                                class="w-100 h-100 object-fit-cover"
                                alt>
                        </div>
                    </div>

                </div>

                <div class="text-center mt-4">
                    <a href="gallery.html" class="blog-btn">
                        Visit Library
                    </a>
                </div>

            </div>
        </section>
        <! -- Gallery Section End -->
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

                <!-- Contact Grid -->
                <div class="contact-grid">

                    <!-- LEFT SIDE -->
                    <div class="contact-left fade-in">

                        <h1 class="font-size-2xl"><i
                                class="fa-solid fa-quote-left fa-3x text-danger"></i>
                        </h1>

                        <!-- Info -->
                        <h2>Contact Reader’s Rejoice Library</h2>

                        <p>
                            Join Patna’s best study library with modern
                            facilities, peaceful cabins,
                            and 24×7 service.
                        </p>

                        <p>
                            <i class="fa fa-phone-alt me-2"></i>
                            <b>9334339046</b>, <b>9431615655</b>
                        </p>

                        <p>
                            <i class="fa fa-map-marker-alt me-2"></i>
                            Branch 01: 2M/77, M.L. Nagar, Near Mediverse
                            Hospital, Patna – 26
                        </p>

                        <p>
                            <i class="fa fa-map-marker-alt me-2"></i>
                            Branch 02: 2nd Floor, IndusInd Bank, Kanti Factory
                            Road, Patna
                        </p>

                        <p>
                            <i class="fa fa-map-marker-alt me-2"></i>
                            Branch 03: G-106, PC Colony Road, Opp. Domino’s
                            Pizza, Kankarbagh, Patna
                        </p>

                    </div>

                    <!-- RIGHT SIDE FORM -->
                    <div class="contact-right fade-in">

                        <h2>Send Us a Message</h2>

                        <form class="contact-form">
                            <div class="form-row">

                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" id="name"
                                        placeholder="Your full name" required>
                                </div>

                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email"
                                        placeholder="your.email@example.com"
                                        required>
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="tel" id="phone"
                                    placeholder="Your phone number" required>
                            </div>

                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject"
                                    placeholder="Library Inquiry" required>
                            </div>

                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" rows="6"
                                    placeholder="Write your query here..."
                                    required></textarea>
                            </div>

                            <button type="submit" class="submit-btn">Send
                                Message</button>
                        </form>

                    </div>

                </div>
            </div>
        </section>
  `,
    category: 'Readers'
  },
  {
    id: 'Readers Gallery',
    label: `
    <div style="width:100%;height:60px;overflow:hidden;
                border:1px solid #ddd;border-radius:4px;
                background:#111;display:flex;
                align-items:center;justify-content:center;
                font-size:11px;font-weight:bold;color:#fff;">
      Readers Gallery
    </div>
  `,
    content: `

    <section class="smart-gallery">

        <div class="gallery-container">


            <div class="gallery-grid">

                <!-- Default Image -->
                <div class="img-wrapper" data-gjs-draggable=".gallery-grid">
                    <img src="/images/img.JPG" alt="">
                </div>

            </div>

        </div>

    </section>

    <!-- GLOBAL PREVIEW BOX (Only One Required) -->
    <div class="image-preview-box">
        <span class="close-preview">&times;</span>
        <img src="" alt="Preview">
    </div>

  `,
    category: 'Readers'
  },
  {
    id: 'Gallery Image Item',
    label: 'Gallery Image',
    content: `
    <div class="img-wrapper" data-gjs-draggable=".gallery-grid">
        <img src="https://edgeadmin.teqtoeducation.com/uploads/gallery_image_2_0a31a33bbf.jpg" alt="">
    </div>
  `,
    category: 'Readers'
  },
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