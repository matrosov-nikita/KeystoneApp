var elem = document.querySelector("#container");
console.log(elem);
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.col-md-4',
  columnWidth: '.col-md-4'
});
