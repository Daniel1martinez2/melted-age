const fonts = ['Krona One', 'Antonio', 'Pangolin','Alegreya', 'Zen Dots']
const setTitleAnimation = (titleText, titleElem) =>{
  const words = titleText.split(''); 
  words.forEach(elem => {
    const currentWord = document.createElement('span'); 
    currentWord.classList.add('word-span'); 
    currentWord.innerText = elem; 
    titleElem.appendChild(currentWord); 
    currentWord.style.fontFamily = fonts[Math.round(Math.random()*fonts.length)]; 
    setInterval(() => {
      currentWord.style.fontFamily = fonts[Math.round(Math.random()*fonts.length)]; 
    }, Math.round (Math.random()*1000 +1000));
  });
  
}
const title = document.querySelector('.title');
const card = document.querySelector('.card');
setTitleAnimation('Melted  Age',title); 
title.addEventListener('mousemove', ()=>{
  card.classList.remove('hidden'); 
}); 

const close= document.querySelector('.close');
close.addEventListener('click', (event)=> {
event.stopPropagation; 
event.preventDefault; 
  card.classList.add('hidden')
})

//https://www.scp.byu.edu/iceberg/