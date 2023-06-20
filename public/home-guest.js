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
const regForm = document.querySelector("#registration-form")
let allFields = document.querySelectorAll("#registration-form .form-control")
const regUsername = document.querySelector("#username-register") 
regUsername.previousValue = ""
const regEmail = document.querySelector("#email-register")
regEmail.previousValue = ""
const regPassword = document.querySelector("#password-register")
regUsername.isUnique = false
regEmail.isUnique = false


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
    regUsername.timer = setTimeout(() => usernameAfterDelay(), 800)
  }
  regUsername.previousValue = regUsername.value
  
}

function emailHandler() {
  regEmail.errors = false
  if(regEmail.previousValue != regEmail.value) {
    clearTimeout(regEmail.timer)
    regEmail.timer = setTimeout(() => emailAfterDelay(), 800)
  }
  regEmail.previousValue = regEmail.value
}

function passwordHandler() {
  regPassword.errors = false
  if(regPassword.previousValue != regPassword.value) {
    passwordImmediately()
    clearTimeout(regPassword.timer)
    regPassword.timer = setTimeout(() => passwordAfterDelay(), 800)
  }
  regPassword.previousValue = regPassword.value
  
}

function passwordImmediately() {
  if(regPassword.value.length > 30) {
    showValidationError(regPassword, "password cannot exceed 30 characters")
  }
  if(!regPassword.errors) {
    hideValidationError(regPassword)
  }
}

function passwordAfterDelay() {
  if(regPassword.value.length < 6) {
    showValidationError(regPassword, "password must be atleast 6 characters")
  }
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
  el.classList.add("is-invalid")
  el.nextElementSibling.innerHTML = message
  el.nextElementSibling.classList.add("liveValidateMessage--visible")
  el.errors = true
}
function hideValidationError(el) {
  el.classList.remove("is-invalid")
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

function emailAfterDelay() {
  if(!/^[a-zA-Z0-9]+\.?[a-zA-Z0-9]+@(yahoo|ymail|rocketmail|gmail|rediffmail|outlook|live|hotmail)\.com$/.test(regEmail.value)) {
    showValidationError(regEmail, "please provide a valid email address")
  }
  if(!regEmail.errors) {
    hideValidationError(regEmail)

    axios.post('/doesEmailExist', {email: regEmail.value}).then((response) => {
      if(response.data) {
        regEmail.isUnique = false
        showValidationError(regEmail, "this email is already in use")
      } else {
        regEmail.isUnique = true
        hideValidationError(regEmail)
      }
    }).catch(() => {
      console.log("try again later")
    })
   }
 
}

function formSubmitHandler() {
  usernameImmediately()
  usernameAfterDelay()
  emailAfterDelay()
  passwordImmediately()
  passwordAfterDelay()

  if(
    regUsername.isUnique &&
     !regUsername.errors &&
      regEmail.isUnique &&
      !regEmail.errors &&
      !regPassword.errors
      ) 
      {
        regForm.submit()
      }
}

regUsername.addEventListener("keyup", () => {
  usernameHandler()
})

regEmail.addEventListener("keyup", () => {
  emailHandler()
})

regPassword.addEventListener("keyup", () => {
  passwordHandler()
})

regUsername.addEventListener("blur", () => {
  usernameHandler()
})

regEmail.addEventListener("blur", () => {
  emailHandler()
})

regPassword.addEventListener("blur", () => {
  passwordHandler()
})

regForm.addEventListener("submit", e => {
  e.preventDefault()
  formSubmitHandler()
})


