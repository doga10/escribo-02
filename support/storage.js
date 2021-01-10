const { join } = require('path')
const fs = require('fs')

class Storage {
	constructor () {
		this.db = join(__dirname, '..', 'data', 'data.json')
	}

	readJSON () {
		const data = fs.readFileSync(this.db)
    return JSON.parse(data)
	}
}

module.exports = new Storage()