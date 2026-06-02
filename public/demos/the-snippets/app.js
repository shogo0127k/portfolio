/* The Snippets — 共有スクリプト
   表紙(index.html)と本体(patterns/index.html)の両方で読み込まれるため、
   要素が無いページでも壊れないよう全機能を存在チェックでガードしている。 */
(() => {
  const $ = id => document.getElementById(id);
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  /* ===== テーマ（全ページ共通：localStorageで永続化） ===== */
  const root = document.documentElement;
  const saved = localStorage.getItem('jsSnippetsTheme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
  const themeBtn = $('themeBtn');
  function syncTheme() {
    const dark = root.dataset.theme === 'dark';
    themeBtn?.querySelector('use')?.setAttribute('href', dark ? '#i-sun' : '#i-moon');
    const lbl = $('themeLabel');
    if (lbl) lbl.textContent = dark ? 'ライトモード' : 'ダークモード';
  }
  syncTheme();
  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('jsSnippetsTheme', root.dataset.theme);
    syncTheme();
  });

  /* ===== レベルタブ切替 ===== */
  document.querySelectorAll('.levels').forEach(group => {
    const tabs = group.querySelectorAll('.lvl');
    const panels = group.querySelectorAll('.level-panel');
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.hidden = p.dataset.lvl !== tab.dataset.lvl);
    }));
  });

  /* ===== コード言語サブタブ（HTML / CSS / JS）切替 ===== */
  document.querySelectorAll('.code-set').forEach(set => {
    const tabs = set.querySelectorAll('.ct');
    const panes = set.querySelectorAll('.code-pane');
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panes.forEach(p => p.hidden = p.dataset.l !== tab.dataset.l);
    }));
  });

  /* ===== ハンバーガー → ドロワー ===== */
  const hb = $('hamburger');
  const drawer = $('drawer');
  const overlay = $('overlay');
  function openDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    overlay?.classList.toggle('open', open);
    hb?.setAttribute('aria-expanded', open);
    drawer.setAttribute('aria-hidden', !open);
    // 背景スクロールをロック（スクロールバー幅ぶんズレるのも防ぐ）
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.style.paddingRight = open && sbw > 0 ? sbw + 'px' : '';
  }
  if (hb && drawer) {
    hb.addEventListener('click', () => openDrawer(!drawer.classList.contains('open')));
    overlay?.addEventListener('click', () => openDrawer(false));
    $('drawerClose')?.addEventListener('click', () => openDrawer(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') openDrawer(false); });
  }

  /* ===== UI / UX ビュー切替（本体ページのみ） ===== */
  const viewUI = $('view-ui');
  const viewUX = $('view-ux');
  const vsBtns = document.querySelectorAll('.viewswitch .vs');
  function setView(name) {
    if (!viewUI || !viewUX) return;
    viewUI.hidden = name !== 'ui';
    viewUX.hidden = name !== 'ux';
    vsBtns.forEach(b => {
      const on = b.dataset.view === name;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
    });
  }
  if (viewUI && viewUX) {
    // 表紙からの誘導: #ux / #ui で初期ビューを決定
    const hash = location.hash.replace('#', '');
    if (hash === 'ux' || hash === 'ui') setView(hash);
    vsBtns.forEach(b => b.addEventListener('click', () => {
      setView(b.dataset.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
    drawer?.querySelectorAll('nav a[data-target]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        setView(a.dataset.view);
        openDrawer(false);
        $(a.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ===== コピーボタン（全コードブロック） ===== */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.parentElement.querySelector('code')?.textContent ?? '';
      const use = btn.querySelector('use');
      const label = btn.querySelector('span');
      try {
        await navigator.clipboard.writeText(code);
        use?.setAttribute('href', '#i-check');
        if (label) label.textContent = 'コピーしました';
        btn.classList.add('copied');
      } catch { if (label) label.textContent = '失敗しました'; }
      setTimeout(() => {
        use?.setAttribute('href', '#i-copy');
        if (label) label.textContent = 'コピー';
        btn.classList.remove('copied');
      }, 1600);
    });
  });

  /* ===== コピーボタン デモ ===== */
  const cdb = $('copyDemoBtn');
  cdb?.addEventListener('click', async () => {
    const span = cdb.querySelector('span'), use = cdb.querySelector('use');
    try {
      await navigator.clipboard.writeText(cdb.dataset.text);
      use?.setAttribute('href', '#i-check'); if (span) span.textContent = 'コピーしました';
    } catch { if (span) span.textContent = '失敗しました'; }
    setTimeout(() => { use?.setAttribute('href', '#i-copy'); if (span) span.textContent = 'テキストをコピー'; }, 1500);
  });

  /* ===== パスワード表示切替 デモ ===== */
  const pw = $('pwDemo'), pwToggle = $('pwToggle');
  pwToggle?.addEventListener('click', () => {
    const hidden = pw.type === 'password';
    pw.type = hidden ? 'text' : 'password';
    pwToggle.querySelector('use')?.setAttribute('href', hidden ? '#i-eye-off' : '#i-eye');
    pwToggle.setAttribute('aria-label', hidden ? 'パスワードを隠す' : 'パスワードを表示');
  });

  /* ===== タブ デモ ===== */
  const tabsRoot = $('tabsDemo');
  tabsRoot?.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    tabsRoot.querySelectorAll('.panel').forEach(p => p.hidden = p.dataset.panel !== t.dataset.tab);
  }));

  /* ===== アコーディオン デモ（単一・手風琴型 / #accSingle 限定） ===== */
  (() => {
    const root = $('accSingle');
    if (!root) return;
    const items = root.querySelectorAll('details');
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    }));
  })();

  /* ===== トースト デモ（インラインonclickから呼ぶため window へ公開） ===== */
  window.showToast = function (msg) {
    const box = $('toastBox');
    if (!box) return;
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'background:#1c2330;color:#fff;padding:12px 18px;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.3);opacity:0;transform:translateY(10px);transition:.3s';
    box.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; setTimeout(() => el.remove(), 300); }, 2600);
  };

  /* ===== ツールチップ デモ ===== */
  document.querySelectorAll('.tipdemo').forEach(t => {
    const box = t.querySelector('.tipbox');
    t.addEventListener('mouseover', () => box.style.opacity = '1');
    t.addEventListener('mouseout', () => box.style.opacity = '0');
  });

  /* ===== ハンバーガー デモ（インライン例） ===== */
  const hbDemoBtn = $('hbDemoBtn'), hbDemoMenu = $('hbDemoMenu');
  hbDemoBtn?.addEventListener('click', () => {
    const open = hbDemoMenu.hidden;
    hbDemoMenu.hidden = !open;
    hbDemoBtn.setAttribute('aria-expanded', open);
    hbDemoBtn.querySelector('span').textContent = open ? '閉じる' : 'メニュー';
    hbDemoBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  });

  /* ===== フォームバリデーション デモ ===== */
  const valForm = $('valForm'), mail = $('mailDemo'), mailErr = $('mailErr');
  valForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!mail.value.trim()) { mailErr.textContent = '必須項目です'; mailErr.style.color = '#b54b3e'; }
    else if (!EMAIL_RE.test(mail.value)) { mailErr.textContent = '正しいメールアドレスを入力してください'; mailErr.style.color = '#b54b3e'; }
    else { mailErr.textContent = 'OK — 送信できます'; mailErr.style.color = '#5c7f4f'; }
  });

  /* ===== debounce デモ ===== */
  const debounce = (fn, d = 300) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };
  const dbInput = $('dbInput'), dbOut = $('dbOut');
  dbInput?.addEventListener('input', debounce(e => { dbOut.textContent = '反映: ' + e.target.value; }, 500));

  /* ===== トップへ戻る ===== */
  const gTop = $('globalToTop');
  if (gTop) {
    window.addEventListener('scroll', () => {
      gTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    gTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===================== UX デモ ===================== */
  /* UX1 スケルトン */
  $('skBtn')?.addEventListener('click', () => {
    const box = $('skBox');
    box.innerHTML = '<div class="skeleton" style="height:40px;width:40px;border-radius:50%"></div>'
      + '<div class="skeleton" style="height:13px;width:70%"></div>'
      + '<div class="skeleton" style="height:13px;width:45%"></div>';
    setTimeout(() => {
      box.innerHTML = '<div style="display:flex;gap:12px;align-items:center">'
        + '<div style="width:40px;height:40px;border-radius:50%;background:var(--accent)"></div>'
        + '<div><b>山田 太郎</b><br><span style="color:var(--muted);font-size:13px">読み込み完了しました</span></div></div>';
    }, 1300);
  });

  /* UX3 エラー状態 */
  $('errBtn')?.addEventListener('click', () => {
    const box = $('errBox');
    box.innerHTML = '<div class="skeleton" style="height:13px;width:60%"></div>';
    setTimeout(() => {
      box.innerHTML = '<div style="border:1px solid var(--border);border-radius:8px;padding:14px">'
        + '<p style="margin:0 0 10px">データを読み込めませんでした。通信環境を確認してください。</p>'
        + '<button class="btn" id="errRetry">再試行</button></div>';
      $('errRetry').addEventListener('click', () => $('errBtn').click());
    }, 900);
  });

  /* UX4 楽観的UI */
  let liked = false;
  $('likeBtn')?.addEventListener('click', async () => {
    const btn = $('likeBtn'), msg = $('likeMsg');
    const prev = liked;
    liked = !liked;
    btn.textContent = liked ? '♥ いいね済み' : '♡ いいね（30%失敗）';
    btn.classList.toggle('ghost', !liked);
    msg.textContent = '送信中…';
    await new Promise(r => setTimeout(r, 600));
    if (Math.random() < 0.3) {
      liked = prev;
      btn.textContent = liked ? '♥ いいね済み' : '♡ いいね（30%失敗）';
      btn.classList.toggle('ghost', !liked);
      msg.textContent = '通信に失敗 — 元に戻しました';
    } else {
      msg.textContent = '保存しました';
    }
  });

  /* UX5 検証タイミング（blur→以後input） */
  (() => {
    const inp = $('vtInput'), msg = $('vtMsg');
    if (!inp) return;
    let touched = false;
    const check = () => {
      const ok = EMAIL_RE.test(inp.value);
      msg.textContent = inp.value === '' ? '' : (ok ? '✓ OK' : 'メール形式が不正です');
      msg.style.color = ok ? '#5c7f4f' : '#b54b3e';
    };
    inp.addEventListener('blur', () => { touched = true; check(); });
    inp.addEventListener('input', () => { if (touched) check(); });
  })();

  /* UX6 マイクロコピー（タイポ提案＋ワンクリック適用） */
  (() => {
    const inp = $('mcInput'), msg = $('mcMsg');
    if (!inp) return;
    const FIX = { 'gmal.com':'gmail.com','gmai.com':'gmail.com','gmial.com':'gmail.com',
                  'yahoo.con':'yahoo.com','outlok.com':'outlook.com','hotmial.com':'hotmail.com' };
    inp.addEventListener('blur', () => {
      const d = inp.value.split('@')[1];
      const fixed = d && FIX[d] ? inp.value.replace(d, FIX[d]) : null;
      if (fixed) {
        msg.innerHTML = 'もしかして <button class="btn ghost" id="mcApply" style="padding:3px 10px;font-size:12px">'
          + fixed + '</button> ですか？';
        $('mcApply').addEventListener('click', () => { inp.value = fixed; msg.textContent = ''; });
      } else { msg.textContent = ''; }
    });
  })();

  /* UX7 自動保存（3状態） */
  (() => {
    const inp = $('asInput'), msg = $('asMsg');
    if (!inp) return;
    let t;
    const setStatus = s => { msg.textContent = s; };
    inp.value = localStorage.getItem('uxDraft') || '';
    inp.addEventListener('input', () => {
      setStatus('未保存'); clearTimeout(t);
      t = setTimeout(() => {
        setStatus('保存中…');
        setTimeout(() => {
          localStorage.setItem('uxDraft', inp.value);
          setStatus('すべて保存済み');
        }, 400);
      }, 800);
    });
  })();

  /* UX10 取り消せる削除 */
  (() => {
    const list = $('undoList');
    if (!list) return;
    const row = list.querySelector('li');
    const box = $('undoToast');
    let timer;
    $('undoDel').addEventListener('click', () => {
      row.hidden = true;
      box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;'
        + 'background:#1c2330;color:#fff;padding:10px 16px;border-radius:8px;max-width:320px">'
        + '<span>削除しました</span>'
        + '<button class="btn ghost" id="undoBtn" style="padding:3px 12px;color:#fff;border-color:#fff">元に戻す</button></div>';
      timer = setTimeout(() => { box.innerHTML = ''; }, 5000);
      $('undoBtn').addEventListener('click', () => {
        clearTimeout(timer); row.hidden = false; box.innerHTML = '';
      });
    });
  })();
})();
