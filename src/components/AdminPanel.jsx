import { useEffect, useMemo, useState } from 'react';
import { downloadCSV, loadRSVPs } from '../lib/rsvp';

export default function AdminPanel({ onExit }) {
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      attending: rows.filter((row) => row.attendance === 'yes').length,
      notAttending: rows.filter((row) => row.attendance === 'no').length,
      guests: rows.filter((row) => row.attendance === 'yes').reduce((sum, row) => sum + Number(row.guests || 1), 0),
    };
  }, [rows]);

  async function login(event) {
    event.preventDefault();
    setStatus('Loading…');
    try {
      const response = await loadRSVPs(password);
      setRows(response.rsvps || []);
      setLoggedIn(true);
      setStatus(response.demo ? 'Local demo data' : 'Connected to the RSVP database');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not open the dashboard.');
    }
  }

  useEffect(() => {
    if (loggedIn) return;
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <main className="admin-screen">
        <div className="paper-card admin-login">
          <p className="eyebrow">Private area</p>
          <h1 className="font-serif text-5xl">RSVP Admin</h1>
          <p className="section-intro">Use the password configured in your Vercel environment variables.</p>
          <form onSubmit={login} className="stack-form">
            <label className="field">
              <span>Admin password</span>
              <input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            <button className="primary-button" type="submit">Open dashboard</button>
          </form>
          <p className="small-note">During local Vite development, the dashboard can display browser-stored demo RSVPs.</p>
          <button className="text-button" type="button" onClick={onExit}>← Back to invitation</button>
          {status && <p className="small-note">{status}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="admin-screen">
      <div className="admin-panel">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Private area</p>
            <h1 className="font-serif text-4xl">RSVP dashboard</h1>
          </div>
          <div className="admin-actions">
            <button className="secondary-button" type="button" onClick={() => downloadCSV(rows)}>Export CSV</button>
            <button className="text-button" type="button" onClick={onExit}>Exit</button>
          </div>
        </div>

        <p className="small-note">{status}</p>

        <div className="stats-grid">
          <div className="stat-card"><strong>{stats.total}</strong><span>Responses</span></div>
          <div className="stat-card"><strong>{stats.attending}</strong><span>Attending</span></div>
          <div className="stat-card"><strong>{stats.notAttending}</strong><span>Declined</span></div>
          <div className="stat-card"><strong>{stats.guests}</strong><span>Guests attending</span></div>
        </div>

        <div className="table-wrap paper-card">
          <table>
            <thead>
              <tr><th>Name</th><th>Attendance</th><th>Guests</th><th>Meal</th><th>Contact</th><th>Message</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id || row.guest_token}>
                  <td>{row.name}</td>
                  <td>{row.attendance === 'yes' ? 'Attending' : 'Declined'}</td>
                  <td>{row.guests}</td>
                  <td>{row.meal || '—'}</td>
                  <td>{row.email || row.phone || '—'}</td>
                  <td>{row.message || '—'}</td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan="6" className="empty-row">No RSVPs yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
