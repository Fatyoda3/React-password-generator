import { useState } from 'react';
import './App.css';

function App() {
	let letterString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let [len, setLen] = useState(8);
	let num = false,
		char = false;

	let [textVal, setTextVal] = useState('');

	return (
		<>
			<div>
				<div>
					<input readOnly id="tf" value={textVal} />
					<button
						id="cpy"
						onClick={() => {
							let b = document.getElementById('tf');

							b.select();
							b.setSelectionRange(0, 25);

							navigator.clipboard.writeText(b.value);
							alert(b.value);
						}}>
						copy
					</button>
				</div>
				<br></br>

				<input
					onInput={(e) => {
						len = e.target.value;

						setLen(len);
						console.log(len);
						let randomText = '';

						for (let i = 1; i <= len; i++) {
							if (Math.random() > 0.5) {
								randomText += letterString
									.charAt(
										Math.round(
											Math.random() * Math.random() * 27 +
												i,
										),
									)
									.toLowerCase();
							} else {
								randomText += letterString.charAt(
									Math.round(
										Math.random() * Math.random() * 27 + i,
									),
								);
							}
						}

						textVal = randomText;
						setTextVal(textVal);
					}}
					min={6}
					max={20}
					type="range"
				/>

				<label
					style={{
						textAlign: 'center',
						padding: '5px',
						color: 'yellow',
					}}>
					length ({len})
				</label>

				<input
					type="checkbox"
					onClick={() => {
						num ? (num = false) : (num = true);
						// console.log(num);
					}}
				/>
				<label>Number</label>
				<input
					type="checkbox"
					onClick={() => {
						char ? (char = false) : (char = true);
						console.log(char);
					}}
				/>
				<label>character</label>
			</div>
		</>
	);
}

export default App;
