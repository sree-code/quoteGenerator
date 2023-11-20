//getting API data using fetch() method in JS

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const nxtQuoteBtn = document.getElementById('next-quote');
const loader = document.getElementById('loader');

var apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    //pick a random quote from APi
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if(!quote.author){
        authorText.textContent = 'GORASR6'
    }else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    console.log(quote);
}

 function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
try{
    fetch(apiUrl)
    .then(function(response){
        return response.json(); //json  is in-built function to convert the data into json format
    })
    .then(function(data){
        apiQuotes = data;
        newQuote();
        console.log(data);
       })
        .catch(function(error){
        console.log('Fetch Error:',error);
        });
} catch(err){

}
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listerners
nxtQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//onLoad
getQuotes();