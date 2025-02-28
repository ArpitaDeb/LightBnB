SELECT properties.*, OR (properties.title as title, properties.cost_per_night as cost_per_night), avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE city LIKE '%ncouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >=4
ORDER BY cost_per_night
LIMIT 10;