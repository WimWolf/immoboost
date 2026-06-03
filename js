/* ═══════════════════════════════════════════════════════════
   ImmoBoost AI – script.js
   Alle Funktionen: Navigation, Demo, Modals, FAQ, Copy
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── KONTAKT E-MAIL (hier anpassen) ─────────────────────── */
const CONTACT_EMAIL = 'DEINE-EMAIL-HIER-EINTRAGEN@beispiel.de';

/* ═══════════════════════════════════════════════════════════
   DOM READY
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initDemoForm();
  initResultTabs();
  initCopyButtons();
  initFAQ();
  initContactModal();
  initLegalModals();
  initHeaderScroll();
});

/* ═══════════════════════════════════════════════════════════
   MOBILE NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');

  function openNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  mobileNavClose.addEventListener('click', closeNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on overlay click
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   HEADER SCROLL EFFECT
   ═══════════════════════════════════════════════════════════ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      header.style.borderBottomColor = '';
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   TEXT GENERATORS
   ═══════════════════════════════════════════════════════════ */

/**
 * Erzeugt einen stilisierten Preis-String aus dem Eingabefeld
 */
function formatPrice(preis) {
  const num = parseFloat(preis.replace(/\./g, '').replace(',', '.'));
  if (isNaN(num)) return preis + ' €';
  return num.toLocaleString('de-DE') + ' €';
}

/**
 * Exposé-Text generieren
 */
function generateExpose(data) {
  const { objektart, stadt, preis, flaeche, zimmer, besonderheiten, zielgruppe, tonalitaet } = data;
  const preisFormatted = formatPrice(preis);
  const bes = besonderheiten ? `\n\nBesondere Highlights:\n${besonderheiten}` : '';

  const intros = {
    Premium:    `Willkommen in einem Zuhause, das Maßstäbe setzt.`,
    emotional:  `Stellen Sie sich vor, jeden Morgen in diesem außergewöhnlichen Zuhause aufzuwachen.`,
    sachlich:   `Zum Verkauf steht eine attraktive Immobilie in bevorzugter Lage.`,
    modern:     `Hier trifft zeitgemäßes Wohnen auf unvergleichlichen Komfort.`
  };

  const zielgruppenText = {
    Familie:       `ideal für Familien, die Raum, Geborgenheit und Lebensqualität suchen`,
    Investor:      `eine ausgezeichnete Kapitalanlage mit stabilen Wertsteigerungspotenzialen`,
    Paar:          `perfekt für anspruchsvolle Paare, die Stil und Komfort schätzen`,
    'Luxus-Käufer': `eine seltene Gelegenheit für höchste Ansprüche in exklusiver Umgebung`
  };

  const abschluss = {
    Premium:    `Erleben Sie, was erstklassiges Wohnen wirklich bedeutet. Vereinbaren Sie noch heute Ihre exklusive Besichtigung.`,
    emotional:  `Dieses Zuhause wartet auf Sie. Lassen Sie sich von seiner einzigartigen Atmosphäre berühren – wir freuen uns auf Ihren Anruf.`,
    sachlich:   `Für Rückfragen und Besichtigungstermine stehen wir Ihnen gerne zur Verfügung.`,
    modern:     `Seien Sie schnell – solche Chancen ergeben sich selten. Kontaktieren Sie uns für einen Termin.`
  };

  return `${intros[tonalitaet] || intros['sachlich']}

Diese ${zimmer}-Zimmer-${objektart} in ${stadt} überzeugt auf ${flaeche} m² – ${zielgruppenText[zielgruppe] || 'eine attraktive Immobilie für anspruchsvolle Käufer'}.${bes}

■ Objektart:   ${objektart}
■ Standort:    ${stadt}
■ Wohnfläche:  ${flaeche} m²
■ Zimmer:      ${zimmer}
■ Kaufpreis:   ${preisFormatted}

${abschluss[tonalitaet] || abschluss['sachlich']}`;
}

/**
 * ImmoScout-Anzeige generieren
 */
