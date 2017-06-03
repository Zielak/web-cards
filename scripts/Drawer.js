import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {Set as ImmutableSet, Map as ImmutableMap} from 'immutable'

import {MDCDrawer, MDCDrawerFoundation, util} from '@material/drawer/dist/mdc.drawer'


class Drawer extends PureComponent {

	constructor(props, context){
		super(props, context)

		this.state = {
			style: new ImmutableMap(),
			classes: new ImmutableSet(),
		}

		this.foundation = new MDCDrawerFoundation({
			hasClass: className => this.state.classes.has(className),
			addClass: className => this.setState(prev => ({
				classes: prev.classes.add(className)
			})),
			removeClass: className => this.setState(prev => ({
				classes: prev.classes.remove(className)
			})),
			hasNecessaryDom: () =>
				!!this.refs.root.querySelector('mdc-temporary-drawer__drawer'),

			registerInteractionHandler: (eventName, handler) => 
				this.refs.root.addEventListener(eventName, handler),
			deregisterInteractionHandler: (eventName, handler) => 
				this.refs.root.removeEventListener(eventName, handler),

			registerDrawerInteractionHandler: (eventName, handler) => 
				this.refs.sub.addEventListener(eventName, handler),
			deregisterDrawerInteractionHandler: (eventName, handler) => 
				this.refs.sub.removeEventListener(eventName, handler),

			// registerTransitionEndHandler(handler: EventListener) => void
			// deregisterTransitionEndHandler(handler: EventListener) => void

			registerDocumentKeydownHandler: handler => 
				document.addEventListener('keydown', handler),
			deregisterDocumentKeydownHandler: handler => 
				document.removeEventListener('keydown', handler),
			
			getDrawerWidth: () => this.refs.root.clientWidth,
			setTranslateX: val => this.refs.root.style.setProperty('transform', `translateX(${val}px)`),
			getFocusableElements: () => {
				this.refs.root.childNodes
			}

		})

	}

	render(){
		return(
			<aside ref="root" className="mdc-temporary-drawer">
				<nav ref="sub" className="mdc-temporary-drawer__drawer mdc-typography">
					<div className="mdc-temporary-drawer__toolbar-spacer"></div>
					<div className="mdc-temporary-drawer__content">
						<nav id="icon-with-text-demo" className="mdc-list">
							<a className="mdc-list-item mdc-temporary-drawer--selected" href="#">
								<i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
							</a>
							<a className="mdc-list-item" href="#">
								<i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
							</a>
						</nav>
					</div>
				</nav>
			</aside>
		)
	}

}
