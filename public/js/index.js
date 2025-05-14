// Seleciona o ícone de menu (hamburger).
const menuIcon = document.querySelector('#menu-icon');
// Seleciona a barra de navegação (navbar).
const navbar = document.querySelector('.navbar');
// Seleciona o fundo de navegação (geralmente usado para um efeito de fundo com blur ou transparência).
const navbg = document.querySelector('.nav-bg');
// Seleciona a divDinheiro.
const divDinheiro = document.querySelector('.divDinheiro');
// Seleciona os textos que devem ser ocultados.
const text2 = document.querySelector('.text2');
const text3 = document.querySelector('.text3');
const text4 = document.querySelector('.text4');
const text5 = document.querySelector('.text5');
const text6 = document.querySelector('.text6');
const divLinks = document.querySelector('.divLinks');
const divFinal = document.querySelector('.divFinal');
const divCartoes = document.querySelector('.divCartoes');

// Adiciona um ouvinte de evento para o clique no ícone do menu.
menuIcon.addEventListener('click', () => {
    // Alterna a classe 'bx-x' no ícone do menu (provavelmente para mudar o ícone para 'X' quando o menu é aberto).
    menuIcon.classList.toggle('bx-x');
    // Alterna a classe 'active' na navbar (exibe ou oculta a navbar).
    navbar.classList.toggle('active');
    // Alterna a classe 'active' no fundo da navegação (exibe ou oculta o fundo de navegação).
    navbg.classList.toggle('active');
    // Alterna a visibilidade da divDinheiro e dos textos.
    divDinheiro.classList.toggle('hidden');
    text2.classList.toggle('hidden');
    text3.classList.toggle('hidden');
    text4.classList.toggle('hidden');
    text5.classList.toggle('hidden');
    text6.classList.toggle('hidden');
    divLinks.classList.toggle('hidden');
    divFinal.classList.toggle('hidden');
    divCartoes.classList.toggle('hidden');
});