import productController from "../controllers/product.js";

class PageAlta {
    static productsTableContainer;
    static productForm;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;

    static async init() {
        const inputs = document.querySelectorAll("input");
        const longDesc = document.querySelector("textarea");
        const regexMarca = new RegExp(/^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,40}$/);
        const regexNombre = new RegExp(/^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/);
        const regexPrecio = new RegExp(/^\d+$/);
        const regexStock = new RegExp(/^\d+$/);
        const regexDescripcionShort = new RegExp(
            /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,80}$/
        );
        const regexDescripcionLong = new RegExp(
            /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,2000}$/
        );
        const regexEdadHasta = new RegExp(/^\d+$/);
        const regexEdadDesde = new RegExp(/^\d+$/);
        const submitButton = document.getElementById("submitButton");

        const inputList = [
            { input: inputs[3], regex: regexMarca, span: ".spanMarca", error: "El campo marca solo puede contener letras, números y los siguientes caracteres: .,-" },
            { input: inputs[4], regex: regexNombre, span: ".spanNombre", error: "El campo nombre solo puede contener letras, números y los siguientes caracteres: .,-" },
            { input: inputs[5], regex: regexPrecio, span: ".spanPrecio", error: "El campo precio solo puede contener números" },
            { input: inputs[6], regex: regexStock , span: ".spanStock", error: "El campo stock solo puede contener números" },
            { input: inputs[7], regex: regexDescripcionShort, span: ".spanDescripcionShort", error: "El campo descripción corta solo puede contener letras, números y los siguientes caracteres: .,-" },
            { input: inputs[8], regex: regexEdadDesde, span: ".spanEdadDesde", error: "El campo edad desde solo puede contener números" },
            { input: inputs[9], regex: regexEdadHasta, span: ".spanEdadHasta", error: "El campo edad hasta solo puede contener números" },
            { input: longDesc, regex: regexDescripcionLong, span: ".spanDescripcionLong", error: "El campo descripción larga solo puede contener letras, números y los siguientes caracteres: .,-" },
        ];

        const validate = (input, regexp, span, error) => {
            input.addEventListener("keydown", () => {
                if (regexp.test(input.value)) {
                    document.querySelector(span).innerHTML = "Parece válido ✔";
                    document.querySelector(span).style.color = "greenyellow";
                    document.querySelector(span).style.border = "greenyellow 1px solid";
                    document.querySelector(span).style.margin = "10px 0px 0px 0px";
                    document.querySelector(span).style.padding = "5px";
                    document.querySelector(span).style.borderRadius = "3px";
                    document.querySelector(span).style.fontSize = "20px";
                    submitButton.removeAttribute("disabled");
                } else {
                    document.querySelector(span).innerHTML = error;
                    document.querySelector(span).style.color = "red";
                    document.querySelector(span).style.border = "red 1px solid";
                    document.querySelector(span).style.margin = "10px 0px 0px 0px";
                    document.querySelector(span).style.padding = "5px";
                    document.querySelector(span).style.borderRadius = "3px";
                    document.querySelector(span).style.fontSize = "20px";
                    submitButton.setAttribute("disabled", "true");
                }
            });
        };

        
            inputList.forEach((input) => {
                validate(input.input, input.regex, input.span, input.error);
            });
        

        //inputList.forEach((field) => {
        //    validate(field.input, field.regex);
        //});

        PageAlta.productsTableContainer = document.querySelector(
            ".products-table-container"
        );

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
