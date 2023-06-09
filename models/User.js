let usersCollection = require('../db').collection('users')

let User = function(data) {
  this.data = data
}

User.prototype.register = async function() {
 await usersCollection.insertOne(this.data)
 console.log('new user created')
}

module.exports = User