export default function StorySection({ story }) {
  return (
    <section className="section-pad site-shell story-section">
      <div className="section-heading">
        <p className="eyebrow">A few chapters</p>
        <h2 className="font-serif text-4xl sm:text-6xl">Our story</h2>
        <p className="section-intro">A little look at the moments that brought us here.</p>
      </div>

      <div className="story-list">
        {story.map((item, index) => (
          <article className="story-row" key={`${item.year}-${item.title}`}>
            <div className="story-year">{item.year}</div>
            <div className="story-line"><span className="story-dot" /></div>
            <div className="story-copy" style={{ '--delay': `${index * 80}ms` }}>
              <h3 className="font-serif text-3xl">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
