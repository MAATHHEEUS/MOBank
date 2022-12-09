// Variáveis
var mostra = document.getElementById('mostrasaldo')
mostra.addEventListener('click', mostrasaldo)

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

//Prenche o nome do cliente e o saldo no html
var linhasaldo = document.getElementById('valorsaldo')
var nome = document.getElementById('nome')
var saldo = Number(obj.saldo)
// Formata saldo em Moeda(R$)
var saldoFormat = saldo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
linhasaldo.innerText = `saldo ${saldoFormat}`
nome.innerText = `Olá, ${obj.nome}`

var id_conta = Number(obj.id)

// Função que esconde ou mostra o saldo
function mostrasaldo() {
    linhasaldo = document.getElementById('valorsaldo')

    //Pega os dados salvos no dadosLocais (LocalStorage)
    registro = localStorage.getItem("storage");
    parse = JSON.parse(registro);
    obj = JSON.parse(parse);
    
    saldo = Number(obj.saldo)
    // Formata saldo em Moeda(R$)
    saldoFormat = saldo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    if (linhasaldo.innerText === "saldo R$ xxx,xx") {
        linhasaldo.innerText = `saldo ${saldoFormat}`
        return
    }else {
        linhasaldo.innerText = "saldo R$ xxx,xx"
        return
    }
}