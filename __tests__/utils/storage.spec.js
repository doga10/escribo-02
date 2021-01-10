const storage = require('../../utils/storage')

test('should read the data.json file from the data directory', () => {
  expect(storage.readJSON()).toBeTruthy()
})