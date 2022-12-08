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

if($acao == 'cad_transferir'){
    $id_conta = $_POST['id_conta'];
    $periodo = $_POST['periodo'];
    switch ($periodo) {
        case '1':
            $data = new DateTime(' -3 days');
            break;
        case '1':
            $data = new DateTime(' -10 days');
            break;
        case '1':
            $data = new DateTime(' -1 month');
            break;
        case '1':
            $data = new DateTime(' -3 month');
            break;
    }
    
    /////////////////////////////////////// TRANSFERÊNCIAS /////////////////////////////////////////
    # Busca as transferencias do cliente
    $qry = "select * from trasferencias t join destinos d on t.destino = d.id_destino where t.conta = $id_conta and t.dt_transf >= $data";
    $resultset = mysqli_query($conn, $qry);

    # Verifica se deu certo a consulta
    if (!$resultset){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao consultar os investimentos. " . mysqli_error($conn)
        ));
        return;
        break;
    }

    # Verifica se retornou linhas
    $qntd = mysqli_num_rows($resultset);
    if ($qntd < 0) {
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro: Nenhum investimento cadastrado para esse cliente!"
        ));
        return;
        break;
    }

    # Monta a gridTransferencias de consulta
    $gridTransferencias = "<table class='table table-holver table-striped table-bordered'>";
    $gridTransferencias .= "<tr>";
    $gridTransferencias .= "<th>#</th>";
    $gridTransferencias .= "<th>Valor</th>";
    $gridTransferencias .= "<th>Data</th>";
    $gridTransferencias .= "<th colspan='3'>Destinatário</th>";
    $gridTransferencias .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridTransferencias .= "<tr>";
        $gridTransferencias .= "<td>".$row['id_transf']."</td>";
        $gridTransferencias .= "<td>".$row['valor']."</td>";
        $gridTransferencias .= "<td>".$row['dt_transf']."</td>";
        $gridTransferencias .= "<td>".$row['agencia_dest']."</td>";
        $gridTransferencias .= "<td>".$row['conta_dest']."</td>";
        $gridTransferencias .= "<td>".$row['banco_dest']."</td>";
        $gridTransferencias .= "</tr>";
    }
    $gridTransferencias .= "</tr>";
    //////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////// PIX //////////////////////////////////////////////
    # Busca os Pix do cliente
    $qry = "SELECT * FROM `pix` WHERE conta = $id_conta and dt_pix >= $data";
    $resultset = mysqli_query($conn, $qry);

    # Verifica se deu certo a consulta
    if (!$resultset){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao consultar os pix. " . mysqli_error($conn)
        ));
        return;
        break;
    }

    # Verifica se retornou linhas
    $qntd = mysqli_num_rows($resultset);
    if ($qntd < 0) {
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro: Nenhum pix para esse cliente!"
        ));
        return;
        break;
    }

    # Monta a gridPix de consulta
    $gridPix = "<table class='table table-holver table-striped table-bordered'>";
    $gridPix .= "<tr>";
    $gridPix .= "<th>#</th>";
    $gridPix .= "<th>Valor</th>";
    $gridPix .= "<th>Data</th>";
    $gridPix .= "<th>Descrição</th>";
    $gridPix .= "<th>Destino(Chave)</th>";
    $gridPix .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridPix .= "<tr>";
        $gridPix .= "<td>".$row['id_pix']."</td>";
        $gridPix .= "<td>".$row['valor']."</td>";
        $gridPix .= "<td>".$row['dt_pix']."</td>";
        $gridPix .= "<td>".$row['descricao']."</td>";
        $gridPix .= "<td>".$row['chave_destino']."</td>";
        $gridPix .= "</tr>";
    }
    $gridPix .= "</tr>";
    //////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////// Boletos //////////////////////////////////////////////
    # Busca os boletos do cliente
    $qry = "select * from boletos b join destinos d on b.destino = d.id_destino where b.conta = $id_conta and b.dt_pag >= $data";
    $resultset = mysqli_query($conn, $qry);

    # Verifica se deu certo a consulta
    if (!$resultset){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao consultar os boletos. " . mysqli_error($conn)
        ));
        return;
        break;
    }

    # Verifica se retornou linhas
    $qntd = mysqli_num_rows($resultset);
    if ($qntd < 0) {
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro: Nenhum boleto para esse cliente!"
        ));
        return;
        break;
    }

    # Monta a gridBoletos de consulta
    $gridBoletos = "<table class='table table-holver table-striped table-bordered'>";
    $gridBoletos .= "<tr>";
    $gridBoletos .= "<th>#</th>";
    $gridBoletos .= "<th>Cód. Barras</th>";
    $gridBoletos .= "<th>Data</th>";
    $gridBoletos .= "<th colspan='3'>Destinatário</th>";
    $gridBoletos .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridBoletos .= "<tr>";
        $gridBoletos .= "<td>".$row['id_boleto']."</td>";
        $gridBoletos .= "<td>".$row['cod_barras']."</td>";
        $gridBoletos .= "<td>".$row['dt_pag']."</td>";
        $gridBoletos .= "<td>".$row['agencia_dest']."</td>";
        $gridBoletos .= "<td>".$row['conta_dest']."</td>";
        $gridBoletos .= "<td>".$row['banco_dest']."</td>";
        $gridBoletos .= "</tr>";
    }
    $gridBoletos .= "</tr>";
    
    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Pronto!",
        'gridTransferencias' => $gridTransferencias,
        'gridPix' => $gridPix,
        'gridBoletos' => $gridBoletos
    ));
    return;            
}