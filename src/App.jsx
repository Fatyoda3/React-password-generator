import { useCallback, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
	const [len, setLen] = useState(8);

	const [charAllowed, setCharAllowed] = useState(false);

	const [numAllowed, setNumAllowed] = useState(false);

	const [password, setPassword] = useState('');

	const passwordRef = useRef(null);

	const copyToClipboard = useCallback(() => {
		window.navigator.clipboard.writeText(password);
		// alert(password, 'copied ');
passwordRef.current?.select();
// passwordRef.current?.setSelectionRange(0,6);


	}, [password]);
	const generatePassword = useCallback(() => {
		let pass = '';
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		if (numAllowed) {
			str += '0123456789';
		}

		if (charAllowed) {
			str += '@!#?/';
		}

		for (let i = 1; i <= len; i++) {
			let char = Math.floor(Math.random() * str.length + 1);

			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [len, charAllowed, numAllowed, setPassword]);

	useEffect(() => {
		generatePassword();
	}, [charAllowed, numAllowed, generatePassword, len]);
	return (
		<>
			<div>
				<h1>password Generator</h1>
				<div>
					<input readOnly value={password} ref={passwordRef} />

					<button onClick={copyToClipboard}>copy</button>
				</div>
				<br></br>

				<input
					onChange={(e) => {
						setLen(e.target.value);
						generatePassword();
					}}
					min={6}
					max={20}
					value={len}
					type="range"
				/>

				<label>length ({len})</label>

				<input
					type="checkbox"
					onChange={() => {
						setNumAllowed((numAllowed) => !numAllowed);
					}}
				/>
				<label>Number</label>
				<input
					type="checkbox"
					onChange={() => {
						setCharAllowed((charAllowed) => !charAllowed);
					}}
				/>
				<label>character</label>
			</div>
		</>
	);
}

export default App;
