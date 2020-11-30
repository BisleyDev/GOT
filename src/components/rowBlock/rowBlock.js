import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

export default class RowBlock extends Component {
	render() {
		const { item, details } = this.props;

		return (
			<Row>
				<Col md="6">{item}</Col>
				<Col md="6">{details}</Col>
			</Row>
		);
	}
}
