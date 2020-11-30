import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class characterPage extends Component {
	gotService = new gotService();

	state = {
		selectedChar: null,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onSelectedItem = (id) => {
		this.setState({
			selectedChar: id,
		});
	};

	getSelectedChar = () => {
		return this.gotService.getCharacter(this.state.selectedChar);
	};

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		const itemChar = (
			<ItemList
				onItemSelected={this.onSelectedItem}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, culture }) => `${name} (${culture})`}
			/>
		);

		const detailsChar = (
			<ItemDetails
				itemId={this.state.selectedChar}
				getSelectedItem={this.getSelectedChar}
			>
				<Field label="Gender" field="gender" />
				<Field label="Born" field="born" />
				<Field label="Died" field="died" />
				<Field label="Culture" field="culture" />
			</ItemDetails>
		);

		return <RowBlock item={itemChar} details={detailsChar} />;
	}
}
