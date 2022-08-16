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

const createCart = () => {
    const itemList = []

    const addItem = (item) => {
        itemList.push(item)
    }

    const calSum = () => {
        return itemList.reduce((sum, item) => sum + item.price, 0)
    }

    const renderPurchase = () => {
        return `Olá, gostaria de fazer o pedido: \
        \n - Prato: ${itemList[0].title} \
        \n - Bebida: ${itemList[1].title} \
        \n - Sobremesa: ${itemList[2].title} \
        \n Total: R$ ${calSum().toFixed('2')}`
    }

    return Object.freeze({ addItem, renderPurchase })
}

const getProductDataFromDOM = (activeCard) => {
    const cardContent = activeCard.childNodes[3]
    const titleElement = cardContent.childNodes[1]
    const priceElement = cardContent.querySelector('.footer span')

    const title = titleElement.textContent
    const price = priceElement.textContent.replace('R$ ', '').replace(',', '.')
    return { title, price: parseFloat(price) }
}

const makePurchaseButton = () => {

    const active = () => {
        const activeCards = document.querySelectorAll('.cardChecked')

        if (activeCards.length === 3) {
            const cart = createCart()

            for (let i = 0; i < activeCards.length; i++) {
                const product = getProductDataFromDOM(activeCards[i])
                cart.addItem(product)
            }

            render(cart)
        }

    }

    const render = (cart) => {
        const button = document.querySelector('.button')
        button.textContent = 'Fazer pedido'
        button.classList.add('activeButton')
        const text = encodeURIComponent(cart.renderPurchase())
        button.setAttribute('href', `https://wa.me/5522997399034?text=${text}`)
    }

    return { active }
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
            makePurchaseButton().active()
        })
    }
}

(() => {
    const dishList = document.querySelector('.dish .products').children
    const beverageList = document.querySelector('.beverage .products').children
    const dessertList = document.querySelector('.dessert .products').children

    activeCheckedCard(dishList)
    activeCheckedCard(beverageList)
    activeCheckedCard(dessertList)

})()





