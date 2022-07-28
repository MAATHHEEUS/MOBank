//Variáveis
bot_acessar = document.getElementById('bot_acessar')
bot_cadastra = document.getElementById('bot_cadastrar')
let agencia = 0
let conta = 0
bot_acessar.addEventListener('click', validar)
bot_cadastra.addEventListener('click', cadastrar)

//funções
function validar() {// validar se o cliente digitou corretamente e se o mesmo existe
    let agencia = document.getElementById('agencia').value
    let conta = document.getElementById('conta').value
    if(Number(agencia) <= 0 || Number(conta) <= 0) {
        alert('Agência ou Conta Inválidos!')
    }else{
        //if(VALIDAR SE CLIENTE EXISTE NO BANCO DE DADOS) {}
        alert('Tudo OK!')
    }
    
}