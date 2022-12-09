//Variáveis
let bot_transferir = document.getElementById('bot_transferir')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/transferencia.php"
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
    var agencia = document.getElementById('agencia').value
    var conta = document.getElementById('conta').value
    var valor = document.getElementById('valor').value
    var senha = document.getElementById('senha').value

    if(Number(agencia) <= 0 || Number(conta) <= 0 || Number(valor) <= 0 || Number(senha) <= 0) {
        alert('Dados digitados Inválidos!')
        return
    }

    if(valor > saldo) {
        alert('Saldo insuficiente!')
        return
    }

    validaSenha()
    return
}

function validaSenha() {
    var senha = document.getElementById('senha').value
    var dados = new FormData() 
    dados.append('acao', 'validarSenha')
    dados.append('senha', senha)
    dados.append('id_conta', id_conta)
    enviar(dados)
    return
}

function cad_transferir() {
    var banco = document.getElementById('banco').value
    var agencia = document.getElementById('agencia').value
    var conta = document.getElementById('conta').value
    var tipoConta = document.querySelector('input[name="tipoConta"]:checked').value
    var valor = document.getElementById('valor').value
    var senha = document.getElementById('senha').value
    var dados = new FormData() 
    dados.append('acao', 'cad_transferir')
    dados.append('banco', banco)
    dados.append('agencia', agencia)
    dados.append('conta', conta)
    dados.append('tipoConta', tipoConta)
    dados.append('valor', valor)
    dados.append('senha', senha)
    dados.append('id_conta', id_conta)
    dados.append('saldo_atual', saldo)
    enviar(dados)
    return
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
                        alert('Transferencia efetuada, Nº: ' + resposta.id_transferecia)
                        //volta para pag principal
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
        return
}