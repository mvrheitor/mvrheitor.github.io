function verificarChave() {
    const chaveDigitada = document.getElementById('chave').value;
    const chaveCriptografadaDigitada = btoa(chaveDigitada);

    if (chaveCriptografadaDigitada === chaveCriptografada) {
        // Chave correta
        document.getElementById('mensagem').innerText = '';
        window.location.href = 'biblioteca.html';
    } else {
        // Chave incorreta
        document.getElementById('mensagem').innerText = 'Chave incorreta! Tente novamente.';
    }
}

function buscarLivro() {
    const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
    const categorias = document.querySelectorAll('.categoria div');

    categorias.forEach(function(categoria) {
        const livros = categoria.querySelectorAll('a');
        let encontrado = false;

        livros.forEach(function(livro) {
            const titulo = livro.innerText.toLowerCase();
            if (titulo.includes(pesquisa)) {
                livro.style.display = 'block';
                encontrado = true;
            } else {
                livro.style.display = 'none';
            }
        });

        // Mostrar ou esconder a categoria com base no resultado da pesquisa
        categoria.parentElement.style.display = encontrado ? 'block' : 'none';
    });
}
