$.ajax({
    url: "cadastro.php",//caminho do php
    type: "POST",//método de coleta
    dados,//data: "campo1=dado1&campo2=dado2&campo3=dado3", dados do form
    dataType: "html" //tipo de dados que será retornado

}).done(function(resposta) {//executa caso sucesso
    console.log(resposta);

}).fail(function(jqXHR, textStatus ) {//executa caso falhe
    console.log("Request failed: " + textStatus);

}).always(function() {//executa após concluir
    console.log("completou");
});
