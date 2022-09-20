const buy = document.getElementsByClassName('card__container-bottom-left-buy')
const cardBottom = document.getElementsByClassName('card__container-bottom')
const remov = document.getElementsByClassName('card__container-bottom-right-remove')
const cards = document.getElementsByClassName('card')

for (let i = 0; i < cards.length; i++) {
    buy[i].addEventListener('click', () => cardBottom[i].classList.toggle('clicked'));
    remov[i].addEventListener('click', () => cardBottom[i].classList.toggle('clicked'));
}


