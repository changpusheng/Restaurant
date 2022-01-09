const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const restaurantForJson = require('../restaurant.json')
const Restaurant = require('../restaurantMongoDB')

const db = mongoose.connection

db.on('error', () => { console.log('mongoose error!') })

db.once('open', () => {
  console.log('mongoose connected!')
  for (let i = 0; i < restaurantForJson.results.length; i++) {
    Restaurant.create({
      id: `${restaurantForJson.results[i].id}`,
      name: `${restaurantForJson.results[i].name}`,
      name_en: `${restaurantForJson.results[i].name_en}`,
      category: `${restaurantForJson.results[i].category}`,
      image: `${restaurantForJson.results[i].image}`,
      location: `${restaurantForJson.results[i].location}`,
      phone: `${restaurantForJson.results[i].phone}`,
      google_map: `${restaurantForJson.results[i].google_map}`,
      rating: `${restaurantForJson.results[i].rating}`,
      description: `${restaurantForJson.results[i].description}`
    })
  }
  console.log('done!')
})