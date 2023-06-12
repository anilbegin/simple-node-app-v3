document.addEventListener('click', e => {
  if(e.target.classList.contains("edit-me")) {
   let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
   if(userInput) {
      axios.post('/edit-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
        
        // displaying the new timestamp for Updated Note, on the fly
        const date = new Date()
        let theMinute = date.getMinutes()
        theMinute = theMinute < 10 ? '0' + theMinute : theMinute 
        let theDate = '(' + date.getDate() + '/' + `${date.getMonth() + 1}` + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + theMinute + ')'

        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
        e.target.parentElement.parentElement.querySelector(".item-date").innerHTML = theDate
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