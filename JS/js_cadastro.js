//Variáveis
let bot_cadastra = document.getElementById('bot_cadastrar')
bot_cadastra.addEventListener('click', cadastrar)
let dados = new FormData()
let formPHP = "../PHP/cadastro.php"
var msg = document.getElementById('msg')

//Funções 
function cadastrar() {
    var CPF = document.getElementById('CPF').value
    var nome = document.getElementById('nome').value
    var senha = document.getElementById('senha').value
    if(Number(CPF) <= 0 || nome === '' || senha.length !== 6) {
        msg.innerHTML = `DADOS INVÁLIDOS!!!`
        alert(`DADOS INVÁLIDOS!!!`)
    }else if(validarCPF(CPF) == false){
        msg.innerHTML = `CPF INVÁLIDO!!!`
        alert(`CPF INVÁLIDO!!!`)
    }else {
        dados.append('cpf', CPF)
		dados.append('nome', nome)
		dados.append('senha', senha)
		dados.append('email', document.getElementById('email').value)
        dados.append('tipo_conta', document.getElementById('tipo_conta').value)
        enviar()
    }
}

function enviar(){
    //ajax
    $.ajax({
        url: formPHP,
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
        dataType: 'json'
        }).done(function(resposta){
            msg.innerHTML = resposta.msg
            if (resposta.tipo === 'OK') {
                alert(`PARABÉNS!!! VOCÊ AGORA É UM CLIENTE MOBANK\n Sua conta é: ${resposta.conta}\n Sua agência é: ${resposta.agencia}\n Com senha: ${resposta.senha}`)    
            }
        } )
}

//Validação de CPF(Sim validação na controller!)
function validarCPF(CPF) {
    var soma = 0
    var resto = 0
    for (let index = 1; index <= 9; index++) {//multiplica os 9 primeiros digitos por numeros decrescente de 10 a 2 e soma tudo
        soma += parseInt(CPF.substring(index-1, index)) * (11-index)
    }
    //console.log(soma)
    resto = (soma * 10) % 11 //resto da divisão por 11 multiplicado por 10
    //console.log(resto)
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
    //console.log(soma)
    resto = (soma * 10) % 11
    //console.log(resto)
    if(resto == 10 || resto == 11) {
        resto = 0
    }
    if(resto != parseInt(CPF.substring(10, 11))) {//verifica se o segundo dígito verificador é diferente do resto
        return false
    }
    return true
}