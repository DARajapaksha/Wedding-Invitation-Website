import { useState } from 'react';

export default function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);

  function openEnvelope() {
    setOpened(true);
    window.setTimeout(() => onOpen?.(), 700);
  }

  return (
    <section className={`envelope-screen ${opened ? 'is-open' : ''}`} aria-label="Wedding invitation opening">
      <div className="envelope-haze" />
      <div className="envelope-wrap">
        <div className="envelope-copy">
          <p className="eyebrow">A little invitation</p>
          <h1 className="font-script text-5xl sm:text-7xl">With love</h1>
          <p className="envelope-subtitle">Please open our invitation</p>
        </div>
        <button className="envelope" type="button" onClick={openEnvelope} aria-label="Open wedding invitation">
          <span className="envelope-back" />
          <span className="envelope-flap" />
          <span className="envelope-paper">
            <span className="font-script text-4xl">You’re invited</span>
            <span className="tiny-rule" />
            <span className="envelope-paper-small">to celebrate our love</span>
          </span>
          <span className="envelope-front" />
          <span className="seal">♥</span>
        </button>
        <button className="open-label" type="button" onClick={openEnvelope}>Open invitation</button>
      </div>
    </section>
  );
}
