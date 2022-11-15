import { cartItem } from "./cart.js";

class PageInicio {
    static async init() {
        const buy = document.getElementsByClassName("card__container-bottom-left-buy");
        const cardBottom = document.getElementsByClassName("card__container-bottom");
        const remov = document.getElementsByClassName("card__container-bottom-right-remove");
        const cards = document.getElementsByClassName("card");
        const cardsContainer = document.querySelector(".cards-container");
        const products = await fetch("/api/products/").then((res) => res.json());
        console.log(products);
        products.forEach((producto) => {
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.innerHTML = `
                    <div class="card__container">
                        <div class="card__container-top"><img src="${producto.imgSrc}" alt="${
                producto.name
            }" class="card__container-top"></div>
                        <div class="card__container-bottom">
                            <div class="card__container-bottom-left">
                                <div class="card__container-bottom-left-details">
                                    <h1 class="">${producto.name}</h1>
                                    <h2>$ ${producto.price}</h2>
                                </div>
                                <div class="card__container-bottom-left-buy"><i class="material-icons">
                                    <img src="img/green-shopping-cart-10909.svg" alt="carrito" class="icon__cart"></i>
                                </div>
                            </div>
                            <div class="card__container-bottom-right">
                                <div class="card__container-bottom-right-done"><i class="material-icons"><img src="img/green-checkmark-line-icon.svg" alt="Agregado" class="icon__check"></i></div>
                                <div class="card__container-bottom-right-details">
                                    <h1>${producto.name}</h1>
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
                                    <p class="card__inside-contents-grid-item-description">${
                                        producto.brand
                                    }</p>
                                </div>
                                <div class="card__inside-contents-grid__item-container2">
                                    <h3 class="card__inside-contents-grid-item-title">Modelo</h3>
                                    <p class="card__inside-contents-grid-item-description-long">
                                    ${producto.name}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container3">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Descripcion
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${producto.description}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container4">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Categoria
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${producto.category}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container5">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Edad
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${producto.age}
                                    </p>
                                </div>
                                <div class="card__inside-contents-grid__item-container7">
                                    <h3 class="card__inside-contents-grid-item-title">
                                        Origen
                                    </h3>
                                    <p class="card__inside-contents-grid-item-description">
                                    ${producto.origin}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
            cardsContainer.appendChild(newCard);
        });
        for (let i = 0; i < cards.length; i++) {
            buy[i].addEventListener("click", () => {
                cardBottom[i].classList.toggle("clicked"),
                cartItem(i);
            });
            remov[i].addEventListener("click", () =>
                cardBottom[i].classList.toggle("clicked")
            );
        }
    }
}

export default PageInicio;

