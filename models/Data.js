const itemsCollection = require('../db').collection('itemy')

let Data = function(data) {
  this.data = data
  this.errors = []
}

Data.prototype.cleanUp = function() {
  this.data = {
    text: this.data,
    date: new Date()
  }
}

Data.fetchNotes = function() {
  return new Promise(async (resolve, reject) => {
    const itemx = await itemsCollection.find().toArray()
    if(itemx) {
      resolve(itemx)
    } else {
      reject()
    }
  })
}

Data.prototype.createNote = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    itemsCollection.insertOne(this.data).then(() => resolve()).catch(() => reject())
    
  })
}

module.exports = Data