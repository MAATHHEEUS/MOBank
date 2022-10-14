<?php
echo json_encode(array('msg' => 'Aqui');
include_once "conexao.php";

header("Content-type: text/html; charset=utf-8");

$cpf = $_POST['CPF'];
$nome = $_POST['nome'];
$email = $_POST['email'];
if($email === ''){//se o email não for informado coloca o padrão
    $email = 'MOBANK@email.com';
}
$password = $_POST['senha'];//usando password pois "senha" é usada no "conexão.php"

$qry = "insert into usuarios value(default, '$nome', '$cpf', '$email', '$password', default)";

if(!mysqli_query($conn, $qry)){
    //die("Erro ao inserir os dados na tabela: ".mysqli_error($conn));
    echo json_encode(array(
        "msg" => "Erro ao inserir os dados na tabela: ".mysqli_error($conn)
    ));
}
echo json_encode(array(
    "msg" => "Deu certo, registro inserido"
));
?>