let usersCollection = require('../db').db().collection('users')

let User = function(data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function() {
  if(typeof(this.data.username) != "string") this.data.username = ""
  if(typeof(this.data.email) != "string") this.data.email = ""
  if(typeof(this.data.password) != "string") this.data.password = ""

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.validate = function() {
  if(this.data.username == "") this.errors.push("Username cannot be blank")
  if(this.data.email == "") this.errors.push("Email cannot be blank")
  if(this.data.password == "") this.errors.push("Password cannot be blank")
}

User.prototype.register = async function() {
  this.cleanUp()
  this.validate()
  
  if(!this.errors.length) {
    await usersCollection.insertOne(this.data)
    console.log('new user created')
  }
}

User.prototype.login = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    
    const attemptedUser = await usersCollection.findOne({username: this.data.username})
    if(attemptedUser && this.data.password == attemptedUser.password) {
      this.data = attemptedUser
      resolve(attemptedUser)
    } else {
      reject('Invalid username/password')
    }
  })
}

module.exports = User