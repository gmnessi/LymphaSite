// O pouco de comportamento do site: o menu do celular, a borda do topo ao
// rolar, as setas das telas e o ano do rodapé. Sem bibliotecas.

(function () {
  var topo = document.getElementById('topo');
  var botao = document.querySelector('.abrir-menu');
  var menu = document.getElementById('menu');

  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    // Tocar num link do menu já leva à seção: o menu fecha junto.
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function marcarRolagem() {
    if (topo) topo.classList.toggle('rolou', window.scrollY > 8);
  }
  window.addEventListener('scroll', marcarRolagem, { passive: true });
  marcarRolagem();

  // As setas das telas andam uma tela por vez e somem quando chegam ao fim.
  var telas = document.querySelector('.telas');
  var anterior = document.querySelector('.seta-anterior');
  var proxima = document.querySelector('.seta-proxima');
  if (telas && anterior && proxima) {
    function passo() {
      var figura = telas.querySelector('figure');
      return figura ? figura.getBoundingClientRect().width + 28 : 280;
    }
    function marcarSetas() {
      var fim = telas.scrollWidth - telas.clientWidth - 4;
      anterior.disabled = telas.scrollLeft <= 4;
      proxima.disabled = telas.scrollLeft >= fim;
    }
    anterior.addEventListener('click', function () {
      telas.scrollBy({ left: -passo(), behavior: 'smooth' });
    });
    proxima.addEventListener('click', function () {
      telas.scrollBy({ left: passo(), behavior: 'smooth' });
    });
    telas.addEventListener('scroll', marcarSetas, { passive: true });
    window.addEventListener('resize', marcarSetas);
    marcarSetas();
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
