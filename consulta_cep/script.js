const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault()
    var cep = form.querySelector("input").value;

    //deixa apenas digitos
    var cep = cep.replace(/\D/g, '');
    //Expressão regular pra testar CEP
    const validacep = /^[0-9]{8}$/;

    const URL_VIA_CEP = `https://viacep.com.br/ws/${cep}/json/`;

    if (validacep.test(cep)) {

        fetch(URL_VIA_CEP).then(function (response) {

            response.json().then(function (data) {

                if (!data.erro) {
                    console.log("erro jr")
                    if (data.bairro) {
                        document.querySelector(".bairro").innerHTML = data.bairro;
                    } else {
                        document.querySelector(".bairro").innerHTML = "-";
                    }

                    document.querySelector(".cidade").innerHTML = data.localidade;
                    document.querySelector(".cep").innerHTML = data.cep;
                    //Usando condição terária
                    (data.logradouro ? document.querySelector(".endereco").innerHTML = data.logradouro :
                        document.querySelector(".endereco").innerHTML = "-")
                        ;
                    document.querySelector(".uf").innerHTML = data.uf;
                }


            });
            document.querySelector("input").value = "";
            document.querySelector(".error").innerHTML = ""
            document.querySelector("input").classList.remove("errorinput");
        }).catch(function (err) {
            document.querySelector(".error").innerHTML = "Informação não encontrada."
            console.error("Informação não encontada");
        });
    } else {
        document.querySelector("input").classList.add("errorinput");
    }
});