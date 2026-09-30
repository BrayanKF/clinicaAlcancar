/* ============================================================
   ALCANÇAR — Main JS (interatividade)
   Requisitos: sem framework, JS só adiciona; com JS desativado tudo visível.
   Animações como melhoria progressiva (js-ready + IntersectionObserver)
   Loader SVG: máximo 1,5s, fallback automático.
   ============================================================ */

(function() {
  'use strict';

  // ---- 1. ANIMAÇÕES PROGRESSIVAS ----
  try {
    // Adicionar classe no <html> quando JS está ativo
    document.documentElement.classList.add('js-ready');

    // IntersectionObserver: quando elemento entra na viewport, ativa animação
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

      document.querySelectorAll('.anim-up').forEach(el => observer.observe(el));
    } else {
      // Sem IO: revelar tudo imediatamente
      document.querySelectorAll('.anim-up').forEach(el => el.classList.add('in-view'));
    }

    // Fallback: após 2s revelar tudo (caso algo trave)
    setTimeout(() => {
      document.querySelectorAll('.anim-up').forEach(el => el.classList.add('in-view'));
    }, 2000);
  } catch (e) {
    // Em erro, revelar tudo
    document.querySelectorAll('.anim-up').forEach(el => {
      el.classList.add('in-view');
    });
  }

  // ---- 2. LOADER INICIAL (SVG da árvore, máx 1,5s) ----
  try {
    const loader = document.createElement('div');
    loader.id = 'loader-overlay';
    loader.setAttribute('aria-label', 'Carregando');
    loader.setAttribute('role', 'status');
    loader.style.cssText = 'position:fixed;inset:0;background:#F5EFE3;z-index:9999;display:flex;align-items:center;justify-content:center;transition:opacity .4s ease;';
    loader.innerHTML = `
      <svg width="80" height="100" viewBox="0 0 80 100" aria-label="Árvore do logo animando">
        <circle cx="40" cy="36" r="26" fill="#8FB5A0" opacity=".3"/>
        <path d="M40 60 L40 15" stroke="#4F6B5A" stroke-width="4" stroke-linecap="round"/>
        <path d="M40 35 Q60 25 70 40 Q55 55 40 50" fill="#EBD9A9" stroke="#4F6B5A" stroke-width="2"/>
        <circle cx="40" cy="30" r="4" fill="#F3C8A3"/>
      </svg>
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
    }, 1200); // remove após 1,2s

    setTimeout(() => {
      loader.remove();
    }, 1500); // remove completamente após 1,5s (fallback)
  } catch (e) {
    // Se erro, não mostra loader; conteúdo já visível por padrão
  }

  // ---- 3. HERO PALAVRA ALTERNANDO ----
  try {
    const words = ['movimento', 'bem-estar', 'futuro', 'família'];
    let idx = 0;
    const span = document.getElementById('heroWord');
    if (span && words.length) {
      setInterval(() => {
        idx = (idx + 1) % words.length;
        span.textContent = words[idx];
      }, 3000);
    }
  } catch (e) {}

  // ---- 4. SERVIÇOS — FILTRO DE ABAS ----
  window.filterServices = function(key) {
    try {
      // Atualizar botões
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      const btn = document.getElementById('tab-' + key);
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      }

      const grid = document.getElementById('servicesGrid');
      if (!grid || !window.ALCANCAR_CONFIG) return;
      grid.innerHTML = '';

      // Montar cards do filtro
      const all = window.ALCANCAR_CONFIG.servicesByTab || {};
      const list = all[key] || all.todos || [];

      // Se é array de strings (filtros simples), buscar detalhes completos
      if (typeof list[0] === 'string') {
        const full = (all.todos || []).filter(s => list.indexOf(s.name) !== -1);
        full.forEach(s => appendServiceCard(grid, s));
      } else {
        list.forEach(s => appendServiceCard(grid, s));
      }
    } catch (e) { console.error('filterServices error', e); }
  };

  function appendServiceCard(grid, s) {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.innerHTML = `
      <span class="tag">${s.tag || 'Serviço'}</span>
      <h3>${s.name}</h3>
      ${s.impact ? `<p style="font-family:var(--fonte-titulo);font-size:1.05rem;color:var(--salvia-deep);margin-bottom:.3rem;">"${s.impact}"</p>` : ''}
      <p class="desc">${s.desc || ''}</p>
      <a href="#agendar-seletor" class="btn-primary" onclick="openAgendar();return false;" style="font-size:.85rem;padding:.55rem 1rem;">Agendar</a>
    `;
    grid.appendChild(card);
  }

  // Inicializar com todos
  try { if (window.filterServices) window.filterServices('todos'); } catch (e) {}

  // ---- 5. FERRAMENTA GUIADA ----
  window.guidePick = function(step, val) {
    try {
      const step1 = document.getElementById('guideStep1');
      const step2 = document.getElementById('guideStep2');
      const result = document.getElementById('guideResult');
      if (!step1 || !step2 || !result || !window.ALCANCAR_CONFIG) return;

      if (step === 1) {
        window.guideData = window.guideData || {};
        window.guideData.para = val;
        step1.style.display = 'none';
        step2.style.display = 'block';
      } else if (step === 2) {
        window.guideData.sente = val;
        const rules = window.ALCANCAR_CONFIG.guideRules || [];
        const match = rules.find(r => r.para === window.guideData.para && r.sente === val);
        const res = match ? match.res : 'Fisioterapia geral';
        document.getElementById('resService').textContent = res;
        step2.style.display = 'none';
        result.style.display = 'block';
      }
    } catch (e) { console.error('guidePick error', e); }
  };

  // ---- 6. MAPA DO CORPO ----
  window.showBodyCard = function(id) {
    try {
      document.querySelectorAll('#bodyCards article').forEach(a => a.style.display = 'none');
      const card = document.querySelector('#bodyCards article[data-body="' + id + '"]');
      if (card) card.style.display = 'block';
    } catch (e) {}
  };

  // ---- 7. FAQ ACORDEÃO ----
  window.toggleFaq = function(btn) {
    try {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // Fechar outros (opcional)
      document.querySelectorAll('.faq-q').forEach(b => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          const id = b.getAttribute('aria-controls');
          const panel = document.getElementById(id);
          if (panel) panel.classList.remove('open');
        }
      });
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.toggle('open');
    } catch (e) {}
  };

  // ---- 8. SELO ABERTO/FECHADO ----
  try {
    const now = new Date();
    const brTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const dia = brTime.getDay(); // 0=domingo, 1=segunda...
    const hora = brTime.getHours();
    const min = brTime.getMinutes();
    const selo = document.getElementById('unitSelo');
    if (selo) {
      const isWeekday = dia >= 1 && dia <= 5; // segunda a sexta
      const inRange = (hora > 7 || (hora === 7 && min >= 0)) && (hora < 21 || (hora === 21 && min === 0));
      // Ajuste: das 7h às 21h significa 7:00-21:00 aberto; antes e depois fechado
      const open = isWeekday && hora >= 7 && hora < 21;
      if (open) {
        selo.textContent = 'Aberto agora';
        selo.style.background = '#C5E6C8';
        selo.style.color = '#2A522D';
      } else {
        selo.textContent = 'Fechado agora';
        selo.style.background = '#F5D6C8';
        selo.style.color = '#7A2E12';
      }
    }
  } catch (e) {}

  // ---- 9. CONTADORES ----
  try {
    const counters = document.querySelectorAll('[data-counter]');
    if ('IntersectionObserver' in window) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-counter'), 10);
            animateCounter(el, target);
            co.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => co.observe(el));
    } else {
      counters.forEach(el => {
        const target = parseInt(el.getAttribute('data-counter'), 10);
        animateCounter(el, target);
      });
    }
    function animateCounter(el, target) {
      let current = 0;
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.round(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  } catch (e) {}

  // ---- 10. BOTÃO FLUTUANTE E BARRA FIXA ----
  try {
    const mobileBar = document.getElementById('mobileBar');
    if (mobileBar) {
      // Mostrar só abaixo de 768px
      const mq = window.matchMedia('(max-width: 768px)');
      function check() {
        mobileBar.style.display = mq.matches ? 'flex' : 'none';
      }
      check();
      mq.addEventListener ? mq.addEventListener('change', check) : mq.addListener(check);
    }
  } catch (e) {}

  // ---- 11. SELETOR DE AGENDAR ----
  window.openAgendar = function() {
    try {
      const sel = document.getElementById('agendar-seletor');
      if (sel) { sel.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    } catch (e) {}
  };
  window.closeAgendar = function() {
    try {
      const sel = document.getElementById('agendar-seletor');
      if (sel) { sel.style.display = 'none'; document.body.style.overflow = ''; }
    } catch (e) {}
  };

  // ---- 12. BOTÃO A+ (fonte) ----
  window.increaseFont = function() {
    try {
      document.body.classList.toggle('font-big');
    } catch (e) {}
  };

  // ---- 13. UNIDADES (ABAS + SELO) ----
  window.showUnit = function(idx) {
    try {
      const cfg = window.ALCANCAR_CONFIG;
      if (!cfg || !cfg.unidades) return;
      const u = cfg.unidades[idx];
      if (!u) return;

      // Botões
      document.querySelectorAll('#unidades .units-tabs .tab-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
        b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });

      document.getElementById('unitTitle').textContent = u.nome;
      document.getElementById('unitAddr').textContent = u.endereco;
      document.getElementById('unitHorario').textContent = u.hora;
      document.getElementById('unitBadge').textContent = u.badge || '';
      document.getElementById('unitSelo').textContent = 'Verificando...';

      // WhatsApp links atualizados
      const waLinks = document.querySelectorAll('#unitPanel a[href*="wa.me"]');
      // Não substituimos links globais, apenas o conteúdo

      // Verificar horário (recalcular)
      const now = new Date();
      const brTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      const dia = brTime.getDay();
      const hora = brTime.getHours();
      const isWeekday = dia >= 1 && dia <= 5;
      const open = isWeekday && hora >= 7 && hora < 21;
      const selo = document.getElementById('unitSelo');
      if (selo) {
        selo.textContent = open ? 'Aberto agora' : 'Fechado agora';
        selo.style.background = open ? '#C5E6C8' : '#F5D6C8';
        selo.style.color = open ? '#2A522D' : '#7A2E12';
      }
    } catch (e) { console.error('showUnit error', e); }
  };

  // ---- 14. FORMULÁRIO RÁPIDO ----
  window.submitQuickForm = function(e) {
    try {
      e.preventDefault();
      const nome = document.getElementById('qName').value.trim();
      const unidade = document.getElementById('qUnit').value.trim();
      const servico = document.getElementById('qService').value.trim();
      const msg = document.getElementById('qMsg').value.trim();

      if (!nome) { alert('Por favor, preencha o nome.'); document.getElementById('qName').focus(); return; }
      if (!unidade) { alert('Por favor, escolha a unidade.'); document.getElementById('qUnit').focus(); return; }
      if (!servico) { alert('Por favor, escolha o serviço.'); document.getElementById('qService').focus(); return; }

      const whatsNum = unidade === 'Almenara' ? '5533999423675' : '5533999193564';
      let texto = `Olá! Meu nome é ${nome}. Gostaria de agendar ${servico} na unidade de ${unidade}.`;
      if (msg) texto += ` ${msg}`;

      const url = `https://wa.me/${whatsNum}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    } catch (err) { console.error('submitQuickForm error', err); alert('Erro ao enviar. Tente novamente.'); }
  };

  // ---- 15. VOLTAR AO TOPO (se necessário) ----
  try {
    let btn = document.querySelector('.skip-link');
  } catch (e) {}

  // ---- 17. MENU HAMBÚRGUER ----
  window.openMobileMenu = function() {
    try {
      const m = document.getElementById('mobileMenu');
      const btn = document.getElementById('hamburgerBtn');
      if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
      if (btn) btn.setAttribute('aria-expanded', 'true');
    } catch (e) {}
  };
  window.closeMobileMenu = function() {
    try {
      const m = document.getElementById('mobileMenu');
      const btn = document.getElementById('hamburgerBtn');
      if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
      if (btn) btn.setAttribute('aria-expanded', 'false');
    } catch (e) {}
  };
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const m = document.getElementById('mobileMenu');
      if (m && m.style.display === 'flex') closeMobileMenu();
    }
  });

  // ---- 16. MOSTRAR DEPOIMENTOS SE FLAG ATIVA ----
  try {
    if (window.ALCANCAR_CONFIG && window.ALCANCAR_CONFIG.showTestimonials === true) {
      const sec = document.getElementById('depoimentos');
      if (sec) sec.style.display = 'block';
    }
  } catch (e) {}

})();
