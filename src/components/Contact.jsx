import { useState } from 'react';
import { profile } from '../data';

const empty = { name: '', email: '', subject: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Subject should be at least 3 characters.';
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
];

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ type: 'error', msg: 'Please fix the highlighted fields.' });
      return;
    }
    if (!profile.contactEndpoint) {
      setStatus({
        type: 'unconfigured',
        msg: 'This form is not connected to a backend yet. Add a form endpoint in src/data.js (for example Formspree), or reach me by email.',
      });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(profile.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus({ type: 'success', msg: 'Thanks! Your message was sent.' });
      setValues(empty);
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section container">
      <div className="contact-grid">
        <div>
          <h2 className="section-title">Have an idea? <span className="grad">Let's build something meaningful.</span></h2>
          <ul className="links">
            {profile.links.email && <li><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a></li>}
            {profile.links.github && <li><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>}
            {profile.links.linkedin && <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>}
          </ul>
          {!profile.links.email && !profile.links.github && !profile.links.linkedin && <p className="muted small">Contact links are not configured yet. The form below will tell you clearly when no delivery endpoint is connected.</p>}
        </div>
        <form className="glass form" onSubmit={onSubmit} noValidate>
          <div className="row">
            {fields.slice(0, 2).map((f) => (
              <Field key={f.name} {...f} value={values[f.name]} onChange={onChange} error={errors[f.name]} />
            ))}
          </div>
          <Field {...fields[2]} value={values.subject} onChange={onChange} error={errors.subject} />
          <Field name="message" label="Message" type="textarea" value={values.message} onChange={onChange} error={errors.message} />
          <button className="btn primary" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
          <div role="status" aria-live="polite">
            {status && <p className={`form-status ${status.type}`}>{status.msg}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, type, value, onChange, error }) {
  const id = `field-${name}`;
  const common = {
    id, name, value, onChange,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-err` : undefined,
  };
  return (
    <div className={`field ${error ? 'invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? <textarea {...common} /> : <input type={type} {...common} />}
      {error && <span className="err" id={`${id}-err`}>{error}</span>}
    </div>
  );
}
