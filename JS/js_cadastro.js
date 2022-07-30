let bot_cadastra = document.getElementById('bot_cadastrar')
bot_cadastra.addEventListener('click', validar)
let CPF = 0

function validar() {
    CPF = document.getElementById('CPF').value
    if(Number(CPF) <= 0 ) {
        alert(`CPF INVÁLIDO!!!`)
    }else {
        //if(VALIDAR CPF) {}
        alert("Tudo ok!")
    }

}