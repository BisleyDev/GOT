import React, { Component } from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';

const Field = ({ item, label, field }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};
export { Field };

export default class ItemDetails extends Component {
	state = {
		item: null,
	};

	gotService = new gotService();

	componentDidMount() {
		this.updateItem();
	}
	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId } = this.props;
		if (!itemId) {
			return;
		}

		const { getSelectedItem } = this.props;
		getSelectedItem(itemId).then((item) => {
			this.setState({ item });
		});
	}

	render() {
		const { item } = this.state;
		if (!item) {
			return <span className="select-error">Please select an element</span>;
		}

		const { name } = item;

		return (
			<div className="item-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, { item });
					})}
				</ul>
			</div>
		);
	}
}
