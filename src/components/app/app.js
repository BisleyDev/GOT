import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import RandomChar from '../randomChar';
import Btn from '../button';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BookPage, HousePage, BookItem } from '../pages';
import gotService from '../../services/gotService';
import './app.css';

export default class App extends Component {
	gotService = new gotService();

	state = {
		randomItem: true,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	toggleChar = () => {
		this.setState({
			randomItem: !this.state.randomItem,
		});
	};

	render() {
		const ViewItemChar = this.state.randomItem ? (
			<RandomChar interval={5000} />
		) : null;

		if (this.state.error) {
			return <ErrorMessage />;
		}

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{ViewItemChar}
								<Btn toggleChar={this.toggleChar} />
							</Col>
						</Row>
						<Route path="/characters/" component={CharacterPage} />
						<Route path="/houses/" component={HousePage} />
						<Route path="/books/" exact component={BookPage} />
						<Route
							path="/books/:id"
							render={({ match }) => {
								console.log('App -> render -> match', match);
								const { id } = match.params;
								return <BookItem bookId={id} />;
							}}
						/>
					</Container>
				</div>
			</Router>
		);
	}
}
