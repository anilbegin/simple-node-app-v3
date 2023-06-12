document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
    alert('edit button got clicked')
  }
})

document.addEventListener('click', e => {
  if(e.target.classList.contains("delete-me")) {
    alert('delete button got clicked')
  }
})