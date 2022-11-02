<?php
# Includes
include_once "conexao.php";

#Se a conexão deu errado retorna
if($conect == false){
    echo json_encode(array(
        'tipo' => 'E',
        'msg' => $error
    ));
    return;
}
#Recece os dados do form
$cpf = $_POST['cpf'];
$nome = $_POST['nome'];
$email = $_POST['email'];
if($email === ''){
    $email = 'MOBANK@email.com';
}
$password = $_POST['senha'];

#qry de Inserção
$qry = "INSERT INTO usuarios VALUES(default, '$nome', '$cpf', '$email', '$password', default)";

#Excuta e testa execução da qry
if (!mysqli_query($conn, $qry)){
    echo json_encode(array(
        'tipo' => 'E',
        'msg' => "Erro ao inserir as informações do usuário: " . mysqli_error($conn)
    ));
	return;
}
echo json_encode(array(
    'tipo' => 'OK',
    'msg' => "Dados cadastrados com sucesso"
));
return;