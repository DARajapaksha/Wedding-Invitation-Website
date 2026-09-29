import { useMemo, useState } from 'react';
import { makeCancelLink, submitRSVP } from '../lib/rsvp';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  attendance: 'yes',
  guests: 1,
  meal: 'No preference',
  message: '',
  website: '',
};

export default function RSVPForm({ wedding }) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [result, setResult] = useState(null);

  const deadlineLabel = useMemo(() => {
    if (!wedding.rsvpDeadline) return null;
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(wedding.rsvpDeadline));
  }, [wedding.rsvpDeadline]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: '' });
    try {
      const response = await submitRSVP(values);
      setResult(response);
      setStatus({ type: 'success', message: response.demo ? 'Saved in local demo mode.' : 'Your RSVP has been saved.' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong.' });
    }
  }

  if (result) {
    const cancelLink = makeCancelLink(result.token);
    return (
      <section id="rsvp" className="section-pad site-shell">
        <div className="success-card paper-card">
          <p className="eyebrow">Thank you</p>
          <h2 className="font-script text-6xl sm:text-8xl">We’ll see you there.</h2>
          <p className="section-intro max-w-xl mx-auto">Your response has been recorded for {values.name}.</p>
          <p className="small-note">Need to change your response later? Keep this link safe:</p>
          <div className="cancel-link-box">{cancelLink}</div>
          <a className="secondary-button inline-flex" href={cancelLink}>Manage RSVP</a>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section-pad site-shell rsvp-section">
      <div className="section-heading">
        <p className="eyebrow">Kindly reply</p>
        <h2 className="font-serif text-4xl sm:text-6xl">Will you celebrate with us?</h2>
        <p className="section-intro">{wedding.rsvpMessage}{deadlineLabel ? ` RSVP deadline: ${deadlineLabel}.` : ''}</p>
      </div>

      <form className="paper-card form-card" onSubmit={handleSubmit} noValidate>
        <div className="sr-only" aria-hidden="true">
          <label>Website <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update('website', event.target.value)} /></label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Your name *</span>
            <input required value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Your full name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>Phone</span>
            <input value={values.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+94 77 123 4567" />
          </label>
          <label className="field">
            <span>Number of guests</span>
            <select value={values.guests} onChange={(event) => update('guests', Number(event.target.value))}>
              {Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
            </select>
          </label>
        </div>

        <fieldset className="radio-group">
          <legend>Will you attend?</legend>
          <label><input type="radio" name="attendance" value="yes" checked={values.attendance === 'yes'} onChange={(event) => update('attendance', event.target.value)} /> Yes, with pleasure</label>
          <label><input type="radio" name="attendance" value="no" checked={values.attendance === 'no'} onChange={(event) => update('attendance', event.target.value)} /> Sorry, I can’t make it</label>
        </fieldset>

        <label className="field">
          <span>Meal preference</span>
          <select value={values.meal} onChange={(event) => update('meal', event.target.value)}>
            <option>No preference</option>
            <option>Vegetarian</option>
            <option>Non-vegetarian</option>
            <option>Other / please ask</option>
          </select>
        </label>

        <label className="field">
          <span>A message for the couple</span>
          <textarea rows="4" maxLength="1000" value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="Leave a little note for us…" />
        </label>

        {status.type === 'error' && <p className="form-message error">{status.message}</p>}
        {status.type === 'success' && <p className="form-message success">{status.message}</p>}

        <button className="primary-button w-full sm:w-auto" disabled={status.type === 'loading'} type="submit">
          {status.type === 'loading' ? 'Saving…' : 'Send RSVP'}
        </button>
      </form>
    </section>
  );
}
