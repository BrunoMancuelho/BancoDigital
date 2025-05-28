// Mostra ou esconde a senha
const password = document.querySelector('#inputSenha');

// Seleciona todos os botões de "mostrar/ocultar senha"
const toggleButtons = [
    document.getElementById('togglePassword'),
    document.getElementById('togglePasswordRight'),
    document.getElementById('togglePasswordWrong')
];

// CPF
const cpfInput = document.getElementById('inputCPF');
const alerta1CPF = document.querySelector('.alerta1CPF');
const alerta2CPF = document.querySelector('.alerta2CPF');
const rightCPF = document.getElementById('rightCPF');
const wrongCPF = document.getElementById('wrongCPF');

// Senha
const senhaInput = document.getElementById('inputSenha');
const alerta1Senha = document.querySelector('.alerta1Senha');
const alerta2Senha = document.querySelector('.alerta2Senha');
const passwordToggle = document.getElementById('togglePassword');
const rightPasswordToggle = document.getElementById('togglePasswordRight');
const wrongPasswordToggle = document.getElementById('togglePasswordWrong');

// Mostra ou esconde a senha
toggleButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', function () {
            // Alterna o tipo do input
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);

            // Alterna o ícone do botão clicado
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});

// Função para validar CPF
function validarCPF(inputCPF) {
    inputCPF = inputCPF.replace(/\D/g, ''); // Remove tudo que não for número

    if (inputCPF.length !== 11 || /^(\d)\1{10}$/.test(inputCPF)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(inputCPF.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (parseInt(inputCPF.charAt(9)) !== firstDigit) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(inputCPF.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (parseInt(inputCPF.charAt(10)) !== secondDigit) {
        return false;
    }

    return true;
}

// Função para formatar o CPF
cpfInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1})/, '$1.$2-$3');
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1})/, '$1.$2');
    }

    this.value = value; // Atualiza o valor do input com a máscara

    const somenteNumeros = value.replace(/\D/g, '');

    if (somenteNumeros === '') {
        // Campo vazio
        alerta1CPF.style.display = 'block';
        alerta2CPF.style.display = 'none';
        cpfInput.style.border = '2px solid red';
        rightCPF.style.display = 'none';
        wrongCPF.style.display = 'block';
    } else if (!validarCPF(somenteNumeros)) {
        // CPF inválido
        alerta1CPF.style.display = 'none';
        alerta2CPF.style.display = 'block';
        cpfInput.style.border = '2px solid red';
        rightCPF.style.display = 'none';
        wrongCPF.style.display = 'block';
    } else {
        // CPF válido
        alerta1CPF.style.display = 'none';
        alerta2CPF.style.display = 'none';
        cpfInput.style.border = '2px solid green';
        rightCPF.style.display = 'block';
        wrongCPF.style.display = 'none';
    }

    atualizarEstadoBotao();
});

senhaInput.addEventListener('input', function () {
    const senha = senhaInput.value;
    const regex = /^[a-zA-Z0-9]{8}$/; // Apenas letras e números, exatamente 8 caracteres
    const senhaValida = regex.test(senha);

    if (senha === '') {
        // Campo vazio
        alerta1Senha.style.display = 'block';
        alerta2Senha.style.display = 'none';
        senhaInput.style.border = '2px solid red';
        passwordToggle.style.display = 'none';
        rightPasswordToggle.style.display = 'none';
        wrongPasswordToggle.style.display = 'block';
    } else if (!senhaValida) {
        // Senha inválida
        alerta1Senha.style.display = 'none';
        alerta2Senha.style.display = 'block';
        senhaInput.style.border = '2px solid red';
        passwordToggle.style.display = 'none';
        rightPasswordToggle.style.display = 'none';
        wrongPasswordToggle.style.display = 'block';
    } else {
        // Senha válida
        alerta1Senha.style.display = 'none';
        alerta2Senha.style.display = 'none';
        senhaInput.style.border = '2px solid green';
        passwordToggle.style.display = 'none';
        rightPasswordToggle.style.display = 'block';
        wrongPasswordToggle.style.display = 'none';
    }

    atualizarEstadoBotao();
});

// Monitorar mudanças nos inputs (opcional: se você tiver validação dinâmica)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validarFormulario);
});

// Impede digitação de caracteres que não sejam letras ou números
function restringirSenha(event) {
    const char = event.key;
    if (!/[a-zA-Z0-9]/.test(char)) {
        event.preventDefault();
    }
}

// Impede colar conteúdo inválido ou maior que 8 caracteres
function validarAoColar(e) {
    e.preventDefault();
    let text = (e.clipboardData || window.clipboardData).getData('text');
    text = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    e.target.value = text;
}

senhaInput.addEventListener('keypress', restringirSenha);
senhaInput.addEventListener('paste', validarAoColar);

// Garante que o campo não passe de 8 caracteres ao digitar (extra segurança)
senhaInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
});

// Seleciona o botão
const botaoEntrar = document.getElementById('botaoEntrar');

// Ativa a validação em tempo real
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validarFormulario);
});

// Validação inicial ao carregar a página
window.addEventListener('DOMContentLoaded', validarFormulario);

// Atualiza a função de validação
function validarFormulario() {
    const cpfVazio = cpfInput.value.trim() === '';
    const senhaVazia = senhaInput.value.trim() === '';

    const alertasVisiveis = [
        alerta1CPF,
        alerta2CPF,
        alerta1Senha,
        alerta2Senha
    ].some(alerta => alerta.style.display === 'block');

    // O botão será habilitado sempre, mas não será permitido enviar com campos inválidos
    botaoEntrar.disabled = false;
}

// Evento de clique no botão Entrar
botaoEntrar.addEventListener('click', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const cpf = cpfInput.value.trim();
    const senha = senhaInput.value.trim();

    // Verifique se CPF e senha estão preenchidos, mas os campos não precisam ser obrigatórios para habilitar o botão
    if (cpf === '' || senha === '') {
        alert("Preencha os campos CPF e/ou Senha!");
        return;
    }

    // Verifica se qualquer alerta está visível
    const alertasVisiveis = [
        alerta1CPF,
        alerta2CPF,
        alerta1Senha,
        alerta2Senha
    ].some(alerta => alerta.style.display === 'block');

    if (alertasVisiveis) {
        alert("CPF e/ou Senha incorretos!");
        return;
    }

    try {
        // Envia a requisição POST com CPF e senha
        const resposta = await fetch('https://bancodigital-nhoe.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf, senha })
        });

        // Verifica se a resposta foi bem-sucedida
        const resultado = await resposta.json();

        if (resultado.sucesso) {
            resetarLoginUI();
            // Se o login for bem-sucedido, redireciona para a página da conta
            window.location.href = 'account.html';
        } else {
            // Se o login falhar, exibe uma mensagem de erro
            alert(resultado.mensagem || 'CPF ou senha inválidos.');
        }
    } catch (error) {
        console.error("Erro ao verificar login:", error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
});

function resetarLoginUI() {
    // Limpa os campos
    cpfInput.value = '';
    senhaInput.value = '';

    // Remove bordas
    cpfInput.style.border = 'none';
    senhaInput.style.border = 'none';

    // Oculta ícones de feedback
    rightCPF.style.display = 'none';
    wrongCPF.style.display = 'none';
    rightPasswordToggle.style.display = 'none';
    wrongPasswordToggle.style.display = 'none';

    // Mostra ícone padrão de olho
    passwordToggle.style.display = 'block';
}