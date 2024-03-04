function getProductByType(apiUrl, query='') {
    
    var numberOfProduct;
    var category = query;
    var url = 'http://25.13.241.170:4309' + apiUrl + category;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        numberOfProduct = data.length;

        const output = data.map(product => {
            return `
                <section class="box">
                    <a href="/result/id=${product.Product_ID}" class="click">
                        <img src="${product.Img}" class="img-fluid">
                    </a>
                    <h5 class="product">${product.Name_Of_Product}</h5>
                    <p class="product">${product.Price} Baht</p>
                    <section style="align-self: center;"><button id="product-button" class="product" value="">Put in cart</button></section>
                </section>
            `;
        }).join('');

        document.querySelector('#found').innerHTML = numberOfProduct + ' product(s)'
        document.querySelector('#output').innerHTML = output;
    })
    .catch((err) => console.log(err));
}








/////////////////////////////////////////////////// back up /////////////////////////////////////////////////////////////

/*
function getProductByType(apiUrl, query='') {
    
    var numberOfProduct;
    var category = query;
    var url = 'http://25.13.241.170:4309' + apiUrl + category;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        numberOfProduct = data.length;

        const output = data.map(product => {
            return `
                <section class="box">
                    <a href="/product/${product.Product_ID}" class="click">
                        <img src="${product.Img}" class="img-fluid">
                    </a>
                    <h5 class="product">${product.Name_Of_Product}</h5>
                    <p class="product">${product.Price} Baht</p>
                    <section style="align-self: center;"><button id="product-button" class="product" value="">Put in cart</button></section>
                </section>
            `;
        }).join('');

        document.querySelector('#found').innerHTML = numberOfProduct + ' product(s)'
        document.querySelector('#output').innerHTML = output;
    })
    .catch((err) => console.log(err));
}
*/