import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {
	gotService = new gotService();

	state = {
		selectedHouse: null,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onSelectedItem = (id) => {
		this.setState({
			selectedHouse: id,
		});
	};

	getSelectedHouse = () => {
		return this.gotService.getHouse(this.state.selectedHouse);
	};

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		const itemChar = (
			<ItemList
				onItemSelected={this.onSelectedItem}
				getData={this.gotService.getAllHouses}
				renderItem={({ name, region }) => `${name} (${region})`}
			/>
		);

		const detailsChar = (
			<ItemDetails
				itemId={this.state.selectedHouse}
				getSelectedItem={this.getSelectedHouse}
			>
				<Field label="Region" field="region" />
				<Field label="Words" field="words" />
				<Field label="Titles" field="titles" />
				<Field label="CoatOfArms" field="coatOfArms" />
				<Field label="AncestralWeaspons" field="ancestralWeaspons" />
			</ItemDetails>
		);

		return <RowBlock item={itemChar} details={detailsChar} />;
	}
}
