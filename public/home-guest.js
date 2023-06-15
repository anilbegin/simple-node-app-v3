//LOGIN related variables
const ourForm = document.getElementById('our-form')
const username = document.getElementById('username-field')
const password = document.getElementById('password-field')

// REGISTER related variables
const regForm = document.getElementById('reg-form')
const regUsername = document.getElementById('reg-username')
const regEmail = document.getElementById('reg-email')
const regPassword = document.getElementById('reg-password')

// LOGIN SECTION
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

// REGISTER SECTION
function regErrorTemplate(error) {
  if(error.username) {
    regUsername.classList.add('is-invalid')
    regUsername.insertAdjacentHTML("afterend", `<span class='invalid-feedback'>${error.username}</span>`) 
  }
  if(error.email) {
    regEmail.classList.add('is-invalid')
    regEmail.insertAdjacentHTML("afterend", `<span class='invalid-feedback'>${error.email}</span>`) 
  }
  if(error.password) {
    regPassword.classList.add('is-invalid')
    regPassword.insertAdjacentHTML("afterend", `<span class='invalid-feedback'>${error.password}</span>`) 
  }
  
}
regForm.addEventListener('submit', e => {
  e.preventDefault()
  axios.post('/register', {username: regUsername.value, email: regEmail.value, password: regPassword.value}).then(function(response) {
    console.log(response.data)
    regErrorTemplate(response.data)
  }).catch()
})