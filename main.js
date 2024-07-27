// ==UserScript==
// @name        old reddit comment fix
// @namespace   my_script
// @match       *://old.reddit.com/*
// @grant       none
// @version     1.0
// @author      João Victor R. Ventura
// @description Make it so the old Reddit comment section displays images.
// @run-at      document-idle
// ==/UserScript==


//First run
find_and_replace();

//to make it work when new comments load
comment_area = document.querySelector(".commentarea");
const observerOptions = {
  childList: true,
  subtree: true,
};
const observer = new MutationObserver(find_and_replace);
observer.observe(comment_area, observerOptions);








//------------------
function find_and_replace(){
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
}