function generateImmoScout(data) {
  const { objektart, stadt, preis, flaeche, zimmer, besonderheiten, tonalitaet } = data;
  const preisFormatted = formatPrice(preis);
  const bes = besonderheiten ? `\n✦ ${besonderheiten}` : '';

  const titelMap = {
    Premium:    `Exklusive ${zimmer}-Zimmer-${objektart} in ${stadt} – Wohnen auf höchstem Niveau`,
    emotional:  `Ihr neues Traumzuhause: ${zimmer} Zimmer, ${flaeche} m² in ${stadt}`,
    sachlich:   `${zimmer}-Zimmer-${objektart}, ${flaeche} m², ${stadt}`,
    modern:     `${objektart} | ${zimmer} Zi. | ${flaeche} m² | ${stadt}`
  };

  const beschreibungen = {
    Premium:    `Diese repräsentative ${objektart} bietet Ihnen ein Wohnerlebnis der Extraklasse in einer der begehrtesten Lagen ${stadt}s.`,
    emotional:  `Hier beginnt ein neues Kapitel: Diese charmante ${objektart} in ${stadt} verbindet Wohnqualität mit Herzlichkeit.`,
    sachlich:   `Die ${objektart} befindet sich in ${stadt} und bietet auf ${flaeche} m² Wohnfläche eine solide und funktionale Raumaufteilung.`,
    modern:     `Smarter Grundriss, top Lage, zeitloses Design – diese ${objektart} in ${stadt} setzt neue Standards.`
  };

  return `═══ ImmoScout24-Anzeige ═══

TITEL:
${titelMap[tonalitaet] || titelMap['sachlich']}

BESCHREIBUNG:
${beschreibungen[tonalitaet] || beschreibungen['sachlich']}
${bes}

ECKDATEN:
▸ Objektart:    ${objektart}
▸ Wohnfläche:   ${flaeche} m²
▸ Zimmer:       ${zimmer}
▸ Ort:          ${stadt}
▸ Kaufpreis:    ${preisFormatted}

LAGE:
${stadt} – zentral gelegen mit sehr guter Infrastruktur, Einkaufsmöglichkeiten und Verkehrsanbindung.

KONTAKT:
Für weitere Informationen und Besichtigungstermine kontaktieren Sie uns gerne!`;
}

/**
 * Instagram-Caption generieren
 */
function generateInstagram(data) {
  const { objektart, stadt, preis, flaeche, zimmer, besonderheiten, zielgruppe, tonalitaet } = data;
  const preisFormatted = formatPrice(preis);
  const bes = besonderheiten ? `✨ ${besonderheiten}\n` : '';

  const emojisMap = {
    Familie:       '👨‍👩‍👧‍👦',
    Investor:      '📈',
    Paar:          '💑',
    'Luxus-Käufer': '🏆'
  };

  const emoji = emojisMap[zielgruppe] || '🏡';

  const hashtagsMap = {
    Premium:    `#LuxusImmobilien #ExklusivesWohnen #PremiumImmobilie #${stadt}Immobilien #Makler #DreamHome #Immobilienmakler`,
    emotional:  `#Traumhaus #Traumwohnung #Zuhause #Immobilien #${stadt}Leben #NewHome #Makler`,
    sachlich:   `#Immobilien #Wohnung #Haus #${stadt} #Kapitalanlage #Immobilienmakler #ZuVerkaufen`,
    modern:     `#ModernLiving #Immobilien #${stadt}Immobilien #NewHome #Design #Wohnen #Makler`
  };

  const captions = {
    Premium:    `${emoji} Exklusiv. Einzigartig. Unvergesslich.\n\nDiese ${zimmer}-Zimmer-${objektart} in ${stadt} vereint auf ${flaeche} m² alles, was Premium-Wohnen ausmacht.\n${bes}\n💰 ${preisFormatted}\n\n📩 Interesse? Link in der Bio oder direkt in unsere DMs!\n\n${hashtagsMap.Premium}`,
    emotional:  `${emoji} Das Gefühl, endlich zu Hause zu sein. 🏡\n\nDiese wunderschöne ${objektart} in ${stadt} macht träume wahr – ${zimmer} Zimmer, ${flaeche} m², pure Lebensqualität.\n${bes}\n💰 ${preisFormatted}\n\n✉️ Schreibt uns oder kommt zur Besichtigung!\n\n${hashtagsMap.emotional}`,
    sachlich:   `${emoji} Jetzt verfügbar: ${zimmer}-Zimmer-${objektart} in ${stadt}\n\n📐 ${flaeche} m² Wohnfläche\n💰 ${preisFormatted}\n${bes}\nInteresse? Gerne Termin vereinbaren.\n\n${hashtagsMap.sachlich}`,
    modern:     `${emoji} New on the market 🔥\n\n${zimmer}-Zimmer-${objektart} · ${flaeche} m² · ${stadt}\n${bes}💰 ${preisFormatted}\n\nSlide in our DMs für alle Infos. 👇\n\n${hashtagsMap.modern}`
  };

  return captions[tonalitaet] || captions['sachlich'];
}

