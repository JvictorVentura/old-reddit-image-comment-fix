comments = document.getElementsByClassName("md");
comments = Array.from(comments);
comments = comments.filter( (comment) => comment.innerText.includes("<image>") );
comments = comments.map((child) => {
  old = child.innerHTML.match(/<p><a href=\".*\" target=\"_blank\">&lt;image&gt;<\/a><\/p>/g);
  image_link = child.querySelector('a').getAttribute('href');
  to_replace = "<img src=" + image_link + " height=50% width=50% >";
  child.innerHTML = child.innerHTML.replace(old[0], to_replace);
});
