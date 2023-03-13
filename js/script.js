
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


function validate(event){

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



function validateName(element){
  const regEx = /^[A-Za-z\u00C0-\u017F]+(?:[-\s][A-Za-z\u00C0-\u017F]+)?(?:[-\s][A-Za-z\u00C0-\u017F]+)?$/;
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)){

      errorElement.innerHTML = `must be a valid name`
      return false

  }
  
  errorElement.innerHTML = ``
  return true

}


function validateEmail(element){
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)){

      errorElement.innerHTML = `must be a valid email address`
      return false

  }
  
  errorElement.innerHTML = ``
  return true

}

function validateComment(element){
  const regEx = /^(?=.*[A-Za-z])[A-Za-z0-9\såäöÅÄÖ!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{1,500}$/
  const errorElement = document.getElementById(`error-${element.id}`)

  if (!regEx.test(element.value)){

      errorElement.innerHTML = `must be a valid comment`
      return false

  }
  
  errorElement.innerHTML = ``
  return true

}





