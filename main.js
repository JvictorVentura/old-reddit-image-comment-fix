search_for = "<image>"
size = '50%'  
comments = document.getElementsByClassName("md");
comments = Array.from(comments);
comments = comments.filter( (comment) => comment.innerText.includes(search_for));

comments = comments.map( (comment) =>{
  elements = comment.querySelectorAll('p');
  elements = Array.from(elements);
  elements = elements.filter( (element) => element.textContent.includes(search_for));

  elements = elements.map( (element) => {
    image_link = element.querySelector('a').getAttribute('href');
    img = document.createElement('img');
    img.setAttribute('src', image_link);
    img.setAttribute('height', size);
    img.setAttribute('width', size);
    element.querySelector('a').replaceWith(img)
  })

})

