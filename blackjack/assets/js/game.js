/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = []
const types = ['C', 'D', 'H', 'S']
const specialCards = ['A', 'J', 'Q', 'K']

let playerPoints = 0
let computerPoints = 0

// Referencias del HTML
const btnOrder = document.querySelector('#btnOrder')
const pointsHTML = document.querySelectorAll('small')
const divPlayerCards = document.querySelector('#player-cards')

// Crea un nuevo deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(i + type)
        }
    }

    for (const special of specialCards) {
        for (const type of types) {
            deck.push(special + type)
        }
    }

    deck = _.shuffle(deck)

    return deck
}

createDeck()

// Función que permite tomar una carta
const orderCard = () => {
    if(deck.length === 0) throw 'No hay cartas en el deck'

    return deck.pop()
}

// Función que permite pedir una carta
const valueCard = (card) => {
    const value = card.substring(0, card.length - 1)

    // El if me valida si el valor es o no un número
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10 
            : Number(value)
}

// Eventos
btnOrder.addEventListener('click', () => {
    const card = orderCard()
    playerPoints += valueCard(card)
    pointsHTML[0].innerText = playerPoints
})