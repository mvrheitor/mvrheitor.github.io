<?php
$livros = glob("Livros/*.pdf");
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Privada</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Biblioteca Privada</h1>
        <input type="text" id="pesquisa" placeholder="Buscar por um livro..." onkeyup="buscarLivro()">
        <div id="lista-livros">
            <?php foreach($livros as $livro): ?>
                <a href="<?= $livro ?>" target="_blank"><?= basename($livro, ".pdf") ?></a>
            <?php endforeach; ?>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
