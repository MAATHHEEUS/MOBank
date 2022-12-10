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

#Recebe os dados do form
$acao = $_POST['acao'];

if($acao == 'validarSenha'){
    $password = $_POST['senha'];
    $id_conta = $_POST['id_conta'];

    #qry de Busca
    $qry = "SELECT u.senha
    FROM contas c JOIN acessos a ON a.conta = c.id_conta
    JOIN usuarios u ON u.id_usuario = a.usuario_id 
    WHERE c.id_conta = '$id_conta' AND u.senha = '$password'";
    
    #Executa a query
    $resultado = mysqli_query($conn, $qry);

    #Testa execução da qry
    if (!$resultado){   
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao recuperar os dados da conta: " . mysqli_error($conn)
        ));
        return;
    }

    #Recebe e verifica se retornou algum usuário
    $row = mysqli_fetch_assoc($resultado);
    if($row === null){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Senha Incorreta!"
        ));
        return;
    }
    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Senha OK",
    ));
    return;
}

if($acao == 'cad_transferir'){
    $tipoChave = $_POST['tipoChave'];
    // $contato = $_POST['contato'];
    $desc = $_POST['desc'];
    $adicionaContato = $_POST['adicionaContato'];
    $valor = $_POST['valor'];
    $senha = $_POST['senha'];
    $chave = $_POST['chave'];
    $id_conta = $_POST['id_conta'];
    $saldo_atual = $_POST['saldo_atual'];

    #Cadastra um pix
    $qry = "INSERT INTO `pix`(`id_pix`, `conta`, `chave_destino`, `descricao`, `valor`, `dt_pix`) VALUES (default,$id_conta,$chave,'$desc',$valor,default)";

    #Executa query
    mysqli_query($conn, $qry);
    
    #Pega o id_pix retornado do insert
    $id_pix = mysqli_insert_id($conn);

    $novoSaldo = $saldo_atual - $valor;
    # Seta o novo saldo da conta atual
    $qry = "UPDATE contas SET saldo = $novoSaldo WHERE id_conta = '$id_conta'";

    #Executa query
    mysqli_query($conn, $qry);

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////EM DESENVOLVIMENTO!!!
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    # Adiciona o contato se solicitado
    // if ($adicionaContato == 'on') {
    //     $qry = "INSERT INTO contatos VALUES(default, '$tipoConta', $agencia, $conta, '$banco')";

    //     #Executa query
    //     mysqli_query($conn, $qry);
    // }

    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Dados cadastrados com sucesso",
        'id_pix' => $id_pix,
        'novo_saldo' => $novoSaldo
    ));
    return;
}