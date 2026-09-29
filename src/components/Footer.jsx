import Countdown from './Countdown';

export default function Footer({ wedding }) {
  return (
    <footer className="site-footer">
      <div className="footer-rule"><span /><i /><span /></div>
      <p className="font-script text-5xl">{wedding.bride} <em>&amp;</em> {wedding.groom}</p>
      <p className="footer-meta">{wedding.location} · {wedding.year}</p>
      <Countdown target={wedding.date} compact />
      <p className="footer-note">Made with love for a beautiful day.</p>
      <a className="admin-link" href="#/admin">Admin</a>
    </footer>
  );
}
