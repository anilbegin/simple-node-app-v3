const itemsCollection = require('../db').db().collection('itemy')

let Data = function(data, userId) {
  this.data = data
  this.errors = []
  this.userId = userId
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

module.exports = Data