document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
   let userInput = prompt("Enter your desired new text")
   console.log(userInput)
  }
})

document.addEventListener('click', e => {
  if(e.target.classList.contains("delete-me")) {
    alert('delete button got clicked')
  }
})