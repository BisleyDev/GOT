import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList({ getData, renderItem, onItemSelected }) {
	const [itemList, updateList] = useState(null);

	useEffect(() => {
		getItemList();
		return getItemList();
	}, []);

	const getItemList = () => {
		getData().then((items) => {
			updateList(items);
		});
	};

	const renderItems = (arr) => {
		return arr.map((item) => {
			const { id } = item;
			const label = renderItem(item);
			return (
				<li
					key={id}
					className="list-group-item"
					onClick={() => onItemSelected(id)}
				>
					{label}
				</li>
			);
		});
	};

	if (!itemList) {
		return <Spinner />;
	}
	const list = renderItems(itemList);

	return <ul className="item-list list-group">{list}</ul>;
}
export default ItemList;
