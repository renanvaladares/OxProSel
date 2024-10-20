document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;

    // Chamar função para enviar os dados para o Google Sheets
    enviarDadosParaGoogleSheets(nome, cargo);
});

function enviarDadosParaGoogleSheets(nome, cargo) {
    // Criar um código único aleatório
    const codigoUnico = gerarCodigoUnico();
    
    // Exibir o código único na tela
    const codigoUnicoElement = document.getElementById('codigoUnico');
    const codigoUnicoContainer = document.getElementById('codigoUnicoContainer');

    if (codigoUnicoElement && codigoUnicoContainer) { // Verifica se os elementos existem
        codigoUnicoElement.innerText = codigoUnico;
        codigoUnicoContainer.style.display = 'block'; // Somente se o elemento existir
    } else {
        console.error("Elemento não encontrado: 'codigoUnico' ou 'codigoUnicoContainer'");
    }

    // Configurar a requisição para o Google Apps Script
    const url = 'https://script.google.com/macros/s/AKfycbxGtyf6TvGvzYCTgbna2kbNLBsiFvr8IVP3so-17zdqlJo4xo2LESH9VzeptPsJQcQ/exec'; // Insira a URL do seu Google Apps Script
    const dados = {
        codigoUnico: codigoUnico,
        nome: nome,
        cargo: cargo,
        dataCadastro: new Date().toISOString().split('T')[0] // Data no formato YYYY-MM-DD
    };

    // Usando axios para enviar dados
    axios.post(url, dados, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Sucesso:', response.data);
            alert('Cadastro realizado com sucesso!'); // Mensagem de sucesso
        } else {
            throw new Error('Erro na resposta: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar: ' + error.message); // Mensagem de erro
    });
}

function gerarCodigoUnico() {
    return 'USR' + Math.floor(Math.random() * 1000000);
}

// Função para copiar o código único para a área de transferência
document.getElementById('copyButton').addEventListener('click', function() {
    const codigo = document.getElementById('codigoUnico').innerText;
    navigator.clipboard.writeText(codigo).then(() => {
        alert('Código copiado!');
    });
});
