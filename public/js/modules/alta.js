import productController from "../controllers/product.js";

class PageAlta {
    
    static productsTableContainer;
    static productForm;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;

    static validators = {
        'id': /^[\da-f]{24}$/,
        'name': /^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/,
        'price': /^\d+$/,
        'description': /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,200}$/,
    };

    static async init() {
        const inputs = document.querySelectorAll("input");
        const regexGenerica = new RegExp(
            /^[a-zA-ZÀ-ÿ0-9\s,\-\.\'\?\#\°\/]{1,20}$/
        );
        const submitButton = document.getElementById("submitButton");
        const inputsAbc = [
            inputs[1],
            inputs[2],
            inputs[3],
            inputs[4],
            inputs[5],
            inputs[6],
            inputs[7],
            inputs[8],
        ];

        const validate = (input, regexp) => {
            input.addEventListener("keydown", () => {
                if (regexp.test(input.value)) {
                    submitButton.removeAttribute("disabled");
                } else {
                    submitButton.setAttribute("disabled", "true");
                }
            });
        };
        PageAlta.productsTableContainer = document.querySelector(
            ".products-table-container"
        );
        inputsAbc.forEach((inputs) => {
            for (let i = 0; i < inputsAbc.length; i++) {
                validate(inputsAbc[i], regexGenerica);
            }
        });
        PageAlta.loadTable();
        PageAlta.addTableEvents();
    }
    static async deleteProduct(e) {
        if (!confirm("¿Estás seguro de querer eliminar el producto?")) {
            return false;
        }
        const row = e.target.closest("tr");
        const id = row.querySelector(
            'td[data-product-property="id"]'
        ).innerHTML;
        const deletedProduct = await productController.deleteProduct(id);
        PageAlta.loadTable();
        return deletedProduct;
    }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btn-delete")) {
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log("deletedProduct:", deletedProduct);
                if (PageAlta.objectIsEmpty(deletedProduct)) {
                    console.error("No se pudo eliminar el producto");
                }

                return;
            }
            if (e.target.classList.contains("btn-edit")) {
                PageAlta.prepareFormForEditing();
                PageAlta.completeForm(e);
                return;
            }
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch("templates/products-table.hbs").then((r) =>
            r.text()
        );
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static prepareForm() {
        PageAlta.productForm = document.querySelector(".form-product");
        PageAlta.fields = PageAlta.productForm.querySelectorAll("[name]");
        PageAlta.btnCreate = PageAlta.productForm.querySelector(
            ".form-product__btn-create"
        );
        PageAlta.btnUpdate = PageAlta.productForm.querySelector(
            ".form-product__btn-update"
        );
        PageAlta.btnCancel = PageAlta.productForm.querySelector(
            ".form-product__btn-cancel"
        );
        PageAlta.addFormEvents();
    }

    static prepareFormForEditing() {
        PageAlta.productForm.querySelector('[name]:not([name="id"])').focus();
        PageAlta.btnCreate.disabled = true;
        PageAlta.btnUpdate.disabled = false;
        PageAlta.btnCancel.disabled = false;
    }

    static async loadTable() {
        const products = await fetch("/api/products/").then((res) =>
            res.json()
        );
        const tablebody = document.querySelector("tbody");
        tablebody.innerHTML = "";
        products.forEach((product) => {
            const newtr = document.createElement("tr");
            //newCard.classList.add("card");
            newtr.innerHTML = `
<td data-product-property="id">${product.id}</td>
<td data-product-property="name">${product.name}</td>
<td data-product-property="price">$${product.price}</td>
<td data-product-property="description">${product.description}</td>
<td>
<button title="Editar producto" class="btn-edit fa-solid fa-pen"></button>
<button title="Eliminar producto" class="btn-delete fa-solid fa-trash"></button>
</td>
`;
            tablebody.appendChild(newtr);
        });
    }
    static objectIsEmpty(object) {
        return Object.entries(object).length === 0;
    }

}

export default PageAlta;
