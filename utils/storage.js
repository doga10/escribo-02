const { join } = require('path')
const fs = require('fs')

class Storage {
	constructor () {
		this.db = join(__dirname, '..', 'data', 'data.json')
	}

	readJSON () {
		const data = fs.existsSync(this.db) ? fs.readFileSync(this.db) : []
		try {
			return JSON.parse(data)
		} catch (e) {
			return []
		}
	}
}

module.exports = new Storage()