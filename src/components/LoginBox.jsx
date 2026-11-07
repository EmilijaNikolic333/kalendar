import { useState } from "react";

// Dugme za prijavu/odjavu u gornjoj traci
export default function LoginBox({ loggedIn, onLogin, onLogout }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (loggedIn) return <button onClick={onLogout}>Odjava</button>;

  if (!open) return <button onClick={() => setOpen(true)}>Prijava</button>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const err = await onLogin(password);
    setBusy(false);
    setError(err);
    if (!err) {
      setPassword("");
      setOpen(false);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="password"
        autoFocus
        required
        placeholder="Šifra"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="primary" disabled={busy}>Uđi</button>
      <button type="button" onClick={() => { setOpen(false); setError(null); }}>Otkaži</button>
      {error && <div className="login-error">{error}</div>}
    </form>
  );
}
