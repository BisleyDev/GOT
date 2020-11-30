import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import RandomCharItem from '../randomCharItem';
import ErrorMessage from '../errorMessage';
import './randomChar.css';

export default class RandomChar extends Component {
	gotService = new gotService();

	state = {
		char: {},
		loading: true,
		error: false,
	};

	componentDidMount() {
		this.getChar();
		this.intervalId = setInterval(() => {
			this.getChar();
		}, this.props.interval);
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false,
		});
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	getChar() {
		const index = Math.floor(Math.random() * 140 + 25);
		this.gotService
			.getCharacter(index)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {
		const { char, loading, error } = this.state;
		const spiner = loading ? <Spinner /> : null;
		const errorBlock = error ? <ErrorMessage /> : null;
		const content = loading || error ? null : <RandomCharItem char={char} />;
		// const content = loading ? <Spinner /> : <RandomCharItem char={char} />;

		return (
			<div className="random-block rounded">
				{spiner}
				{errorBlock}
				{content}
			</div>
		);
	}
}
// Дефолтное значение пропса
RandomChar.defaultProps = {
	interval: 2000,
};
// Проверка типа пропса
// RandomChar.propTypes = {
// 	interval: (props, propsName, componentName) => {
// 		const item = props[propsName];
// 		if (typeof item === 'number' && !isNaN(item)) {
// 			return null;
// 		}
// 		return new TypeError(`${componentName}: ${propsName} must be a number!`);
// 	},
// };

RandomChar.propTypes = {
	interval: PropTypes.number,
};
