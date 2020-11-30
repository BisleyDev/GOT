import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import gotService from '../../services/gotService';

export default class BoolItem extends Component {
	gotService = new gotService();

	render() {
		return (
			<ItemDetails
				itemId={this.props.bookId}
				getSelectedItem={this.gotService.getBook}
			>
				<Field label="NumberOfPages" field="numberOfPages" />
				<Field label="Publiser" field="publisher" />
				<Field label="Released" field="released" />
			</ItemDetails>
		);
	}
}
