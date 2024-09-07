// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de evento para a tecla "Enter" no campo de pesquisa
    document.getElementById("campo-pesquisa").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita o envio do formulário se estiver dentro de um formulário
            pesquisar(); // Chama a função de pesquisa
        }
    });
});

function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Obtém o valor do campo de pesquisa
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // Verifica se o campo de pesquisa está vazio
    if (!campoPesquisa) {
        section.innerHTML = "<p>Busca não encontrada</p>";
        return;
    }

    // Converte o valor da pesquisa para minúsculas
    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";

    // Itera sobre cada objeto no array de zumbis
    for (let zumbi of zumbis) {
        let titulo = zumbi.titulo.toLowerCase();
        let tipo = zumbi.tipo.toLowerCase();
        let genero = zumbi.genero.toLowerCase();
        let sinopse = zumbi.sinopse.toLowerCase();
        let diretor = zumbi.diretor.toLowerCase();

        // Verifica se o título, tipo ou gênero incluem o termo pesquisado
        if (titulo.includes(campoPesquisa) ||
            tipo.includes(campoPesquisa) ||
            genero.includes(campoPesquisa) ||
            sinopse.includes(campoPesquisa) ||
            diretor.includes(campoPesquisa)) {
            // Adiciona o resultado encontrado à string de resultados
            resultados += `
                <div class="item-resultado">
                    <h2><a href="#" target="_blank">${zumbi.titulo}</a></h2>
                    <h3>Tipo: ${zumbi.tipo}</h3>
                    <h3>Gênero: ${zumbi.genero}</h3>
                    <p class="descricao-meta">${zumbi.sinopse}</p>
                    <img src="${zumbi.poster}" alt="${zumbi.titulo} Poster" style="width: 200px; border-radius: 10px;">
                    <p>Ano: ${zumbi.ano}</p>
                    <p>Diretor: ${zumbi.diretor}</p>
                    <button onclick="exibirTrailer('${zumbi.trailer}')">Mais informações</button>
                </div>
            `;
        }
    }

    // Se nenhum resultado foi encontrado, exibe mensagem
    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>";
    }

    section.innerHTML = resultados;
}

// Função para exibir o modal do trailer
function exibirTrailer(trailerUrl) {
    // Exibe o modal com o trailer
    let modal = document.getElementById("trailerModal");
    let iframe = document.getElementById("trailerIframe");
    iframe.src = trailerUrl;
    modal.style.display = "block";
}

// Função para fechar o modal do trailer
function fecharModal() {
    // Fecha o modal e remove o src do iframe
    let modal = document.getElementById("trailerModal");
    let iframe = document.getElementById("trailerIframe");
    modal.style.display = "none";
    iframe.src = "";
}

// Função para expandir o trailer para tela cheia
function expandirTela() {
    // Expande o iframe para tela cheia
    let iframe = document.getElementById("trailerIframe");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}