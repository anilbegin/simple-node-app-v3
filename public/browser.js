document.addEventListener('click', e => {
  
  //Edit/Update feature
  if(e.target.classList.contains("edit-me")) {
   let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
   if(userInput) {
      axios.post('/edit-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
        
        // displaying the new timestamp for Updated Note, on the fly
        const date = new Date()
        let theMinute = date.getMinutes()
        theMinute = theMinute < 10 ? '0' + theMinute : theMinute 
        let theDate = '(' + date.getDate() + '/' + `${date.getMonth() + 1}` + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + theMinute + ')'

        e.target.parentElement.parentElement.querySelector(".item-date").innerHTML = theDate
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
    }).catch(function() {
        console.log("Please try again later")
    })
   }
  }

  //Delete feature
  if(e.target.classList.contains("delete-me")) {
    if(confirm("Do you really want to delete this note ?")) {
        axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function() {
          e.target.parentElement.parentElement.remove()        
      }).catch(function() {
          console.log("Please try again later")
      })
    }
   }
})

