export default class gotServise {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}
	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	getAllBooks = async () => {
		const res = await this.getResource('/books');
		return res.map((elem) => this._transformBook(elem));
	};
	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}`);
		return this._transformBook(book);
	};
	getAllCharacters = async () => {
		const res = await this.getResource('/characters?page=5&pageSize=10');
		return res.map((elem) => this._transtormChar(elem));
	};
	getCharacter = async (id) => {
		const res = await this.getResource(`/characters/${id}`);
		return this._transtormChar(res);
	};
	getAllHouses = async () => {
		const res = await this.getResource('/houses');
		return res.map((elem) => this._transformHouse(elem));
	};
	getHouse = async (id) => {
		const house = await this.getResource(`/houses/${id}`);
		return this._transformHouse(house);
	};

	checkValue(value) {
		return value ? value : 'no info';
	}

	getId(url, subUrl) {
		return url.replace(this._apiBase + subUrl, '');
	}

	_transtormChar(char) {
		return {
			name: this.checkValue(char.name),
			gender: this.checkValue(char.gender),
			born: this.checkValue(char.born),
			died: this.checkValue(char.died),
			culture: this.checkValue(char.culture),
			id: this.getId(char.url, '/characters/'),
		};
	}
	_transformHouse(house) {
		return {
			name: this.checkValue(house.name),
			region: this.checkValue(house.region),
			words: this.checkValue(house.words),
			titles: this.checkValue(house.titles),
			coatOfArms: this.checkValue(house.coatOfArms),
			ancestralWeaspons: this.checkValue(house.ancestralWeaspons),
			id: this.getId(house.url, '/houses/'),
		};
	}
	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			released: book.released,
			id: this.getId(book.url, '/books/'),
		};
	}
}

// const got = new gotServise();
// got.getAllCharacters().then((res) => console.log(res));
