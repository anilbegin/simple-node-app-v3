document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
   let userInput = prompt("Enter your desired new text")
   axios.post('/edit-item', {text: userInput}).then(function() {
      // do something after the axios req gets resolved
   }).catch(function() {
      console.log("Please try again later")
   })
  }
})

document.addEventListener('click', e => {
  if(e.target.classList.contains("delete-me")) {
    alert('delete button got clicked')
  }
})