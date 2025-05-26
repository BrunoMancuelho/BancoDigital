// CPF
const cpfInput = document.getElementById('inputCPF');
const alertaCPF = document.querySelector('.alertaCPF');
const checkbox = document.getElementById('consent');
const rightCPF = document.getElementById('rightCPF');
const wrongCPF = document.getElementById('wrongCPF');

// Celular
const celularInput = document.getElementById('inputCelular');
const alertaCelular = document.querySelector('.alertaCelular');
const rightCelular = document.getElementById('rightCelular');
const wrongCelular = document.getElementById('wrongCelular');

// Elementos Nome
const nomeInput = document.getElementById('inputNome');
const alertaNome = document.querySelector('.alertaNome');
const rightNome = document.getElementById('rightNome');
const wrongNome = document.getElementById('wrongNome');

// Email
const emailInput = document.getElementById('inputEmail');
const alertaEmail = document.querySelector('.alertaEmail');
const rightEmail = document.getElementById('rightEmail');
const wrongEmail = document.getElementById('wrongEmail');

// Confirmação de Email
const confEmailInput = document.getElementById('inputConfEmail');
const alertaConfEmail = document.querySelector('.alertaConfEmail');
const rightConfEmail = document.getElementById('rightConfEmail');
const wrongConfEmail = document.getElementById('wrongConfEmail');

// Nova Senha
const senhaInput = document.getElementById('inputSenha');
const alertaSenha = document.querySelector('.alertaSenha');
const rightSenha = document.getElementById('rightSenha');
const wrongSenha = document.getElementById('wrongSenha');

// Confirmação da Nova Senha
const confSenhaInput = document.getElementById('inputConfSenha');
const alertaConfSenha = document.querySelector('.alertaConfSenha');
const rightConfSenha = document.getElementById('rightConfSenha');
const wrongConfSenha = document.getElementById('wrongConfSenha');

const alertaCondicoes = document.querySelector('.alertaCondicoes');

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

    // Valida o CPF e exibe/oculta a mensagem de erro
    if (!validarCPF(value)) {
        alertaCPF.style.display = 'block'; // Exibe a mensagem de erro do CPF
        inputCPF.style.border = '2px solid red';
        rightCPF.style.display = 'none';
        wrongCPF.style.display = 'block';
    } else {
        alertaCPF.style.display = 'none'; // Esconde a mensagem de erro do CPF
        inputCPF.style.border = '2px solid green';
        rightCPF.style.display = 'block';
        wrongCPF.style.display = 'none';
    }
});

// Função para alternar o alerta de consentimento
checkbox.addEventListener('change', function () {
    if (!checkbox.checked) {
        alertaCondicoes.style.display = 'block'; // Exibe a mensagem quando desmarcado
    } else {
        alertaCondicoes.style.display = 'none'; // Esconde a mensagem quando marcado
    }
});

function validarCelular(celular) {
    const regex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    return regex.test(celular);
}

function validarNome(nome) {
    return nome.trim().split(' ').length >= 2;
}

celularInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 11) {
        value = value.slice(0, 11); // Limita a 11 dígitos
    }

    // Aplica a máscara: (00) 00000-0000
    if (value.length >= 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length >= 9) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }

    this.value = value;
});

// Impede que o usuário cole ou digite letras.
celularInput.addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // Impede letras
    }
});


function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarSenha(senha) {
    const regex = /^[a-zA-Z0-9]{8}$/; // Apenas letras e/ou números, exatamente 8 caracteres
    return regex.test(senha);
}

celularInput.addEventListener('input', function () {
    if (!validarCelular(this.value)) {
        alertaCelular.style.display = 'block';
        celularInput.style.border = '2px solid red';
        rightCelular.style.display = 'none';
        wrongCelular.style.display = 'block';
    } else {
        alertaCelular.style.display = 'none';
        celularInput.style.border = '2px solid green';
        rightCelular.style.display = 'block';
        wrongCelular.style.display = 'none';
    }
});

