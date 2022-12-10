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
            $data = $data->format('Y-m-d');
            break;
        case '2':
            $data = new DateTime(' -10 days');
            $data = $data->format('Y-m-d');
            break;
        case '3':
            $data = new DateTime(' -1 month');
            $data = $data->format('Y-m-d');
            break;
        case '4':
            $data = new DateTime(' -3 month');
            $data = $data->format('Y-m-d');
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
    }

    # Monta a gridTransferencias de consulta
    $gridTransferencias = "<h4 align='center'>Transferências</h4><table class='table table-holver table-striped table-bordered' style='border: 1px solid green;'>";
    $gridTransferencias .= "<tr>";
    $gridTransferencias .= "<th style='border: 1px solid green;'>#</th>";
    $gridTransferencias .= "<th style='border: 1px solid green;'>Valor</th>";
    $gridTransferencias .= "<th style='border: 1px solid green;'>Data</th>";
    $gridTransferencias .= "<th colspan='3' style='border: 1px solid green;'>Destinatário</th>";
    $gridTransferencias .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridTransferencias .= "<tr>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['id_transf']."</td>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['valor']."</td>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['dt_transf']."</td>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['agencia_dest']."</td>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['conta_dest']."</td>";
        $gridTransferencias .= "<td style='border: 1px solid green;'>".$row['banco_dest']."</td>";
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
    }

    # Monta a gridPix de consulta
    $gridPix = "<h4 align='center'>Pix</h4><table class='table table-holver table-striped table-bordered' style='border: 1px solid green;'>";
    $gridPix .= "<tr style='border: 1px solid green;'>";
    $gridPix .= "<th style='border: 1px solid green;'>#</th>";
    $gridPix .= "<th style='border: 1px solid green;'>Valor</th>";
    $gridPix .= "<th style='border: 1px solid green;'>Data</th>";
    $gridPix .= "<th style='border: 1px solid green;'>Descrição</th>";
    $gridPix .= "<th style='border: 1px solid green;'>Destino(Chave)</th>";
    $gridPix .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridPix .= "<tr style='border: 1px solid green;'>";
        $gridPix .= "<td style='border: 1px solid green;'>".$row['id_pix']."</td>";
        $gridPix .= "<td style='border: 1px solid green;'>".$row['valor']."</td>";
        $gridPix .= "<td style='border: 1px solid green;'>".$row['dt_pix']."</td>";
        $gridPix .= "<td style='border: 1px solid green;'>".$row['descricao']."</td>";
        $gridPix .= "<td style='border: 1px solid green;'>".$row['chave_destino']."</td>";
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
    }

    # Monta a gridBoletos de consulta
    $gridBoletos = "<h4 align='center'>Boletos</h4><table class='table table-holver table-striped table-bordered' style='border: 1px solid green;'>";
    $gridBoletos .= "<tr style='border: 1px solid green;'>";
    $gridBoletos .= "<th style='border: 1px solid green;'>#</th>";
    $gridBoletos .= "<th style='border: 1px solid green;'>Cód. Barras</th>";
    $gridBoletos .= "<th style='border: 1px solid green;'>Data</th>";
    $gridBoletos .= "<th colspan='3' style='border: 1px solid green;'>Destinatário</th>";
    $gridBoletos .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $gridBoletos .= "<tr style='border: 1px solid green;'>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['id_boleto']."</td>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['cod_barras']."</td>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['dt_pag']."</td>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['agencia_dest']."</td>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['conta_dest']."</td>";
        $gridBoletos .= "<td style='border: 1px solid green;'>".$row['banco_dest']."</td>";
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