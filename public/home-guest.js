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
function loginErrorTemplate() {
  if(document.getElementById('error')) document.getElementById('error').remove()
  return `<span id='error' class="mr-2 text-danger">Invalid username/password</span>`
}

// login form submit section
ourForm.addEventListener('submit', e => {
  e.preventDefault()
  if(username.value == "" || password.value == "") {
    ourForm.insertAdjacentHTML('beforebegin', loginErrorTemplate())
  }
   
  if(username.value.trim() != "" && password.value != "") {
    axios.post('/login', {username: username.value, password: password.value}).then(function(response) {
      //console.log(response)
      if(response.data == "Success") {
        window.location.href = '/'
      } else {
        ourForm.insertAdjacentHTML('beforebegin', loginErrorTemplate())
      }
    }).catch(function() {
      console.log("Please try again later.")
    })
  }
})

// REGISTER SECTION
/*
function getObjectValue(error) {
  for(var obj in error) {
    console.log(obj)
    console.log(error[obj])
  }
}

*/
// trial // partially working code !!
function regErrorTemplate(error) {
  
  // remove a specific class i.e is-invalid if it exists from all elements

  for(var obj in error) {
    console.log(obj)
    console.log(error[obj])
    document.getElementById(`reg-${obj}`).classList.add('is-invalid')
    document.getElementById(`reg-${obj}`).insertAdjacentHTML("afterend", `<span class='invalid-feedback'>${error[obj]}</span>`)
  }
}
// end of trial
/*
function regErrorTemplate(error) {
  if(regUsername.classList.contains('is-invalid')) regUsername.classList.remove('is-invalid')
  if(regEmail.classList.contains('is-invalid')) regEmail.classList.remove('is-invalid')
  if(regPassword.classList.contains('is-invalid')) regPassword.classList.remove('is-invalid')
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
*/



regForm.addEventListener('submit', e => {
  e.preventDefault()
  axios.post('/register', {username: regUsername.value, email: regEmail.value, password: regPassword.value}).then(function(response) {
  //  console.log(response.data)
    regErrorTemplate(response.data)
  }).catch()
})