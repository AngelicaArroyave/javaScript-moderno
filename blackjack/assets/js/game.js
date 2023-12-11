const myModule = (() => {
    'use strict'

    let deck = []
    const types = ['C', 'D', 'H', 'S']
    const specialCards = ['A', 'J', 'Q', 'K']

    let pointsPlayers = []

    // Referencias del HTML
    const btnOrder = document.querySelector('#btnOrder')
    const btnStop = document.querySelector('#btnStop')
    // const btnNew = document.querySelector('#btnNew')

    const pointsHTML = document.querySelectorAll('small')
    const divPlayersCards = document.querySelectorAll('.divCards')

    const initializeGame = (numPlayers = 2) => {
        deck = createDeck()
        pointsPlayers = []

        for (let i = 0; i < numPlayers; i++) {
            pointsPlayers.push(0)
        }

        pointsHTML.forEach(element => element.innerText = 0);
        divPlayersCards.forEach(element => element.innerText = '');

        btnOrder.disabled = false
        btnStop.disabled = false
    }

    // Crea un nuevo deck
    const createDeck = () => {
        deck = []

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

        return _.shuffle(deck)
    }

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

    // El shift es de acuerdo al jugador
    const accumulatePoints = (shift, card) => {
        pointsPlayers[shift] += valueCard(card)
        pointsHTML[shift].innerText = pointsPlayers[shift]
        
        return pointsPlayers[shift]
    }

    const createCard = (card, shift) => {
        const imgCard = document.createElement('img')
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('cards')

        divPlayersCards[shift].append(imgCard)
    }

    const determineWinner = () => {
        const [miniumPoints, computerPoints] = pointsPlayers

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

    // Turno de la computafora
    const computerShift = (miniumPoints) => {
        let computerPoints = 0

        do {
            const card = orderCard()
            computerPoints = accumulatePoints(pointsPlayers.length - 1, card)
            createCard(card, pointsPlayers.length - 1)
        } while (computerPoints < miniumPoints && miniumPoints <= 21);

        determineWinner()
    }

    // Evento, pedir carta
    btnOrder.addEventListener('click', () => {
        const card = orderCard()
        const playerPoints = accumulatePoints(0, card)
        createCard(card, 0)

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

        computerShift(pointsPlayers[0])
    })

    // Evento, nuevo juego
    // btnNew.addEventListener('click', () => {
    //     initializeGame()
    // })

    return { newGame: initializeGame }
})()