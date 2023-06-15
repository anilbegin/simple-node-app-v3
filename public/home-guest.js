const ourForm = document.getElementById('our-form')
const username = document.getElementById('username-field')
const password = document.getElementById('password-field')

// display Error message for invalid login
function errorTemplate() {
  if(document.getElementById('error')) document.getElementById('error').remove()
  return `<span id='error' class="mr-2 text-danger">Invalid username/password</span>`
}

// login form submit section
ourForm.addEventListener('submit', e => {
  e.preventDefault()
  if(username.value == "" || password.value == "") {
    ourForm.insertAdjacentHTML('beforebegin', errorTemplate())
  }
   
  if(username.value.trim() != "" && password != "") {
    axios.post('/login', {username: username.value, password: password.value}).then(function(response) {
      //console.log(response)
      if(response.data == "Success") {
        window.location.href = '/'
      } else {
        ourForm.insertAdjacentHTML('beforebegin', errorTemplate())
      }
    }).catch(function() {
      console.log("Please try again later.")
    })
  }
})