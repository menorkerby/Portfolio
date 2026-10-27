import React, { useState, useEffect, useCallback } from 'react';

// Replace this sample content with your own details. Empty links are hidden.
const PROFILE = {
  name: 'John Kerby Menor', initials: 'YN', role: 'QA/Tester & Developer',
  tagline: 'Thoughtful design.\nMeaningful experiences.',
  intro: 'I build user-focused applications and test software to ensure functionality, reliability, and a better user experience.',
  email: 'menorkerby@gmail.com', photo: '', resume: '/MENOR, JOHN KERBY V. Resume.pdf',
  github: 'https://github.com/menorkerby', linkedin: 'https://www.linkedin.com/in/johnkerbymenor/', location: 'Your city, your corner of the world',
};
const SERVICES = ['QA/Tester', 'Front-end development', 'Creative collaboration'];
const SKILLS = [
  { category: 'Design', items: ['Figma', 'User experience', 'Prototyping', 'Design systems', 'Canva'] },
  { category: 'Development', items: ['React', 'JavaScript', 'HTML & CSS', 'Python', 'Dart/Flutter',  'Responsive design', 'QA/Tester'] },
  { category: 'The way I work', items: ['Curiosity', 'Clear communication', 'Attention to detail', 'Continuous learning'] },
];
const PROJECTS = [
  {
    id: '01', name: 'Attendly', category: 'QA/Tester', art: 'forma',
    summary: 'A QR Code Attendance Tracker that allows students and teachers to sign in using their respective roles and record attendance by scanning unique QR codes for each class. It replaces traditional paper attendance sheets with a faster, easier, and more organized way to monitor and manage student attendance.',
    detail: 'An illustrative concept for an independent homeware studio. The direction explores generous spacing, a restrained palette, and a product-first browsing experience.',
    challenge: 'Make a small collection feel considered and easy to explore.',
    approach: 'A simple visual hierarchy, editorial product presentation, and a focused route from discovery to detail.',
    tags: ['FLUTTER', 'DART', 'FRUITASK'], live: '', source: '',
    images: ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png'],
    cover: '/1.png',
  },
  {
    id: '02', name: 'Smart Personalized Learning Pathway System for Senior High School Students', category: 'QA/Tester · Developer', art: 'still',
    summary: 'This system personalizes learning by assessing students knowledge, recommending suitable learning materials, tracking scores, and generating AI-powered quizzes to improve their academic performance.',
    detail: 'An illustrative wellness app concept that explores how a digital interface can feel slower and more welcoming. Soft colors and clear controls keep the experience grounded.',
    challenge: 'Create a calm starting point without overwhelming people with choices.',
    approach: 'A focused home screen, approachable language, and a compact set of daily rituals.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'PYTHON'], live: '', source: '',
    // Add your image URLs here
    images: ['/cap1.png', '/cap2.png', '/cap3.png', '/cap4.jpg'],
    cover: '/cap1.png'
  },
];
const TIMELINE = [
  { date: 'YOUR LATEST CHAPTER', title: 'Your current role', place: 'Company or independent practice', text: 'Add what you do, the people you collaborate with, and the work you are proud of.' },];
