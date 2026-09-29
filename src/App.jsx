import { useEffect, useMemo, useRef, useState } from 'react';
import { WEDDING } from './config/wedding';
import Envelope from './components/Envelope';
import HeroInvitation from './components/HeroInvitation';
import EventSection from './components/EventSection';
import StorySection from './components/StorySection';
import Itinerary from './components/Itinerary';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import AdminPanel from './components/AdminPanel';
import CancelRSVP from './components/CancelRSVP';
import Footer from './components/Footer';
import Petals from './components/Petals';

function getRoute() {
  return window.location.hash || '';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const isAdmin = route === '#/admin' || route === '#admin';
  const isCancel = route.startsWith('#/cancel');

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = WEDDING.siteTitle;
  }, []);

  useEffect(() => {
    if (!opened) return undefined;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', String(window.scrollY / max));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [opened]);

  useEffect(() => {
    if (!WEDDING.music.enabled) return undefined;
    const audio = audioRef.current;
    if (!audio) return undefined;
    if (musicOn) {
      audio.play().catch(() => setMusicOn(false));
    } else {
      audio.pause();
    }
    return undefined;
  }, [musicOn]);

  const optionalGuest = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to');
  }, []);

  function scrollToRSVP() {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (isCancel) {
    return <CancelRSVP onExit={() => { window.location.hash = ''; setRoute(''); }} />;
  }

  if (isAdmin) {
    return <AdminPanel onExit={() => { window.location.hash = ''; setRoute(''); }} />;
  }

  return (
    <main className="app-shell">
      <div className="scroll-line" aria-hidden="true" />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      <div className={`invitation ${opened ? 'is-visible' : 'is-hidden'}`}>
        <div className="background-layer" aria-hidden="true">
          <div className="bg-glow bg-glow-one" />
          <div className="bg-glow bg-glow-two" />
          <div className="bg-grid" />
          <div className="burgundy-tint" />
        </div>

        <Petals />

        {WEDDING.music.enabled && (
          <>
            <audio ref={audioRef} src={WEDDING.music.src} loop preload="none" />
            <button className="music-button" type="button" onClick={() => setMusicOn((value) => !value)} aria-label={musicOn ? 'Pause music' : 'Play music'}>
              <span className={`music-bars ${musicOn ? 'playing' : ''}`}><i /><i /><i /></span>
              {musicOn ? 'Pause' : 'Music'}
            </button>
          </>
        )}

        <nav className="floating-nav" aria-label="Invitation navigation">
          <a href="#top">Home</a>
          <a href="#details">Details</a>
          <a href="#story">Story</a>
          <a href="#gallery">Gallery</a>
          <a href="#rsvp">RSVP</a>
        </nav>

        <div id="top" className="relative z-10">
          <HeroInvitation wedding={{ ...WEDDING, greeting: optionalGuest ? `For ${optionalGuest}` : WEDDING.greeting }} onScrollToRSVP={scrollToRSVP} />
          <EventSection wedding={WEDDING} />
          <div id="story"><StorySection story={WEDDING.story} /></div>
          <Itinerary items={WEDDING.schedule} />
          <div id="gallery"><Gallery images={WEDDING.gallery} /></div>
          <RSVPForm wedding={WEDDING} />
          <Footer wedding={WEDDING} />
        </div>
      </div>
    </main>
  );
}
