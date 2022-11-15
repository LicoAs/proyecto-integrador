import { products } from "../products"

const cardsContainer = document.querySelector('#card-container')

const Card = () => {
    const newCard = cardsContainer.createElement('div')
    newCard.classList.add('card')
    newCard.innerHTML = `
                    <div class="card__container">
                        <div class="card__container-top"><img src="img/cards/card-${products[e].id++}.png" alt="${products[e].name}" class="card__container-top"></div>
                        <div class="card__container-bottom">
                            <div class="card__container-bottom-left">
                                <div class="card__container-bottom-left-details">
                                    <h1 class="">${products[e].name}</h1>
                                    <h2>$ ${products[e].price}</h2>
                                </div>
                                <div class="card__container-bottom-left-buy"><i class="material-icons">
                                    <img src="img/green-shopping-cart-10909.svg" alt="carrito" class="icon__cart"></i>
                                </div>
                            </div>
                            <div class="card__container-bottom-right">
                                <div class="card__container-bottom-right-done"><i class="material-icons"><img src="img/green-checkmark-line-icon.svg" alt="Agregado" class="icon__check"></i></div>
                                <div class="card__container-bottom-right-details">
                                    <h1>${products[e].name}</h1>
                                    <p>Se añadio al carrito</p>
                                </div>
                                <div class="card__container-bottom-right-remove"><i class="material-icons"><img src="img/red-x-icon.svg" alt="Cancelar" class="icon__remove"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="card__inside">
                        <div class="card__inside-icon"><i class="material-icons">+Info</i></div>
                        <div class="card__inside-contents">
                            <div class="card__inside-contents-grid-container">
                                <div class="card__inside-contents-grid-item-container1">
                                    <h3 class="card__inside-contents-grid-item-title">Marca</h3>
                                    <p class="card__inside-contents-grid-item-description">${products[e].brand}</p>
                                </div>
                                <div class="card__inside-contents-grid__item-container2">
                                    <h3 class="card__inside-contents-grid-item-title">Modelo</h3>
                                    <p class="card__inside-contents-grid-item-description-long">
                                    ${products[e].name}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container3">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Descripcion
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${products[e].description}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container4">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Categoria
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${products[e].category}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container5">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Edad
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${products[e].age}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container7">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Origen
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${products[e].origin}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
    `
}

export {Card} 