nomeInput.addEventListener('input', function () {
    if (!validarNome(this.value)) {
        alertaNome.style.display = 'block';
        nomeInput.style.border = '2px solid red';
        nomeInput.classList.add('input-com-erro'); // Move para cima
        nomeInput.classList.remove('input-sem-erro');
        rightNome.style.display = 'none';
        rightNome.classList.remove('icone-sem-erro');
        wrongNome.style.display = 'block';
        wrongNome.classList.add('icone-com-erro'); // Aplica a classe que move o ícone
    } else {
        alertaNome.style.display = 'none';
        nomeInput.style.border = '2px solid green';
        nomeInput.classList.remove('input-com-erro'); // Volta ao normal
        nomeInput.classList.add('input-sem-erro');
        rightNome.style.display = 'block';
        rightNome.classList.add('icone-sem-erro');
        wrongNome.style.display = 'none';
        wrongNome.classList.remove('icone-com-erro'); // Remove o movimento do ícone
    }
});

emailInput.addEventListener('input', function () {
    if (!validarEmail(this.value)) {
        alertaEmail.style.display = 'block';
        emailInput.style.border = '2px solid red';
        emailInput.classList.add('input-com-erro');
        emailInput.classList.remove('input-sem-erro');
        rightEmail.style.display = 'none';
        rightEmail.classList.remove('icone-sem-erro');
        wrongEmail.style.display = 'block';
        wrongEmail.classList.add('icone-com-erro'); // Aplica a classe que move o ícone
    } else {
        alertaEmail.style.display = 'none';
        emailInput.style.border = '2px solid green';
        emailInput.classList.remove('input-com-erro'); // Volta ao normal
        emailInput.classList.add('input-sem-erro');
        rightEmail.style.display = 'block';
        rightEmail.classList.add('icone-sem-erro');
        wrongEmail.style.display = 'none';
        wrongEmail.classList.add('icone-com-erro'); // Aplica a classe que move o ícone
    }
});

confEmailInput.addEventListener('input', function () {
    if (this.value !== emailInput.value || !validarEmail(this.value)) {
        alertaConfEmail.style.display = 'block';
        confEmailInput.style.border = '2px solid red';
        confEmailInput.classList.add('input-com-erro'); // Move para cima
        rightConfEmail.style.display = 'none';
        rightConfEmail.classList.remove('icone-sem-erro');
        wrongConfEmail.style.display = 'block';
        wrongConfEmail.classList.add('icone-com-erro'); // Aplica a classe que move o ícone
    } else {
        alertaConfEmail.style.display = 'none';
        confEmailInput.style.border = '2px solid green';
        confEmailInput.classList.remove('input-com-erro'); // Volta ao normal
        rightConfEmail.style.display = 'block';
        rightConfEmail.classList.add('icone-sem-erro');
        wrongConfEmail.style.display = 'none';
        wrongConfEmail.classList.add('icone-com-erro'); // Aplica a classe que move o ícone
    }
});

const button = document.getElementById('btnSubmit');

// Lista de todos os elementos de alerta
const alertas = [
    document.querySelector('.alertaCPF'),
    document.querySelector('.alertaNome'),
    document.querySelector('.alertaCelular'),
    document.querySelector('.alertaEmail'),
    document.querySelector('.alertaConfEmail'),
    document.querySelector('.alertaSenha'),
    document.querySelector('.alertaConfSenha'),
    document.querySelector('.alertaCondicoes') // pode manter aqui também
];

// Função que checa se todos os alertas estão ocultos e o checkbox marcado
function validarFormulario() {
    const todosAlertasOcultos = alertas.every(alerta => alerta.style.display === 'none' || alerta.style.visibility === 'hidden' || alerta.style.opacity === '0');
    const consentido = checkbox.checked;

    button.disabled = !(todosAlertasOcultos && consentido);
}

// Monitorar o checkbox
checkbox.addEventListener('change', validarFormulario);

// Monitorar mudanças nos inputs (opcional: se você tiver validação dinâmica)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validarFormulario);
});

