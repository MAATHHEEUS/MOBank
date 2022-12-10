//Variáveis
bot_acessar = document.getElementById('bot_acessar')
bot_acessar.addEventListener('click', validar)
let agencia = 0
let conta = 0
let senha = 0
let formPHP = "../PHP/index.php"

//funções
function validar() {// validar se o cliente digitou corretamente e se o mesmo existe
    agencia = document.getElementById('agencia').value
    conta = document.getElementById('conta').value
    senha = document.getElementById('senha').value
    if(Number(agencia) <= 0 || Number(conta) <= 0) {
        alert('Agência ou Conta Inválidos!')
    }else{
        //VALIDAR SE CLIENTE EXISTE NO BANCO DE DADOS E SENHA CORRETA
        buscaCliente(agencia, conta, senha)    
    }
}

function buscaCliente(agencia, conta, senha){
    var dados = new FormData()
    dados.append('agencia', agencia)
    dados.append('conta', conta)
    dados.append('senha', senha)
    dados.append('acao', 'buscaCliente')
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
            //ir para pag iframe
            open("../HTML/frame.html","_self")
            // salva os dados no dadosLocais (LocalStorage)
            var dadosLocais = JSON.stringify({
                nome : resposta.nome,
                saldo : resposta.saldo,
                id : resposta.id_conta
            });
            localStorage.setItem("storage", JSON.stringify(dadosLocais));
        }
    } )
}