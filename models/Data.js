const itemsCollection = require('../db').db().collection('itemy')
const ObjectId = require("mongodb").ObjectId

let Data = function(data, userId, dataId) {
  this.data = data
  this.errors = []
  this.userId = userId
  this.dataId = dataId
}

Data.prototype.cleanUp = function() {
  if(typeof(this.data) != "string") this.data = ""
  if(this.data == "") this.errors.push("cannot create a blank note")

  this.data = {
    text: this.data.trim(),
    date: new Date(),
    userId: ObjectId(this.userId)
  }
}

/* initial trial to fetch all notes from the DB
Data.fetchNotes = function() {
  return new Promise(async (resolve, reject) => {
    const itemy = await itemsCollection.find().toArray()
    if(itemy) {
      resolve(itemy)
    } else {
      reject()
    }
  })
}
*/

Data.prototype.createNote = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    if(!this.errors.length) {
      let result = await itemsCollection.insertOne(this.data)
    //  console.log(result) 
      response = {
         text: this.data.text, 
         date:  this.data.date, 
          _id:  result.insertedId
        }
      resolve(response)
    } else {
      reject(this.errors)
    }
  })
}

/* // find all notes - for a particular userId
Data.findByUserId = function(userId) {
  return new Promise(async function(resolve, reject) {
    let posts = await itemsCollection.aggregate([
      {$match: {userId: new ObjectId(userId)}},
      {$sort: {date: -1}}
    ]).toArray()
  //   console.log(posts) 
   resolve(posts)
  })
}
*/

// find all records for a userId, also find the respective username from another collection.
//  extract username from one table and posts from other table, only thing provided is UserId
Data.findByUserId = function(userId) {
  return new Promise(async function(resolve, reject) {
    let items = await itemsCollection.aggregate([
      {$match: {userId: new ObjectId(userId)}},
      {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "userRecords"}},
      {$project: {
        text: 1,
        date: 1,
        userinfo: {$arrayElemAt: ["$userRecords", 0]} 
      }}
    ]).toArray()

    // clean up username {} property for each note
    items.map(function(item) {
      item.userinfo = {
        username: item.userinfo.username
      }
      return item
    })

    if(items.length) {
    //  console.log(items)
      resolve(items)
    } else {
      reject('there was some problem')
    }
  })
}

Data.prototype.editNote = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    
  await itemsCollection.findOneAndUpdate({ _id: new ObjectId(this.dataId), userId: this.data.userId}, {$set: {text: this.data.text, date: this.data.date}}, {returnDocument: 'after'})
  .then((result) => {
  // console.log(result)
    
    resolve(result.value)
  })
  .catch(() => reject())
  
  })
}

Data.prototype.deleteNote = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    
  await itemsCollection.deleteOne({ _id: new ObjectId(this.dataId), userId: this.data.userId})
  .then((result) => {
   // console.log(result)
    resolve('delete success')
  })
  .catch(() => reject())
  
  })
}

module.exports = Data


