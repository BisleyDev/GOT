import React from 'react';
import { Button } from 'reactstrap';
import './button.css';

const Btn = (props) => {
	return (
		<div>
			<Button color="info" onClick={props.toggleChar}>
				Toggle random Character
			</Button>
		</div>
	);
};

export default Btn;
