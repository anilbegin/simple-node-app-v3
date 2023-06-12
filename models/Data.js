const itemsCollection = require('../db').db().collection('itemy')
const ObjectId = require("mongodb").ObjectId

let Data = function(data, userId, dataId) {
  this.data = data
  this.errors = []
  this.userId = userId
  this.dataId = dataId
}

Data.prototype.cleanUp = function() {
  this.data = {
    text: this.data,
    date: new Date(),
    userId: this.userId
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
    itemsCollection.insertOne(this.data).then(() => resolve()).catch(() => reject())
    
  })
}

Data.findByUserId = function(userId) {
  return new Promise(async function(resolve, reject) {
    let posts = await itemsCollection.aggregate([
      {$match: {userId: userId}},
      {$sort: {date: -1}}
    ]).toArray()
      
   resolve(posts)
  })
}

Data.prototype.editNote = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    
  await itemsCollection.findOneAndUpdate({ _id: new ObjectId(this.dataId), userId: this.data.userId}, {$set: {text: this.data.text, date: this.data.date}}, {returnOriginal:false})
  .then((result) => {
   // console.log(result)
    resolve('edit/update success')
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