const TESTIMONIALS = []; // Add { quote, name, role } objects with permission.
// Add your certificates here — set image to the path in /public, e.g. '/cert-1.jpg'
const CERTIFICATES = [
  { id: '01', name: 'Ethical Hacking and Responsible Disclosure', issuer: 'West Visayas State University - College of Information and Communications Technology', date: 'Oct 2025', image: '/cert1.jpg' },
  { id: '02', name: 'Development and Implementation of Smart Personalized Learning Pathway System for Senior Highschool Students of Philippine Academy of Sakya', issuer: 'CITE Research Conference 2026: CRYPHEX', date: 'March 2026', image: '/cert2.jfif' },
];
const NAV = [['Work', 'work'], ['About', 'about'], ['Certificates', 'certificates'], ['Contact', 'contact']];
const Arrow = ({ diagonal = false }) => <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>;

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
function Lightbox({ project, onClose }) {
  const images = project.images;
  const hasImages = images && images.length > 0;
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images]);
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (!hasImages) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next, hasImages]);

  return (
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.name} images`}>
      <div className="lb-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="lb-header">
          <div>
            <span className="eyebrow lb-category">{project.category}</span>
            <h3 className="lb-title">{project.name}<span className="project-number">/{project.id}</span></h3>
          </div>
          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Image area */}
        <div className="lb-stage">
          {hasImages ? (
            <>
              <img
                key={index}
                src={images[index]}
                alt={`${project.name} screenshot ${index + 1} of ${images.length}`}
                className="lb-img"
              />
              {images.length > 1 && (
                <>
                  <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous image">←</button>
                  <button className="lb-nav lb-next" onClick={next} aria-label="Next image">→</button>
                  <span className="lb-counter">{index + 1} / {images.length}</span>
                </>
              )}
            </>
          ) : (
            /* Fallback: show CSS artwork when no images are provided */
            <div className="lb-artwork-fallback">
              <Artwork type={project.art} />
              <p className="lb-no-img">Add image URLs to the <code>images</code> array in <code>PROJECTS</code> to display screenshots here.</p>
            </div>
          )}
        </div>

        {/* Thumbnails strip */}
        {hasImages && images.length > 1 && (
          <div className="lb-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`lb-thumb${i === index ? ' lb-thumb-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}

        {/* Project details */}
        <div className="lb-footer-row">
          <div className="project-links">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>}
            {project.source && <a href={project.source} target="_blank" rel="noreferrer">Source code ↗</a>}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Certificate Modal ────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${cert.name} certificate`}>
      <div className="lb-panel cert-modal-panel" onClick={e => e.stopPropagation()}>
        <div className="lb-header">
          <div>
            <span className="eyebrow lb-category">{cert.issuer} {cert.date ? `· ${cert.date}` : ''}</span>
            <h3 className="lb-title">{cert.name}</h3>
          </div>
          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="cert-modal-stage">
          {cert.image ? (
            <img src={cert.image} alt={cert.name} className="cert-modal-img" />
          ) : (
            <div className="cert-thumb-empty" style={{ width: '100%', minHeight: '300px' }}>
              <span>No image available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Artwork (CSS illustrations) ─────────────────────────────────────────────
function Artwork({ type }) {
  if (type === 'forma') return <div className="art art-forma" aria-hidden="true"><div className="forma-page"><div className="mini-nav"><b>forma.</b><span>Objects for living</span><span>Menu +</span></div><div className="forma-head">Less, but<br /><i>better.</i></div><div className="vase vase-one"/><div className="vase vase-two"/><div className="forma-caption">THOUGHTFULLY MADE. EVERY DAY.</div><div className="mini-foot">Explore the collection <span>↗</span></div></div></div>;
  if (type === 'still') return <div className="art art-still" aria-hidden="true"><span className="still-orbit orbit-one"/><span className="still-orbit orbit-two"/><div className="phone"><div className="phone-top">9:41 <span>● ▰</span></div><div className="still-logo">still<span>✳</span></div><p>A moment,<br />just for you.</p><div className="sun-art"><div/></div><div className="phone-small">YOUR DAILY EXHALE</div><div className="phone-action">Find your calm <span>→</span></div><div className="phone-bottom">⌂ <span>◉</span> ♡</div></div><div className="still-word">a softer<br /><i>state of mind.</i></div></div>;
  return <div className="art art-fieldnotes" aria-hidden="true"><div className="field-page"><div className="field-nav">FIELDNOTES <span>JOURNAL &nbsp; ABOUT &nbsp; ↗</span></div><div className="field-title">Go a little<br /><i>further.</i></div><div className="landscape"><div className="mountain mountain-back"/><div className="mountain mountain-front"/><span className="landscape-sun"/></div><div className="field-caption">ISSUE 01 <span>THE ART OF GETTING LOST</span></div></div></div>;
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function Project({ project, onOpenLightbox }) {
  const hasImages = project.images && project.images.length > 0;
  return (
    <article className="project">
      {/* Clickable artwork area */}
      <div
        className="art-wrapper"
        onClick={() => onOpenLightbox(project)}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpenLightbox(project)}
        aria-label={`View ${project.name} images`}
      >
        {project.cover
          ? <div className="art art-cover"><img src={project.cover} alt={project.name} /></div>
          : <Artwork type={project.art} />
        }
        <div className="art-overlay">
          <span className="art-overlay-icon">{hasImages ? `⊕ ${project.images.length} photos` : '⊕ View project'}</span>
        </div>
      </div>

      <div className="project-meta">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3>{project.name}<span className="project-number">/{project.id}</span></h3>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <div className="tags project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-links">
        {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>}
        {project.source && <a href={project.source} target="_blank" rel="noreferrer">Source code ↗</a>}
      </div>
    </article>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry from ${data.get('name')}`;
    const body = `Hi ${PROFILE.name},\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app has been requested. Review and send your message there. If it did not open, use the email link above.');
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Taylor" maxLength={100} required /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="alex@example.com" maxLength={254} required /></label></div><label>What do you have in mind?<textarea name="message" rows="3" placeholder="A project, an idea, or just a hello…" maxLength={3000} required /></label><div className="form-submit"><span>Opens your email app to send.</span><button className="button button-dark" type="submit">Let's talk <Arrow /></button></div><p className="form-status" role="status">{status}</p></form>;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="pf">
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Lightbox */}
      {lightboxProject && <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />}

      {/* Certificate Modal */}
      {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}

      <header className="header">
        <a className="wordmark" href="#" aria-label={`${PROFILE.name}, home`}>{PROFILE.name}<span>.</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
        <nav id="navigation" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          {NAV.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-resume" href={PROFILE.resume} download>Resume <span aria-hidden="true">↓</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="tiny-star">✳</span> {PROFILE.role}</div>
            <h1 id="hero-title">Thoughtful code.<br/><i>Reliable software.</i><br/>Meaningful<span className="title-dot">.</span></h1>
            <p>{PROFILE.intro}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="#contact">Say hello <Arrow /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-design-card" aria-hidden="true">
              {/* Top bar */}
              <div className="hdc-bar">
                <span className="hdc-dot hdc-dot-r"/><span className="hdc-dot hdc-dot-y"/><span className="hdc-dot hdc-dot-g"/>
                <span className="hdc-bar-title">portfolio.jsx</span>
              </div>
              {/* Code lines */}
              <div className="hdc-code">
                <div className="hdc-line"><span className="hdc-kw">const</span> <span className="hdc-var">dev</span> <span className="hdc-op">=</span> <span className="hdc-str">'John Kerby'</span><span className="hdc-op">;</span></div>
                <div className="hdc-line"><span className="hdc-kw">const</span> <span className="hdc-var">role</span> <span className="hdc-op">=</span> <span className="hdc-str">'QA &amp; Developer'</span><span className="hdc-op">;</span></div>
                <div className="hdc-line hdc-blank"/>
                <div className="hdc-line"><span className="hdc-kw">function</span> <span className="hdc-fn">build</span><span className="hdc-op">()</span> <span className="hdc-op">{'{'}</span></div>
                <div className="hdc-line hdc-indent"><span className="hdc-kw">return</span> <span className="hdc-str">'reliable software'</span><span className="hdc-op">;</span></div>
                <div className="hdc-line"><span className="hdc-op">{'}'}</span></div>
                <div className="hdc-line hdc-blank"/>
                <div className="hdc-line"><span className="hdc-cm">// crafted with care ✳</span></div>
              </div>
              {/* Bottom status bar */}
              <div className="hdc-status">
                <span>● main</span>
                <span>UTF-8</span>
                <span>JSX</span>
              </div>
            </div>
            <span className="visual-star" aria-hidden="true">✳</span>
            <div className="visual-note">Curiosity at heart.<br/><span>Craft in every detail.</span><svg viewBox="0 0 80 45" aria-hidden="true"><path d="M3 8 Q45 2 60 35 M49 29 L61 37 L66 23"/></svg></div>
          </div>
          <div className="hero-bottom">
            <span>DESIGNED WITH INTENTION. BUILT WITH CARE.</span>
            <a href="#work">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-index">01 — Projects</span>
              <h2>A few things<br/>I've <i>imagined.</i></h2>
            </div>
          </div>
          <div className="projects">
            {PROJECTS.map(project => (
              <Project key={project.id} project={project} onOpenLightbox={setLightboxProject} />
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-title">
            <span className="eyebrow section-index">02 — ABOUT ME</span>
            <div className="about-photo-wrap">
              <img src="/profile.jpg" alt={PROFILE.name} className="about-photo" />
            </div>
          </div>
          <div className="about-copy">
            <p className="large-copy">Hi, I'm {PROFILE.name}</p>
            <p>a developer and QA tester passionate about creating reliable applications and ensuring software quality. I enjoy problem-solving, exploring new technologies, and continuously improving my skills to build effective and user-friendly solutions.</p>
            <div className="services">{SERVICES.map((service, i) => <div key={service}><span>0{i + 1}</span>{service}<Arrow/></div>)}</div>
            <a className="text-link" href={PROFILE.resume} download>Download Resume  <span aria-hidden="true">↓</span></a>
          </div>
          <div className="skills">{SKILLS.map(group => <div className="skill-group" key={group.category}><h3>{group.category}</h3><div className="tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
        </section>

        <section className="certs section" id="certificates">
          <div className="certs-heading">
            <span className="eyebrow section-index">03 — CREDENTIALS</span>
            <h2>Certificates<span className="title-dot">.</span></h2>
          </div>
          <div className="certs-list">
            {CERTIFICATES.map(cert => (
              <div
                className="cert-row cert-row-clickable"
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedCert(cert)}
                aria-label={`View certificate: ${cert.name}`}
              >
                <span className="cert-num">{cert.id}</span>
                <div className="cert-info">
                  <h3 className="cert-name">{cert.name}</h3>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    {cert.date && <span className="cert-date">{cert.date}</span>}
                  </div>
                </div>
                {cert.image
                  ? (
                    <div className="cert-thumb-wrap">
                      <img className="cert-thumb" src={cert.image} alt={cert.name} />
                      <span className="cert-zoom-hint">⊕ View</span>
                    </div>
                  )
                  : <div className="cert-thumb cert-thumb-empty"><span>No image</span></div>
                }
              </div>
            ))}
          </div>
        </section>

        <section className="testimonial section" aria-label="Testimonials">
          <span className="eyebrow">KIND WORDS</span>
          {TESTIMONIALS.length
            ? TESTIMONIALS.map(item => <figure key={item.name}><blockquote>"{item.quote}"</blockquote><figcaption>{item.name}<span>{item.role}</span></figcaption></figure>)
            : <div className="testimonial-placeholder"><span className="quote-mark" aria-hidden="true">"</span><h2>Good work starts with<br/><i>good conversations.</i></h2><p>Your next collaboration belongs here.<br/>Add a real client or colleague's testimonial when you're ready.</p></div>
          }
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow section-index">04 — LET'S MAKE SOMETHING</span>
            <h2>Have an idea?<br/><i>Let's talk.</i><span className="contact-star" aria-hidden="true">✳</span></h2>
            <p>A project to explore, a question to ask,<br/>or a good conversation. My inbox is open.</p>
            <a className="email-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email} <Arrow/></a>
          </div>
          <ContactForm/>
        </section>
      </main>

      <footer className="footer">
        <a className="wordmark" href="#">{PROFILE.name}<span>.</span></a>
        <span>© {new Date().getFullYear()} · Made with intention.</span>
        <div className="footer-links">
          {PROFILE.github && <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
          {PROFILE.linkedin && <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
          <a href="#">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
