
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#meme-btn').addEventListener('click', showMeme);
  document.querySelector('#joke-btn').addEventListener('click', showJoke);
  document.querySelector('#quote-btn').addEventListener('click', showQuote);
  document.querySelector('#riddle-btn').addEventListener('click', showRiddle); 
  
  // Load quote by default
  showQuote();
});


const showQuote = () => {

  document.querySelector('#quotes').style.display = 'block';
  document.querySelector('#memes').style.display = 'none';
  document.querySelector('#jokes').style.display = 'none';
  document.querySelector('#riddles').style.display = 'none';

  document.querySelector('#quote').innerHTML = '';
  document.querySelector('#author').innerHTML = '';

  fetch("https://type.fit/api/quotes")
  .then(response => response.json())
  .then(data => {
    const randomQuote = data[Math.floor(Math.random()*data.length)];
    console.log(randomQuote.text);

    const quote = document.querySelector('#quote');
    const text = document.createTextNode(randomQuote.text);
    quote.replaceChildren(text);
    
    if (randomQuote.author !== null) {
      const author = document.querySelector('#author');
      const authorName = document.createTextNode(randomQuote.author);
      author.replaceChildren(authorName); 
    } else {
      const defaultName = document.createTextNode("Unknown Author");
      author.replaceChildren(defaultName);
    }
  });   
};

const hideBtn = () => {
  document.querySelector('#show-punchline-btn').style.display = 'none';
  console.log('Btn hidden');
}

const showJoke = () => {

  document.querySelector('#quotes').style.display = 'none';
  document.querySelector('#memes').style.display = 'none';
  document.querySelector('#jokes').style.display = 'block';
  document.querySelector('#riddles').style.display = 'none';

  document.querySelector('#setup').innerHTML = '';
  document.querySelector('#punchline').innerHTML = '';

  fetch("https://official-joke-api.appspot.com/random_joke")
  .then(result => result.json())
  .then(data => {
    console.log(data);

    const setupContainer = document.querySelector('#setup');
    const setup = document.createTextNode(data.setup);
    setupContainer.replaceChildren(setup);
    
    document.querySelector('#show-punchline-btn').addEventListener('click', () => {
      const punchlineContainer = document.querySelector('#punchline');
      punchlineContainer.innerHTML = '';
      const punchline = document.createTextNode(data.punchline);
      punchlineContainer.appendChild(punchline);
    });
    console.log(setup); 
  });

  document.querySelector('#show-punchline-btn').style.display = 'block';

}

const showMeme = () => {

  document.querySelector('#meme').replaceChildren = '';
  document.querySelector('#memes').style.display = 'block';
  document.querySelector('#quotes').style.display = 'none';
  document.querySelector('#jokes').style.display = 'none';
  document.querySelector('#riddles').style.display = 'none';

  fetch("https://meme-api.herokuapp.com/gimme")
  .then(result => result.json())
  .then(data => {
    console.log(data.url);

    const image = document.querySelector('#meme');
    image.setAttribute('src', data.url);
  })
}

const showRiddle = () => {
  document.querySelector('#memes').style.display = 'none';
  document.querySelector('#quotes').style.display = 'none';
  document.querySelector('#jokes').style.display = 'none';
  document.querySelector('#riddles').style.display = 'block ';

  document.querySelector('#riddle').innerHTML = '';
  document.querySelector('#answer').innerHTML = '';

  fetch("https://riddles-api.vercel.app/random")
  .then(result => result.json())
  .then(data => {
    console.log(data);

    const riddleContainer = document.querySelector('#riddle');
    const riddle = document.createTextNode(data.riddle);
    riddleContainer.replaceChildren(riddle);
    
    document.querySelector('#show-answer-btn').addEventListener('click', () => {
      const answerContainer = document.querySelector('#answer');
      answerContainer.innerHTML = '';
      const answer = document.createTextNode(data.answer);
      answerContainer.appendChild(answer);
    });
    console.log(setup); 
  });

}