/**
 * E-Mail an Interessenten generieren
 */
function generateEmail(data) {
  const { objektart, stadt, preis, flaeche, zimmer, besonderheiten, zielgruppe, tonalitaet } = data;
  const preisFormatted = formatPrice(preis);
  const bes = besonderheiten ? `\nBesonderheiten: ${besonderheiten}\n` : '';

  const anredeMap = {
    Premium:    `Sehr geehrte Damen und Herren,`,
    emotional:  `Liebe Interessentinnen und Interessenten,`,
    sachlich:   `Sehr geehrte Damen und Herren,`,
    modern:     `Hallo,`
  };

  const einstiegMap = {
    Premium:    `wir freuen uns, Ihnen eine außergewöhnliche Immobilie vorstellen zu dürfen, die in ihrer Exklusivität auf dem Markt ihresgleichen sucht.`,
    emotional:  `wir haben eine tolle Neuigkeit für Sie: Genau das Objekt, von dem Sie vielleicht schon länger träumen, ist jetzt verfügbar!`,
    sachlich:   `hiermit informieren wir Sie über ein Immobilienangebot, das Ihren Anforderungen entsprechen könnte.`,
    modern:     `wir haben eine interessante Immobilie für Sie, die wir Ihnen nicht vorenthalten möchten.`
  };

  const abschlussMap = {
    Premium:    `Wir würden uns freuen, Ihnen diese einzigartige Immobilie persönlich präsentieren zu dürfen. Bitte teilen Sie uns Ihren Wunschtermin für eine Besichtigung mit.\n\nMit freundlichen Grüßen\n[Ihr Name]\n[Ihr Maklerbüro]`,
    emotional:  `Wir sind überzeugt, dass Sie sich sofort wohlfühlen werden! Dürfen wir einen Besichtigungstermin für Sie arrangieren? Wir freuen uns auf Ihre Antwort.\n\nHerzliche Grüße\n[Ihr Name]\n[Ihr Maklerbüro]`,
    sachlich:   `Für Rückfragen stehen wir Ihnen selbstverständlich zur Verfügung. Bei Interesse können wir gerne einen Besichtigungstermin vereinbaren.\n\nMit freundlichen Grüßen\n[Ihr Name]\n[Ihr Maklerbüro]`,
    modern:     `Interesse geweckt? Dann melden Sie sich einfach bei uns – wir machen das unkompliziert!\n\nBeste Grüße\n[Ihr Name]\n[Ihr Maklerbüro]`
  };

  return `BETREFF: ${zimmer}-Zimmer-${objektart} in ${stadt} – ${preisFormatted}

${anredeMap[tonalitaet] || anredeMap['sachlich']}

${einstiegMap[tonalitaet] || einstiegMap['sachlich']}

━━━ Objektdetails ━━━

  Objektart:   ${objektart}
  Standort:    ${stadt}
  Wohnfläche:  ${flaeche} m²
  Zimmer:      ${zimmer}
  Kaufpreis:   ${preisFormatted}
  Zielgruppe:  ${zielgruppe}
${bes}
━━━━━━━━━━━━━━━━━━━━━

${abschlussMap[tonalitaet] || abschlussMap['sachlich']}`;
}

/**
 * WhatsApp-Nachricht generieren
 */
