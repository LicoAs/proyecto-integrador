class PageAlta {
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

        inputsAbc.forEach((inputs) => {
            for (let i = 0; i < inputsAbc.length; i++) {
                validate(inputsAbc[i], regexGenerica);
            }
        });
    }
}

export default PageAlta;


//inputs.forEach(input => {
//    validate(input, regexGenerica);
//});