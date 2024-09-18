import { useState } from 'react';

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    const res = await fetch('/api/webauthn/register', { method: 'POST' });
    const options = await res.json();
    const credential = await navigator.credentials.create({ publicKey: options });
    
    const verificationRes = await fetch('/api/webauthn/verify-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential),
    });

    if (verificationRes.ok) {
      setIsRegistered(true);
      alert('Registration successful!');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {isRegistered ? <p>Registered!</p> : <button onClick={handleRegister}>Register with Passkey</button>}
    </div>
  );
}
