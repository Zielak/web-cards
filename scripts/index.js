import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {Card, List, Toolbar, Drawer} from './components'

import EventEmitter from 'eventemitter3'
import Connection from './connection'

const events = new EventEmitter()

class App extends PureComponent {

	constructor(){
		this.state = {
			toolbar: {
				fixed: true,
				waterfall: true,
			},
			responses: ['test', 'two'],
			// drawer: {
			// 	open: false,
			// }
		}
	}

	render (){
		const {toolbar, drawer} = this.state;
		return (
			<main ref='main' className={toolbar.fixed ? 'mdc-toolbar-fixed-adjust' : ''}>
				<Toolbar
					fixed={toolbar.fixed}
					fixedAdjustRef='main'
					waterfall={toolbar.waterfall}
					events={events}
				/>
				<Drawer
					events={events}
				/>
				<Card>
					<List/>
				</Card>

				<textarea cols="50" rows="5" ref="dataChannelSend" disabled
					placeholder="Press Start, enter some text, then press Send."></textarea>
				<textarea cols="50" rows="5" ref="dataChannelReceive" disabled></textarea>

				<div ref="buttons">
					<button style={{fontSize: '2em'}} ref="startButton">Start</button>
					<button style={{fontSize: '2em'}} ref="sendButton">Send</button>
					<button style={{fontSize: '2em'}} ref="closeButton">Stop</button>
				</div>

				<h2>Responses below</h2>
				<div>
					{this.state.responses.map(function(listValue, idx){
						return <p key={idx}>{listValue}</p>;
					})}
				</div>
			</main>
		)
	}
	
	componentDidMount() {
		this.connection = new Connection({
			dataChannelSend: this.refs.dataChannelSend,
			dataChannelReceive: this.refs.dataChannelReceive,
			startButton: this.refs.startButton,
			sendButton: this.refs.sendButton,
			closeButton: this.refs.closeButton,
		})
	}
	componentWillUnmount() {
	}
}

App.propTypes = {
	toolbar: PropTypes.shape({
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool
	})
}

App.defaultProps = {
	toolbar: {
		fixed: true,
		waterfall: true,
	}
}

//<h2 className="mdc-typography--display2">Hello, Material Components!</h2>
//<div className="mdc-textfield" data-mdc-auto-init="MDCTextfield">
//	<input type="text" className="mdc-textfield__input" id="demo-input"></input>
//	<label for="demo-input" className="mdc-textfield__label">Tell us how you feel!</label>
//</div>

const app = document.getElementById('app')

ReactDOM.render(<App/>, app)
