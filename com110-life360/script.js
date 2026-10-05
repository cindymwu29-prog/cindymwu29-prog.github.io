const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('navLinks')?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
  });
});

const menu = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
if (menu && navLinks) {
  menu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
}

const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });
sections.forEach(section => { section.classList.add('reveal'); observer.observe(section); });

const progress = document.getElementById('progressBar');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// --- Final COM 110 polish: APA locators, personal communication citations, and a second visual mode ---
const researchParagraphs = document.querySelectorAll('#research .prose p');
researchParagraphs.forEach(p => {
  if (p.innerHTML.includes('<q>vastly understudied.</q>')) {
    p.innerHTML = p.innerHTML.replace(
      '<q>vastly understudied.</q>',
      '<q>vastly understudied</q> (Davis et al., 2024, Abstract).'
    );
  }
});

const teenParagraphs = document.querySelectorAll('#voices .prose p');
teenParagraphs.forEach(p => {
  if (p.innerHTML.includes('<q>remain non-continuous.</q>')) {
    p.innerHTML = p.innerHTML.replace(
      '<q>remain non-continuous.</q>',
      '<q>remain non-continuous</q> (Dereymaeker et al., 2026, Abstract).'
    );
  }
});

const quoteCards = document.querySelectorAll('#voices .quote-card');
if (quoteCards[0]) {
  const footer = quoteCards[0].querySelector('p');
  if (footer && !footer.textContent.includes('personal communication')) {
    footer.textContent = '— 15-year-old daughter (personal communication, October 2026)';
  }
}
if (quoteCards[1]) {
  const footer = quoteCards[1].querySelector('p');
  if (footer && !footer.textContent.includes('personal communication')) {
    footer.textContent = '— 13-year-old daughter, paraphrased from recorded interview (personal communication, October 2026)';
  }
}

teenParagraphs.forEach(p => {
  if (p.textContent.includes('The two interviews gave me related')) {
    if (!p.textContent.includes('15-year-old daughter, personal communication')) {
      p.innerHTML = p.innerHTML
        .replace(
          'at the same time.',
          'at the same time (15-year-old daughter, personal communication, October 2026).'
        )
        .replace(
          'when a parent feels reassured.',
          'when a parent feels reassured (13-year-old daughter, personal communication, October 2026).'
        );
    }
  }
});

// Add a visual comparison of the research numbers without treating unlike statistics as equivalent.
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid && !document.querySelector('.data-visual')) {
  const visual = document.createElement('div');
  visual.className = 'data-visual';
  visual.setAttribute('aria-labelledby', 'data-visual-title');
  visual.innerHTML = `
    <div class="data-visual-head">
      <div>
        <p class="section-label light">A second look at the numbers</p>
        <h3 id="data-visual-title">Prevalence range + study sample sizes</h3>
      </div>
      <p>These bars add visual context. The 33–69% bar shows the range reported in the Davis review. The sample-size bars compare participant counts only; they are not prevalence rates.</p>
    </div>
    <div class="prevalence-card" role="img" aria-label="Reviewed studies estimated that 33 to 69 percent of U.S. families use digital location tracking.">
      <div class="visual-label-row"><strong>Estimated U.S. family use</strong><span>33%–69%</span></div>
      <div class="range-track"><span class="range-fill"></span><i class="range-start">33%</i><i class="range-end">69%</i></div>
      <small>Davis et al. (2024)</small>
    </div>
    <div class="sample-chart" role="img" aria-label="Study sample sizes: Burnell 729 adolescents, Langlais and Marich 285 young adults, Dereymaeker 147 young people.">
      <div class="sample-row"><span>Burnell et al.</span><div class="sample-track"><b style="width:100%"></b></div><strong>729</strong></div>
      <div class="sample-row"><span>Langlais & Marich</span><div class="sample-track"><b style="width:39%"></b></div><strong>285</strong></div>
      <div class="sample-row"><span>Dereymaeker et al.</span><div class="sample-track"><b style="width:20%"></b></div><strong>147</strong></div>
    </div>`;
  statsGrid.insertAdjacentElement('afterend', visual);
}

if (!document.getElementById('dataVisualStyles')) {
  const style = document.createElement('style');
  style.id = 'dataVisualStyles';
  style.textContent = `
    .data-visual{margin-top:2.2rem;padding:1.5rem;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.035));box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
    .data-visual-head{display:grid;grid-template-columns:1fr 1.1fr;gap:1.4rem;align-items:end;margin-bottom:1.5rem}
    .data-visual-head h3{font-family:Georgia,"Times New Roman",serif;font-size:1.7rem;font-weight:500;margin:.25rem 0 0;color:#fff}
    .data-visual-head p:last-child{margin:0;color:#cbd5e1;font-size:.88rem;line-height:1.5}
    .prevalence-card{background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.11);border-radius:18px;padding:1.15rem;margin-bottom:1rem}
    .visual-label-row{display:flex;justify-content:space-between;gap:1rem;align-items:center;margin-bottom:.9rem}
    .visual-label-row strong{font-size:.92rem}.visual-label-row span{font-family:Georgia,serif;font-size:1.35rem;color:#f3dff7}
    .range-track{height:16px;background:rgba(255,255,255,.12);border-radius:999px;position:relative;margin:1.5rem 0 1.9rem}
    .range-fill{position:absolute;left:33%;width:36%;height:100%;border-radius:999px;background:linear-gradient(90deg,#bba4dd,#e8a8c7)}
    .range-start,.range-end{position:absolute;top:22px;font-size:.72rem;font-style:normal;color:#cbd5e1}.range-start{left:33%;transform:translateX(-50%)}.range-end{left:69%;transform:translateX(-50%)}
    .prevalence-card small{color:#c8d0de;font-size:.78rem}
    .sample-chart{display:grid;gap:.9rem;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:1.15rem}
    .sample-row{display:grid;grid-template-columns:155px 1fr 48px;gap:.8rem;align-items:center}.sample-row>span{font-size:.84rem;color:#d9deea}.sample-row>strong{text-align:right;font-family:Georgia,serif;font-size:1.05rem;color:#fff}
    .sample-track{height:12px;background:rgba(255,255,255,.1);border-radius:999px;overflow:hidden}.sample-track b{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#7fc8d5,#a992d2,#e09ab8)}
    @media(max-width:880px){.data-visual-head{grid-template-columns:1fr}.sample-row{grid-template-columns:120px 1fr 42px}}
    @media(max-width:560px){.data-visual{padding:1.05rem}.sample-row{grid-template-columns:1fr auto;gap:.45rem}.sample-track{grid-column:1/-1;grid-row:2}.sample-row>strong{grid-column:2;grid-row:1}}
  `;
  document.head.appendChild(style);
}