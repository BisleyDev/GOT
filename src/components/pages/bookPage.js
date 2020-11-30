import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import { withRouter } from 'react-router-dom';

class BookPage extends Component {
	gotService = new gotService();

	state = {
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		return (
			<ItemList
				onItemSelected={(id) => {
					this.props.history.push(id);
				}}
				getData={this.gotService.getAllBooks}
				renderItem={({ name }) => name}
			/>
		);
	}
}
export default withRouter(BookPage);