function generateWhatsApp(data) {
  const { objektart, stadt, preis, flaeche, zimmer, besonderheiten, tonalitaet } = data;
  const preisFormatted = formatPrice(preis);
  const bes = besonderheiten ? ` (${besonderheiten})` : '';

  const messages = {
    Premium:    `Guten Tag! 👋 Ich möchte Ihnen eine exklusive ${objektart} in ${stadt} vorstellen: ${zimmer} Zimmer, ${flaeche} m², ${preisFormatted}${bes}. Ein absolutes Premium-Objekt – ideal für höchste Ansprüche. Haben Sie Interesse an einer Besichtigung? 🏡✨`,
    emotional:  `Hallo! 😊 Ich denke, das könnte genau Ihr Traumobjekt sein: Eine wunderschöne ${objektart} in ${stadt} – ${zimmer} Zimmer, ${flaeche} m², ${preisFormatted}${bes}. Ich würde mich freuen, es Ihnen zu zeigen! Wann hätten Sie Zeit? 🏡`,
    sachlich:   `Guten Tag, ich möchte Ihnen eine ${objektart} in ${stadt} anbieten: ${zimmer} Zimmer, ${flaeche} m², Kaufpreis ${preisFormatted}${bes}. Bei Interesse vereinbaren wir gerne einen Termin.`,
    modern:     `Hey! 👋 Hab ein super Objekt für Sie: ${objektart} in ${stadt}, ${zimmer} Zi., ${flaeche} m², ${preisFormatted}${bes} – schnell weg! Interesse? Schreiben Sie mir einfach zurück. 🏠🔑`
  };

  return messages[tonalitaet] || messages['sachlich'];
}

/* ═══════════════════════════════════════════════════════════
   DEMO FORM
   ═══════════════════════════════════════════════════════════ */
function initDemoForm() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    clearFormErrors(form);

    // Validate
    const data = {
      objektart:      document.getElementById('objektart').value.trim(),
      stadt:          document.getElementById('stadt').value.trim(),
      preis:          document.getElementById('preis').value.trim(),
      flaeche:        document.getElementById('flaeche').value.trim(),
      zimmer:         document.getElementById('zimmer').value.trim(),
      besonderheiten: document.getElementById('besonderheiten').value.trim(),
      zielgruppe:     document.getElementById('zielgruppe').value.trim(),
      tonalitaet:     document.getElementById('tonalitaet').value.trim()
    };

    const errors = validateDemoForm(data);

    if (Object.keys(errors).length > 0) {
      showFormErrors(errors);
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Show loading state
    setGenerating(true);

    // Simulate brief processing delay
    setTimeout(() => {
      generateAndShowTexts(data);
      setGenerating(false);

      // Scroll to results
      const results = document.getElementById('demoResults');
      if (results) {
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  });
}

function validateDemoForm(data) {
  const errors = {};
  if (!data.objektart)  errors['objektart']   = 'Bitte wählen Sie eine Objektart aus.';
  if (!data.stadt)      errors['stadt']        = 'Bitte geben Sie eine Stadt ein.';
  if (!data.preis)      errors['preis']        = 'Bitte geben Sie einen Kaufpreis ein.';
  if (!data.flaeche)    errors['flaeche']      = 'Bitte geben Sie die Wohnfläche ein.';
  if (!data.zimmer)     errors['zimmer']       = 'Bitte geben Sie die Zimmeranzahl ein.';
  if (!data.zielgruppe) errors['zielgruppe']   = 'Bitte wählen Sie eine Zielgruppe aus.';
  if (!data.tonalitaet) errors['tonalitaet']   = 'Bitte wählen Sie eine Tonalität aus.';
  return errors;
}

function showFormErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const input = document.getElementById(field);
    const errEl = document.getElementById('err-' + field);
    if (input) input.classList.add('error');
    if (errEl) errEl.textContent = message;
  });
}

function clearFormErrors(form) {
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form__error').forEach(el => el.textContent = '');
}

function setGenerating(loading) {
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  const btn = document.getElementById('generateBtn');
  if (!btnText || !btnLoading || !btn) return;

  if (loading) {
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  } else {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    btn.disabled = false;
    btn.style.opacity = '';
  }
}

function generateAndShowTexts(data) {
  // Generate all texts
  document.getElementById('text-expose').textContent     = generateExpose(data);
  document.getElementById('text-immo').textContent       = generateImmoScout(data);
  document.getElementById('text-instagram').textContent  = generateInstagram(data);
  document.getElementById('text-email').textContent      = generateEmail(data);
  document.getElementById('text-whatsapp').textContent   = generateWhatsApp(data);

  // Show results section
  const resultsEl = document.getElementById('demoResults');
  resultsEl.style.display = 'block';

  // Reset to first tab
  switchTab('expose');
}

