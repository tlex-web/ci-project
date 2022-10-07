/**
 *
 * @param {String} url
 * @returns Promise
 */

const getData = async url => {
	return await fetch(url)
		.then(response => {
			if (!response.ok) throw new FetchError('Cannot fetch data: ', response.statusText);
		})
		.then(response => response.json())
		.then(body => body)
		.catch(err => console.error(err));
};

class FetchError extends Error {
	// Custom error class for network requests

	/**
	 *
	 * @param {String} message
	 * @param {Number} statusCode HTTP status code
	 */
	constructor(message, statusCode) {
		super(message);

		this.message = 'FetchError';
		this.statusCode = statusCode;
	}
}
