function getResult(apiUrl, query='') {
    var id = query;
    var url = 'http://25.13.241.170:4309' + apiUrl + id;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const output = data.map(product => {
            return `
                <article class="container content-area-template">
                    <div class="container about-product">
                        <div class="container content-2">
                        <div class="">
                            <!-- link to image -->
                            <img src="${product.Img}" alt="" id="product-pic" class="pic">
                        </div>
                        <div class="">
                            <div class="small-info">
                                <!-- Product name and price -->
                                <h3 id="product-name">${product.Name_Of_Product}</h3>
                                <h4 id="product-price">${product.Price}</h4>
                                <button type="button" class="btn btn-light">🛒 Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <!--Product's detail-->
                    <div class="container content-2">   
                        <div class="container product-description">
                            <!-- Product detail -->
                            <h3>About product</h3>
                            <!--Description of product-->
                            <p id="product-info">${product.Information}</p>
                        </div>
                    </div>
                </div>
            </article> 
            `;
        }).join('');

        document.querySelector('#output').innerHTML = output;
    })
   console.log('Get Result!');
}