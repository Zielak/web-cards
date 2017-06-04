import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import Toolbar from './Toolbar'
import Drawer from './Drawer'

class App extends PureComponent {

	constructor(){
		this.state = {
			toolbar: {
				fixed: true,
				waterfall: true,
			},
			drawer: {
				open: false,
			}
		}
	}

	handleMenuClick(event){
		event.preventDefault()
		this.setState(prev => ({
			drawer: {
				open: !prev.drawer.open,
			}
		}))
	}

	render (){
		const {toolbar, drawer} = this.state;
		return (
			<main ref='main' className={toolbar.fixed ? 'mdc-toolbar-fixed-adjust' : ''}>
				<Toolbar
					fixed={toolbar.fixed}
					fixedAdjustRef='main'
					waterfall={toolbar.waterfall}
					menuClick={event=>this.handleMenuClick(event)}
				/>
				<Drawer
					open={drawer.open}
				/>
				<h1>IT WORKS</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat arcu vitae metus interdum sodales. Nunc nulla leo, porttitor nec neque id, dapibus feugiat massa. Suspendisse mattis ipsum ut tempus accumsan. Curabitur congue nunc ac erat aliquet, ac accumsan tortor eleifend. Praesent purus nisl, hendrerit eget justo vitae, tempus elementum orci. Vestibulum id arcu luctus, congue velit non, efficitur risus. Aliquam odio lectus, placerat ut eros vitae, condimentum mollis magna. Maecenas metus elit, vehicula interdum velit quis, scelerisque hendrerit erat. Suspendisse cursus, est nec luctus pellentesque, tellus ipsum consectetur purus, sit amet finibus lectus ipsum eget elit. Suspendisse nec dolor id eros interdum dignissim quis feugiat orci.</p>

				<p>Sed et aliquam lorem, vel venenatis justo. Maecenas placerat neque feugiat, commodo ex at, interdum justo. Etiam tincidunt arcu sed congue commodo. Aliquam non justo et augue eleifend luctus eget nec velit. Duis vitae ipsum metus. Pellentesque blandit laoreet libero at consectetur. Duis posuere arcu sed hendrerit scelerisque. Etiam accumsan, odio sit amet cursus efficitur, enim diam varius odio, ut ultricies arcu diam in mi. Nam pellentesque, metus ut ultrices rhoncus, sapien sapien elementum purus, vel pellentesque justo neque eget justo. Integer at turpis vitae ligula posuere vehicula. Donec molestie est at congue ultrices. Cras sed lectus sit amet nisl maximus fermentum in vitae neque. Suspendisse potenti. Duis vulputate purus eu lacinia eleifend. Nam a pretium justo, vel vestibulum odio. Maecenas nunc diam, viverra vitae blandit et, pretium a mi.</p>

				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat arcu vitae metus interdum sodales. Nunc nulla leo, porttitor nec neque id, dapibus feugiat massa. Suspendisse mattis ipsum ut tempus accumsan. Curabitur congue nunc ac erat aliquet, ac accumsan tortor eleifend. Praesent purus nisl, hendrerit eget justo vitae, tempus elementum orci. Vestibulum id arcu luctus, congue velit non, efficitur risus. Aliquam odio lectus, placerat ut eros vitae, condimentum mollis magna. Maecenas metus elit, vehicula interdum velit quis, scelerisque hendrerit erat. Suspendisse cursus, est nec luctus pellentesque, tellus ipsum consectetur purus, sit amet finibus lectus ipsum eget elit. Suspendisse nec dolor id eros interdum dignissim quis feugiat orci.</p>
			</main>
		)
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
