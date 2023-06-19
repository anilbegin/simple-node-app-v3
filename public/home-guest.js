//LOGIN related variables
const ourForm = document.getElementById('our-form')
const username = document.getElementById('username-field')
const password = document.getElementById('password-field')

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
let allFields = document.querySelectorAll("#registration-form .form-control")
let regUsername = document.querySelector("#username-register") 
regUsername.previousValue = ""


function insertValidationElements() {
  allFields.forEach(function(el) {
    el.insertAdjacentHTML('afterend', '<div class="alert alert-danger small liveValidateMessage"></div>')
  })
}
insertValidationElements()

function usernameHandler() {
  regUsername.errors = false
  if(regUsername.previousValue != regUsername.value) {
    usernameImmediately()
    clearTimeout(regUsername.timer)
    regUsername.timer = setTimeout(() => usernameAfterDelay(), 3000)
  }
  regUsername.previousValue = regUsername.value
  
}

function usernameImmediately() {
 if(regUsername.value != "" && !/^([a-zA-Z0-9]+)$/.test(regUsername.value)) {
  showValidationError(regUsername, "username can only contain letters and numbers")
 }
 if(regUsername.value.length > 30) {
  showValidationError(regUsername, "username cannot exceed 30 characters")
 }
 if(!regUsername.errors) {
  hideValidationError(regUsername)
 }
}

// here 'el' is whatever Element is being passed
function showValidationError(el, message) {
  el.nextElementSibling.innerHTML = message
  el.nextElementSibling.classList.add("liveValidateMessage--visible")
  el.errors = true
}
function hideValidationError(el) {
  el.nextElementSibling.classList.remove("liveValidateMessage--visible")
}

function usernameAfterDelay() {
  if(regUsername.value.length < 3) {
    showValidationError(regUsername, "username must be atleast 3 characters")
  }

  if(!regUsername.errors) {
    axios.post('/doesUsernameExist', {username: regUsername.value}).then((response) => {
      if(response.data) {
        showValidationError(regUsername, "username is already taken")
        regUsername.isUnique = false
      } else {
        regUsername.isUnique = true
      }
    }).catch(() => {
      console.log("try again later")
    })
  }
  
}

regUsername.addEventListener("keyup", () => {
  usernameHandler()
})



