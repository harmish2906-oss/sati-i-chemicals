import React, { useEffect, useRef, useState, lazy, Suspense, memo } from 'react'

// Deferred dynamic GSAP loader — removes GSAP from critical path & eliminates main thread blocking
let _gsapPromise = null
function ensureGSAP(callback) {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve()
    }
  }
  if (!_gsapPromise) {
    _gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    })
  }
  return _gsapPromise.then((res) => {
    if (res && callback) callback(res)
  })
}

/* ============================================================
   IMAGE CONFIG — replace URLs here to update images site-wide
   ============================================================ */
const IMAGES = {
  hero: '/hero.webp',
  about: '/about.webp',
  reactiveDyes: '/reactive-dyes.webp',
  pigments: '/pigments.webp',
  appTextile: '/app-textile.webp',
  appGarments: '/app-garments.webp',
  appPrinting: '/app-printing.webp',
  quality: '/quality.webp',
}

/* ============================================================
   DATA
   ============================================================ */
const PRODUCTS = [
  {
    name: 'Reactive Black GDN',
    code: 'Black GDN',
    color: '#1a1a1a',
    accentColor: '#333333',
    desc: 'Deep, consistent black for textile and garment dyeing applications.',
  },
  {
    name: 'Reactive Brown GR',
    code: 'Brown GR',
    color: '#7a4e2d',
    accentColor: '#9e6b42',
    desc: 'Rich brown tones for versatile fabric colouring across substrates.',
  },
  {
    name: 'Reactive Yellow H7GL',
    code: 'Yellow H7GL',
    color: '#c7a032',
    accentColor: '#d9b84a',
    desc: 'Vibrant yellow suitable for textile and printing applications.',
  },
  {
    name: 'Reactive Orange H2R',
    code: 'Orange H2R',
    color: '#c45e2c',
    accentColor: '#d87a4a',
    desc: 'Bold orange shade for striking textile and garment finishes.',
  },
  {
    name: 'Reactive Red H4B',
    code: 'Red H4B',
    color: '#b03a3a',
    accentColor: '#c95454',
    desc: 'Intense red suitable for garments, textile and printing applications.',
  },
]

const PIGMENTS = [
  {
    name: 'Pigment – Olive Green',
    color: '#6b7a2e',
    accentColor: '#8a9e3a',
    desc: 'Deep earthy olive tone for textile and printing applications.',
  },
  {
    name: 'Pigment – Green B',
    color: '#1e6b3a',
    accentColor: '#2a8f4e',
    desc: 'Rich, bold green for vibrant fabric colouring and printing.',
  },
  {
    name: 'Pigment – Lemon',
    color: '#d4c227',
    accentColor: '#e5d43a',
    desc: 'Bright lemon yellow for fresh, luminous textile shades.',
  },
  {
    name: 'Pigment – Sun Gold',
    color: '#c98a1a',
    accentColor: '#dba030',
    desc: 'Warm golden tone suitable for premium garment and printing use.',
  },
  {
    name: 'Pigment – Blue',
    color: '#1a4a8a',
    accentColor: '#2660b0',
    desc: 'Classic, dependable blue for a wide range of textile applications.',
  },
  {
    name: 'Pigment – Yellow 2G',
    color: '#c4a800',
    accentColor: '#d9bc10',
    desc: 'Bright yellow-green tone for garment and printing industries.',
  },
  {
    name: 'Pigment – Red Violet',
    color: '#8b2560',
    accentColor: '#a83078',
    desc: 'Intense red-violet shade for striking textile and garment finishes.',
  },
]

const APPLICATIONS = [
  {
    title: 'Textile',
    desc: 'Reactive dyes for woven and knitted fabric dyeing across cotton, viscose and blended substrates.',
    image: IMAGES.appTextile,
    number: '01',
  },
  {
    title: 'Garments',
    desc: 'Colour solutions for finished garment dyeing with consistent shade reproducibility.',
    image: IMAGES.appGarments,
    number: '02',
  },
  {
    title: 'Printing',
    desc: 'Dyes and pigments formulated for textile and screen printing processes.',
    image: IMAGES.appPrinting,
    number: '03',
  },
]

