<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "doguito_petshop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Conexión falló: " . $conn->connect_error]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM mascotas WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $mascota = $result->fetch_assoc();
            echo json_encode($mascota);
        } else {
            $result = $conn->query("SELECT * FROM mascotas");
            $mascotas = [];
            while ($row = $result->fetch_assoc()) {
                $mascotas[] = $row;
            }
            echo json_encode($mascotas);
        }
        break;
        
    case 'POST':
        // Leer los datos enviados
        $input = json_decode(file_get_contents("php://input"), true);
        
        // Verificar que llegaron datos
        if (!$input) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron datos"]);
            break;
        }
        
        // Tomar los valores (coincidiendo con la base de datos)
        $id = isset($input['id']) ? $input['id'] : uniqid();
        $nombre = isset($input['nombre']) ? $input['nombre'] : '';
        $raza = isset($input['raza']) ? $input['raza'] : '';
        $edad = isset($input['edad']) ? intval($input['edad']) : 0;
        $peso = isset($input['peso']) ? floatval($input['peso']) : 0;
        
        // IMPORTANTE: La columna en tu BD se llama "dueñold" (con ñ y ld)
        // pero en el código viene como "dueñoId"
        $dueñoId = isset($input['dueñoId']) ? $input['dueñoId'] : '';
        
        // Validar campos
        if (empty($nombre) || empty($raza) || empty($dueñoId)) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos: nombre, raza y dueñoId son requeridos"]);
            break;
        }
        
        if ($edad <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "La edad debe ser mayor a 0"]);
            break;
        }
        
        if ($peso <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "El peso debe ser mayor a 0"]);
            break;
        }
        
        // Verificar que el dueño existe
        $checkOwner = $conn->prepare("SELECT id FROM clientes WHERE id = ?");
        $checkOwner->bind_param("s", $dueñoId);
        $checkOwner->execute();
        $ownerResult = $checkOwner->get_result();
        
        if ($ownerResult->num_rows === 0) {
            http_response_code(400);
            echo json_encode(["error" => "El ID del dueño no existe. Primero registra al cliente."]);
            $checkOwner->close();
            break;
        }
        $checkOwner->close();
        
        // IMPORTANTE: Usamos "dueñold" porque así se llama la columna en tu BD
        $stmt = $conn->prepare("INSERT INTO mascotas (id, nombre, raza, edad, peso, dueñold) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssids", $id, $nombre, $raza, $edad, $peso, $dueñoId);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Mascota creada exitosamente",
                "id" => $id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error en la base de datos: " . $stmt->error]);
        }
        
        $stmt->close();
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = isset($input["id"]) ? $input["id"] : (isset($_GET["id"]) ? $_GET["id"] : null);
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        
        $nombre = isset($input["nombre"]) ? $input["nombre"] : '';
        $raza = isset($input["raza"]) ? $input["raza"] : '';
        $edad = isset($input["edad"]) ? intval($input["edad"]) : 0;
        $peso = isset($input["peso"]) ? floatval($input["peso"]) : 0;
        $dueñoId = isset($input["dueñoId"]) ? $input["dueñoId"] : '';
        
        $stmt = $conn->prepare("UPDATE mascotas SET nombre=?, raza=?, edad=?, peso=?, dueñold=? WHERE id=?");
        $stmt->bind_param("ssidss", $nombre, $raza, $edad, $peso, $dueñoId, $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Mascota actualizada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();
        break;
        
    case 'DELETE':
        $id = $_GET["id"] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        
        $stmt = $conn->prepare("DELETE FROM mascotas WHERE id=?");
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Mascota eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

$conn->close();
?>