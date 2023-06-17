function buildAPIURL ()
{
    const tags = "life|generosity|imagination|perseverance|philosophy|mathematics|education|faith|truth|science|tolerance|creativity|pain|failure|literature|sports|sadness|time|wisdom|love|knowledge|gratitude|technology";

    const authors = "abraham-lincoln|a-p-j-abdul-kalam|agatha-christie|albert-camus|albert-einstein|alexander-the-great|arthur-schopenhauer|benjamin-franklin|bertrand-russell|blaise-pascal|carl-sagan|chanakya|charles-darwin|charles-dickens|confucius|edgar-allen-poe|epictetus|franz-kafka|friedrich-nietzsche|galileo-galilei|helen-keller|hugh-jackman|immanuel-kant|indira-gandhi|jean-jacques-rousseau|john-keats|joseph-campbell|kahlil-gibran|laozi|leo-tolstoy|leonardo-da-vinci|mahatma-gandhi|marcus-aurelius|margaret-cousins|marie-curie|mark-twain|martin-luther-king-jr|maya-angelou|michael-jordan|michael-phelps|mother-teresa|napoleon|nelson-mandela|niels-bohr|nikola-tesla|oprah-winfrey|oscar-wilde|plato|rabindranath-tagore|rene-descartes|robert-frost|rumi|seneca-the-younger|socrates|stephen-hawking|sun-tzu|swami-vivekananda|the-buddha|thomas-edison|voltaire|william-shakespeare";

    function getURL ()
    {
        const baseURL = "https://api.quotable.io/quotes/random";

        return `${ baseURL }?tags=${ tags }&author=${ authors }`;
    }

    return getURL( tags, authors );
}

const apiURL = buildAPIURL();


function invokeFetchData ()
{
    async function fetchData ( url, maxRetries = 3 )
    {
        let retryCtr = 0;

        while ( retryCtr < maxRetries )
        {
            try
            {
                const response = await fetch( url );
                const jsonData = await response.json();
                displayQuote( jsonData );
                break;
            } catch ( error )
            {
                console.log( error );
                retryCtr++;
            }
        }

        if ( retryCtr === maxRetries )
            displayError();
    }


    fetchData( apiURL );
}

const quote = document.querySelector( ".quote-text" );
const author = document.querySelector( ".author" );

function displayQuote ( jsonData )
{
    const { content, author: speaker } = jsonData[ 0 ];
    quote.textContent = content;
    author.textContent = `— ✍️ ${ speaker }`;
}

const main = document.querySelector( "main" );

function displayError ()
{
    removeElements();
    const warningPara = createWarningPara();

    main.appendChild( warningPara );
}

function createWarningPara ()
{
    const warningPara = document.createElement( "p" );
    warningPara.innerHTML = `Oops!! Something went wrong ☹️☹️🥲.
    <br>
    Please try to refresh the page.`;
    warningPara.classList.add( "leading-one-and-half", "font-bold", "text-crimson", "text-2xl" );

    return warningPara;
}

function removeElements ()
{
    Array.from( main.children ).forEach(
        child => child.remove()
    );
}

const nextQuoteButton = document.querySelector( ".next-quote-btn" );
nextQuoteButton.addEventListener( "click", invokeFetchData );


document.addEventListener( "DOMContentLoaded", invokeFetchData );