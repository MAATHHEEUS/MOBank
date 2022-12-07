//Variáveis
let bot_transferir = document.getElementById('bot_transferir')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/pix.php"
var msg = document.getElementById('msg')

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

var id_conta = obj.id
var saldo = obj.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})

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
    var adicionaContato = document.querySelector('input[name="adicionaContato"]:checked').value
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
                        open("../HTML/frame.html","_self")
                        // salva os dados no dadosLocais (LocalStorage)
                        var dadosLocais = JSON.stringify({
                            saldo : resposta.saldo,
                            id : id_conta
                        });
                        localStorage.setItem("storage", JSON.stringify(dadosLocais));
                        break;
                }
            }
        } )
}