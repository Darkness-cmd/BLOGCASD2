// Inicializa animaciones de scroll (AOS) y controla repetición
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS){
    AOS.init({
      duration: 900,
      once: false, // repetir cada vez que entra en viewport
      offset: 60,
      easing: 'ease-out'
    });
  }

  // Transición entre páginas
  const overlay = document.querySelector('.page-transition');
  if (overlay){
    // Animación de entrada (desde overlay)
    requestAnimationFrame(() => {
      overlay.classList.add('hide');
      setTimeout(()=> overlay.classList.remove('active','hide'), 600);
    });

    // Interceptar enlaces con data-link para animar salida
    document.querySelectorAll('a[data-link]').forEach(a => {
      a.addEventListener('click', (e) => {
        const url = a.getAttribute('href');
        if (url && !url.startsWith('#') && !a.target){
          e.preventDefault();
          overlay.classList.add('active');
          setTimeout(()=> window.location.href = url, 550);
        }
      });
    });
  }

  // Efecto ripple en botones .btn
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = d + 'px';
      circle.style.left = (e.clientX - rect.left - d/2) + 'px';
      circle.style.top  = (e.clientY - rect.top  - d/2) + 'px';
      btn.appendChild(circle);
      setTimeout(()=> circle.remove(), 650);
    });
  });

});
