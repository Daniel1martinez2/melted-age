const fonts = ['Krona One', 'Antonio', 'Pangolin','Alegreya', 'Zen Dots']
const setTitleAnimation = (titleText, titleElem) =>{
  const words = titleText.split(''); 
  words.forEach(elem => {
    const currentWord = document.createElement('span'); 
    currentWord.classList.add('word-span'); 
    currentWord.innerText = elem; 
    titleElem.appendChild(currentWord); 
    setInterval(() => {
      currentWord.style.fontFamily = fonts[Math.round(Math.random()*fonts.length)]; 
    }, Math.round (Math.random()*1000 +1000));
  });
  
}

setTitleAnimation('Melted  Age', document.querySelector('.title')); 
