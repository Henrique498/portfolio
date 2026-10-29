document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const progressBar = $('.progress-bar');
  const sections = $$('section');
  const navLinks = $$('.main-nav a');
  const proj = $('#projetos');
  const grid = $('.projetos-grid');
  const stage = $('.stage');

  /* 1. Aparece ao entrar na tela e REPETE ao voltar o scroll */
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) =>
        e.target.classList.toggle('visible', e.isIntersecting)
      ),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  $$('.reveal, .reveal-left, .reveal-right').forEach((el) =>
    observer.observe(el)
  );

  /* 2. Palavras que acendem conforme a rolagem */
  const inks = reduced
    ? []
    : $$('.sobre-texto p:not(.tag)').map((el) => {
        el.classList.add('ink');
        el.innerHTML = el.textContent
          .trim()
          .split(/\s+/)
          .map((w) => `<span class="w">${w}</span>`)
          .join(' ');
        return { el, words: [...el.children] };
      });

  /* 3. Projetos: trilho horizontal preso, controlado pela rolagem vertical */
  let run = 0;
  const layout = () => {
    const on = innerWidth > 860 && !reduced;
    proj.classList.toggle('is-track', on);
    if (on) {
      const pad = parseFloat(getComputedStyle(stage).paddingLeft);
      run = Math.max(0, grid.scrollWidth + pad * 2 - innerWidth);
      proj.style.height = `${innerHeight + run}px`;
    } else {
      run = 0;
      proj.style.height = '';
      grid.style.transform = '';
    }
  };

  /* 4. Atualização a cada frame de rolagem */
  let ticking = false;
  const update = () => {
    ticking = false;

    const max = document.documentElement.scrollHeight - innerHeight;
    if (progressBar) {
      progressBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }

    if (!reduced) {
      sections.forEach((s) =>
        s.style.setProperty(
          '--d',
          (s.getBoundingClientRect().top / innerHeight).toFixed(3)
        )
      );
    }

    let current = sections[0];
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= innerHeight * 0.4) current = s;
    });
    navLinks.forEach((a) =>
      a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`)
    );

    inks.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const lit =
        clamp((innerHeight * 0.88 - r.top) / (innerHeight * 0.2 + r.height)) *
        words.length;
      words.forEach((w, i) => (w.style.opacity = 0.16 + 0.84 * clamp(lit - i)));
    });

    if (proj.classList.contains('is-track')) {
      const r = proj.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight || 1));
      grid.style.transform = `translateX(${-p * run}px)`;
    }
  };

  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  addEventListener('resize', () => {
    layout();
    update();
  });
  layout();
  update();
  if (document.fonts)
    document.fonts.ready.then(() => {
      layout();
      update();
    });

  /* 5. Rolagem suave com inércia (mouse/trackpad); toque continua nativo */
  if (!reduced && matchMedia('(pointer: fine)').matches) {
    let target = scrollY;
    let cur = scrollY;
    let raf = 0;
    const step = () => {
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.5) {
        cur = target;
        raf = 0;
      } else {
        raf = requestAnimationFrame(step);
      }
      scrollTo({ top: cur, behavior: 'instant' });
    };
    addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey || e.target.closest('textarea')) return;
        e.preventDefault();
        const limit = document.documentElement.scrollHeight - innerHeight;
        target = Math.max(
          0,
          Math.min(target + e.deltaY * (e.deltaMode === 1 ? 32 : 1), limit)
        );
        if (!raf) raf = requestAnimationFrame(step);
      },
      { passive: false }
    );
    addEventListener(
      'scroll',
      () => {
        if (!raf) target = cur = scrollY;
      },
      { passive: true }
    );
  }

  /* Botão de copiar e-mail */
  const btnCopiar = $('#btn-copiar');
  const emailText = $('#email-text');
  if (btnCopiar && emailText) {
    btnCopiar.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.innerText.trim()).then(() => {
        const originalText = btnCopiar.innerText;
        btnCopiar.innerText = 'Copiado!';
        setTimeout(() => (btnCopiar.innerText = originalText), 2000);
      });
    });
  }
});
