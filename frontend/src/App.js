import React, { Component } from "react"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"
import { Provider } from 'react-redux';
import store from './Store';

class App extends Component {
	state = {
		result: null
	}

	render() {
	    const {result} = this.state

		return (
	      <Provider store={store}>
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Finimize dev challenge</h1>
					</header>
	                    {<InputGraphSection {...{result}}/>}
				</div>
	      </Provider>
		)
	}
}

export default App
