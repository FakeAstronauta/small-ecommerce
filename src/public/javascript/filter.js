let keys = new Set([]);
let boolValue = true;

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  // si no es 'all' el nombre es agregado a keys
  if (c == "all"){
    c = ""
  }else{
    keys.add(c)
  };

  for (i = 0; i < x.length; i++) { // se hace un recorrido por todos los elementos con cada refresh
    w3RemoveClass(x[i], "show"); // clear the show class of all elements
    if (x[i].className.indexOf(c) > -1){
        // all alements in keys are compared with the class name of every element
        keys.forEach(e => {
            if(x[i].className.indexOf(e) == -1){
                boolValue = false;   
            }
        });
        if (boolValue){ // if all elements are present in the classname of the element
            w3AddClass(x[i], "show"); // si la clase filtro esta presente
        }
    }
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];} // if the class is not present
  }

}

// clear the show class of all elements
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {  // if the class 'show' is in the array
      arr1.splice(arr1.indexOf(arr2[i]), 1); // class show is deleted; it was added by addclass   
    }
  }
  element.className = arr1.join(" "); // the classes list is added without the class deleted

}

filterSelection("all")