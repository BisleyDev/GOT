import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';

class ItemList extends Component {
	renderItems(arr) {
		return arr.map((item) => {
			const { id } = item;
			const label = this.props.renderItem(item);
			return (
				<li
					key={id}
					className="list-group-item"
					onClick={() => this.props.onItemSelected(id)}
				>
					{label}
				</li>
			);
		});
	}

	render() {
		const list = this.renderItems(this.props.data);

		return <ul className="item-list list-group">{list}</ul>;
	}
}

const withData = () => {
	return class extends Component {
		state = {
			data: null,
		};

		componentDidMount() {
			const { getData } = this.props;
			getData().then((items) => {
				this.setState({
					data: items,
				});
			});
		}

		render() {
			const { data } = this.state;

			if (!data) {
				return <Spinner />;
			}

			return <ItemList {...this.props} data={data} />;
		}
	};
};

export default withData();
