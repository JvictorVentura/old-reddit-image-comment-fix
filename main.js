comments = document.getElementsByClassName("md");
comments = Array.from(comments);
comments = comments.filter( (comment) => comment.innerText.includes("<image>") );
//comment = comment.map((child) => { child.innerText = child.innerText.replace('<image>', '');
//                                   child.innerHTML																		
//																	})
