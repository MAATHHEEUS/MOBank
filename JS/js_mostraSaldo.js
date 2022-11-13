var mostra = document.getElementById('mostrasaldo')
mostra.addEventListener('click', mostrasaldo)

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

//Prenche o nome do cliente e o saldo no html
var linhasaldo = document.getElementById('valorsaldo')
var nome = document.getElementById('nome')
linhasaldo.innerText = `saldo R$ ${obj.saldo}`
nome.innerText = `Olá, ${obj.nome}`

// Armazena o saldo do cliente para não perder a informação ja formatado em Moeda(R$)
var saldo = obj.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})

// Função que esconde ou mostra o saldo
function mostrasaldo() {
    linhasaldo = document.getElementById('valorsaldo')
    if (linhasaldo.innerText === "saldo R$ xxx,xx") {
        linhasaldo.innerText = `saldo R$ ${saldo}`
        return
    }else {
        linhasaldo.innerText = "saldo R$ xxx,xx"
        return
    }
}