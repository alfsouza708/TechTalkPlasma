export default class Connection {
	apiURL: string;
	apiKey: string;

	constructor(apiURL: string, apiKey: string) {
		this.apiURL = apiURL;
		this.apiKey = apiKey;
	}
}
