let bot_cadastra = document.getElementById('bot_cadastrar')
bot_cadastra.addEventListener('click', validar)
let CPF = 0

function validar() {
    CPF = document.getElementById('CPF').value
    if(Number(CPF) <= 0 ) {
        alert(`CPF INVÁLIDO!!!`)
    }else if(TestaCPF(CPF) == false){
        alert(`CPF INVÁLIDO!!!`)
    }else {
        alert("Tudo ok!")
    }

}

function TestaCPF(CPF) {
    var soma = 0
    var resto = 0
    for (let index = 1; index <= 9; index++) {//multiplica os 9 primeiros digitos por numeros decrescente de 10 a 2 e soma tudo
        soma += parseInt(CPF.substring(index-1, index)) * (11-index)
    }
    console.log(soma)
    resto = (soma * 10) % 11 //resto da divisão por 11 multiplicado por 10
    console.log(resto)
    if(resto == 10 || resto == 11) {//se resto for 10 ou 11 será considerado 0. Senão fica com resto da divisão mesmo
        resto = 0
    }
    if(resto != parseInt(CPF.substring(9, 10))) {//verifica se o primeiro dígito verificador é diferente do resto
        return false
    }
    soma = 0
    for (let index = 1; index <= 10; index++){
        soma += parseInt(CPF.substring(index-1, index)) * (12-index)
    }
    console.log(soma)
    resto = (soma * 10) % 11
    console.log(resto)
    if(resto == 10 || resto == 11) {
        resto = 0
    }
    if(resto != parseInt(CPF.substring(10, 11))) {//verifica se o segundo dígito verificador é diferente do resto
        return false
    }
    return true
}