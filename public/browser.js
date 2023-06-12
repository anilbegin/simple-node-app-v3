document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
    prompt("Enter your desired new text")
  }
})

document.addEventListener('click', e => {
  if(e.target.classList.contains("delete-me")) {
    alert('delete button got clicked')
  }
})