const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteInput = document.getElementById('textInput');
const quoteDisplay = document.getElementById('codeDisplay');
const Timer = document.getElementById('timer');

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span')
    const arrayValue = quoteInput.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if ( character == null ){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('add')
        }
        else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
        }
    })

})


function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function get_Next_Quote(){
    const quote = await getRandomQuote()
    // document.getElementById('codeDisplay').innerHTML = quote;
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)
    });
    quoteInput.value = null 
    startTimer()

    var startTime = Date.now()

    function startTimer() {
        Timer.innerText = 0
        startTime = new Date()
        setInterval(() => {
            Timer.innerText = getTimerTime()
        }, 1000);
    }
    
    function getTimerTime(){
        return Math.floor((new Date() - startTime) / 1000)
    }
}



get_Next_Quote();