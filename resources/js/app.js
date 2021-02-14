import axios from 'axios'
import Noty from 'noty'
console.log("Hello from app.js")
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
function updateCart(item){
    axios.post('/update-cart',item).then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text : 'Item added to cart',
            progressBar: false,
            layout: 'bottomRight'
        }).show();
    }).catch(err =>{
        new Noty({
            type: 'error',
            timeout: 1000,
            text : 'Item added to cart',
            progressBar: false,
            layout: 'bottomRight'
        }).show();
    })
}

addToCart.forEach((btn) =>{
    btn.addEventListener('click', (e) =>{
        console.log(e)
        let item = JSON.parse(btn.dataset.item)
        updateCart(item)
        // console.log(item)
    })
})