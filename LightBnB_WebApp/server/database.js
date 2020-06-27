const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('../db/index');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
const getUserWithEmail = function(email) {
  let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      .then(res => res.rows[0]);
      .then(res => {
      console.log(res.rows);
      return res.rows;
    });
      user = null;
    }
  }
  return Promise.resolve(user);
}
*/
const getUserWithEmail = function (email) {
  return db.query(`
  SELECT * FROM users WHERE email = $1;
  `, [email])
    .then(res => {
      console.log(res);
      return res.rowCount > 0 ? res.rows[0] : null
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 
const getUserWithId = function(id) {
  return Promise.resolve(users[id]);
}
*/
const getUserWithId = function (id) {
  return db.query(`
  SELECT * FROM users WHERE
  id = $1;
  `, [id])
    .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
const addUser =  function(user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
  .then(res => {
    console.log(res.rows);
    return res.rows;
  });
}
*/
const addUser = function (user) {
  return db.query(`
  INSERT INTO users(name, password, email)
  VALUES($1, $2, $3)
  RETURNING *;`, [user.name, user.password, user.email])
  .then(res => res.rows); 
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
 */
const getAllReservations = function (guest_id, limit = 10) {
  return db.query(`
  SELECT
  properties.*,
  reservations.*,
  avg(property_reviews.rating) as average_rating
FROM
  reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE
  reservations.guest_id = $1
  AND reservations.end_date < now() :: date
  GROUP BY properties.id, reservations.id
ORDER BY
  start_date
LIMIT
  $2;`, [guest_id, limit])
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 
const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
}
return db.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}
if (options === null) {
    queryString += `SELECT * FROM properties
    LIMIT $1
  `, [limit]
  }
exports.getAllProperties = getAllProperties;
*/
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE true
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(parseInt(options.owner_id));
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParams.length} `;
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }
  // 4

  queryParams.push(limit);
  queryString += ` ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return db.query(queryString, queryParams)
    .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 * const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
 */
const addProperty = function (property) {
  return db.query(`
  INSERT INTO
  properties (
    title,
    description,
    owner_id,
    cover_photo_url,
    thumbnail_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    province,
    city,
    country,
    street,
    post_code
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code])

    .then(res => {
      console.log(res.rows);
      return res.rows;
    });
}
exports.addProperty = addProperty;
