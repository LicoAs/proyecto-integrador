import productController from "../controllers/product.js";

class PageAlta {
    static productsTableContainer;
    static productForm;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;

    //static validators = {
    //    id: /^[\da-f]{24}$/,
    //    name: /^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/,
    //    price: /^\d+$/,
    //    description: /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,200}$/,
    //};

    static async init() {
        const inputs = document.querySelectorAll("input");
        const regexNombre = new RegExp(/^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/);
        const regexPrecio = new RegExp(/^\d+$/);
        const regexDescripcionLong = new RegExp(
            /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,2000}$/
        );
        const regexDescripcionShort = new RegExp(
            /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,80}$/
        );
        const regexMarca = new RegExp(/^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,40}$/);
        const submitButton = document.getElementById("submitButton");

        const inputList = [
            { input: inputs[1], regex: regexMarca },
            { input: inputs[2], regex: regexNombre },
            { input: inputs[3], regex: regexPrecio },
            { input: inputs[4], regex: regexPrecio },
            { input: inputs[5], regex: regexDescripcionShort },
            { input: inputs[6], regex: regexDescripcionLong },
            { input: inputs[7], regex: regexPrecio },
            { input: inputs[8], regex: regexPrecio },
        ];

        const validate = (input, regexp) => {
            input.addEventListener("keydown", () => {
                if (!regexp.test(input.value)) {
                    submitButton.setAttribute("disabled", "true");
                } 
            });
        };
        PageAlta.productsTableContainer = document.querySelector(
            ".products-table-container"
        );

        inputList.forEach((field) => {
            validate(field.input, field.regex);
        });
        //document.addEventListener("keydown", () => {
        //    validate(inputsAbc[1], regexMarca);
        //    validate(inputsAbc[2], regexNombre);
        //    validate(inputsAbc[3], regexPrecio);
        //    validate(inputsAbc[4], regexPrecio);
        //    validate(inputsAbc[5], regexDescripcionshort);
        //    validate(inputsAbc[6], regexDescripcionLong);
        //    validate(inputsAbc[7], regexPrecio);
        //    validate(inputsAbc[8], regexPrecio);
        //});
        PageAlta.loadTable();
        PageAlta.addTableEvents();
    }
    //static validate(value, validator) {
    //    return validator.test(value);
    //}

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

    //static async renderTemplateTable(products) {
    //    const hbsFile = await fetch("templates/products-table.hbs").then((r) =>
    //        r.text()
    //    );
    //    const template = Handlebars.compile(hbsFile);
    //    const html = template({ products });
    //    PageAlta.productsTableContainer.innerHTML = html;
    //}

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
            newtr.innerHTML = `
<td data-product-property="id">${product.id}</td>
<td data-product-property="name">${product.name}</td>
<td data-product-property="price">$${product.price}</td>
<td data-product-property="description">${product.description}</td>
<td>
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
