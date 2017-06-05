import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'

import {Set as ImmutableSet, Map as ImmutableMap} from 'immutable'

import '@material/card/dist/mdc.card.min.css'

class Card extends PureComponent{

	constructor(props, context){
		super(props, context)
	}

	render(){
		return (
			<div className="mdc-card">
				<section className="mdc-card__primary">
					<h1 className="mdc-card__title mdc-card__title--large">Title goes here</h1>
					<h2 className="mdc-card__subtitle">Subtitle here</h2>
				</section>
				<section className="mdc-card__supporting-text">
					{this.props.children}
				</section>
				<section className="mdc-card__actions">
					<button className="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
					<button className="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
				</section>
			</div>
		)
	}

}

export default Card
