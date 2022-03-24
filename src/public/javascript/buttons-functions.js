// hide elements

let buttonContianer = document.querySelector('#user-form-container');
let succesContianer = document.querySelector('#succes-container');
let label = document.querySelector('#user-form-container > #dark-background > h1');
let form = document.querySelector('#user-form-container > #dark-background > form');

function showForm(title, action){
    buttonContianer.style.display = 'block';
    form.action = action;
    label.innerHTML = title;
}

function hideForm(){
    buttonContianer.style.display = 'none';
}

// ====

function showSucces(title, action){
    succesContianer.style.display = 'block';
}

function hideSucces(){
    succesContianer.style.display = 'none';
}

// profile funtion

let profileLogo = document.querySelector('#nav-bar > .nav-buttons-container > #profile > .dropdown-content')
let dropDownState = true;

function displayDropdown(){
    if(dropDownState){
        profileLogo.style.display = 'block';
        dropDownState = false;
    }else{
        profileLogo.style.display = 'none';
        dropDownState = true;
    }
}

// add products to cart

let productCounter = 0;
// cart page functions
let originalPrice = 90.00;
let productAmount = [];

// adds items to the cart
async function addProducts (url){
    const rawResponse = await fetch('http://localhost:4000/add-item', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            link: url
        })
    });
    // used to permit a redirect
    window.location.href = rawResponse.url;
    

    // add a amount for every product added
}



// this is needed because setFinalPrice modifies a element that is not loaded yet
function addProductCount(){
    let productContainer = document.querySelectorAll('#global-container > .products > .product-container');
    for(let i = 0; i < productContainer.length; i++){
        productAmount.push(1)
    }
    setFinalPrice();
    if(productContainer.length > 0){
        addBadge();
    }
}

function addBadge(){
    let badge = document.querySelector('#badge');
    badge.style.display = 'flex';
}

// increase or decrease the individual price depending on the amount
function changePrice(op, i){
    // both are inside the function because are created after initialize
    let number = document.querySelectorAll('.product-container > .quantity > .counter > .number');
    let finalPrice = document.querySelectorAll('.product-container > .quantity > .final-price');

    if (op == '-'){
        if(productAmount[i] > 1){ // this blocks the count to be less than one
            productAmount[i]--;
        }
    }else{
        productAmount[i]++;
    }
    
    number[i].innerHTML = productAmount[i];
    finalPrice[i].innerHTML = '$ ' + (originalPrice * productAmount[i]).toFixed(2);

    setFinalPrice();
}

// used to update the final price with every change
function setFinalPrice(){
    // this throw error because does not exist
    let total = document.querySelector('.user-info-container > .button-cont > #price')
    let sum = 0;

    for(let i of productAmount){
        sum += parseInt(i);
    }

    total.innerHTML = '$ ' + (originalPrice * sum).toFixed(2);
}

// display of the products is set to none and the respective amount is 0
async function removeProduct(i, id){
    let productsContainer = document.querySelectorAll('#global-container > .products > .product-container');
    productsContainer[i].style.display = 'none';
    productAmount[i] = 0;
    setFinalPrice();

    const rawResponse = await fetch(`http://localhost:4000/delete/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        redirect: 'follow'
        // ,
        // body: JSON.stringify({
        //     link: url
    });
    // used to permit a redirect
    window.location.href = rawResponse.url;
}