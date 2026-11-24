// ===== 1. Folhinhas caindo nas boas-vindas =====
const inicio = document.querySelector('#inicio');
const folhas = ['🍃', '🍂', '🌿'];

function criarFolha() {
  const f = document.createElement('span');
  f.className = 'folha';
  f.textContent = folhas[Math.floor(Math.random() * folhas.length)];
  f.style.left = Math.random() * 100 + '%';
  f.style.fontSize = (14 + Math.random() * 16) + 'px';
  f.style.animationDuration = (6 + Math.random() * 6) + 's';
  inicio.appendChild(f);
  setTimeout(() => f.remove(), 12000);
}
setInterval(criarFolha, 700);

// ===== 2. Janela com a história do personagem =====
const modal = document.getElementById('modal');
const modalFoto = document.getElementById('modal-foto');
const modalNome = document.getElementById('modal-nome');
const modalTexto = document.getElementById('modal-texto');

document.querySelectorAll('#amigos .cartao').forEach(cartao => {
  cartao.addEventListener('click', () => {
    modalFoto.innerHTML = '';
    modalFoto.appendChild(cartao.querySelector('.foto').cloneNode(true));
    modalNome.textContent = cartao.querySelector('h3').textContent;
    modalTexto.textContent = cartao.querySelector('p').textContent;
    modal.classList.add('aberto');
  });
});

function fecharModal() {
  modal.classList.remove('aberto');
}
document.getElementById('modal-fechar').addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

// ===== 3. Seções aparecendo suavemente ao rolar =====
const itens = document.querySelectorAll('.cartao, #amigos .moldura > .titulo, #tutoriais .moldura > .titulo, #artista .moldura');
itens.forEach(el => el.classList.add('revelar'));

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });
itens.forEach(el => observador.observe(el));

// ===== 4. Botão voltar ao topo =====
const botaoTopo = document.getElementById('topo');
window.addEventListener('scroll', () => {
  botaoTopo.classList.toggle('mostrar', window.scrollY > 400);
});