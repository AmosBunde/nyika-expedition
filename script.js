// ============================================================
// NYIKA EXPEDITIONS — Booking Flow & UI Interactions
// ============================================================

(() => {
  'use strict';

  // ---------- TOUR DATA ----------
  const TOURS = {
    mara: {
      id: 1, slug: 'mara', num: '01', name: 'Maasai Mara', sub: 'Migration Corridor',
      region: 'Narok County', days: 5, nights: 4, price: 4280, season: 'Jul – Oct',
      image: 'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?w=800&q=85&auto=format&fit=crop',
      camps: ['Angama Mara', 'Mara Plains Camp', 'Saruni Mara']
    },
    amboseli: {
      id: 2, slug: 'amboseli', num: '02', name: 'Amboseli', sub: 'Under Kilimanjaro',
      region: 'Kajiado County', days: 4, nights: 3, price: 3640, season: 'Jun – Mar',
      image: 'https://images.unsplash.com/photo-1613061445510-e296bfedb73e?w=800&q=85&auto=format&fit=crop',
      camps: ['Ol Donyo Lodge', 'Tortilis Camp', 'Angama Amboseli']
    },
    samburu: {
      id: 3, slug: 'samburu', num: '03', name: 'Samburu', sub: 'The Arid North',
      region: 'Samburu County', days: 6, nights: 5, price: 5120, season: 'Year-round',
      image: 'https://images.unsplash.com/photo-1535342604578-a175d3fc4f22?w=800&q=85&auto=format&fit=crop',
      camps: ['Sasaab', 'Saruni Samburu', 'Elephant Bedroom Camp']
    },
    laikipia: {
      id: 4, slug: 'laikipia', num: '04', name: 'Laikipia', sub: 'Private Rangelands',
      region: 'Laikipia Plateau', days: 7, nights: 6, price: 6890, season: 'Year-round',
      image: 'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?w=800&q=85&auto=format&fit=crop',
      camps: ['Segera Retreat', 'Borana Lodge', 'Lewa Wilderness']
    }
  };

  const TRANSFER_NAMES = {
    heli: 'Helicopter Charter',
    bush: 'Bush Flight',
    '4x4': 'Private Land Cruiser',
    sedan: 'Private Sedan'
  };

  const TIER_MULT = { standard: 1, premium: 1.35, flagship: 1.8 };
  const TIER_LABEL = { standard: 'Standard', premium: 'Premium', flagship: 'Flagship' };

  // ---------- STATE ----------
  const state = {
    currentTour: null,
    step: 1,
    form: {
      date: '',
      travelers: 2,
      tier: 'premium',
      transfer: null,
      transferPrice: 0,
      transferSingle: false,
      flight: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      nationality: '',
      notes: ''
    }
  };

  // ---------- HELPERS ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = (n) => '$' + Math.round(n).toLocaleString();

  // ---------- NAV SCROLL ----------
  const nav = $('#nav');
  const handleScroll = () => {
    if (window.scrollY > 80) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- SCROLL REVEAL ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  $$('.tour, .method__step, .transfer, .inclusion, .credential').forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

  // ---------- BOOKING MODAL ----------
  const modal = $('#bookingModal');
  const confirmModal = $('#confirmModal');

  const openBooking = (slug) => {
    const tour = TOURS[slug];
    if (!tour) return;

    state.currentTour = tour;
    state.step = 1;
    state.form = {
      date: '', travelers: 2, tier: 'premium',
      transfer: null, transferPrice: 0, transferSingle: false,
      flight: '', time: '', name: '', email: '', phone: '', nationality: '', notes: ''
    };

    // Populate dossier
    $('#dossierNum').textContent = 'No. ' + tour.num;
    $('#dossierImg').src = tour.image;
    $('#dossierImg').alt = tour.name + ' · ' + tour.sub;
    $('#dossierRegion').textContent = tour.region;
    $('#dossierName').textContent = tour.name;
    $('#dossierSub').textContent = tour.sub;
    $('#summaryDuration').textContent = tour.days + 'd / ' + tour.nights + 'n';
    $('#seasonHint').textContent = 'Peak season ' + tour.season;

    // Populate camps
    const campsHtml = tour.camps.map((name, i) => `
      <div class="camp-item">
        <div class="camp-item__night">Night ${i + 1}</div>
        <div class="camp-item__name">${name}</div>
      </div>
    `).join('');
    $('#campsList').innerHTML = campsHtml;

    // Reset form UI
    $('#startDate').value = '';
    $('#startDate').min = new Date().toISOString().split('T')[0];
    $('#travelersCount').textContent = '2';
    $$('input[name="tier"]').forEach((r) => {
      r.checked = r.value === 'premium';
    });
    $$('input[name="transfer"]').forEach((r) => { r.checked = false; });
    $$('.options .option').forEach((opt) => {
      const input = opt.querySelector('input');
      opt.classList.toggle('is-checked', input && input.checked);
    });
    $('#flightDetails').classList.remove('is-open');
    ['flightNum', 'arrivalTime', 'fullName', 'email', 'nationality', 'phone', 'notes'].forEach((id) => {
      const el = $('#' + id);
      if (el) el.value = '';
    });

    goToStep(1);
    updateSummary();
    openModal();
  };

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openConfirm = () => {
    confirmModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeConfirm = () => {
    confirmModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  // Attach tour reserve buttons
  $$('[data-book]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openBooking(btn.dataset.book);
    });
  });
  $$('.tour').forEach((tour) => {
    tour.addEventListener('click', () => openBooking(tour.dataset.tour));
  });

  // Close handlers
  $$('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  $$('[data-close-confirm]').forEach((el) => el.addEventListener('click', closeConfirm));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeModal();
      if (confirmModal.classList.contains('is-open')) closeConfirm();
    }
  });

  // ---------- STEP NAVIGATION ----------
  const goToStep = (n) => {
    state.step = n;
    $$('.step').forEach((s) => {
      s.classList.toggle('is-active', Number(s.dataset.stepContent) === n);
    });
    $$('.modal__step').forEach((s) => {
      const sn = Number(s.dataset.step);
      s.classList.toggle('is-active', sn === n);
      s.classList.toggle('is-complete', sn < n);
    });

    $('#backLabel').textContent = n === 1 ? 'Return to expeditions' : 'Previous chapter';
    $('#nextBtn').style.display = n < 4 ? 'inline-flex' : 'none';
    $('#confirmBtn').style.display = n === 4 ? 'inline-flex' : 'none';

    if (n === 4) populateBrief();

    // Scroll modal panel to top
    const panel = $('.modal.is-open .modal__panel');
    if (panel) panel.scrollTop = 0;

    updateNextButtonState();
  };

  $('#prevBtn').addEventListener('click', () => {
    if (state.step > 1) goToStep(state.step - 1);
    else closeModal();
  });

  $('#nextBtn').addEventListener('click', () => {
    if (canAdvance()) goToStep(state.step + 1);
  });

  $('#confirmBtn').addEventListener('click', () => {
    closeModal();
    populateConfirm();
    openConfirm();
  });

  // ---------- FIELD BINDINGS ----------
  $('#startDate').addEventListener('change', (e) => {
    state.form.date = e.target.value;
    updateSummary();
    updateNextButtonState();
  });

  const updateTravelers = (n) => {
    state.form.travelers = Math.max(1, Math.min(12, n));
    $('#travelersCount').textContent = state.form.travelers;
    updateSummary();
  };
  $('[data-inc]').addEventListener('click', () => updateTravelers(state.form.travelers + 1));
  $('[data-dec]').addEventListener('click', () => updateTravelers(state.form.travelers - 1));

  $$('input[name="tier"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      state.form.tier = radio.value;
      $$('input[name="tier"]').forEach((r) => {
        r.closest('.option').classList.toggle('is-checked', r.checked);
      });
      updateSummary();
    });
  });
  // Initialize premium as checked visually
  $$('input[name="tier"]').forEach((r) => {
    r.closest('.option').classList.toggle('is-checked', r.checked);
  });

  $$('input[name="transfer"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      state.form.transfer = radio.value;
      state.form.transferPrice = Number(radio.dataset.price);
      state.form.transferSingle = radio.dataset.single === '1';
      $$('input[name="transfer"]').forEach((r) => {
        r.closest('.option').classList.toggle('is-checked', r.checked);
      });
      $('#flightDetails').classList.add('is-open');
      updateSummary();
      updateNextButtonState();
    });
  });

  ['flightNum', 'arrivalTime', 'fullName', 'email', 'nationality', 'phone', 'notes'].forEach((id) => {
    const el = $('#' + id);
    if (!el) return;
    el.addEventListener('input', () => {
      const key = {
        flightNum: 'flight',
        arrivalTime: 'time',
        fullName: 'name',
        email: 'email',
        nationality: 'nationality',
        phone: 'phone',
        notes: 'notes'
      }[id];
      state.form[key] = el.value;
      if (id === 'flightNum') state.form.flight = el.value.toUpperCase();
      updateNextButtonState();
    });
  });

  // ---------- CALCULATIONS ----------
  const calcTotals = () => {
    const t = state.currentTour;
    if (!t) return { sub: 0, transfer: 0, conservation: 0, total: 0 };

    const sub = Math.round(t.price * state.form.travelers * TIER_MULT[state.form.tier]);
    const transferMult = state.form.transferSingle ? 1 : state.form.travelers;
    const transfer = state.form.transfer ? state.form.transferPrice * transferMult : 0;
    const conservation = Math.round(sub * 0.03);
    const total = sub + transfer + conservation;

    return { sub, transfer, conservation, total };
  };

  const updateSummary = () => {
    const { sub, transfer, conservation, total } = calcTotals();
    $('#priceSub').textContent = fmt(sub);
    $('#priceConservation').textContent = fmt(conservation);
    $('#priceTotal').textContent = fmt(total);

    if (state.form.transfer) {
      $('#priceTransferRow').style.display = 'flex';
      $('#priceTransfer').textContent = fmt(transfer);
    } else {
      $('#priceTransferRow').style.display = 'none';
    }

    $('#summaryTravelers').textContent = state.form.travelers;
    $('#summaryDate').textContent = state.form.date
      ? new Date(state.form.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—';
    $('#summaryTier').textContent = TIER_LABEL[state.form.tier];
  };

  // ---------- VALIDATION ----------
  const canAdvance = () => {
    const f = state.form;
    if (state.step === 1) return !!f.date;
    if (state.step === 2) return !!f.transfer && !!f.flight && !!f.time;
    if (state.step === 3) return !!f.name && !!f.email && !!f.phone && !!f.nationality;
    return true;
  };

  const updateNextButtonState = () => {
    $('#nextBtn').disabled = !canAdvance();
  };

  // ---------- REVIEW / CONFIRM ----------
  const populateBrief = () => {
    const t = state.currentTour;
    const f = state.form;
    const { total } = calcTotals();

    $('#briefNum').textContent = 'Expedition No. ' + t.num;
    $('#briefName').textContent = t.name;
    $('#briefSub').textContent = t.sub + ' · ' + t.region;

    const rows = [
      ['Departure', f.date ? new Date(f.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
      ['Travellers', f.travelers + ' · ' + TIER_LABEL[f.tier]],
      ['Transfer', TRANSFER_NAMES[f.transfer] || '—'],
      ['Flight', f.flight ? f.flight + ' · ' + f.time : '—'],
      ['Lead guest', f.name],
      ['Contact', f.email],
      ['Mobile', f.phone],
      ['Nationality', f.nationality]
    ];

    $('#briefDetails').innerHTML = rows.map(([k, v]) => `
      <div>
        <span class="brief__k">${k}</span>
        <span>${v || '—'}</span>
      </div>
    `).join('');

    $('#briefDeposit').textContent = '50% · ' + fmt(total / 2) + ' deposit';
    $('#briefTotal').textContent = fmt(total);
  };

  const populateConfirm = () => {
    const t = state.currentTour;
    const f = state.form;
    const { total } = calcTotals();
    const refNum = 'NY-' + String(Math.floor(Math.random() * 90000) + 10000);

    $('#confirmNum').textContent = 'Reservation Confirmed · No. ' + refNum;
    $('#confirmEmail').textContent = f.email || '—';

    $('#confirmMeta').innerHTML = [
      ['Expedition', t.name],
      ['Departs', f.date ? new Date(f.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'],
      ['Party', f.travelers + ' travellers'],
      ['Total', fmt(total)]
    ].map(([k, v]) => `
      <div>
        <span class="confirm__k">${k}</span>
        <span class="confirm__v">${v}</span>
      </div>
    `).join('');
  };

  // ---------- INITIAL STATE ----------
  updateNextButtonState();
})();

// ---------- SERVICE WORKER (offline-first PWA) ----------
// Registered with a relative path so the scope is correct whether the site is
// served from a domain root or a GitHub Pages project subpath (/nyika-expedition/).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* Registration failures are non-fatal — the site works without the SW. */
    });
  });
}
