import { useState } from 'react';

export function TestLogin() {
  const [email, setEmail] = useState('pharesatai@gmail.com');
  const [subdomain, setSubdomain] = useState('fedlimited');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [message, setMessage] = useState('');

  const sendOTP = async () => {
    setMessage('Sending...');
    try {
      const res = await fetch('https://bochaberi-suite-2.onrender.com/api/auth/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subdomain })
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        setMessage('OTP sent! Check your email.');
      } else {
        setMessage('Failed: ' + data.message);
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    }
  };

  const verifyOTP = async () => {
    setMessage('Verifying...');
    try {
      const res = await fetch('https://bochaberi-suite-2.onrender.com/api/auth/verify-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode, subdomain })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => { window.location.href = '/'; }, 1000);
      } else {
        setMessage('Invalid OTP: ' + data.error);
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>BOCHABERI Test Login</h2>
      {step === 'email' ? (
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <input 
            type="text" 
            value={subdomain} 
            onChange={e => setSubdomain(e.target.value)} 
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <button onClick={sendOTP} style={{ padding: '10px', width: '100%' }}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input 
            type="text" 
            value={otpCode} 
            onChange={e => setOtpCode(e.target.value)} 
            placeholder="6-digit code"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <button onClick={verifyOTP} style={{ padding: '10px', width: '100%' }}>Verify</button>
          <button onClick={() => setStep('email')} style={{ padding: '10px', width: '100%', marginTop: '8px' }}>Back</button>
        </div>
      )}
      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </div>
  );
}