/* ═══════════════════════════════════════════════════════════
   RESULT TABS
   ═══════════════════════════════════════════════════════════ */
function initResultTabs() {
  const tabsContainer = document.querySelector('.results__tabs');
  if (!tabsContainer) return;

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.results__tab');
    if (!tab) return;
    switchTab(tab.dataset.tab);
  });
}

function switchTab(tabId) {
  // Update tab buttons
  document.querySelectorAll('.results__tab').forEach(t => {
    t.classList.toggle('results__tab--active', t.dataset.tab === tabId);
  });
  // Update panels
  document.querySelectorAll('.results__panel').forEach(p => {
    p.classList.toggle('results__panel--active', p.id === 'panel-' + tabId);
  });
}

/* ═══════════════════════════════════════════════════════════
   COPY BUTTONS
   ═══════════════════════════════════════════════════════════ */
function initCopyButtons() {
  // Individual copy buttons
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-target]');
    if (!copyBtn) return;

    const targetId = copyBtn.dataset.target;
    const el = document.getElementById(targetId);
    if (!el) return;

    copyText(el.textContent, copyBtn, 'Kopiert!');
  });

  // Copy all button
  const copyAllBtn = document.getElementById('copyAllBtn');
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
      const allTexts = [
        '═══ EXPOSÉ ═══\n', document.getElementById('text-expose')?.textContent || '',
        '\n\n═══ IMMOSCOUT ═══\n', document.getElementById('text-immo')?.textContent || '',
        '\n\n═══ INSTAGRAM ═══\n', document.getElementById('text-instagram')?.textContent || '',
        '\n\n═══ E-MAIL ═══\n', document.getElementById('text-email')?.textContent || '',
        '\n\n═══ WHATSAPP ═══\n', document.getElementById('text-whatsapp')?.textContent || ''
      ].join('');

      copyText(allTexts, copyAllBtn, '✓ Alle Texte kopiert!');
    });
  }
}

function copyText(text, btn, successMessage) {
  if (!text || !text.trim()) {
    showToast('⚠ Kein Text vorhanden');
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyFeedback(btn, successMessage);
    }).catch(() => {
      fallbackCopy(text, btn, successMessage);
    });
  } else {
    fallbackCopy(text, btn, successMessage);
  }
}

function fallbackCopy(text, btn, successMessage) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  ta.style.top = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopyFeedback(btn, successMessage);
  } catch (e) {
    showToast('⚠ Kopieren nicht möglich – bitte manuell kopieren.');
  }
  document.body.removeChild(ta);
}

function showCopyFeedback(btn, message) {
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = message || '✓ Kopiert!';
  btn.style.color = 'var(--green)';
  btn.style.borderColor = 'rgba(46,168,122,0.4)';

  setTimeout(() => {
    btn.textContent = original;
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2200);

  showToast('✓ Text in die Zwischenablage kopiert');
}

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════ */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ═══════════════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    const question = item.querySelector('.faq__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq__question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   CONTACT MODAL (Preise)
   ═══════════════════════════════════════════════════════════ */

// Called by pricing buttons
window.openModal = function(plan) {
  const modal = document.getElementById('contactModal');
  const subtitle = document.getElementById('modalSubtitle');
  const selectedPlan = document.getElementById('selectedPlan');
  const form = document.getElementById('contactForm');
  const success = document.getElementById('modalSuccess');

  if (!modal) return;

  if (subtitle) subtitle.textContent = `Sie haben das Paket „${plan}" gewählt. Füllen Sie das Formular aus und wir melden uns bei Ihnen.`;
  if (selectedPlan) selectedPlan.value = plan;

  // Reset form
  if (form) form.style.display = '';
  if (success) success.style.display = 'none';

  clearContactFormErrors();

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function initContactModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('contactForm');

  if (!modal) return;

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
  }

  // Overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeContactModal();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeLegalModal();
    }
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleContactSubmit();
    });
  }
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function clearContactFormErrors() {
  const fields = ['contactName', 'contactEmail'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (el) el.classList.remove('error');
    if (err) err.textContent = '';
  });
}

