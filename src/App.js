import React from 'react';
import zhugeyunmusic from './static/zhugeyunmusic.png'
import './App.scss';
import Index from './views/index/index'

function App() {
	return (
		<div>
			<div className="top">
				<div className="left">
					<img src={zhugeyunmusic} width="20px" height="20px" alt=""/>
				</div>
				<div className="center">诸葛云音乐</div>
			</div>
			<div>
				<Index></Index>
			</div>
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