const WHY_ITEMS = [
  {
    icon: '◈',
    title: '8 Years of Experience',
    desc: 'Established expertise in reactive dyes and pigment colour manufacturing, serving India and export markets since our founding.',
  },
  {
    icon: '◈',
    title: 'India & Export Markets',
    desc: 'Serving textile businesses across India with growing enquiries from international export markets.',
  },
  {
    icon: '◈',
    title: 'Focused Product Range',
    desc: 'Dedicated specifically to reactive dyes and pigment colours — depth over breadth, ensuring product knowledge and reliability.',
  },
  {
    icon: '◈',
    title: 'Direct Enquiry Process',
    desc: 'Work directly with our team for product information, pricing and availability without intermediaries.',
  },
  {
    icon: '◈',
    title: 'Textile Industry Roots',
    desc: 'Based in Jetpur, Gujarat — one of India\'s foremost textile dyeing regions with deep industry connections.',
  },
  {
    icon: '◈',
    title: 'Application Support',
    desc: 'Guidance available on dye selection and application for textile, garment and printing processes.',
  },
]

const QUALITY_STEPS = [
  {
    title: 'Raw Material Selection',
    desc: 'Careful sourcing and inspection of raw materials to ensure quality from the start of production.',
  },
  {
    title: 'Controlled Manufacturing',
    desc: 'Controlled production processes focused on consistent dye quality and shade accuracy batch to batch.',
  },
  {
    title: 'Shade & Quality Review',
    desc: 'Thorough review at each stage including shade matching and purity checks before dispatch.',
  },
  {
    title: 'Packaging & Dispatch',
    desc: 'Secure packaging designed to maintain product integrity and stability during transit.',
  },
]

const SPECTRUM_COLORS = [
  { color: '#b03a3a', label: 'Red H4B' },
  { color: '#b84030', label: '' },
  { color: '#c04e30', label: '' },
  { color: '#c45e2c', label: 'Orange H2R' },
  { color: '#c47530', label: '' },
  { color: '#c88a30', label: '' },
  { color: '#c7a032', label: 'Yellow H7GL' },
  { color: '#b48a3c', label: '' },
  { color: '#9e6b42', label: '' },
  { color: '#7a4e2d', label: 'Brown GR' },
  { color: '#4a3520', label: '' },
  { color: '#2a2019', label: '' },
  { color: '#1a1a1a', label: 'Black GDN' },
]

const PHONE = '+91 87588 52951'
const PHONE_RAW = '+918758852951'
const PHONE2 = '+91 7046723091'
const PHONE2_RAW = '+917046723091'
const WHATSAPP_BASE = 'https://wa.me/918758852951'
const EMAIL = 'satiichemicals@gmail.com'
const WA_DEFAULT_MSG = 'Hello SATI I CHEMICALS, I am interested in your Reactive Dye and Pigment Colour products. Please share more information.'

