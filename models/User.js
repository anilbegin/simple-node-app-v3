let usersCollection = require('../db').db().collection('users')
const validator = require("validator")
const bcrypt = require("bcryptjs")

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

  if(this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push('Username must be atleast 3 characters')}
  if(this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters")}
  if(this.data.password.length > 0 && this.data.password.length < 6) {this.errors.push('Password must be atleast 6 characters')}
  if(this.data.password.length > 30) {this.errors.push("Password cannot exceed 30 characters")}

  if(this.data.username != "" && !validator.isAlphanumeric(this.data.username))  {this.errors.push('Username can only contain letters and numbers')}
  if(!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
}

User.prototype.register = async function() {
  this.cleanUp()
  this.validate()
  
  if(!this.errors.length) {
    let salt = bcrypt.genSaltSync(10)
    this.data.password = bcrypt.hashSync(this.data.password, salt)
    await usersCollection.insertOne(this.data)
  //  console.log('new user created')
  }
}

User.prototype.login = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    
    const attemptedUser = await usersCollection.findOne({username: this.data.username})
    if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
      this.data = {
        _id: attemptedUser._id,
        username: attemptedUser.username 
      } 
      
      resolve("Congrats")
    } else {
      reject('Invalid username/password')
    }
  })
}

module.exports = User