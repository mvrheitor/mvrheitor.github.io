// Chave criptografada usando um hash simples
const chaveCriptografada = btoa("1,618033");

function verificarChave() {
    const chaveDigitada = document.getElementById('chave').value;
    const chaveCriptografadaDigitada = btoa(chaveDigitada);

    if (chaveCriptografadaDigitada === chaveCriptografada) {
        document.getElementById('mensagem').innerText = '';
        window.location.href = 'biblioteca.html';
    } else {
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

async function selecionarPastaLivros() {
    try {
        const dirHandle = await window.showDirectoryPicker();
        const listaLivros = document.getElementById('lista-livros');
        listaLivros.innerHTML = '';  // Limpar a lista anterior

        for await (const [nomeArquivo, handle] of dirHandle.entries()) {
            if (handle.kind === 'file' && nomeArquivo.endsWith('.pdf')) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(await handle.getFile());
                link.innerText = nomeArq
