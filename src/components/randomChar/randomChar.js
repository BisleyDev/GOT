import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import RandomCharItem from '../randomCharItem';
import ErrorMessage from '../errorMessage';
import './randomChar.css';

function RandomChar({ interval }) {
	const service = new gotService();

	const [char, onChar] = useState({});
	const [loading, onLoaded] = useState(true);
	const [error, onError] = useState(false);

	useEffect(() => {
		getChar();
		const timerId = setInterval(() => {
			getChar();
		}, interval);
		return function turnOffInterval() {
			clearInterval(timerId);
		};
	}, []);

	function getChar() {
		const index = Math.floor(Math.random() * 140 + 25);
		service
			.getCharacter(index)
			.then((char) => {
				onChar(char);
				console.log('getChar -> char', char);
				onLoaded(!loading);
			})
			.catch(() => {
				onError(!error);
				onLoaded(!loading);
			});
	}

	// state = {
	// 	char: {},
	// 	loading: true,
	// 	error: false,
	// };

	// componentDidMount() {
	// 	this.getChar();
	// 	this.intervalId = setInterval(() => {
	// 		this.getChar();
	// 	}, props.interval);
	// }

	// componentWillUnmount() {
	// 	clearInterval(this.intervalId);
	// }

	// onCharLoaded = (char) => {
	// 	this.setState({
	// 		char,
	// 		loading: false,
	// 	});
	// };

	// onError = () => {
	// 	this.setState({
	// 		error: true,
	// 		loading: false,
	// 	});
	// };

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

export default RandomChar;

// Дефолтное значение пропса
// RandomChar.defaultProps = {
// 	interval: 2000,
// };
// // Проверка типа пропса
// // RandomChar.propTypes = {
// // 	interval: (props, propsName, componentName) => {
// // 		const item = props[propsName];
// // 		if (typeof item === 'number' && !isNaN(item)) {
// // 			return null;
// // 		}
// // 		return new TypeError(`${componentName}: ${propsName} must be a number!`);
// // 	},
// // };

// RandomChar.propTypes = {
// 	interval: PropTypes.number,
// };
