import { useState } from 'react';
import { cancelRSVP } from '../lib/rsvp';

export default function CancelRSVP({ onExit }) {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const token = params.get('token') || '';
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleCancel() {
    if (!token) {
      setStatus('error');
      setMessage('This RSVP link is missing its cancellation token.');
      return;
    }
    setStatus('loading');
    try {
      const response = await cancelRSVP(token);
      if (response.ok) {
        setStatus('success');
        setMessage('Your RSVP has been cancelled.');
      } else {
        setStatus('error');
        setMessage('We could not find that RSVP or the link is no longer valid.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Could not cancel the RSVP. Please try again.');
    }
  }

  return (
    <main className="admin-screen">
      <div className="paper-card admin-login">
        <p className="eyebrow">RSVP management</p>
        <h1 className="font-serif text-5xl">Change your response</h1>
        <p className="section-intro">You can use this page to cancel your RSVP.</p>
        {message && <p className={`form-message ${status === 'error' ? 'error' : 'success'}`}>{message}</p>}
        {!message && <button className="primary-button" type="button" disabled={status === 'loading'} onClick={handleCancel}>{status === 'loading' ? 'Updating…' : 'Cancel RSVP'}</button>}
        <button className="text-button" type="button" onClick={onExit}>← Back to invitation</button>
      </div>
    </main>
  );
}
