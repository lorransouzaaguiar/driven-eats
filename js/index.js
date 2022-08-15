const createCheckedIcon = () => {
    const checkedIcon = document.createElement('img')
    checkedIcon.setAttribute('src', './assets/checkmark-circle 1.svg')
    checkedIcon.setAttribute('alt', 'icon')
    return checkedIcon
}

const disableOtherCards = (currentCardIndex, list) => {
    for (let index = 0; index < list.length; index++) {

        if (index !== currentCardIndex) {
            const card = list[index]
            card.classList.remove('cardChecked')
            const footer = card.querySelector('.footer')
            const checkedIcon = footer.childNodes[3]

            if (checkedIcon) {
                footer.removeChild(checkedIcon)
            }
        }
    }
}

const activeCheckedCard = (cardList) => {
    for (let index = 0; index < cardList.length; index++) {
        const currentCard = cardList[index]
        const footer = currentCard.querySelector('.product .footer')
        const checkedIcon = createCheckedIcon()
        const hasCheckedIcon = footer.childNodes.length === 2 ? true : false

        currentCard.addEventListener('click', (e) => {
            currentCard.classList.add('cardChecked')

            if (!hasCheckedIcon) {
                footer.appendChild(checkedIcon)
            }

            disableOtherCards(index, cardList)
            activePurchaseButton()
        })
    }
}

const activePurchaseButton = () => {
    const activeCards = document.querySelectorAll('.cardChecked')

    if (activeCards.length === 3) {
        const button = document.querySelector('.button')
        button.textContent = 'Fazer pedido'
        button.classList.add('activeButton')
        const text = message()
        button.setAttribute('href', `https://wa.me/5522997399034?text=${text}`)
    }

}

const message = () => {
    return encodeURIComponent('Olá, gostaria de fazer o pedido: \
        \n - Prato: Frango Yin Yang \
        \n - Bebida: Coquinha Gelada \
        \n - Sobremesa: Pudim \
        \n Total: R$ 27.70')
}

(() => {
    const dishList = document.querySelector('.dish .products').children
    const beverageList = document.querySelector('.beverage .products').children
    const dessertList = document.querySelector('.dessert .products').children

    activeCheckedCard(dishList)
    activeCheckedCard(beverageList)
    activeCheckedCard(dessertList)

    activePurchaseButton()

})()





