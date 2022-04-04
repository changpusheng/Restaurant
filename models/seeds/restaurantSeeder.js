const restaurantForJson = require('../restaurant.json')
const Restaurant = require('../restaurantMongoDB')
const userDB = require('../userDB')

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs/dist/bcrypt')
const user_1 = {
  name: 'user_1',
  email: 'user1@example.com',
  password: '12345678',
  start: 0,
  end: 3
}
const user_2 = {
  name: 'user_2',
  email: 'user2@example.com',
  password: '12345678',
  start: 3,
  end: 6
}

db.on('error', () => { console.log('mongoose error!') })

db.once('open', () => {
  const restaurantArray = restaurantForJson.results
  const userCreate = (u, start, end) => {
    bcrypt.genSalt(10).then(salt => bcrypt.hash(u.password, salt))
      .then(hash =>
        userDB.create({
          name: u.name,
          email: u.email,
          password: hash
        })).then(user => {
          const userId = user._id
          Array.from(restaurantArray.slice(start, end), (item) => Restaurant.create({
            id: item.id,
            name: item.name,
            name_en: item.name_en,
            category: item.category,
            image: item.image,
            location: item.location,
            phone: item.phone,
            google_map: item.google_map,
            rating: item.rating,
            description: item.description,
            userId
          }))
        }).catch(err => console.log('errr' + err))
  }
  userCreate(user_1, user_1.start, user_1.end)
  userCreate(user_2, user_2.start, user_2.end)
})







