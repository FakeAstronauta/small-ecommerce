let keysNames = {
  orientation: "",
  age: "",
  context: "",
  content: ""
};  // es necesario evitar datos repetidos
let keys = new Set();  // para evitar datos repetidos
let boolValue = true;
let matches = []

// aware to testing
function deleteAll(c='all', filterName){
  deleteFilters(filterName)
  filterSelection(c, filterName)

}

function deleteFilters(filterName) {
  if (filterName != "") {
    // console.log(keys)
    keys.delete(keysNames[filterName]);
  }
}

export function filterSelection(c, filterName = "") {
  
  // the previous element must be deleted before add the other
  if (c != keysNames[filterName]) { // si se pasa el mismo filtro que ya esta guardado que no lo borre
    deleteFilters(filterName); // deletes the previous filter of the same category
  }

  var x, i;
  x = document.getElementsByClassName("img-container");
  console.log(x[0])
  // si no es 'all' el nombre es agregado a keys
  if (c == "all") {
    c = ""
  } else if(c != keysNames[filterName]) { // si se pasa el mismo filtro que ya esta guardado que no lo guarde
    keys.add(c)
    keysNames[filterName] = c;
  };
  console.log(keys)
  // se hace un recorrido por todos los elementos con cada refresh
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show"); // clear the show class of all elements
    if (x[i].className.indexOf(c) > -1) { // FIRST: if the filter passed in 'c' is in the class name of any element

      // all alements in keys are compared with the class name of every element
      keys.forEach(e => {
        if (x[i].className.indexOf(e) == -1) { // SECOND: The filter is compared with the saved in keys
          matches.push(false);
        }else{
          matches.push(true);
        }
      });
      console.log(matches)

      if(matches.includes(false)){ // si false esta presente almenos una vez
        boolValue = false;
      }else{
        boolValue = true;

      }

      matches = []; // limpia el array
     
      if (boolValue) { //THIRD: if all filters are present in the className of element of the element is displayed
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
    if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; } // if the class is not present
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

window
// filterSelection("all")