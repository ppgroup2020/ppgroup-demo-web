const API_BASE = (window.PP_API_BASE) ? window.PP_API_BASE : ((location.origin.includes('localhost') ? 'http://localhost:3000' : location.origin) + '/api');
if (document.getElementById('btnLogin')){
  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');
  const btn = document.getElementById('btnLogin');
  const msg = document.getElementById('loginMsg');
  btn.addEventListener('click', async () => {
    const email = emailEl.value.trim();
    const password = passEl.value.trim();
    if(!email || !password){ msg.textContent = 'Preenche email e palavra-passe.'; return; }
    msg.textContent = 'A autenticar...';
    try {
      const res = await fetch(API_BASE + '/login', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if(!res.ok){ msg.textContent = data.error || 'Credenciais inválidas.'; return; }
      localStorage.setItem('ppgroup_token', data.token);
      localStorage.setItem('ppgroup_user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } catch(e){ msg.textContent = 'Falha na ligação ao servidor.'; }
  });
  [ emailEl, passEl ].forEach(el => el.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ btn.click(); } }));
}