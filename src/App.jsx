import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [len, setLen] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    if (!password) return;
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '@!#?/';

    if (str.length === 0) {
      setPassword('');
      return;
    }

    for (let i = 0; i < len; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [len, charAllowed, numAllowed]);

  useEffect(() => {
    generatePassword();
  }, [charAllowed, numAllowed, generatePassword, len]);

  return (
    <>
      <style>{`
        /* Reset and basics */
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(270deg, #667eea, #764ba2, #6b8dd6, #7c57ac);
          background-size: 800% 800%;
          animation: gradientShift 16s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          color: #f0f0f0;
          user-select: none;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .container {
          background: rgba(0, 0, 0, 0.65);
          padding: 2rem 2.5rem;
          border-radius: 16px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          text-align: center;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          transform-style: preserve-3d;
          perspective: 700px;
          cursor: default;
        }
        .container:hover {
          transform: rotateX(6deg) rotateY(6deg);
          box-shadow: 0 18px 40px rgba(118, 75, 162, 0.9);
        }
        h1 {
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 1.2px;
        }
        .password-box {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        input[readOnly] {
          flex-grow: 1;
          font-size: 1.25rem;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #fff;
          color: #222;
          user-select: all;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
          min-width: 0;
        }
        input[readOnly]:focus {
          box-shadow: 0 0 10px #764ba2;
        }
        button {
          background: #764ba2;
          border: none;
          color: white;
          padding: 0 1.6rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          min-width: 90px;
        }
        button:hover, button:focus {
          background: #5a3684;
          box-shadow: 0 0 12px #5a3684;
          outline: none;
        }
        .controls {
          text-align: left;
          user-select: none;
        }
        label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          font-size: 1rem;
          color: #ddd;
        }
        input[type='range'] {
          width: 100%;
          margin-bottom: 1.2rem;
          cursor: pointer;
          accent-color: #764ba2;
          height: 6px;
          border-radius: 4px;
        }
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        input[type='checkbox'] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #764ba2;
          border-radius: 4px;
          transition: box-shadow 0.3s ease;
        }
        input[type='checkbox']:focus {
          box-shadow: 0 0 6px #764ba2;
          outline: none;
        }

        /* Responsive for mobile */
        @media (max-width: 480px) {
          .container {
            max-width: 90vw;
            padding: 1.5rem 1.75rem;
          }
          .password-box {
            flex-direction: column;
          }
          button {
            min-width: 100%;
            padding: 0.75rem 0;
            font-size: 1.1rem;
          }
          input[readOnly] {
            font-size: 1.15rem;
            padding: 0.7rem 1rem;
          }
          label {
            font-size: 1rem;
          }
        }
      `}</style>

      <main className="container" role="main" aria-label="Password generator app">
        <h1>Password Generator</h1>
        <div className="password-box">
          <input
            readOnly
            value={password}
            ref={passwordRef}
            aria-label="Generated password"
            onClick={() => passwordRef.current?.select()}
          />
          <button onClick={copyToClipboard} aria-label="Copy password to clipboard">
            Copy
          </button>
        </div>

        <div className="controls">
          <label htmlFor="lengthRange">Length: {len}</label>
          <input
            type="range"
            id="lengthRange"
            min={6}
            max={20}
            value={len}
            onChange={(e) => setLen(Number(e.target.value))}
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="numAllowed"
              checked={numAllowed}
              onChange={() => setNumAllowed((v) => !v)}
            />
            <label htmlFor="numAllowed">Include Numbers</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="charAllowed"
              checked={charAllowed}
              onChange={() => setCharAllowed((v) => !v)}
            />
            <label htmlFor="charAllowed">Include Special Characters (@!#?/)</label>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
