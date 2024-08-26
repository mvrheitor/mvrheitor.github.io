// Chave criptografada usando um hash simples
const chaveCriptografada = btoa("1,618033");

function verificarChave() {
    const chaveDigitada = document.getElementById('chave').value;
    const chaveCriptografadaDigitada = btoa(chaveDigitada);

    if (chaveCriptografadaDigitada === chaveCriptografada) {
        // Chave correta
        document.getElementById('mensagem').innerText = '';
        window.location.href = 'biblioteca.php';
    } else {
        // Chave incorreta
        document.getElementById('mensagem').innerText = 'Chave incorreta! Tente novamente.';
    }
}

function buscarLivro() {
    const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
    const livros = document.querySelectorAll('#lista-livros a');

    livros.forEach(function(livro) {
        const titulo = livro.innerText.toLowerCase();
        if (titulo.includes(pesquisa)) {
            livro.style.display = 'block';
        } else {
            livro.style.display = 'none';
        }
    });
}
