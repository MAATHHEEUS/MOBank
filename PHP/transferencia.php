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
    $banco = $_POST['banco'];
    $agencia = $_POST['agencia'];
    $conta = $_POST['conta'];
    $tipoConta = $_POST['tipoConta'];
    $valor = $_POST['valor'];
    $senha = $_POST['senha'];
    $id_conta = $_POST['id_conta'];
    $saldo_atual = $_POST['saldo_atual'];

    # Verifica se existe a conta de destino no banco
    $qry = "SELECT * FROM destinos WHERE tipo_conta_dest = '$tipoConta' 
    AND agencia_dest = '$agencia'
    AND conta_dest = '$conta'
    AND banco_dest = '$banco'";

    #Executa a query
    $resultado = mysqli_query($conn, $qry);

    #Recebe e verifica se retornou algum destino
    $row = mysqli_fetch_assoc($resultado);
    if($row === null){
        # insere um destino novo
        $qry = "INSERT INTO destinos VALUES(default, '$tipoConta', $agencia, $conta, '$banco')";

        #Executa query
        mysqli_query($conn, $qry);

        #Pega o id_destino retornado do insert
        $id_destino = mysqli_insert_id($conn);
    }else{
        $id_destino = $row['id_destino'];
    }
    
    #Se deu certo cadastra uma transferencia
    $qry = "INSERT INTO trasferencias VALUES(default, $id_destino, $id_conta, $valor, default)";

    #Executa query
    mysqli_query($conn, $qry);

    #Pega o id_transferencia retornado do insert
    $id_transferencia = mysqli_insert_id($conn);

    # Se a conta de destino for MOBank atualiza o saldo da conta de destino
    if ($banco == 'mo') {
        atualizaSaldoContaMO($conta, $agencia, $valor);
    }

    $novoSaldo = $saldo_atual - $valor;
    # Seta o novo saldo da conta atual
    $qry = "UPDATE contas SET saldo = $novoSaldo WHERE id_conta = '$id_conta'";

    #Executa query
    mysqli_query($conn, $qry);

    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Dados cadastrados com sucesso",
        'id_transferecia' => $id_transferencia,
        'novo_saldo' => $novoSaldo
    ));
    return;
}

function atualizaSaldoContaMO($conta, $agencia, $valor) {
    # Busca conta
    $qry = "SELECT * FROM contas WHERE id_conta = '$conta' AND agencia = '$agencia'";

    #Executa a query
    $resultado = mysqli_query($conn, $qry);
    $row = mysqli_fetch_assoc($resultado);

    $novoSaldo = $valor + $row['saldo'];
    # Atualiza o saldo
    $qry = "UPDATE contas SET saldo = $novoSaldo WHERE id_conta = '$row['id_conta']'"
    
    #Executa a query
    mysqli_query($conn, $qry);

    return;
}