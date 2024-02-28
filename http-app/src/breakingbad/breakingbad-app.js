/**
 * @returns {Object} qoute information
 */
const fetchQuote = async () => {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    const data = await response.json()

    return data[0]
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async (element) => {
    document.querySelector('#app-title').innerHTML = 'Breakingbad App'
    element.innerHTML = 'Loading...'

    const quoteLabel = document.createElement('blockquote')
    const authorLabel = document.createElement('h3')
    const nextQuoteBtn = document.createElement('button')
    nextQuoteBtn.innerText = 'Next Quote'

    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.quote
        authorLabel.innerHTML = data.author
        element.replaceChildren(quoteLabel, authorLabel, nextQuoteBtn)
    }

    nextQuoteBtn.addEventListener('click', async() => {
        element.innerHTML = 'Loading...'

        // Forma 1
        // fetchQuote()
        //     .then(renderQuote)

        // Forma 2
        renderQuote(await fetchQuote())
    })

    fetchQuote()
        // .then(data => renderQuote(data)) Forma 1
        .then(renderQuote) // Forma 2
}