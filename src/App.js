import React from 'react';
import logo from './logo.svg';
import zhugeyunmusic from './static/zhugeyunmusic.png'
import './App.css';

function App() {
	return (
		<div class="top">
			<img src={zhugeyunmusic} width="30px" height="30px" alt=""/>
			<div>诸葛云音乐</div>
		</div>
		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p>
		//       Edit <code>src/App.js</code> and save to reload.
		//     </p>
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//       Learn React
		//     </a>
		//   </header>
		// </div>
	);
}

export default App;