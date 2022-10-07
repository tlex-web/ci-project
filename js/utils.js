function setDate() {
	const element = document.querySelector('.footer-date');
	const date = new Date().getFullYear();

	// insert the current year based on local time
	if (element) element.textContent = `${date}`;
}

const start = () => {
	const element = document.querySelector('#typewriter');
	const data = element.getAttribute('data');

	new TypeWriter(element, data, 500);
};

/**
 *
 * @param {Event} e
 */
const processForm = e => {
	// Prevent the form from submitting
	e.preventDefault();

	// Create a new instance of the FormData class and pass the event object
	const formData = new FormData(e.target);

	// Convert the entries into JSON
	const data = Object.fromEntries(formData.entries());

	// Extract the necessary data
	const { name, email } = data;

	if (!name || !email) throw new Error('Please provide your name and email');

	// Display the name and email of the user
	alert(`Your name is ${name} and your email is ${email}`);
};

const getArticles = () => {
	const articleTitles = document.querySelectorAll('.article-title');
	const articleElements = document.querySelectorAll('.article-content');
	const articleLinks = document.querySelectorAll('.article-link');

	const articles = new Articles(articleTitles, articleElements, articleLinks, '5a4a2581-01af-41bc-aeb2-ba87bb353da4');

	articles.readLocalData();
};

class TypeWriter {
	/**
	 *
	 * @param {NodeList} element
	 * @param {Number} data
	 * @param {Number} speed
	 */

	constructor(element, data, speed) {
		this._element = element;
		this._data = data;
		this._isDeleting = false;
		this._speed = speed;
		this._txt = '';
		this.main();
	}

	main() {
		if (!this._element) throw new Error('Element not found');

		// remove one character
		if (this._isDeleting) this._txt = this._data.substring(0, this._txt.length - 1);
		// add one character
		else this._txt = this._data.substring(0, this._txt.length + 1);

		// display the current state of the sentence
		this._element.innerHTML = `${this._txt}`;

		// if the sentence is complete, delete it
		if (!this._isDeleting && this._txt === this._data) this._isDeleting = true;

		// if the deleting is complete, start anew
		if (this._isDeleting && this._txt === '') this._isDeleting = false;

		// call the main function every %speed% milliseconds
		setTimeout(() => this.main(), this._speed);
	}
}

class Articles {
	/**
	 *
	 * @param {NodeList} titles
	 * @param {NodeList} elements
	 * @param {NodeList} links
	 * @param {String} apiKey
	 * @param {Array} queries
	 */
	constructor(titles, elements, links, apiKey = '', queries = []) {
		this._titles = titles;
		this._elements = elements;
		this._links = links;
		this._apiKey = apiKey;
		this._queries = queries;
		this._url;
		this._res;
	}

	async fetchData() {
		this._res = await getData(this._url);
	}

	urlConstructor() {
		if (this._apiKey) {
			this._url = `${url}?api-key${this._apiKey}`;
		}

		if (this._apiKey && this._queries?.length) {
			this._url = `${url}?queries=${this._queries}&api-key=${this._apiKey}`;
		}
	}

	readLocalData() {
		// 	await fetch('C:/Users/aster/Documents_/Hochschule/CI/CI-Project/data/articles.json', {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Access-Control-Allow-Headers': '*',
		// 		},
		// 	})
		// 		.then(res => console.log(res))
		// 		.then(json => console.log(json))
		// 		.catch(err => console.log(err));
		// }

		// Create data
		const data = JSON.stringify([
			{
				articles: [
					{
						id: 0,
						title: 'War in the Ukraine',
						theme: 'Politics',
						content:
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nesciunt quaerat placeat tempore maiores maxime illum magnam sequi voluptas? Veritatis consectetur voluptas molestiae eius ad. Quo quaerat repellendus quam, officia quisquam architecto optio tempora sint nam iure possimus repudiandae quidem laboriosam ipsum aliquid distinctio necessitatibus reprehenderit temporibus? Qui, amet repellendus?',
						url: './article.html',
					},
					{
						id: 1,
						title: 'Spike of gas prices',
						theme: 'Politics',
						content:
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nesciunt quaerat placeat tempore maiores maxime illum magnam sequi voluptas? Veritatis consectetur voluptas molestiae eius ad.',
						url: 'https://someurl.com',
					},
					{
						id: 2,
						title: 'Alphabet LLC share crash',
						theme: 'Economics',
						content:
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nesciunt quaerat placeat tempore maiores maxime illum magnam sequi voluptas? Veritatis consectetur voluptas molestiae eius ad.',
						url: 'https://someurl.com',
					},
					{
						id: 3,
						title: 'Heatwaves in Germany',
						theme: 'Weather',
						content:
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nesciunt quaerat placeat tempore maiores maxime illum magnam sequi voluptas? Veritatis consectetur voluptas molestiae eius ad.',
						url: 'https://someurl.com',
					},
				],
			},
		]);

		const json = JSON.parse(data);

		this._res = json[0];

		for (let i = 0; i < this._titles.length; ++i) {
			this._titles[i].textContent = this._res.articles[i].title;
			this._elements[i].innerHTML = `<span>${this._res.articles[i].content}</span>`;
			this._links[i].href = this._res.articles[i].url;
		}
	}
}
