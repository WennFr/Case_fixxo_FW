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
                        <a class="link" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                    </nav>
              <a class="btn-theme" href="#">QUICK VIEW</a>
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