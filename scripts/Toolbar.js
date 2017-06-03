import React, {PureComponent, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import {Set as ImmutableSet, Map as ImmutableMap} from 'immutable';

import {getCorrectEventName} from '@material/animation/dist/mdc.animation';
import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar/dist/mdc.toolbar'
import '@material/toolbar/dist/mdc.toolbar.css'

let state = {
	classes: new ImmutableSet(),
	rippleCss: new ImmutableMap(),
}


class Toolbar extends PureComponent {

	constructor(){

		this.state = {
			classes: new ImmutableSet(),
			rippleCss: new ImmutableMap(),
		}

		
		const foundation = new MDCToolbarFoundation({
			addClass: className => this.setState(prev => ({
				classes: prev.classes.add(className)
			})),
			removeClass: className => this.setState(prev => ({
				classes: prev.classes.remove(className)
			})),
			hasClass: className => this.state.classes.has(className),

			registerScrollHandler: handler => {
				if(this.refs.root){
					this.refs.root.addEventListener(getCorrectEventName(window, 'scroll'), handler)
				}
			},
			deregisterScrollHandler: handler => {
				if(this.refs.root){
					this.refs.root.addEventListener(getCorrectEventName(window, 'scroll'), handler)
				}
			},
			registerResizeHandler: handler => {
				if(this.refs.root){
					this.refs.root.addEventListener(getCorrectEventName(window, 'resize'), handler)
				}
			},
			deregisterResizeHandler: handler => {
				if(this.refs.root){
					this.refs.root.addEventListener(getCorrectEventName(window, 'resize'), handler)
				}
			},
			
			getViewportWidth: () => window.innerWidth,
			getViewportHeight: () => window.innerHeight,
			getOffsetHeight: () => {
				if(this.refs.root){
					this.refs.root.clientHeight
				}
			}

		})

	}

	render(){
		return (
			<header ref="root" className={`mdc-toolbar ${this.state.classes.toJS().join(' ')}`}>
				<div className="mdc-toolbar__row">
					<section className="mdc-toolbar__section mdc-toolbar__section--align-start">
						<a href="#" className="material-icons">menu</a>
						<span className="mdc-toolbar__title">Title</span>
					</section>
				</div>
			</header>
		);
	}
}

Toolbar.propTypes = {
	id: PropTypes.string,
	labelId: PropTypes.string,
	onScroll: PropTypes.func
}

Toolbar.defaultProps = {
	onScroll: () => {}
}

export default Toolbar
