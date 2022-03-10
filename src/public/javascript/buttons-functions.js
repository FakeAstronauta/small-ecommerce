let buttonContianer = document.querySelector('#user-form-container');

function showForm(){
    buttonContianer.style.display = 'block';
}

function hideForm(){
    buttonContianer.style.display = 'none';
}

// profile funtion

let profileLogo = document.querySelector('#nav-bar > .nav-buttons-container > #profile > .dropdown-content')
let dropDownState = true;
function displayDropdown(){
    console.log(dropDownState)
    if(dropDownState){
        profileLogo.style.display = 'block';
        dropDownState = false;
    }else{
        profileLogo.style.display = 'none';
        dropDownState = true;
    }
}
