const { Client } = require('pg');

const client = new Client({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
client.connect(() => {
  console.log('successfully connected to the database');
});
module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  },
}