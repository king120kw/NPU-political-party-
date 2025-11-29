/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import { ScrollReveal } from './components/ScrollReveal';
import { Artist } from './types';

// Import all images
import npuLogoPng from './assets/npu-logo.png';
import npuLogoJpg from './assets/npu-logo.jpg';
import aboutImg from './assets/about.png';
import sharifImg from './assets/sharif.png';
import mursalImg from './assets/mursal.png';
import omarImg from './assets/omar.png';
import pillar01Img from './assets/pillar_01.png';
import pillar02Img from './assets/pillar_02.png';
import pillar03Img from './assets/pillar_03.png';
import pillar04Img from './assets/pillar_04.png';
import pillar05Img from './assets/pillar_05.png';
import pillar06Img from './assets/pillar_06.png';
import chairmanUpdateImg from './assets/chairman_update.jpg';
import youthUpdateImg from './assets/youth_update.png';
import joinPartyImg from './assets/join-party.png';
import volunteerImg from './assets/volunteer.png';
import donateImg from './assets/donate.png';
import contactLeadersImg from './assets/contact_leaders_processed.png';

// Dummy Data
const LINEUP: Artist[] = [
  {
    id: '1',
    name: 'Sharif Hassan Sheikh Aden',
    genre: 'Chairman',
    day: 'FOUNDER',
    image: sharifImg,
    description: 'Nicknamed "Sharif the Knife" for his negotiating prowess, Sharif Hassan is a veteran politician and deal-maker instrumental in Somalia\'s state-building. Former Speaker of Parliament (2004-2007, 2010-2012), Deputy PM & Finance Minister (2009), and President of South West State (2014-2018). In September 2025, he launched the National Progress and Unity Party (NPUP) following an agreement with President Hassan Sheikh Mohamud to support electoral reform toward a popular vote system.'
  },
  {
    id: '2',
    name: 'Mohamed Mursal Sheikh Abdurahman',
    genre: 'Co-Founder',
    day: 'LEADER',
    image: mursalImg,
    description: 'Veteran politician and diplomat born in Baidoa (1957). Former Ambassador to Turkey, Minister of Defense (2017-2018), and 13th Speaker of Parliament (2018-2022). Currently serves as Deputy Chairman of the Development and National Unity Party. His extensive career spans executive, legislative, and diplomatic roles, demonstrating broad expertise in national governance. In October 2025, he led a delegation to inaugurate his party\'s regional headquarters in Baidoa, positioning the party as a key contender advocating for political freedoms and multi-party democracy.'
  },
  {
    id: '3',
    name: 'Omar Abdirashid Ali Sharmarke',
    genre: 'Senior Figure',
    day: 'MEMBER',
    image: omarImg,
    description: 'Distinguished diplomat and politician born in Mogadishu (1960), son of Somalia\'s second President. Educated at Carleton University (BA Political Science, MA Political Economy). Former UN civil servant in conflict zones. Served as Prime Minister twice: 2009-2010 during the TFG era, and 2014-2017 under President Hassan Sheikh Mohamud. Key achievements include completing the "Vision 2016" roadmap, overseeing the 2016 elections, and security sector reform. Widely respected as a pragmatic consensus-builder who navigated complex internal conflicts with focus on institutional capacity and national stability.'
  },
  {
    id: '4',
    name: 'Dahir Gelle',
    genre: 'Senior Figure',
    day: 'MEMBER',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    description: 'Former Ambassador and key figure in the opposition split, dedicated to the new vision.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for artist modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtist) return;
      if (e.key === 'ArrowLeft') navigateArtist('prev');
      if (e.key === 'ArrowRight') navigateArtist('next');
      if (e.key === 'Escape') setSelectedArtist(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtist]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateArtist = (direction: 'next' | 'prev') => {
    if (!selectedArtist) return;
    const currentIndex = LINEUP.findIndex(a => a.id === selectedArtist.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % LINEUP.length;
    } else {
      nextIndex = (currentIndex - 1 + LINEUP.length) % LINEUP.length;
    }
    setSelectedArtist(LINEUP[nextIndex]);
  };

  // Mobile Touch Handler Helper
  const [touchedCard, setTouchedCard] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">NPU</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['About', 'Leaders', 'Platform', 'Updates', 'Get Involved', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, '-'))}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('get-involved')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Join Us
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['About', 'Leaders', 'Platform', 'Updates', 'Get Involved', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, '-'))}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('get-involved')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Join Us
            </button>

            <div className="absolute bottom-10 flex gap-6">
              <a href="https://x.com/GoogleAIStudio" className="text-white/50 hover:text-white transition-colors">Twitter</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
          {/* Date / Location */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <span>Mogadishu</span>
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse" />
              <span>Est. 2025</span>
            </motion.div>
          </ScrollReveal>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            {/* Blurred Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center -z-30 pointer-events-auto group cursor-pointer">
              <img
                src={npuLogoPng}
                alt=""
                className="w-[80vw] md:w-[60vw] max-w-4xl opacity-[0.2] scale-110 transition-all duration-1000 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                style={{
                  filter: 'blur(50px) brightness(1.2)',
                  mixBlendMode: 'soft-light',
                  transition: 'filter 1s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'blur(0px) brightness(1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'blur(50px) brightness(1.2)'}
              />
            </div>

            <ScrollReveal delay={0.4}>
              <GradientText
                text="NPU"
                as="h1"
                className="text-[15vw] md:text-[14vw] leading-[0.9] font-black tracking-tighter text-center"
              />
            </ScrollReveal>
            {/* Optimized Orb - Reduced Blur for Performance */}
            <motion.div
              className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none will-change-transform"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ transform: 'translateZ(0)' }}
            />
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <ScrollReveal delay={0.6}>
            <p className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4">
              Unity. Progress. National Dialogue.
            </p>
          </ScrollReveal>
        </motion.div>

        {/* MARQUEE - SLOWED DOWN for Performance & Aesthetics */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          <motion.div
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    HORUMAR IYO MIDNIMO QARAN <span className="text-black text-2xl md:text-4xl">●</span>
                    PROGRESS & UNITY <span className="text-black text-2xl md:text-4xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-20 md:py-32 bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <ScrollReveal>
                <h2 className="text-4xl md:text-7xl font-heading font-bold mb-8 leading-tight">
                  The <br /> <GradientText text="ORIGIN" className="text-5xl md:text-8xl" />
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                  <p>
                    <span className="text-[#a8fbd3] font-bold">September 2, 2025.</span> A new chapter for Somalia began in Mogadishu.
                    Born from the urgent need for true national unity, the <strong className="text-white">Horumar iyo Midnimo Qaran (NPU)</strong> emerged
                    to bridge divides and champion a progressive agenda.
                  </p>
                  <p>
                    Led by visionaries Sharif Hassan Sheikh Aden and Mohamed Mursal, we broke away from the status quo
                    to forge a path toward direct, one-person-one-vote democracy.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { date: 'Aug 24', event: 'The Spark', desc: 'Leaders unite for change' },
                    { date: 'Sep 02', event: 'The Launch', desc: 'NPU founded in Mogadishu' },
                    { date: 'Sep 07', event: 'Certified', desc: 'Official Party Status' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-[#4fb7b3] font-mono text-xs mb-1">{item.date}</div>
                      <div className="text-white font-bold uppercase text-sm mb-1">{item.event}</div>
                      <div className="text-gray-400 text-xs">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={0.4} className="order-1 lg:order-2 relative h-[400px] md:h-[600px] w-full">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#a8fbd3] to-[#637ab9] rounded-3xl -rotate-3 opacity-20 blur-2xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={aboutImg}
                  alt="NPU Origin"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="font-mono text-[#a8fbd3] text-xs tracking-[0.2em] uppercase mb-2">Est. 2025</div>
                  <div className="font-heading text-3xl font-bold text-white">A Fresh Start</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* LEADERS SECTION */}
      <section id="leaders" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
              <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Leaders</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {LINEUP.slice(0, 3).map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} onClick={() => setSelectedArtist(artist)} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section id="platform" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
              <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Platform</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {[
              { id: 'p1', name: 'Unity & Dialogue', genre: 'Bridging the Divide', day: 'PILLAR 01', image: pillar01Img, description: 'Fostering national reconciliation through inclusive dialogue and bridging clan divisions for a united Somalia.' },
              { id: 'p2', name: 'Socio-economic Progress', genre: 'Building the Future', day: 'PILLAR 02', image: pillar02Img, description: 'Implementing robust economic policies to drive development, infrastructure growth, and job creation.' },
              { id: 'p3', name: 'Democratic Reform', genre: 'Power to the People', day: 'PILLAR 03', image: pillar03Img, description: 'Championing direct, one-person-one-vote elections to ensure every Somali voice is heard and counted.' },
              { id: 'p4', name: 'Security & Stability', genre: 'Peace for All', day: 'PILLAR 04', image: pillar04Img, description: 'Strengthening national security institutions to ensure lasting peace and stability across all regions.' },
              { id: 'p5', name: 'Justice & Rule of Law', genre: 'Fairness First', day: 'PILLAR 05', image: pillar05Img, description: 'Establishing an independent judiciary and upholding the rule of law to protect the rights of all citizens.' },
              { id: 'p6', name: 'International Cooperation', genre: 'Global Partners', day: 'PILLAR 06', image: pillar06Img, description: 'Strengthening diplomatic ties and cooperation with international partners for mutual benefit and growth.' },
            ].map((pillar, i) => (
              <ArtistCard key={pillar.id} artist={pillar} onClick={() => setSelectedArtist(pillar)} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST UPDATES SECTION */}
      <section id="updates" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-heading font-bold mb-12 leading-tight text-center">
              Latest <GradientText text="UPDATES" />
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: 'Sep 02, 2025', title: 'NPU Launches in Mogadishu', image: npuLogoPng },
              { date: 'Sep 10, 2025', title: 'Chairman Calls for Unity', image: chairmanUpdateImg },
              { date: 'Sep 15, 2025', title: 'Youth Wing Registration', image: youthUpdateImg },
            ].map((news, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div
                  className={`group cursor-pointer ${touchedCard === `update-${i}` ? 'active' : ''}`}
                  onTouchStart={() => setTouchedCard(`update-${i}`)}
                  onTouchEnd={() => setTimeout(() => setTouchedCard(null), 300)}
                >
                  <div className="relative h-64 mb-6 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={news.image}
                      alt={news.title}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-100 ${touchedCard === `update-${i}` ? 'scale-110 opacity-100' : ''}`}
                    />
                    <div className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${touchedCard === `update-${i}` ? 'bg-transparent' : ''}`} />
                  </div>
                  <div className="text-[#4fb7b3] font-mono text-xs mb-2">{news.date}</div>
                  <h3 className={`text-2xl font-bold leading-tight mb-4 group-hover:text-[#a8fbd3] transition-colors ${touchedCard === `update-${i}` ? 'text-[#a8fbd3]' : ''}`}>
                    {news.title}
                  </h3>
                  <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors ${touchedCard === `update-${i}` ? 'text-white' : ''}`}>
                    Read More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GET INVOLVED SECTION */}
      <section id="get-involved" className="relative z-10 py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-9xl font-heading font-bold text-white mb-8">
              GET <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">INVOLVED</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 font-light">
              Be the change you want to see. Join the movement for a united and progressive Somalia.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Join the Party',
                desc: 'Become an official member today.',
                action: 'Sign Up',
                image: joinPartyImg,
                lordicon: 'https://cdn.lordicon.com/wzrwaorf.json'
              },
              {
                title: 'Volunteer',
                desc: 'Contribute your time and skills.',
                action: 'Apply',
                image: volunteerImg,
                lordicon: 'https://cdn.lordicon.com/slkvcfos.json'
              },
              {
                title: 'Donate',
                desc: 'Support our mission financially.',
                action: 'Give',
                image: donateImg,
                lordicon: 'https://cdn.lordicon.com/qhviklyi.json'
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.3 + (i * 0.15)}>
                <div
                  className={`relative overflow-hidden p-8 border border-white/10 rounded-2xl bg-black/40 hover:bg-black/20 transition-all duration-500 text-left group h-[450px] flex flex-col justify-end cursor-pointer ${touchedCard === `involved-${i}` ? 'bg-black/20' : ''}`}
                  onTouchStart={() => setTouchedCard(`involved-${i}`)}
                  onTouchEnd={() => setTimeout(() => setTouchedCard(null), 300)}
                >
                  {/* Background Image with Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 ease-in-out ${touchedCard === `involved-${i}` ? 'opacity-100 scale-100' : ''}`}
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Lordicon Animated Icon */}
                    <div className="mb-6">
                      <lord-icon
                        src={item.lordicon}
                        trigger="loop"
                        colors="primary:#4fb7b3,secondary:#a8fbd3"
                        style={{ width: '64px', height: '64px' }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-300 mb-8">{item.desc}</p>
                    <button className="w-full py-4 border border-white/20 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-white bg-transparent">
                      {item.action}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 bg-black/30 backdrop-blur-lg border-t border-white/10 group overflow-hidden">
        {/* Background Image with Hover Effect */}
        <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none flex justify-center z-0">
          <img
            src={contactLeadersImg}
            alt="NPU Leaders"
            className="h-full object-contain opacity-30 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">
                  Contact <GradientText text="US" />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="space-y-8 text-lg">
                  <div className="flex items-start gap-6">
                    <MapPin className="w-6 h-6 text-[#4fb7b3] mt-1" />
                    <div>
                      <h4 className="font-bold uppercase tracking-widest mb-1">Headquarters</h4>
                      <p className="text-gray-400">Maka Al-Mukarama Road<br />Mogadishu, Somalia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <Globe className="w-6 h-6 text-[#4fb7b3] mt-1" />
                    <div>
                      <h4 className="font-bold uppercase tracking-widest mb-1">Digital</h4>
                      <p className="text-gray-400">info@npu.so<br />@NPU_Somalia</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.4}>
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Name" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white focus:border-[#4fb7b3] outline-none transition-colors" />
                    <input type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white focus:border-[#4fb7b3] outline-none transition-colors" />
                  </div>
                  <textarea placeholder="Message" rows={4} className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white focus:border-[#4fb7b3] outline-none transition-colors" />
                  <button className="w-full py-4 bg-[#4fb7b3] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-xl">
                    Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">NPU</div>
            <div className="flex gap-2 text-xs font-mono text-gray-400">
              <span>Horumar iyo Midnimo Qaran</span>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://x.com/GoogleAIStudio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Artist Detail Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1a1b3b] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#4fb7b3]/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateArtist('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Artist"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateArtist('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next Artist"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedArtist.id}
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3b] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedArtist.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#4fb7b3] mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-sm tracking-widest uppercase">{selectedArtist.day}</span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedArtist.name}
                  </h3>

                  <p className="text-lg text-[#a8fbd3] font-medium tracking-widest uppercase mb-6">
                    {selectedArtist.genre}
                  </p>

                  <div className="h-px w-20 bg-white/20 mb-6" />

                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedArtist.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default App;