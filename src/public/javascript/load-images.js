async function insertImage(){
    let raw = await fetch(`https://api.pexels.com/v1/photos/10824949`,{ headers: {
        Authorization: '563492ad6f917000010000017b6f3158f1794ee085b3def899f919dd'
    }});
    let data = await raw.json();
    console.log(data)
    // for(let a of data.photos){
    //     stringContent += `
    //     <div class='grid-item'>
    //         <img src=${a.src.tiny}/>
    //         <div class='text-container'>
    //             <h4>LOREM IPSUM DOLOR</h4>
    //             <bold>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bold>
    //             <p>lorem 00</p>
    //         </div>
    //     </div>
    //     `;
    // }
    // container[0].innerHTML = container[0].innerHTML + stringContent;
    // page_num++;
    // stringContent = ' '
}
// insertImage()