function getWhatsAppUrl(product) {
  const msg = product
    ? `Hello SATI I CHEMICALS, I am interested in ${product}. Please share more information.`
    : WA_DEFAULT_MSG
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`
}

/* ============================================================
   SVG ICONS
   ============================================================ */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

/* ============================================================
   HEADER COMPONENT
   ============================================================ */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Applications', id: 'applications' },
    { label: 'Quality', id: 'quality' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <>
      <header className={`header ${scrolled ? 'header--solid' : 'header--transparent'}`} id="header">
        <div className="container header__inner">
          <a
            href="#"
            className="header__logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <img src="/logo.webp" alt="SATI I CHEMICALS Logo" className="header__logo-img" width="44" height="44" decoding="async" />
            <div className="header__logo-text">
              <span className="header__logo-name">SATI I CHEMICALS</span>
              <span className="header__logo-tagline">Reactive Dyes &amp; Pigment Colours</span>
            </div>
          </a>
          <nav className="header__nav" aria-label="Main navigation">
            <div className="header__nav-links">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="header__nav-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={getWhatsAppUrl()}
              className="btn header__cta-btn"
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-cta"
            >
              <WhatsAppIcon /> Enquire
            </a>
            <button
              className={`header__menu-toggle ${menuOpen ? 'header__menu-toggle--open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-nav__logo">
          <img src="/logo.webp" alt="SATI I CHEMICALS Logo" className="mobile-nav__logo-img" width="44" height="44" decoding="async" />
          <div>
            <span className="mobile-nav__logo-name">SATI I CHEMICALS</span>
            <span className="mobile-nav__logo-tagline">Reactive Dyes &amp; Pigment Colours</span>
          </div>
        </div>
        {navLinks.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="mobile-nav__link"
            onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={getWhatsAppUrl()}
          className="btn btn--whatsapp mobile-nav__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> Send Enquiry on WhatsApp
        </a>
        <div className="mobile-nav__contact">
          <a href={`tel:${PHONE_RAW}`}>{PHONE} &nbsp;<span className="mobile-nav__contact-badge">Phone / WhatsApp</span></a>
          <a href={`tel:${PHONE2_RAW}`}>{PHONE2} &nbsp;<span className="mobile-nav__contact-badge">Phone</span></a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </>
  )
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !heroRef.current) return
        ctx = gsap.context(() => {
          // Subtle parallax on image
          gsap.to('.hero__img', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
        }, heroRef)
      })
    }, 800)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-pattern" />
        <div className="hero__bg-image">
          <img
            src={IMAGES.hero}
            srcSet="/hero-480.webp 540w, /hero-800.webp 900w, /hero.webp 1920w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
            alt="Reactive dye powders in a chemical manufacturing facility"
            className="hero__img"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          <div className="hero__bg-image-overlay" />
        </div>
      </div>

      <div className="hero__content container">
        <div className="hero__inner">
          <div className="hero__text">
            <div className="hero__label">
              <span>Established Manufacturer — Jetpur, Gujarat, India</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-line" style={{ display: 'block' }}>REACTIVE</span>
              <span className="hero__title-line" style={{ display: 'block' }}>DYES &amp;</span>
              <span className="hero__title-line hero__title-line--accent" style={{ display: 'block' }}>PIGMENT</span>
              <span className="hero__title-line hero__title-line--accent" style={{ display: 'block' }}>COLOURS</span>
            </h1>
            <p className="hero__subtitle">
              Colour solutions for textile, garment and printing applications from the heart of Gujarat's dye industry.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => scrollTo('products')} id="hero-explore-btn">
                Explore Products <ArrowRight />
              </button>
              <a
                href={getWhatsAppUrl()}
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
              >
                <WhatsAppIcon /> Send Enquiry
              </a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">8+</span>
                <span className="hero__stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  )
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */
const About = memo(function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.about__visual', {
            opacity: 0,
            x: -50,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.about__content > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about__content',
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.about__image-inner', {
            scale: 1.08,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.about__image-inner',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__visual">
            <div className="about__image-main">
              <div className="about__image-inner">
                <img
                  src={IMAGES.about}
                  alt="Textile dyeing factory in Gujarat — workers processing colourful fabric in dye vats"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="960"
                />
              </div>
            </div>
            <div className="about__experience-badge">
              <span className="about__experience-number">8+</span>
              <span className="about__experience-text">Years Experience</span>
            </div>
          </div>
          <div className="about__content">
            <div className="section-label">About Us</div>
            <h2 className="section-title">Colour Expertise Built Over Years of Industry</h2>
            <p className="about__text">
              SATI I CHEMICALS is a manufacturer of reactive dyes and pigment colours based in Jetpur, Rajkot, Gujarat — a region with deep roots in India's textile dyeing industry. With 8 years of focused experience, we serve businesses across India and export markets.
            </p>
            <p className="about__text">
              Our product range covers reactive dyes and pigment colours for textile, garment and printing applications. We work directly with buyers to provide product information, pricing and availability without intermediaries.
            </p>
            <div className="about__highlights">
              {[
                'Reactive dyes &amp; pigment colour manufacturer',
                'India &amp; export market enquiries welcome',
                'Based in Jetpur, Gujarat — India\'s dye hub',
                'Direct business enquiry process',
              ].map((text, i) => (
                <div key={i} className="about__highlight">
                  <span className="about__highlight-icon"><CheckIcon /></span>
                  <span className="about__highlight-text" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   REACTIVE DYES SECTION
   ============================================================ */
const ReactiveDyes = memo(function ReactiveDyes() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    ensureGSAP(({ gsap }) => {
      if (!isMounted || !sectionRef.current) return
      ctx = gsap.context(() => {
        gsap.from('.reactive__image-panel', {
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.reactive__image-panel',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }, sectionRef)
    })

    return () => {
      isMounted = false
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="reactive-dyes" id="products" ref={sectionRef}>
      <div className="container">
        <div className="reactive__layout">
          <div className="reactive__left">
            <div className="reactive__header">
              <div className="section-label">Reactive Dyes</div>
              <h2 className="section-title">Our Reactive Dye Range</h2>
              <p className="section-desc">
                Five core reactive dye grades for textile, garment and printing applications. Contact us for product details, pricing and current availability.
              </p>
            </div>
            <div className="products__grid">
              {PRODUCTS.map((product, i) => (
                <a
                  key={i}
                  href={getWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card"
                  style={{ '--product-color': product.color, textDecoration: 'none' }}
                  aria-label={`Enquire about ${product.name}`}
                >
                  <div className="product-card__swatch" style={{ backgroundColor: product.color }} />
                  <h3 className="product-card__name">{product.name}</h3>
                  <div className="product-card__code">Code: {product.code}</div>
                  <p className="product-card__desc">{product.desc}</p>
                  <div className="product-card__note">Contact us for product details and availability.</div>
                  <span className="product-card__enquiry">
                    Enquire on WhatsApp <ArrowRight />
                  </span>
                </a>
              ))}
            </div>
            <div className="reactive__cta">
              <a
                href={getWhatsAppUrl('your reactive dye requirements')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                id="reactive-enquiry-btn"
              >
                <WhatsAppIcon /> Request Product Information
              </a>
            </div>
          </div>
          <div className="reactive__image-panel">
            <img
              src={IMAGES.reactiveDyes}
              alt="Reactive dye powders — golden yellow, deep red, orange, brown and black pigment heaps on dark surface"
              loading="lazy"
              decoding="async"
              width="900"
              height="1200"
            />
            <div className="reactive__image-caption">
              <span>Reactive Dye Powders</span>
              <span>SATI I CHEMICALS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   PIGMENT COLOURS SECTION
   ============================================================ */
const PigmentColours = memo(function PigmentColours() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    ensureGSAP(({ gsap }) => {
      if (!isMounted || !sectionRef.current) return
      ctx = gsap.context(() => {
        gsap.from('.pigment__side-image', {
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pigment__side-image',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }, sectionRef)
    })

    return () => {
      isMounted = false
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="pigment" id="pigments" ref={sectionRef}>
      <div className="container">
        <div className="pigment__layout">
          <div className="pigment__left">
            <div className="pigment__header">
              <div className="section-label">Pigment Colours</div>
              <h2 className="section-title">Our Pigment Colour Range</h2>
              <p className="section-desc">
                Seven pigment colour grades for textile, garment and printing applications. Contact us for product details, pricing and current availability.
              </p>
            </div>
            <div className="pigments__grid">
              {PIGMENTS.map((pigment, i) => (
                <a
                  key={i}
                  href={getWhatsAppUrl(pigment.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card pigment-card"
                  style={{ '--product-color': pigment.color, textDecoration: 'none' }}
                  aria-label={`Enquire about ${pigment.name}`}
                >
                  <div
                    className="product-card__swatch pigment-card__swatch"
                    style={{
                      background: `linear-gradient(135deg, ${pigment.color} 60%, ${pigment.accentColor} 100%)`,
                      boxShadow: `0 4px 16px ${pigment.color}40`,
                    }}
                  />
                  <h3 className="product-card__name">{pigment.name}</h3>
                  <p className="product-card__desc">{pigment.desc}</p>
                  <div className="product-card__note">Contact us for product details and availability.</div>
                  <span className="product-card__enquiry">
                    Enquire on WhatsApp <ArrowRight />
                  </span>
                </a>
              ))}
            </div>
            <div className="reactive__cta">
              <a
                href={getWhatsAppUrl('Pigment Colours')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                id="pigment-enquiry-btn"
              >
                <WhatsAppIcon /> Request Pigment Information
              </a>
            </div>
          </div>
          <div className="pigment__side-image">
            <img
              src={IMAGES.pigments}
              alt="Colourful pigment powders — violet, blue, green, yellow, orange and red arranged on dark slate surface"
              loading="lazy"
              decoding="async"
              width="900"
              height="1200"
            />
            <div className="pigment__side-caption">
              <span>Pigment Colour Range</span>
              <span>SATI I CHEMICALS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   COLOUR SPECTRUM
   ============================================================ */
const ColourSpectrum = memo(function ColourSpectrum() {
  const sectionRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.spectrum__header > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.spectrum__bar', {
            scaleY: 0,
            transformOrigin: 'bottom',
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.spectrum__strip',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.spectrum__swatches .spectrum__swatch', {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.spectrum__swatches',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="spectrum" id="spectrum" ref={sectionRef}>
      <div className="container">
        <div className="spectrum__header">
          <div className="section-label section-label--light">Colour Range</div>
          <h2 className="section-title section-title--light">Colour Spectrum</h2>
          <p className="section-desc section-desc--light" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Explore the colour range available across our reactive dye and pigment portfolio.
          </p>
        </div>

        <div className="spectrum__strip" role="img" aria-label="Interactive colour spectrum showing dye colour range">
          {SPECTRUM_COLORS.map((c, i) => (
            <div
              key={i}
              className={`spectrum__bar ${hoveredIndex === i ? 'spectrum__bar--active' : ''}`}
              style={{ backgroundColor: c.color }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {c.label && (
                <span className="spectrum__bar-label">{c.label}</span>
              )}
            </div>
          ))}
        </div>

        <div className="spectrum__swatches">
          {SPECTRUM_COLORS.filter(c => c.label).map((c, i) => (
            <div key={i} className="spectrum__swatch">
              <div className="spectrum__swatch-color" style={{ backgroundColor: c.color }} />
              <span className="spectrum__swatch-label">{c.label}</span>
            </div>
          ))}
        </div>

        <div className="spectrum__info">
          <p className="spectrum__info-text">Hover over the spectrum to explore our colour range</p>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   APPLICATIONS SECTION
   ============================================================ */
const ApplicationsSection = memo(function ApplicationsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.applications .section-label, .applications .section-title, .applications .section-desc', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.application-card', {
            opacity: 0,
            y: 50,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.applications__grid',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="applications" id="applications" ref={sectionRef}>
      <div className="container">
        <div className="applications__header">
          <div className="section-label">Applications</div>
          <h2 className="section-title">Where Our Colours Are Used</h2>
          <p className="section-desc">
            Reactive dyes and pigment colours serving India's core textile processing industries.
          </p>
        </div>
        <div className="applications__grid">
          {APPLICATIONS.map((app, i) => (
            <div key={i} className="application-card">
              <div className="application-card__bg">
                <img
                  src={app.image}
                  alt={`${app.title} application — reactive dyes for ${app.title.toLowerCase()} industry`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="application-card__img"
                />
              </div>
              <div className="application-card__overlay" />
              <div className="application-card__content">
                <div className="application-card__number">{app.number}</div>
                <h3 className="application-card__title">{app.title}</h3>
                <p className="application-card__desc">{app.desc}</p>
                <a
                  href={getWhatsAppUrl(`${app.title} dyes`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="application-card__link"
                  aria-label={`Enquire about ${app.title} application dyes`}
                >
                  Enquire <ArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   QUALITY / PROCESS
   ============================================================ */
const Quality = memo(function Quality() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.quality .section-label, .quality .section-title, .quality .section-desc, .quality__intro', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.quality__step', {
            opacity: 0,
            x: -30,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.quality__steps',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.quality__image', {
            opacity: 0,
            scale: 0.96,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.quality__image',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="quality" id="quality" ref={sectionRef}>
      <div className="container">
        <div className="quality__grid">
          <div className="quality__left">
            <div className="section-label">Quality &amp; Process</div>
            <h2 className="section-title">Our Manufacturing Approach</h2>
            <p className="section-desc quality__intro">
              From raw material to dispatch — a controlled process focused on colour consistency and product quality.
            </p>
            <p className="quality__note">
              Product information, application requirements and availability can be discussed directly with our team. Contact us for specific enquiries.
            </p>
            <div className="quality__steps">
              {QUALITY_STEPS.map((step, i) => (
                <div key={i} className="quality__step">
                  <span className="quality__step-number">0{i + 1}</span>
                  <div>
                    <h3 className="quality__step-title">{step.title}</h3>
                    <p className="quality__step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={getWhatsAppUrl('product details and quality information')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary quality__cta"
              id="quality-enquiry-btn"
            >
              <WhatsAppIcon /> Discuss Your Requirements
            </a>
          </div>
          <div className="quality__image">
            <img
              src={IMAGES.quality}
              alt="Quality control process — examining colour samples and dye solutions in a professional setting"
              loading="lazy"
              decoding="async"
              width="900"
              height="900"
            />
          </div>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   WHY SATI I CHEMICALS
   ============================================================ */
const WhySection = memo(function WhySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.why__header > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.why__item', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.why__grid',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="why" id="why" ref={sectionRef}>
      <div className="why__bg-accent" aria-hidden="true" />
      <div className="container">
        <div className="why__header">
          <div className="section-label section-label--light">Why Choose Us</div>
          <h2 className="section-title section-title--light">Why SATI I CHEMICALS</h2>
          <p className="section-desc section-desc--light">
            Reasons businesses choose to work with us for their dye and pigment colour requirements.
          </p>
        </div>
        <div className="why__grid">
          {WHY_ITEMS.map((item, i) => (
            <div key={i} className="why__item">
              <div className="why__item-number">0{i + 1}</div>
              <h3 className="why__item-title">{item.title}</h3>
              <p className="why__item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   ENQUIRY CTA BANNER
   ============================================================ */
const EnquiryCTA = memo(function EnquiryCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.enquiry-cta__inner > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="enquiry-cta" ref={sectionRef}>
      <div className="container">
        <div className="enquiry-cta__inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Get in Touch</div>
          <h2 className="enquiry-cta__title">Ready to Discuss Your Colour Requirements?</h2>
          <p className="enquiry-cta__desc">
            Contact us directly via WhatsApp or email. We respond promptly to all product and pricing enquiries.
          </p>
          <div className="enquiry-cta__actions">
            <a
              href={getWhatsAppUrl()}
              className="btn btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
            >
              <WhatsAppIcon /> WhatsApp Enquiry
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn--dark" id="cta-email-btn">
              <MailIcon /> Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   CONTACT FORM
   ============================================================ */
const Contact = memo(function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', product: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build WhatsApp message from form data
    let msg = `Hello SATI I CHEMICALS,\n\nName: ${formData.name}`
    if (formData.company) msg += `\nCompany: ${formData.company}`
    if (formData.email) msg += `\nEmail: ${formData.email}`
    if (formData.phone) msg += `\nPhone: ${formData.phone}`
    if (formData.product) msg += `\nProduct Interest: ${formData.product}`
    if (formData.message) msg += `\n\nMessage: ${formData.message}`
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    let ctx
    let isMounted = true
    const timer = setTimeout(() => {
      ensureGSAP(({ gsap }) => {
        if (!isMounted || !sectionRef.current) return
        ctx = gsap.context(() => {
          gsap.from('.contact__info > *', {
            opacity: 0,
            x: -30,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          gsap.from('.contact__form', {
            opacity: 0,
            x: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact__form',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }, sectionRef)
      })
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <div>
              <div className="section-label">Contact</div>
              <h2 className="section-title">Send Us an Enquiry</h2>
              <p className="section-desc">
                Reach out for product details, pricing or availability of our dye and pigment colour range.
              </p>
            </div>

            <div className="contact__info-item">
              <span className="contact__info-icon"><MapPinIcon /></span>
              <div>
                <div className="contact__info-label">Address</div>
                <div className="contact__info-value">
                  Kanakiya Plot, Opp. Hotel Kamlesh,<br />Jetpur - 360370, Gujarat, India
                </div>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon"><PhoneIcon /></span>
              <div>
                <div className="contact__info-label">Phone / WhatsApp</div>
                <div className="contact__info-value">
                  <a href={`tel:${PHONE_RAW}`}>{PHONE}</a>
                </div>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon"><PhoneIcon /></span>
              <div>
                <div className="contact__info-label">Phone</div>
                <div className="contact__info-value">
                  <a href={`tel:${PHONE2_RAW}`}>{PHONE2}</a>
                </div>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon"><MailIcon /></span>
              <div>
                <div className="contact__info-label">Email</div>
                <div className="contact__info-value">
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
            </div>

            <div className="contact__whatsapp-direct">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
                id="contact-whatsapp-direct"
              >
                <WhatsAppIcon /> Direct WhatsApp Chat
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} id="enquiry-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-group__label" htmlFor="contact-name">Full Name *</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="form-group__label" htmlFor="contact-company">Company</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="contact-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-group__label" htmlFor="contact-email">Email</label>
                <input
                  className="form-group__input"
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label className="form-group__label" htmlFor="contact-phone">Phone</label>
                <input
                  className="form-group__input"
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  autoComplete="tel"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-group__label" htmlFor="contact-product">Product Interest</label>
              <select
                className="form-group__select"
                id="contact-product"
                name="product"
                value={formData.product}
                onChange={handleChange}
              >
                <option value="">Select a product or category</option>
                {PRODUCTS.map((p, i) => (
                  <option key={i} value={p.name}>{p.name}</option>
                ))}
                <option value="Pigment Colours">Pigment Colours</option>
                <option value="Multiple Products">Multiple Products</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-group__label" htmlFor="contact-message">Message</label>
              <textarea
                className="form-group__textarea"
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements — quantities, applications, specific shades..."
                rows="5"
              />
            </div>
            <button
              type="submit"
              className={`btn btn--primary form__submit ${submitted ? 'form__submit--sent' : ''}`}
              id="contact-submit-btn"
            >
              {submitted ? '✓ Opening WhatsApp...' : <><WhatsAppIcon /> Send via WhatsApp</>}
            </button>
            <p className="form__note">
              Your enquiry will be sent directly via WhatsApp for the fastest response.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
})

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__brand-logo">
                <img
                  src="/logo.webp"
                  alt="SATI I CHEMICALS Logo"
                  className="footer__brand-logo-img"
                  width="52"
                  height="52"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="footer__brand-name">SATI I CHEMICALS</div>
                  <div className="footer__brand-tagline">Reactive Dyes &amp; Pigment Colours</div>
                </div>
              </div>
              <p className="footer__brand-desc">
                Manufacturer of reactive dyes and pigment colours for textile, garment and printing applications. Based in Jetpur, Gujarat, India.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__whatsapp"
                id="footer-whatsapp-btn"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
            <div>
              <div className="footer__col-title">Navigation</div>
              <div className="footer__links">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Reactive Dyes', id: 'products' },
                  { label: 'Pigment Colours', id: 'pigments' },
                  { label: 'Applications', id: 'applications' },
                  { label: 'Quality', id: 'quality' },
                  { label: 'Contact', id: 'contact' },
                ].map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="footer__link"
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="footer__col-title">Products</div>
              <div className="footer__links">
                {PRODUCTS.map((p, i) => (
                  <a
                    key={i}
                    href={getWhatsAppUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                  >
                    {p.name}
                  </a>
                ))}
                <a
                  href={getWhatsAppUrl('Pigment Colours')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  Pigment Colours
                </a>
              </div>
            </div>
            <div>
              <div className="footer__col-title">Contact</div>
              <div className="footer__links">
                <span className="footer__link footer__link--text">Kanakiya Plot, Opp. Hotel Kamlesh</span>
                <span className="footer__link footer__link--text">Jetpur - 360370, Gujarat, India</span>
                <a href={`tel:${PHONE_RAW}`} className="footer__link">{PHONE} <span className="footer__phone-badge">WA</span></a>
                <a href={`tel:${PHONE2_RAW}`} className="footer__link">{PHONE2}</a>
                <a href={`mailto:${EMAIL}`} className="footer__link">{EMAIL}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <span className="footer__copyright">© {currentYear} SATI I CHEMICALS. All rights reserved.</span>
            <span className="footer__location">Jetpur - 360370, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
})

/* ============================================================
   WHATSAPP FLOATING BUTTON
   ============================================================ */
const WhatsAppFloat = memo(function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={getWhatsAppUrl()}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'scale(1)' : 'scale(0.8)',
      }}
      id="whatsapp-float-btn"
    >
      <WhatsAppIcon />
      <span className="whatsapp-float__pulse" />
    </a>
  )
})

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let triggered = false
    const triggerMount = () => {
      if (triggered) return
      triggered = true
      setMounted(true)
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        setTimeout(() => {
          ensureGSAP(({ ScrollTrigger }) => {
            ScrollTrigger.refresh()
          })
        }, 100)
      }
    }

    window.addEventListener('scroll', triggerMount, { passive: true, once: true })
    window.addEventListener('touchstart', triggerMount, { passive: true, once: true })
    window.addEventListener('mousemove', triggerMount, { passive: true, once: true })

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(triggerMount, { timeout: 1000 })
      return () => {
        window.cancelIdleCallback(id)
        window.removeEventListener('scroll', triggerMount)
        window.removeEventListener('touchstart', triggerMount)
        window.removeEventListener('mousemove', triggerMount)
      }
    } else {
      const timer = setTimeout(triggerMount, 400)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('scroll', triggerMount)
        window.removeEventListener('touchstart', triggerMount)
        window.removeEventListener('mousemove', triggerMount)
      }
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {mounted && (
          <>
            <ReactiveDyes />
            <PigmentColours />
            <ColourSpectrum />
            <ApplicationsSection />
            <Quality />
            <WhySection />
            <EnquiryCTA />
            <Contact />
          </>
        )}
      </main>
      {mounted && <Footer />}
      {mounted && <WhatsAppFloat />}
    </>
  )
}
