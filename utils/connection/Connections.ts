import Connection from './Connection';

export default class Connections {
	static readonly development = new Connection(
		'http://localhost:8080/dev',
		'$2a$12$ZVD3Gt7Ri7Gwfg3Bx.Ygy.VRqBXLogILKYAYqo7ucayaTne3MMxtW'
	);
	static readonly production = new Connection(
		'http://localhost:8080/prod/',
		'$2a$12$ZVD3Gt7Ri7Gwfg3Bx.Ygy.VRqBXLogILKYAYqo7ucayaTne3MMxtW'
	);
}
