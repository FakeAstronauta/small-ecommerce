import {filterSelection} from './filter.js'

let f = [[' landscape', ' portrait'],
         [' childs', ' adults', ' childs&adults'],
         [' vacation', ' casual', ' formal'],
         [' people', ' buildings']];
         
let idImages = {'4807505': f[0][1] + f[1][1] + f[2][2] + f[3][0],
                '4807502': f[0][1] + f[1][1] + f[2][2] + f[3][0],
                '4224930': f[0][0] + f[1][2] + f[2][0] + f[3][0],
                '9016163': f[0][1] + f[1][0] + f[2][1] + f[3][0],
                '5439508': f[0][0] + f[3][1],
                '4224927': f[0][0] + f[1][1] + f[2][2] + f[3][0],
                '9398487': f[0][1] + f[1][0] + f[2][0] + f[3][0],
                '4823826': f[0][1] + f[3][1],
                '9398465': f[0][1] + f[1][2] + f[2][1] + f[3][0],
                '9015673': f[0][0] + f[1][2] + f[2][1] + f[3][0],
                '9489475': f[0][0] + f[1][0] + f[2][2] + f[3][0],
                '9469395': f[0][1] + f[1][0] + f[2][2] + f[3][0],
                '4696882': f[0][1] + f[3][1],
                '5221698': f[0][0] + f[1][2] + f[2][2] + f[3][0],
                '4956210': f[0][0] + f[1][1] + f[2][1] + f[3][0],
                '5844058': f[0][0] + f[1][1] + f[2][2] + f[3][0],
                '11219976': f[0][1] + f[3][1],
                '9657870': f[0][1] + f[1][2] + f[2][1] + f[3][0],
                '9578815': f[0][1] + f[1][1] + f[2][0] + f[3][0],
                '8679952': f[0][1] + f[1][1] + f[2][1] + f[3][0]}

let column = document.querySelectorAll('.column')
let template = document.querySelector('#images-template')

let counter = 1;    
let columnIndex = 0;
let deleteCounter = 0; // increases by 6

function loadSkeleton(){
    while(counter <= 20) {
        column[columnIndex].append(template.content.cloneNode(true))
        if(counter % 5 == 0){columnIndex++}
        counter++;
    }
    counter = 1;
    columnIndex = 0;
}

async function insertImage(){

    for(let i in idImages){

        let raw = await fetch(`https://api.pexels.com/v1/photos/${i}`,{ headers: {
            Authorization: '563492ad6f917000010000017b6f3158f1794ee085b3def899f919dd'
        }});
        let data = await raw.json();
        
        // let stringContent =
        // `<div class="img-container ${idImages[i]} ">
        //     <div class="header">
        //         <div class="show-on-overlay">
        //             <span class="material-icons">
        //                 star
        //             </span>
        //             <span class="letter">ADD TO CART</span>
        //         </div>
        //         <img src="${data.src.large}" alt="">
        //     </div>
        //     <div class="footer">
        //         $20.69
        //         <span class="full-size">Show full size</span>
        //     </div>
        // </div>`
        // console.log(columnIndex)
        let templateElements = document.querySelectorAll('.img-container');
        templateElements[deleteCounter].remove();
        // deleteCounter += 1

        let cloned = template.content.cloneNode(true);
        cloned.querySelector('.img-container').className += idImages[i];
        cloned.querySelector('.header').innerHTML = 
        `<div class="show-on-overlay">
            <span class="material-icons">
                star
            </span>
            <span class="letter">ADD TO CART</span>
        </div>
        <img src="${data.src.large}" alt=""></img>`;
        cloned.querySelector('.footer').innerHTML = 
        `$20.69
        <span class="full-size">Show full size</span>`
        column[columnIndex].append(cloned);

        // console.log(counter)
        if(counter % 5 == 0){columnIndex++; deleteCounter += 5 }
        if(counter == 20){filterSelection('all')}
        counter++;
        
    }
}

loadSkeleton();
insertImage();