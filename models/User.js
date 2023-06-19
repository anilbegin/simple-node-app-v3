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
  return new Promise(async (resolve, reject) => {
    if(this.data.username == "") this.errors.push("Username cannot be blank")
    if(this.data.email == "") this.errors.push("Email cannot be blank")
    if(this.data.password == "") this.errors.push("Password cannot be blank")
  
    if(this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push('Username must be atleast 3 characters')}
    if(this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters")}
    if(this.data.password.length > 0 && this.data.password.length < 6) {this.errors.push('Password must be atleast 6 characters')}
    if(this.data.password.length > 30) {this.errors.push("Password cannot exceed 30 characters")}
  
    if(this.data.username != "" && !validator.isAlphanumeric(this.data.username))  {this.errors.push('Username can only contain letters and numbers')}
    if(this.data.email != "") {
      if(!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
    }
  
    // Only if username is valid then check to see if its already taken
    if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({username: this.data.username})
      if(usernameExists) this.errors.push("that username is already taken")
    }
    // Only if email is valid then check to see if its already taken
    if(validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({email: this.data.email})
      if(emailExists) this.errors.push("that email is already being used")
    }
    resolve()
  })
}

User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    await this.validate()
    
    if(!this.errors.length) {
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await usersCollection.insertOne(this.data)
    //  console.log('new user created')
      resolve()
    } else {
      reject(this.errors)
    }
    
  })
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
      
      resolve("Success")
    } else {
      reject('Fail')
    }
  })
}

User.findByUsername = function(username) {
  return new Promise(function(resolve, reject) {
    if (typeof(username) != "string") {
      reject()
      return
    }
    usersCollection.findOne({username: username}).then(function(userDoc) {
      if (userDoc) {
        userDoc = new User(userDoc)
        userDoc = {
          username: userDoc.data.username,
        }
        resolve(userDoc)
      } else {
        reject()
      }
    }).catch(function() {
      reject()
    })
  })
} 

User.doesEmailExist = function(email) {
  return new Promise(async function(resolve, reject) {
    if(typeof(email) != "string") {
      resolve(false)
      return
    }

    let user = await usersCollection.findOne({email: email})
    if(user) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

module.exports = User