const sideMenu = document.getElementById('side-menu-container');
let state = true;

// hide and show menu based in the state
function displaceMenu(){
    sideMenu.style.animation = `${state ? `show` : `hide`}-side-menu 0.2s linear`;
    sideMenu.style.transform =  `translateX(${state ? `0` : `-20`}vw)`;
    state = !state;
}

// Accordion animations

const accordionHeader = document.querySelectorAll('#side-menu-container > #side-menu > .accordion-element');
let lastNum = null;

function displayAccordion(num){
    accordionHeader[num].style.height = 'auto';
    if (lastNum != null){
        accordionHeader[lastNum].style.height = '24px';
    }

    lastNum = num;
}
displayAccordion(0);