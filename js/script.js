
// Arrow function

const arrow = document.querySelector('#top-arrow')
arrow.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

window.addEventListener('scroll', function () {
  const scrollPosY = window.scrollY

  if (scrollPosY >= 100) {
    arrow.style.display = 'block'
  }
  else {
    arrow.style.display = 'none'
  }

})

window.addEventListener('scroll', function () {
  const scrollPosY = window.scrollY

  if (scrollPosY >= 100) {
    arrow.style.display = 'block'
  }
  else {
    arrow.style.display = 'none'
  }

})

// Button-toggle

try {
  const toggleButton = document.querySelector('[data-option="toggle"]')
  const target = toggleButton.getAttribute('data-target')
  toggleButton.addEventListener('click', toggleTarget)


  function toggleTarget() {
    const element = document.querySelector(target)

    if (!element.classList.contains('hide')) {
      element.classList.add('hide')
    }
    else {
      element.classList.remove('hide')
    }

  }


}
catch { }


// Products-fetch

async function getProducts(target, tag) {
  const element = document.querySelector(target)

  const res = await fetch(`https://kyh-net22.azurewebsites.net/api/products/${tag}`)
  const data = await res.json()

  for (let item of data) {
    element.innerHTML +=

      `
        <div class="product-card">
            <div class="card-content">
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="card-menu">
                    <nav class="icons">
                        <a class="link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                    </nav>
                    <a class="btn-theme" href="#">QUICK VIEW</a>
                </div>
            </div>
            
            <div class="card-body">
              <p class="category">${item.category}</p>
              <p class="title">${item.name}</p>
              <div class="ranking">
                <i class="fa-solid fa-sharp fa-star"></i>
                <i class="fa-solid fa-sharp fa-star"></i>
                <i class="fa-solid fa-sharp fa-star"></i>
                <i class="fa-solid fa-sharp fa-star"></i>
                <i class="fa-regular fa-sharp fa-star"></i>
              </div>
              <p class="price">${item.originalPrice} ${item.currency}</p>
            </div>

          </div>
        </div>

      </div>
    </div>       
         
        `

  }
}

// validate contact form

function validate(event) {

  switch (event.target.id) {

    case 'name':
      validateName(event.target)
      break;

    case 'email':
      validateEmail(event.target)
      break;

    case 'comments':
      validateComment(event.target)
      break;


  }

}

function validateName(element) {
  const regEx = /^[A-Za-z\u00C0-\u017F]+(?:[-\s][A-Za-z\u00C0-\u017F]+)?(?:[-\s][A-Za-z\u00C0-\u017F]+)?$/;
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)) {

    errorElement.innerHTML = `must be a valid name`
    return false

  }

  errorElement.innerHTML = ``
  return true

}

function validateEmail(element) {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)) {

    errorElement.innerHTML = `must be a valid email address`
    return false

  }

  errorElement.innerHTML = ``
  return true

}

function validateComment(element) {
  const regEx = /^(?=.*[A-Za-z])[A-Za-z0-9\såäöÅÄÖ!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{1,500}$/
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)) {

    errorElement.innerHTML = `must be a valid comment`
    return false

  }

  errorElement.innerHTML = ``
  return true

}

async function handlePostComment(e) {
  e.preventDefault()
  const errors = []
  const errorMessage = document.getElementById('errorMessage')
  const confirmMessage = document.getElementById('confirmMessage')

  errorMessage.innerHTML = ''
  confirmMessage.innerHTML = ''

  for (let element of e.target) {

    if (element.required) {
      const errorElement = document.getElementById(`error-${element.id}`)

      if (element.value.length === 0) {
        errorElement.innerHTML = `${element.id} is required.`
        errors.push(false)
      }
      else {
        errorElement.innerHTML = ``

        switch (element.id) {
          case 'name':
            errors.push(validateName(element))
            break;
          case 'email':
            errors.push(validateEmail(element))
            break;
          case 'comments':
            errors.push(validateComment(element))
            break;

        }
      }
    }
  }


  if (!errors.includes(false)) {

    const form = {
      name: e.target['name'].value,
      email: e.target['email'].value,
      comments: e.target['comments'].value

    }

    // dummy link 'https://localhost:7046/api/Login'
    // 'https://kyh-net22.azurewebsites.net/api/contacts'

    try {

      const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)

      })

      if (res.status === 200) {
        const result = await res.text()
        sessionStorage.setItem('accessToken', result)
        confirmMessage.innerHTML = 'Thank you for your request! We will get back to you soon.'
      }
      else {
        errorMessage.innerHTML = 'Something went wrong. Try again later.'

      }

    }


    catch (error) {
      errorMessage.innerHTML = 'Something went wrong. Try again later.'
    }

  }

}


