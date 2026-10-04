// O pouco de comportamento do site: o menu do celular, a borda do topo ao
// rolar e o ano do rodapé. Sem bibliotecas.

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

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
