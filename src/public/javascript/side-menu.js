const sideMenu = document.getElementById('side-menu-container');
let state = true;

// hide and show menu based in the state
function displaceMenu(){
    sideMenu.style.animation = `${state ? `show` : `hide`}-side-menu 0.2s linear`;
    sideMenu.style.transform =  `translateX(${state ? `0` : `-30`}vw)`;
    state = !state;
}