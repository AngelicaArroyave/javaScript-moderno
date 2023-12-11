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
const btnStop = document.querySelector('#btnStop')
const btnNew = document.querySelector('#btnNew')
const pointsHTML = document.querySelectorAll('small')
const divPlayerCards = document.querySelector('#player-cards')
const divComputerCards = document.querySelector('#computer-cards')

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

// Turno de la computafora
const computerShift = (miniumPoints) => {
    do {
        const card = orderCard()
        computerPoints += valueCard(card)
        pointsHTML[1].innerText = computerPoints

        const imgCard = document.createElement('img')
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('cards')

        divComputerCards.append(imgCard)

        if(miniumPoints > 21) break
    } while (computerPoints < miniumPoints && miniumPoints <= 21);

    setTimeout(() => {
        if(computerPoints === miniumPoints) {
            alert('Nadie gana')
        } else if(miniumPoints > 21) {
            alert('Gana computadora')
        } else if(computerPoints > 21) {
            alert('Gana jugador')
        } else alert('Gana computadora')
    }, 100);
}

// Evento, pedir carta
btnOrder.addEventListener('click', () => {
    const card = orderCard()
    playerPoints += valueCard(card)
    pointsHTML[0].innerText = playerPoints

    const imgCard = document.createElement('img')
    imgCard.src = `assets/cartas/${card}.png`
    imgCard.classList.add('cards')

    divPlayerCards.append(imgCard)

    if(playerPoints > 21) {
        btnOrder.disabled = true
        btnStop.disabled = true
        computerShift(playerPoints)
    }
    if(playerPoints === 21) {
        btnOrder.disabled = true
        btnStop.disabled = true
        computerShift(playerPoints)
    }
})

// Evento, detener juego
btnStop.addEventListener('click', () => {
    btnOrder.disabled = true
    btnStop.disabled = true

    computerShift(playerPoints)
})

// Evento, nuevo juego
btnNew.addEventListener('click', () => {
    deck = []
    deck = createDeck()

    btnOrder.disabled = false
    btnStop.disabled = false

    playerPoints = 0
    computerPoints = 0

    pointsHTML[0].innerText = playerPoints
    pointsHTML[1].innerText = computerPoints

    divPlayerCards.innerHTML = ''
    divComputerCards.innerHTML = ''
})