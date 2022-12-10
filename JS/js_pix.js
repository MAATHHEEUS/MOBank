//Variáveis
let bot_transferir = document.getElementById('bot_transferir')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/pix.php"
var msg = document.getElementById('msg')

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

var id_conta = Number(obj.id)
var saldo = Number(obj.saldo)

//Funções 
function transferir() {
    // Campos Obrigatórios
    var tipoChave = document.getElementById('tipoChave').value
    var chave = document.getElementById('chave').value
    var valor = document.getElementById('valor').value
    var senha = document.getElementById('senha').value

    if(tipoChave === '' || chave === '' || Number(valor) <= 0 || Number(senha) <= 0) {
        alert('Dados digitados Inválidos!')
        return
    }

    if(valor > saldo) {
        alert('Saldo insuficiente!')
        return
    }

    switch (tipoChave) {
        case 'doc':
            if(!validarCPF(chave)){
                alert("Chave digitada está incorreta, digite um CPF válido!")
                return
            }
            break;

        case 'cel':
            if(chave.length < 11){
                alert("Chave digitada está incorreta, deve haver 11 dígitos!\nDigite o número com DDD")
                return
            }
            break;
    
        case 'email':
            if (String(chave).includes('@')) {
                break;
            }
            else{
                alert('Chave digitada está incorreta, digite um email válido!');
                return
            }
        
        default:
            break;
    }

    validaSenha()
}

function validaSenha() {
    var senha = document.getElementById('senha').value
    var dados = new FormData() 
    dados.append('acao', 'validarSenha')
    dados.append('senha', senha)
    dados.append('id_conta', id_conta)
    enviar(dados)
}

function cad_transferir() {
    var tipoChave = document.getElementById('tipoChave').value
    // var contato = document.getElementById('contato').value
    var desc = document.getElementById('desc').value
    var adicionaContato = document.getElementById('adicionaContato').value
    var valor = document.getElementById('valor').value
    var senha = document.getElementById('senha').value
    var chave = document.getElementById('chave').value
    var dados = new FormData() 
    dados.append('acao', 'cad_transferir')
    dados.append('tipoChave', tipoChave)
    // dados.append('contato', contato)
    dados.append('desc', desc)
    dados.append('adicionaContato', adicionaContato)
    dados.append('valor', valor)
    dados.append('senha', senha)
    dados.append('chave', chave)
    dados.append('id_conta', id_conta)
    dados.append('saldo_atual', saldo)
    enviar(dados)
}

function enviar(dados){
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
            if (resposta.tipo === 'E') {
                alert(resposta.msg)
                return
            }
            else{
                switch (dados.get('acao')) {
                    case 'validarSenha':
                        cad_transferir()
                        break;
                
                    case 'cad_transferir':
                        alert('Pix efetuado, Nº: ' + resposta.id_pix)
                        //ir para pag iframe
                        open("../HTML/principal.html","corpo")
                        // salva os dados no dadosLocais (LocalStorage)
                        var dadosLocais = JSON.stringify({
                            saldo : resposta.novo_saldo,
                            id : id_conta
                        });
                        localStorage.setItem("storage", JSON.stringify(dadosLocais));
                        break;
                }
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