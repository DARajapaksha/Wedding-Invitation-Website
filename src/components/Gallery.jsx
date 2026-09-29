import { useState } from 'react';

function Placeholder({ index }) {
  return (
    <div className="gallery-placeholder">
      <span className="font-script text-3xl">Photo {String(index + 1).padStart(2, '0')}</span>
      <span>Add your photo in public/images/</span>
    </div>
  );
}

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section-pad site-shell">
      <div className="section-heading">
        <p className="eyebrow">Memories</p>
        <h2 className="font-serif text-4xl sm:text-6xl">A little gallery</h2>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <button className={`gallery-item ${image.featured ? 'gallery-featured' : ''}`} type="button" key={image.src} onClick={() => setSelected(image)}>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling.style.display = 'grid';
              }}
            />
            <div className="gallery-fallback" style={{ display: 'none' }}><Placeholder index={index} /></div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Selected gallery image" onClick={() => setSelected(null)}>
          <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image">×</button>
          <div className="lightbox-image-wrap">
            <img
              src={selected.src}
              alt={selected.alt}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling.style.display = 'grid';
              }}
              onClick={(event) => event.stopPropagation()}
            />
            <div className="lightbox-fallback" style={{ display: 'none' }}><Placeholder index={Math.max(0, images.indexOf(selected))} /></div>
          </div>
        </div>
      )}
    </section>
  );
}