function handleContactSubmit() {
  clearContactFormErrors();

  const name    = document.getElementById('contactName')?.value.trim() || '';
  const email   = document.getElementById('contactEmail')?.value.trim() || '';
  const company = document.getElementById('contactCompany')?.value.trim() || '';
  const message = document.getElementById('contactMessage')?.value.trim() || '';
  const plan    = document.getElementById('selectedPlan')?.value || '';

  let hasErrors = false;

  if (!name) {
    showFieldError('contactName', 'err-contactName', 'Bitte geben Sie Ihren Namen ein.');
    hasErrors = true;
  }

  if (!email || !isValidEmail(email)) {
    showFieldError('contactEmail', 'err-contactEmail', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    hasErrors = true;
  }

  if (hasErrors) return;

  // Build mailto
  const subject = encodeURIComponent(`ImmoBoost AI – Anfrage Paket ${plan}`);
  const body = encodeURIComponent(
    `Hallo ImmoBoost AI Team,\n\nIch interessiere mich für das Paket: ${plan}\n\nMeine Kontaktdaten:\nName: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || '–'}\n\nNachricht:\n${message || '–'}\n\nBitte kontaktieren Sie mich.\n\nMit freundlichen Grüßen\n${name}`
  );

  // Open mailto
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  // Show success
  const formEl = document.getElementById('contactForm');
  const successEl = document.getElementById('modalSuccess');
  if (formEl) formEl.style.display = 'none';
  if (successEl) successEl.style.display = 'block';

  showToast('✓ E-Mail-Programm wird geöffnet …');
}

function showFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (err) err.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ═══════════════════════════════════════════════════════════
   LEGAL MODALS (Impressum / Datenschutz)
   ═══════════════════════════════════════════════════════════ */
const legalContent = {
  impressum: {
    title: 'Impressum',
    content: `
      <p><strong>Angaben gemäß § 5 TMG:</strong></p>
      <p>[Ihr Name / Unternehmensname]<br>[Straße und Hausnummer]<br>[PLZ Ort]</p>
      <p><strong>Kontakt:</strong><br>Telefon: [Ihre Telefonnummer]<br>E-Mail: [Ihre E-Mail-Adresse]</p>
      <p><strong>Umsatzsteuer-ID:</strong><br>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [Ihre USt-ID]</p>
      <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br>[Ihr Name]<br>[Adresse wie oben]</p>
      <p><strong>Streitschlichtung:</strong><br>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr</p>
    `
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    content: `
      <p><strong>1. Datenschutz auf einen Blick</strong></p>
      <p>Diese Website wird vollständig statisch betrieben. Es werden keine personenbezogenen Daten serverseitig gespeichert oder verarbeitet.</p>
      <p><strong>2. Erhebung und Speicherung personenbezogener Daten</strong></p>
      <p>Beim Ausfüllen des Kontaktformulars werden die von Ihnen eingegebenen Daten ausschließlich lokal in Ihrem Browser verwendet, um eine E-Mail über Ihr E-Mail-Programm vorzubereiten. Es findet keine serverseitige Übertragung oder Speicherung statt.</p>
      <p><strong>3. Cookies</strong></p>
      <p>Diese Website verwendet keine Cookies.</p>
      <p><strong>4. Ihre Rechte</strong></p>
      <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Wenden Sie sich dazu an: [Ihre Kontakt-E-Mail]</p>
      <p><strong>5. Verantwortlicher</strong></p>
      <p>[Ihr Name / Unternehmensname]<br>[Adresse]</p>
    `
  }
};

window.openLegal = function(type) {
  const modal = document.getElementById('legalModal');
  const title = document.getElementById('legalTitle');
  const content = document.getElementById('legalContent');

  if (!modal || !legalContent[type]) return;

  title.textContent = legalContent[type].title;
  content.innerHTML = legalContent[type].content;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function closeLegalModal() {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLegalModals() {
  const modal = document.getElementById('legalModal');
  const closeBtn = document.getElementById('legalModalClose');

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener('click', closeLegalModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLegalModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   INPUT FIELD: Clear error on interaction
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const fields = ['objektart', 'stadt', 'preis', 'flaeche', 'zimmer', 'zielgruppe', 'tonalitaet', 'besonderheiten'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const err = document.getElementById('err-' + id);
        if (err) err.textContent = '';
      });
      el.addEventListener('change', () => {
        el.classList.remove('error');
        const err = document.getElementById('err-' + id);
        if (err) err.textContent = '';
      });
    }
  });
});
