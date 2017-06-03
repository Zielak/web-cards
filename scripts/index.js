import React from 'react'
import ReactDOM from 'react-dom'

import Toolbar from './Toolbar'

class Layout extends React.Component {
	render (){
		return (
			<main>
				<Toolbar/>
				<h1>IT WORKS</h1>
			</main>
		)
	}
}

//<h2 className="mdc-typography--display2">Hello, Material Components!</h2>
//<div className="mdc-textfield" data-mdc-auto-init="MDCTextfield">
//	<input type="text" className="mdc-textfield__input" id="demo-input"></input>
//	<label for="demo-input" className="mdc-textfield__label">Tell us how you feel!</label>
//</div>

const app = document.getElementById('app')

ReactDOM.render(<Layout/>, app)
