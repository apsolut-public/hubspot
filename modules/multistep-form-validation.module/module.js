(function () {
  'use strict';

  /* ── styles injected once per page regardless of
        how many times the module is dropped ── */
  var STYLE_ID = '__hscv_styles';
  if (!document.getElementById(STYLE_ID)) {
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '.hscv-err-field .hsfc-TextInput:not([type=hidden]):not([aria-hidden=true]),' +
      '.hscv-err-field .hsfc-TextareaInput{' +
        'border-color:#e51520!important;' +
        'background:#fdf3f4!important' +
      '}' +
      '.hscv-err-field .hsfc-TextInput--button{' +
        'border-color:#e51520!important;' +
        'background:#fdf3f4!important' +
      '}' +
      '.hscv-err-msg{' +
        'display:block;' +
        'font-size:13px;' +
        'color:#e51520;' +
        'margin-top:4px;' +
        'font-family:Helvetica,sans-serif' +
      '}';
    document.head.appendChild(s);
  }

  /* ── already initialised guard (module dropped twice) ── */
  if (window.__hscvActive) return;
  window.__hscvActive = true;

  /* ════════════════════════════════════════════
     HELPERS — shared across all form instances
  ════════════════════════════════════════════ */

  function getSteps(form) {
    return Array.from(form.querySelectorAll('[data-hsfc-id="Step"]'));
  }

  function getActiveIndex(steps) {
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].style.display !== 'none') return i;
    }
    return 0;
  }

  function isRequired(w) {
    /* Driven entirely by HubSpot backend settings:
       - Required field → aria-required="true" on the input
       - Required field → .hsfc-FieldLabel__RequiredIndicator in label
       No hardcoding needed. */
    if (w.querySelector('.hsfc-FieldLabel__RequiredIndicator')) return true;
    var inputs = w.querySelectorAll(
      'input:not([type=hidden]):not([aria-hidden=true]), textarea'
    );
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].getAttribute('aria-required') === 'true') return true;
    }
    return false;
  }

  function getValue(w) {
    /* HSFC custom dropdown — value lives in the hidden input */
    var dd = w.querySelector(
      '.hsfc-DropdownInput input[type="hidden"][aria-hidden="true"]'
    );
    if (dd) return dd.value.trim();

    var inp = w.querySelector(
      'input.hsfc-TextInput:not([type=hidden]):not([aria-hidden=true]):not([role=searchbox]),' +
      'textarea.hsfc-TextareaInput'
    );
    return inp ? inp.value.trim() : '';
  }

  function getType(w) {
    if (w.querySelector('.hsfc-DropdownInput'))  return 'dropdown';
    if (w.querySelector('input[type="email"]'))  return 'email';
    return 'text';
  }

  function emailOk(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  function showError(w, msg) {
    w.classList.add('hscv-err-field');
    var ex = w.querySelector('.hscv-err-msg');
    if (ex) { ex.textContent = msg; return; }
    var span = document.createElement('span');
    span.className = 'hscv-err-msg';
    span.textContent = msg;
    var footer = w.querySelector('.hsfc-FieldFooter');
    footer ? w.insertBefore(span, footer) : w.appendChild(span);
  }

  function clearError(w) {
    w.classList.remove('hscv-err-field');
    var m = w.querySelector('.hscv-err-msg');
    if (m) m.remove();
  }

  function validateStep(step) {
    var wrappers = step.querySelectorAll('[data-hsfc-id$="Field"]');
    var valid = true, firstBad = null;

    for (var i = 0; i < wrappers.length; i++) {
      var w = wrappers[i];

      if (!isRequired(w)) { clearError(w); continue; }

      var val  = getValue(w);
      var type = getType(w);
      var ok   = val !== '';
      if (ok && type === 'email') ok = emailOk(val);

      if (!ok) {
        var msg = type === 'dropdown' ? 'Please make a selection.'
                : type === 'email'    ? 'Email must be formatted correctly.'
                :                       'Please complete this required field.';
        showError(w, msg);
        valid = false;
        if (!firstBad) firstBad = w;
      } else {
        clearError(w);
      }
    }

    if (!valid && firstBad) {
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  /* ════════════════════════════════════════════
     PER-FORM INIT
     Called once for each form.hsfc-Form found,
     whether already in DOM or dynamically added.
  ════════════════════════════════════════════ */

  function initForm(form) {
    /* Skip single-page forms — they have only 1 Step */
    var steps = getSteps(form);
    if (steps.length < 2) return;

    var currentIndex = getActiveIndex(steps);
    var _processing  = false;

    function reobserve() {
      getSteps(form).forEach(function (step) {
        stepObserver.observe(step, {
          attributes: true,
          attributeFilter: ['style']
        });
      });
    }

    /* Wire up dropdown clearers for the current step */
    function attachDropdownClearers() {
      form.querySelectorAll('.hsfc-DropdownInput').forEach(function (dd) {
        if (dd._hscvWired) return;
        dd._hscvWired = true;
        var hidden = dd.querySelector('input[type="hidden"][aria-hidden="true"]');
        var list   = dd.querySelector('[role="listbox"]');
        if (!hidden || !list) return;
        list.addEventListener('click', function () {
          setTimeout(function () {
            var w = dd.closest('[data-hsfc-id$="Field"]');
            if (w && hidden.value) clearError(w);
          }, 50);
        });
      });
    }

    /* Live clear errors as the user types */
    form.addEventListener('input', function (e) {
      var w = e.target.closest('[data-hsfc-id$="Field"]');
      if (w && e.target.value.trim()) clearError(w);
    });

    /* ── MutationObserver: intercept React's display toggle ──
       React 17+ dispatches synthetic events on its own root
       container — stopPropagation on native events cannot
       cancel them. Instead we let React mutate the DOM,
       intercept via MutationObserver (microtask, pre-paint),
       reverse if invalid, re-apply if valid.           ── */
    var stepObserver = new MutationObserver(function () {
      if (_processing) return;
      stepObserver.disconnect();

      var steps    = getSteps(form);
      var newIndex = getActiveIndex(steps);

      if (newIndex === currentIndex) { reobserve(); return; }

      if (newIndex > currentIndex) {
        /* Forward navigation — validate before allowing */
        var leaving  = steps[currentIndex];
        var arriving = steps[newIndex];

        _processing = true;
        leaving.style.display  = '';
        arriving.style.display = 'none';
        _processing = false;

        if (!validateStep(leaving)) {
          /* Stay put — errors are now visible */
        } else {
          _processing = true;
          leaving.style.display  = 'none';
          arriving.style.display = '';
          _processing = false;
          currentIndex = newIndex;
          attachDropdownClearers();
        }

      } else {
        /* Back navigation — always allow */
        currentIndex = newIndex;
      }

      reobserve();
    });

    reobserve();
    attachDropdownClearers();
  }

  /* ════════════════════════════════════════════
     PAGE-LEVEL SCANNER
     Finds forms already in DOM + watches for
     forms injected later (island hydration,
     lazy-loaded sections, etc.)
  ════════════════════════════════════════════ */

  function tryInit(node) {
    /* node itself might be a form */
    if (node.matches && node.matches('form.hsfc-Form') && !node._hscvInit) {
      node._hscvInit = true;
      initForm(node);
      return;
    }
    /* or it might contain forms */
    if (node.querySelectorAll) {
      node.querySelectorAll('form.hsfc-Form').forEach(function (form) {
        if (!form._hscvInit) {
          form._hscvInit = true;
          initForm(form);
        }
      });
    }
  }

  /* Scan forms already present */
  tryInit(document.body);

  /* Watch for forms added after page load
     (HubSpot island hydration, dynamic sections) */
  var domObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) tryInit(node);
      });
    });
  });

  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

})();