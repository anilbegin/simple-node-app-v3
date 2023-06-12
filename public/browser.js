document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
   let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
   if(userInput) {
      axios.post('/edit-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
    }).catch(function() {
        console.log("Please try again later")
    })
   }
  }
})

document.addEventListener('click', e => {
  if(e.target.classList.contains("delete-me")) {
    alert('delete button got clicked')
  }
})