// Ou chame a função sempre que esconder/exibir um alerta
confEmailInput.addEventListener('input', validarEmails);
emailInput.addEventListener('input', validarEmails);

function validarEmails() {
    const email = emailInput.value;
    const confEmail = confEmailInput.value;

    const emailsIguais = email === confEmail && validarEmail(email);

    if (!emailsIguais) {
        alertaEmail.style.display = 'block';
        alertaConfEmail.style.display = 'block';

        emailInput.style.border = '2px solid red';
        confEmailInput.style.border = '2px solid red';

        rightEmail.style.display = 'none';
        wrongEmail.style.display = 'block';
        rightConfEmail.style.display = 'none';
        wrongConfEmail.style.display = 'block';
    } else {
        alertaEmail.style.display = 'none';
        alertaConfEmail.style.display = 'none';

        emailInput.style.border = '2px solid green';
        confEmailInput.style.border = '2px solid green';

        rightEmail.style.display = 'block';
        wrongEmail.style.display = 'none';
        rightConfEmail.style.display = 'block';
        wrongConfEmail.style.display = 'none';
    }

    validarFormulario(); // Atualiza o estado do botão
}

senhaInput.addEventListener('input', validarSenhas);
confSenhaInput.addEventListener('input', validarSenhas);

function validarSenhas() {
    const senha = senhaInput.value;
    const confSenha = confSenhaInput.value;

    const senhaValida = validarSenha(senha);
    const senhasIguais = senha === confSenha;

    if (senhaValida && senhasIguais) {
        alertaSenha.style.display = 'none';
        senhaInput.style.border = '2px solid green';
        rightSenha.style.display = 'block';
        wrongSenha.style.display = 'none';

        alertaConfSenha.style.display = 'none';
        confSenhaInput.style.border = '2px solid green';
        rightConfSenha.style.display = 'block';
        wrongConfSenha.style.display = 'none';
    } else {
        alertaSenha.style.display = 'block';
        senhaInput.style.border = '2px solid red';
        rightSenha.style.display = 'none';
        wrongSenha.style.display = 'block';

        alertaConfSenha.style.display = 'block';
        confSenhaInput.style.border = '2px solid red';
        rightConfSenha.style.display = 'none';
        wrongConfSenha.style.display = 'block';
    }

    validarFormulario(); // Atualiza o botão de envio
}

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
    validarSenhas(); // opcional, para já validar após colar
}

senhaInput.addEventListener('keypress', restringirSenha);
confSenhaInput.addEventListener('keypress', restringirSenha);

senhaInput.addEventListener('paste', validarAoColar);
confSenhaInput.addEventListener('paste', validarAoColar);

// Garante que o campo não passe de 8 caracteres ao digitar (extra segurança)
senhaInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    validarSenhas();
});
confSenhaInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    validarSenhas();
});

document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    const form = this; // Referência ao formulário

    const cpf = cpfInput.value;
    const nome = nomeInput.value;
    const celular = celularInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const confSenha = confSenhaInput.value;

    const formData = {
        cpf,
        nome,
        celular,
        email,
        senha,
        confSenha
    };

    fetch('https://bancodigital-nhoe.onrender.com/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);

            if (result === "Cadastro realizado com sucesso!") {
                const modal = document.getElementById('modalSucesso');
                const btnOk = document.getElementById('btnModalOK');

                modal.style.display = 'block'; // Exibe a modal

                btnOk.addEventListener('click', function () {
                    modal.style.display = 'none';
                    window.location.href = 'login.html';
                });
                // Remove bordas e oculta ícones após sucesso
                document.querySelectorAll('input').forEach(input => {
                    input.style.border = 'none';
                });

                // Oculta todos os ícones de validação
                document.querySelectorAll('.icone-validacao').forEach(icone => {
                    icone.style.display = 'none';
                });
                // Desabilitar o botão de envio
                document.getElementById('btnSubmit').disabled = true;
                form.reset(); // Limpa todos os campos do formulário
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro de conexão com o servidor.');
        });
});