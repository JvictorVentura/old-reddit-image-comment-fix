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
  var size = '50%'
  var image_tag = "<image>"
  var url_preview = "https://preview.redd.it"
  var posts = Array.from(document.getElementsByClassName("md"));

  posts = posts.map( (post)=> { return post.querySelectorAll('a')});
  posts = posts.map( (post)=> { return Array.from(post)});
  posts = posts.filter( (post)=>post.length > 0);
  posts = posts.flat();
  posts = posts.filter( post=> post.getAttribute('href').includes(url_preview));

  var comments = posts.filter(post => post.innerText.includes(image_tag));
  comments.map((post) =>{
        var image_link = post.getAttribute('href');
        var img = document.createElement('img');
        img.setAttribute('src', image_link);
        img.setAttribute('height', size);
        img.setAttribute('width', size);
        post.replaceWith(img);
    });

  var image_url_on_text = posts.filter( (post)=> post.innerHTML.includes(url_preview));
  //replace anchors with images
   image_url_on_text.map((post) =>{
        var image_link = post.getAttribute('href');
        var img = document.createElement('img');
        img.setAttribute('src', image_link);
        img.setAttribute('height', size);
        img.setAttribute('width', size);
        post.replaceWith(img);
    });


  var text_with_url = posts.filter( post=> {
    if (!post.innerText.includes(image_tag) && !post.innerText.includes(url_preview)) {
      return true;
    }else{
      return false;
    }
  });
  text_with_url.map((post) =>{
        var image_link = post.getAttribute('href');
        var text = post.innerText;
        var paragraph = document.createElement('p');
        paragraph.innerText = text;
        var img = document.createElement('img');
        img.setAttribute('src', image_link);
        img.setAttribute('height', size);
        img.setAttribute('width', size);
        post.insertAdjacentElement('afterend', paragraph);
        post.replaceWith(img);
    });


}


