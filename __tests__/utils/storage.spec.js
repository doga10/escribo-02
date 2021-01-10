const storage = require('../../support/storage')

test('should read the data.json file from the data directory', () => {
  expect(storage.readJSON()).toBeTruthy()
})