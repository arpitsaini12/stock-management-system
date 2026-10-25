/* StockPilot frontend demo. Replace this local data adapter with API calls when a backend is ready. */
const glyphs = {
  dashboard: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="8" height="7" rx="1.5"/>',
  products: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
  categories: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  inventory: '<path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4.5 7.8 7.5 4.4 7.5-4.4M12 12.2V21M8 5.3l8 4.5"/>',
  movements: '<path d="M4 7h15m0 0-4-4m4 4-4 4M20 17H5m0 0 4-4m-4 4 4 4"/>',
  suppliers: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 8v6m3-3h-6"/>',
  purchases: '<path d="M3 3h2l2.3 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  sales: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  warehouses: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-8h6v8M3 10h18"/>',
  reports: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 6-7"/>',
  settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" transform="translate(-2 -2)"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  logout: '<path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  box: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v8l9 5 9-5V8M12 13v8"/>',
  alert: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0ZM12 9v4m0 4h.01"/>',
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>'
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name] || glyphs.box}</svg>`;
const { formatCurrency, today, formatDate, escapeHtml } = window.StockPilotUtils;
const fmt = value => formatCurrency(value, db?.settings?.currency || 'INR');
const dateNow = today;
const dateDisplay = value => formatDate(value, db?.settings?.dateFormat || 'DD MMM YYYY');
const STORE_KEY = 'stockpilot-demo-v1';
const USERS_KEY = 'stockpilot-demo-users-v1';
const SESSION_KEY = 'stockpilot-demo-session-v1';
const seed = window.StockPilotMockData;
const demoAccounts = [
  { id: 'admin-demo', name: 'Arjun Kapoor', email: 'admin@stockpilot.in', password: 'admin123', role: 'Admin', active: true },
  { id: 'employee-demo', name: 'Ananya Mehta', email: 'employee@stockpilot.in', password: 'employee123', role: 'Employee', active: true }
];

function loadAccounts() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    if (!saved) return structuredClone(demoAccounts);
    const savedAccounts = JSON.parse(saved);
    if (!Array.isArray(savedAccounts)) throw new Error('Saved demo accounts are not a list.');
    const builtInEmails = new Set(demoAccounts.map(account => account.email.toLowerCase()));
    const userAccounts = savedAccounts.filter(account =>
      account &&
      typeof account.id === 'string' &&
      typeof account.name === 'string' &&
      typeof account.email === 'string' &&
      typeof account.password === 'string' &&
      !builtInEmails.has(account.email.toLowerCase()) &&
      !demoAccounts.some(builtIn => builtIn.id === account.id)
    );
    return [...structuredClone(demoAccounts), ...userAccounts];
  } catch (error) {
    console.warn('Using the built-in demo accounts because local accounts could not be read.', error);
    return structuredClone(demoAccounts);
  }
}

function loadDemo() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (!saved) return structuredClone(seed);
    const parsed = JSON.parse(saved);
    return { ...structuredClone(seed), ...parsed, settings: { ...seed.settings, ...(parsed.settings || {}) } };
  } catch (error) {
    console.warn('Using sample data because saved demo data could not be read.', error);
    return structuredClone(seed);
  }
}
let db = loadDemo();
let accounts = loadAccounts();
let currentUser = null;
let page = 'Dashboard';
let query = '';
let productCategory = 'All categories';
let productStatus = 'All statuses';
let movementType = 'All movement types';
let sort = { key: 'name', direction: 'asc' };
let pageNumber = 1;
let pageSize = 8;
let activeWarehouse = null;
let chartPeriod = 'Last 30 days';
let reportDateRange = 'Last 30 days';
let reportCategoryFilter = 'All categories';
let toastTimeout;

function saveDemo() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); }
  catch (error) { console.warn('Demo changes are available until this page is closed.', error); toast('Could not save changes in this browser.'); }
}
function saveAccounts() {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
    return true;
  } catch (error) {
    console.warn('Employee changes could not be saved in this browser.', error);
    toast('Could not save employee accounts locally.');
    return false;
  }
}
function signOut() {
  currentUser = null;
  try { localStorage.removeItem(SESSION_KEY); }
  catch (error) { console.warn('The demo session could not be cleared from this browser.', error); }
  page = 'Dashboard';
  render();
}
const productById = id => db.products.find(product => product.id === id);
const productQty = product => Object.values(product.stock).reduce((sum, qty) => sum + qty, 0);
const statusOf = product => productQty(product) === 0 ? 'Out of Stock' : productQty(product) <= product.min ? 'Low Stock' : 'In Stock';
const inventoryValue = () => db.products.reduce((sum, product) => sum + productQty(product) * product.purchase, 0);
const categories = () => [...new Set([...db.categories, ...db.products.map(product => product.category)])];
const statusBadge = status => `<span class="badge ${status.toLowerCase().replaceAll(' ', '-')}">${escapeHtml(status)}</span>`;
const productLabel = id => productById(id)?.name || 'Unknown product';
const pageTitle = {
  Dashboard: ['Dashboard', 'A clear view of your stock, purchasing, and day-to-day operations.'],
  Products: ['Products', 'Manage your catalogue, pricing, and stock thresholds.'],
  Categories: ['Categories', 'Organise your catalogue with clear product groupings.'],
  Inventory: ['Inventory', 'Stock levels across every warehouse, in one place.'],
  'Stock Movements': ['Stock Movements', 'A complete, traceable history of inventory activity.'],
  Suppliers: ['Suppliers', 'Your supplier directory and purchasing partners.'],
  'Purchase Orders': ['Purchase Orders', 'Create orders and track incoming stock.'],
  'Sales & Stock Issues': ['Sales & Stock Issues', 'Review sales and demo stock issue transactions.'],
  Warehouses: ['Warehouses', 'Manage locations and move stock between them.'],
  Reports: ['Reports', 'Inventory performance and operational summaries.'],
  Settings: ['Settings', 'Set local preferences for this StockPilot demo.'],
  Employees: ['Employees', 'Create and manage employee sign-in accounts for this local demo.']
};
const allNavItems = Object.keys(pageTitle);
const employeePages = ['Dashboard', 'Products', 'Inventory', 'Stock Movements', 'Sales & Stock Issues'];
const navItems = () => currentUser?.role === 'Admin' ? allNavItems : employeePages;
const canAdminister = () => currentUser?.role === 'Admin';

function render() {
  if (!currentUser) {
    renderLogin();
    return;
  }
  if (!navItems().includes(page)) page = 'Dashboard';
  const p = pageTitle[page] || pageTitle.Dashboard;
  document.title = `${p[0]} · StockPilot`;
  const displayName = escapeHtml(currentUser.name);
  const initials = currentUser.name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
  document.getElementById('app').innerHTML = `
    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#" data-page="Dashboard"><span class="logo">${icon('products')}</span><span>stock<span class="brand-light">pilot</span><small>INVENTORY CONTROL</small></span></a>
        <div class="workspace"><span class="workspace-avatar">S</span><span><strong>${escapeHtml(db.settings.business)}</strong><small>DEMO WORKSPACE</small></span><button class="workspace-more" data-action="workspace">${icon('more')}</button></div>
        <nav class="nav">${navItems().map(item => `<button class="nav-link ${page === item ? 'selected' : ''}" data-page="${item}">${icon(navIcon(item))}<span>${item}</span>${item === 'Inventory' && lowCount() ? `<i>${lowCount()}</i>` : ''}</button>`).join('')}</nav>
        <div class="sidebar-bottom"><div class="demo-note"><span class="demo-pulse"></span><span><strong>Demo environment</strong><small>Sample data · Changes stay local</small></span></div><button class="user-menu" data-action="profile"><span class="user-avatar">${initials}</span><span><strong>${displayName}</strong><small>${currentUser.role} · Demo account</small></span>${icon('logout')}</button></div>
      </aside>
      <div class="mobile-scrim" data-action="close-menu"></div>
      <main class="main"><header class="topbar"><button class="icon-button mobile-toggle" data-action="toggle-menu" aria-label="Open navigation">${icon('menu')}</button><div class="crumb">Workspace <span>/</span> <strong>${escapeHtml(page)}</strong></div><div class="topbar-actions"><label class="search"><span>${icon('search')}</span><input id="global-search" type="search" placeholder="Search products, SKU..." value="${escapeHtml(query)}" aria-label="Search current page"><kbd>⌘ K</kbd></label><button class="icon-button notification" data-action="notifications" aria-label="Notifications">${icon('bell')}<i></i></button><span class="top-divider"></span><button class="top-profile" data-action="profile"><span class="user-avatar">${initials}</span><span><strong>${displayName}</strong><small>${currentUser.role}</small></span>${icon('chevron')}</button></div></header>
        <div class="page-wrap"><div class="page-heading"><div><div class="eyebrow">${page === 'Dashboard' ? 'MONDAY, 26 OCTOBER 2026' : 'WORKSPACE / ' + page.toUpperCase()}</div><h1>${p[0]}</h1><p>${p[1]}</p></div><div class="heading-buttons">${pageActions()}</div></div><div id="page-content">${renderPage()}</div></div>
      </main>
      <div id="modal-root"></div><div id="toast-root"></div>
    </div>`;
  wire();
}

function renderLogin() {
  document.title = 'Sign in · StockPilot';
  document.getElementById('app').innerHTML = `
    <main class="auth-layout">
      <section class="auth-brand-panel">
        <a class="auth-brand" href="#"><span class="logo">${icon('products')}</span><span>stock<span class="brand-light">pilot</span><small>INVENTORY CONTROL</small></span></a>
        <div class="auth-story"><span class="eyebrow">Inventory, in sync</span><h1>Know your stock.<br>Move with confidence.</h1><p>One clear view of your products, warehouse stock, and daily inventory work.</p><div class="auth-proof"><span>${icon('inventory')}</span><div><strong>One workspace. Clear roles.</strong><small>Admin control with focused employee access.</small></div></div></div>
        <div class="auth-foot">Frontend demonstration · Sample data · No server sign-in</div>
      </section>
      <section class="auth-main"><form class="auth-form" id="login-form">
        <span class="auth-kicker">STOCKPILOT WORKSPACE</span><h2>Welcome back</h2><p>Sign in with your demo account to continue.</p>
        <label class="form-field">Work email<input id="login-email" name="email" type="email" autocomplete="username" placeholder="you@company.in" required></label>
        <label class="form-field">Password<input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Enter password" required></label>
        <div class="login-error" id="login-error" role="alert"></div><button class="btn btn-primary auth-submit" type="submit">Sign in ${icon('chevron')}</button>
        <div class="demo-account-list"><div class="demo-account-title">DEMO ACCOUNTS</div>
          <button type="button" class="demo-account" data-demo-account="admin"><span class="demo-role-icon admin-role">A</span><span><strong>Administrator</strong><small>Full workspace access</small></span><span class="demo-fill">Use account →</span></button>
          <button type="button" class="demo-account" data-demo-account="employee"><span class="demo-role-icon employee-role">E</span><span><strong>Employee</strong><small>Inventory operations only</small></span><span class="demo-fill">Use account →</span></button>
        </div>
        <div class="auth-disclaimer">${icon('alert')} Demo sign-in is for preview only. It is not secure authentication; do not use real passwords.</div>
      </form></section>
    </main>`;
  document.querySelectorAll('[data-demo-account]').forEach(button => button.addEventListener('click', () => {
    const account = button.dataset.demoAccount === 'admin' ? demoAccounts[0] : demoAccounts[1];
    document.getElementById('login-email').value = account.email;
    document.getElementById('login-password').value = account.password;
  }));
  document.getElementById('login-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim().toLowerCase();
    const password = String(form.get('password'));
    const account = accounts.find(item => item.email.toLowerCase() === email && item.password === password && item.active !== false);
    if (!account) {
      document.getElementById('login-error').textContent = 'We couldn’t match that email and password. Check your details or choose a demo account.';
      return;
    }
    currentUser = account;
    try { localStorage.setItem(SESSION_KEY, account.id); }
    catch (error) { console.warn('This browser cannot remember the demo session.', error); }
    page = 'Dashboard';
    query = '';
    render();
  });
}

function navIcon(item) {
  return ({ Dashboard: 'dashboard', Products: 'products', Categories: 'categories', Inventory: 'inventory', 'Stock Movements': 'movements', Suppliers: 'suppliers', 'Purchase Orders': 'purchases', 'Sales & Stock Issues': 'sales', Warehouses: 'warehouses', Reports: 'reports', Settings: 'settings', Employees: 'suppliers' })[item];
}
function pageActions() {
  if (page === 'Dashboard') return canAdminister() ? `<button class="btn btn-outline" data-action="export-report">${icon('download')} Export report</button><button class="btn btn-primary" data-modal="product">${icon('plus')} Add product</button>` : '<span class="role-note">Employee access · inventory tasks</span>';
  if (page === 'Products') return canAdminister() ? `<button class="btn btn-outline" data-action="export-products">${icon('download')} Export CSV</button><button class="btn btn-primary" data-modal="product">${icon('plus')} Add product</button>` : '<span class="role-note">Read-only product catalogue</span>';
  if (page === 'Inventory') return canAdminister() ? `<button class="btn btn-outline" data-modal="adjust">${icon('movements')} Adjust stock</button>` : `<button class="btn btn-primary" data-modal="receive">${icon('plus')} Receive stock</button>`;
  if (page === 'Stock Movements') return canAdminister() ? `<button class="btn btn-outline" data-modal="adjust">${icon('movements')} Adjust stock</button>` : `<button class="btn btn-primary" data-modal="issue">${icon('plus')} Record stock issue</button>`;
  if (page === 'Suppliers') return canAdminister() ? `<button class="btn btn-primary" data-modal="supplier">${icon('plus')} Add supplier</button>` : '';
  if (page === 'Purchase Orders') return canAdminister() ? `<button class="btn btn-primary" data-modal="purchase">${icon('plus')} New purchase order</button>` : '';
  if (page === 'Sales & Stock Issues') return `<button class="btn btn-primary" data-modal="issue">${icon('plus')} Record stock issue</button>`;
  if (page === 'Warehouses') return `<button class="btn btn-outline" data-modal="transfer">${icon('movements')} Transfer stock</button><button class="btn btn-primary" data-modal="warehouse">${icon('plus')} Add warehouse</button>`;
  if (page === 'Categories') return `<button class="btn btn-primary" data-modal="category">${icon('plus')} Add category</button>`;
  if (page === 'Reports') return `<button class="btn btn-outline" data-action="export-report">${icon('download')} Export report</button>`;
  if (page === 'Employees') return `<button class="btn btn-primary" data-modal="employee">${icon('plus')} Add employee</button>`;
  return '';
}
function lowCount() { return db.products.filter(p => statusOf(p) === 'Low Stock').length; }
function totalUnits() { return db.products.reduce((sum, p) => sum + productQty(p), 0); }
function quickAction(label, modal, iconName) { return `<button class="quick-action" data-modal="${modal}"><span>${icon(iconName)}</span><span>${label}</span>${icon('chevron')}</button>`; }
function metric(label, value, iconName, tone, note, trend = '') {
  return `<article class="metric"><div class="metric-top"><span>${label}</span><span class="metric-icon ${tone}">${icon(iconName)}</span></div><div class="metric-value">${value}</div><div class="metric-note">${trend ? `<b class="${trend}">${trend === 'positive' ? '↗' : '•'} ${trend === 'positive' ? '8.2%' : 'Needs attention'}</b>` : ''}${note}</div></article>`;
}
function renderPage() {
  switch (page) {
    case 'Dashboard': return dashboardPage();
    case 'Products': return productsPage();
    case 'Categories': return categoriesPage();
    case 'Inventory': return inventoryPage();
    case 'Stock Movements': return movementsPage();
    case 'Suppliers': return suppliersPage();
    case 'Purchase Orders': return purchasePage();
    case 'Sales & Stock Issues': return salesPage();
    case 'Warehouses': return warehousesPage();
    case 'Reports': return reportsPage();
    case 'Settings': return settingsPage();
    case 'Employees': return employeesPage();
    default: return dashboardPage();
  }
}
function dashboardPage() {
  const lowProducts = db.products.filter(p => statusOf(p) !== 'In Stock').slice(0, 5);
  const recent = db.movements.slice(0, 5);
  const orders = db.orders.filter(o => ['Ordered', 'Partially Received'].includes(o.status)).slice(0, 4);
  const dashboardMetrics = canAdminister()
    ? `${metric('Total Products','1,248','products','blue','<span class="muted">in active catalogue</span>','positive')}${metric('Total Stock Units','8,642','inventory','violet','<span class="muted">across 3 warehouses</span>','positive')}${metric('Inventory Value','₹12,48,500','reports','green','<span class="muted">at purchase cost</span>','positive')}${metric('Low Stock Items','24','alert','amber','<span class="muted">below reorder level</span>','attention')}${metric('Out of Stock','8','box','red','<span class="muted">across 5 categories</span>','attention')}${metric('Pending Purchase Orders','12','purchases','blue','<span class="muted">₹4,82,300 total</span>','')}`
    : `${metric('Total Products',db.products.filter(product=>!product.archived).length.toLocaleString('en-IN'),'products','blue','<span class="muted">in active catalogue</span>')}${metric('Total Stock Units',totalUnits().toLocaleString('en-IN'),'inventory','violet','<span class="muted">across all warehouses</span>')}${metric('Low Stock Items',lowCount(),'alert','amber','<span class="muted">below reorder level</span>','attention')}${metric('Out of Stock',db.products.filter(product=>statusOf(product)==='Out of Stock').length,'box','red','<span class="muted">need replenishment</span>','attention')}`;
  return `<div class="demo-banner"><span class="info-dot">i</span><span><strong>Demo mode</strong> &nbsp; Explore safely — changes are stored only in this browser.</span><button data-action="dismiss-banner" aria-label="Dismiss">×</button></div>
  <div class="metrics">${dashboardMetrics}</div>
  <section class="panel quick-panel"><div class="section-title"><div><h2>Quick actions</h2><p>${canAdminister() ? 'Common inventory tasks, right at your fingertips.' : 'Inventory tasks available to your employee account.'}</p></div></div><div class="quick-grid">${canAdminister() ? quickAction('Add product','product','plus') : ''}${quickAction('Receive stock','receive','inventory')}${canAdminister() ? quickAction('Create purchase order','purchase','purchases') : ''}${quickAction('Record stock issue','issue','sales')}${canAdminister() ? quickAction('Transfer stock','transfer','movements') : ''}</div></section>
  <div class="dashboard-grid"><section class="panel chart-panel"><div class="section-title"><div><h2>Inventory movement</h2><p>Stock activity · ${chartPeriod.toLowerCase()}</p></div><select class="select compact" id="chart-range">${['Last 30 days','Last 7 days','This year'].map(range=>`<option ${range===chartPeriod?'selected':''}>${range}</option>`).join('')}</select></div>${movementChart()}</section><section class="panel category-panel"><div class="section-title"><div><h2>Stock by category</h2><p>Available units · 6 categories</p></div>${canAdminister() ? `<button class="link-button" data-page="Categories">View all ${icon('chevron')}</button>` : ''}</div>${categoryDistribution()}</section></div>
  <div class="dashboard-grid lower-grid"><section class="panel"><div class="section-title"><div><h2>Recent stock transactions</h2><p>Latest inventory movement across locations</p></div><button class="link-button" data-page="Stock Movements">View all ${icon('chevron')}</button></div>${movementTable(recent, true)}</section><section class="panel"><div class="section-title"><div><h2>Low-stock products</h2><p>Items that may need attention</p></div><button class="link-button" data-page="Inventory">View inventory ${icon('chevron')}</button></div>${lowTable(lowProducts)}</section></div>
  ${canAdminister() ? `<section class="panel dashboard-orders"><div class="section-title"><div><h2>Recent purchase orders</h2><p>Keep an eye on incoming deliveries</p></div><button class="link-button" data-page="Purchase Orders">All purchase orders ${icon('chevron')}</button></div>${purchaseTable(orders, true)}</section>` : ''}`;
}
function movementChart() {
  const labels = chartPeriod === 'Last 7 days' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : chartPeriod === 'This year' ? ['Jan','Mar','May','Jul','Sep','Oct'] : ['01 Oct','05 Oct','10 Oct','15 Oct','20 Oct','25 Oct'];
  const inbound = chartPeriod === 'Last 7 days' ? [42,58,37,76,61,83,68] : chartPeriod === 'This year' ? [39,53,47,72,64,91] : [34,62,46,78,59,91];
  const outbound = chartPeriod === 'Last 7 days' ? [55,35,63,49,72,43,60] : chartPeriod === 'This year' ? [50,42,63,46,70,55] : [57,39,65,48,71,54];
  const line = vals => vals.map((v, i) => `${46 + i * 67},${142 - v}`).join(' ');
  return `<div class="chart-legend"><span><i class="legend-dot inbound"></i> Stock received</span><span><i class="legend-dot outbound"></i> Stock issued</span></div><div class="chart-wrap"><svg viewBox="0 0 420 178" role="img" aria-label="Stock received and issued over time"><defs><linearGradient id="inboundFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4068a8" stop-opacity=".16"/><stop offset="1" stop-color="#4068a8" stop-opacity="0"/></linearGradient></defs>${[28,66,104,142].map(y=>`<line class="gridline" x1="40" y1="${y}" x2="407" y2="${y}"/>`).join('')}<polygon points="46,142 ${line(inbound)} 381,142" fill="url(#inboundFill)"/><polyline points="${line(inbound)}" class="chart-line blue-line"/> <polyline points="${line(outbound)}" class="chart-line orange-line"/>${labels.map((l,i)=>`<text x="${36+i*67}" y="165">${l}</text>`).join('')}</svg></div>`;
}
function categoryDistribution() {
  const data = categories().map(name => ({ name, qty: db.products.filter(p => p.category === name).reduce((s,p)=>s+productQty(p),0) })).sort((a,b)=>b.qty-a.qty).slice(0,6);
  const colors = ['#456baa','#70a995','#d7a64a','#8b78b8','#5c9ba7','#cd806e'];
  const max = Math.max(1, ...data.map(x=>x.qty));
  return `<div class="category-list">${data.map((item,i)=>`<div class="category-row"><span class="category-color" style="background:${colors[i]}"></span><span class="category-name">${escapeHtml(item.name)}</span><strong>${item.qty.toLocaleString('en-IN')}</strong><div class="category-bar"><i style="width:${Math.max(3,item.qty/max*100)}%;background:${colors[i]}"></i></div></div>`).join('')}</div>`;
}
function tableWrap(headers, rows, empty = 'No matching records found.') {
  return `<div class="table-scroll"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows || `<tr><td colspan="${headers.length}" class="empty">${empty}</td></tr>`}</tbody></table></div>`;
}
function movementTable(items, compact = false) {
  const rows = items.map(m=>`<tr data-detail-movement="${m.id}"><td><span class="type-mark ${movementTone(m.type)}">${icon(movementIcon(m.type))}</span></td><td><strong>${escapeHtml(productLabel(m.productId))}</strong><small class="sub-cell">${escapeHtml(m.id)} · ${escapeHtml(m.type)}</small></td><td class="${m.qty > 0 ? 'qty-plus' : 'qty-minus'}">${m.qty > 0 ? '+' : ''}${m.qty}</td><td>${escapeHtml(m.warehouse)}</td><td>${dateDisplay(m.date)}</td></tr>`).join('');
  return tableWrap(['','PRODUCT / REFERENCE','QTY','WAREHOUSE','DATE'], rows, 'No stock movements yet.');
}
function lowTable(items) {
  const rows = items.map(p=>`<tr><td><strong>${escapeHtml(p.name)}</strong><small class="sub-cell">${escapeHtml(p.sku)}</small></td><td>${productQty(p)}</td><td>${p.min}</td><td>${statusBadge(statusOf(p))}</td>${canAdminister() ? `<td><button class="row-action" data-modal="purchase" data-prefill-product="${p.id}" aria-label="Reorder ${escapeHtml(p.name)}">Order</button></td>` : ''}</tr>`).join('');
  return tableWrap(canAdminister() ? ['PRODUCT','IN STOCK','MINIMUM','STATUS',''] : ['PRODUCT','IN STOCK','MINIMUM','STATUS'], rows, 'All products are above their minimum stock level.');
}
function purchaseTable(items, compact = false) {
  const rows = items.map(o=>`<tr><td><strong>${escapeHtml(o.id)}</strong></td><td>${escapeHtml(o.supplier)}</td><td>${dateDisplay(o.date)}</td><td>${o.items.length} items</td><td>${fmt(orderTotal(o))}</td><td>${statusBadge(o.status)}</td></tr>`).join('');
  return tableWrap(['REFERENCE','SUPPLIER','ORDER DATE','ITEMS','TOTAL','STATUS'], rows, 'No purchase orders yet.');
}
function productSearchFilter() {
  const q = query.toLowerCase();
  return db.products.filter(p => (!q || `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)) && (productCategory === 'All categories' || p.category === productCategory) && (productStatus === 'All statuses' || statusOf(p) === productStatus));
}
function productsPage() {
  const filtered = productSearchFilter().filter(p=>!p.archived);
  const key = sort.key;
  filtered.sort((a,b) => {
    let av = key === 'qty' ? productQty(a) : key === 'purchase' ? a.purchase : key === 'selling' ? a.selling : key === 'category' ? a.category : key === 'status' ? statusOf(a) : a.name;
    let bv = key === 'qty' ? productQty(b) : key === 'purchase' ? b.purchase : key === 'selling' ? b.selling : key === 'category' ? b.category : key === 'status' ? statusOf(b) : b.name;
    return (av > bv ? 1 : av < bv ? -1 : 0) * (sort.direction === 'asc' ? 1 : -1);
  });
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  pageNumber = Math.min(pageNumber, pages);
  const showing = filtered.slice((pageNumber-1)*pageSize, pageNumber*pageSize);
  const rows = showing.map(p=>`<tr><td><div class="product-cell"><span class="product-monogram">${escapeHtml(p.name.split(' ').slice(0,2).map(x=>x[0]).join(''))}</span><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.description)}</small></span></div></td><td class="mono">${escapeHtml(p.sku)}</td><td>${escapeHtml(p.category)}</td><td><strong>${productQty(p).toLocaleString('en-IN')}</strong></td>${canAdminister()?`<td>${fmt(p.purchase)}</td>`:''}<td>${fmt(p.selling)}</td><td>${statusBadge(statusOf(p))}</td><td><div class="actions-cell"><button data-view-product="${p.id}" aria-label="View ${escapeHtml(p.name)}">View</button>${canAdminister()?`<button data-edit-product="${p.id}" aria-label="Edit ${escapeHtml(p.name)}">Edit</button><button data-archive-product="${p.id}" aria-label="Archive ${escapeHtml(p.name)}">${icon('more')}</button>`:''}</div></td></tr>`).join('');
  return `<div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search by name, SKU..." aria-label="Search products"></div><select class="select" id="category-filter"><option>All categories</option>${categories().map(c=>`<option ${productCategory===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}</select><select class="select" id="status-filter"><option>All statuses</option>${['In Stock','Low Stock','Out of Stock'].map(s=>`<option ${productStatus===s?'selected':''}>${s}</option>`).join('')}</select><span class="result-count">${filtered.length} products</span></div>
  <section class="panel table-panel product-table">${tableWrap([sortHeader('name','PRODUCT'), 'SKU',sortHeader('category','CATEGORY'),sortHeader('qty','STOCK QTY'),...(canAdminister()?[sortHeader('purchase','PURCHASE PRICE')]:[]),sortHeader('selling','SELLING PRICE'),sortHeader('status','STATUS'),'ACTIONS'],rows,'No products match these filters.') }<div class="pagination"><span>Showing <strong>${filtered.length?((pageNumber-1)*pageSize+1):0}–${Math.min(pageNumber*pageSize,filtered.length)}</strong> of <strong>${filtered.length}</strong> products</span><div><button data-page-number="${Math.max(1,pageNumber-1)}" ${pageNumber===1?'disabled':''}>Previous</button>${Array.from({length:pages},(_,i)=>`<button class="${pageNumber===i+1?'current':''}" data-page-number="${i+1}">${i+1}</button>`).join('')}<button data-page-number="${Math.min(pages,pageNumber+1)}" ${pageNumber===pages?'disabled':''}>Next</button></div></div></section>`;
}
function sortHeader(key,label) { return `<th><button class="sort-button" data-sort="${key}">${label}${sort.key===key?(sort.direction==='asc'?' ↑':' ↓'):' ↕'}</button></th>`; }
function inventoryPage() {
  const q = query.toLowerCase();
  const rows = db.products.filter(p=>!q||`${p.name} ${p.sku}`.toLowerCase().includes(q)).flatMap(p=>db.warehouses.map(w=>{
    const qty=p.stock[w.name]||0, state=qty===0?'Out of Stock':qty<=p.min?'Low Stock':'In Stock';
    return `<tr><td><strong>${escapeHtml(p.name)}</strong><small class="sub-cell">${escapeHtml(p.sku)}</small></td><td>${escapeHtml(w.name)}</td><td><strong>${qty}</strong></td><td>${p.min}</td><td>${statusBadge(state)}</td><td>${dateDisplay(p.updated)}</td><td>${canAdminister()?`<button class="row-action" data-adjust-product="${p.id}" data-warehouse="${escapeHtml(w.name)}">Adjust</button>`:'Read only'}</td></tr>`;
  })).join('');
  return `<div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search product or SKU..." aria-label="Search inventory"></div><span class="result-count">${db.products.length} products · ${db.warehouses.length} warehouses</span></div><section class="panel table-panel">${tableWrap(['PRODUCT','WAREHOUSE','AVAILABLE QTY','MINIMUM','STATUS','LAST UPDATED','ACTION'],rows,'No inventory records found.')}</section>`;
}
function movementTypeForFilter(m) { return movementType==='All movement types'||m.type===movementType; }
function movementsPage() {
  const types=['Opening Stock','Stock Received','Stock Issue','Stock Adjustment','Warehouse Transfer','Customer Return'];
  const start=document.getElementById('movement-from')?.value||'';
  const end=document.getElementById('movement-to')?.value||'';
  const q=query.toLowerCase();
  const rows=db.movements.filter(m=>movementTypeForFilter(m)&&(!q||`${m.id} ${productLabel(m.productId)} ${m.reference}`.toLowerCase().includes(q))&&(!start||m.date>=start)&&(!end||m.date<=end)).map(m=>`<tr data-detail-movement="${m.id}"><td class="mono">${escapeHtml(m.id)}</td><td><span class="type-label"><span class="type-mark ${movementTone(m.type)}">${icon(movementIcon(m.type))}</span>${escapeHtml(m.type)}</span></td><td><strong>${escapeHtml(productLabel(m.productId))}</strong><small class="sub-cell">${escapeHtml(productById(m.productId)?.sku||'')}</small></td><td class="${m.qty>0?'qty-plus':'qty-minus'}">${m.qty>0?'+':''}${m.qty}</td><td>${escapeHtml(m.warehouse)}</td><td class="mono">${escapeHtml(m.reference)}</td><td>${dateDisplay(m.date)}</td><td><button class="row-action" data-view-movement="${m.id}">Details</button></td></tr>`).join('');
  return `<div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search product or reference..." aria-label="Search movements"></div><select class="select" id="movement-filter"><option>All movement types</option>${types.map(t=>`<option ${movementType===t?'selected':''}>${t}</option>`).join('')}</select><input class="date-input" id="movement-from" type="date" aria-label="From date" value="${escapeHtml(start)}"><span class="date-separator">to</span><input class="date-input" id="movement-to" type="date" aria-label="To date" value="${escapeHtml(end)}"></div><section class="panel table-panel">${tableWrap(['MOVEMENT ID','TYPE','PRODUCT','QUANTITY','WAREHOUSE','REFERENCE','DATE',''],rows,'No movements match these filters.')}</section>`;
}
function movementTone(type) { return type==='Stock Received'||type==='Customer Return'||type==='Opening Stock'?'tone-green':type==='Stock Issue'?'tone-orange':type==='Warehouse Transfer'?'tone-blue':'tone-violet'; }
function movementIcon(type) { return type==='Stock Issue'?'sales':type==='Warehouse Transfer'?'movements':type==='Stock Adjustment'?'settings':'inventory'; }
function suppliersPage() {
  const q=query.toLowerCase();
  const list=db.suppliers.filter(s=>!q||`${s.name} ${s.contact} ${s.email} ${s.city}`.toLowerCase().includes(q));
  const rows=list.map(s=>`<tr><td><div class="product-cell"><span class="supplier-monogram">${escapeHtml(s.name.split(' ').slice(0,2).map(x=>x[0]).join(''))}</span><span><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.city)}, India</small></span></div></td><td>${escapeHtml(s.contact)}</td><td><a class="table-link" href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></td><td>${escapeHtml(s.phone)}</td><td>${s.products}</td><td>${statusBadge(s.status)}</td><td><button class="row-action" data-view-supplier="${s.id}">Details</button></td></tr>`).join('');
  return `<div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search supplier, contact..." aria-label="Search suppliers"></div><span class="result-count">${list.length} suppliers</span></div><section class="panel table-panel">${tableWrap(['SUPPLIER','CONTACT','EMAIL','PHONE','PRODUCTS','STATUS',''],rows,'No suppliers found.')}</section>`;
}
function orderTotal(order) { return order.items.reduce((sum,item)=>sum+item.qty*item.price,0); }
function purchasePage() {
  const q=query.toLowerCase();
  const rows=db.orders.filter(o=>!q||`${o.id} ${o.supplier} ${o.status}`.toLowerCase().includes(q)).map(o=>`<tr><td class="mono"><strong>${escapeHtml(o.id)}</strong></td><td>${escapeHtml(o.supplier)}</td><td>${dateDisplay(o.date)}</td><td>${o.items.reduce((sum,item)=>sum+item.qty,0)} units · ${o.items.length} lines</td><td><strong>${fmt(orderTotal(o))}</strong></td><td>${statusBadge(o.status)}</td><td><div class="actions-cell"><button data-view-order="${o.id}">View</button>${['Ordered','Partially Received'].includes(o.status)?`<button data-receive-order="${o.id}">Receive</button>`:''}</div></td></tr>`).join('');
  return `<div class="summary-strip"><div><span>Open orders</span><strong>${db.orders.filter(o=>['Draft','Ordered','Partially Received'].includes(o.status)).length}</strong></div><div><span>Awaiting delivery</span><strong>${db.orders.filter(o=>['Ordered','Partially Received'].includes(o.status)).length}</strong></div><div><span>Ordered value</span><strong>${fmt(db.orders.filter(o=>['Ordered','Partially Received'].includes(o.status)).reduce((s,o)=>s+orderTotal(o),0))}</strong></div></div><div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search reference or supplier..." aria-label="Search purchase orders"></div><span class="result-count">${db.orders.length} orders</span></div><section class="panel table-panel">${tableWrap(['REFERENCE','SUPPLIER','ORDER DATE','ITEMS','TOTAL AMOUNT','STATUS','ACTIONS'],rows,'No purchase orders found.')}</section>`;
}
function salesPage() {
  const q=query.toLowerCase();
  const rows=db.sales.filter(s=>!q||`${s.id} ${productLabel(s.productId)} ${s.warehouse}`.toLowerCase().includes(q)).map(s=>{const p=productById(s.productId);return `<tr><td class="mono"><strong>${escapeHtml(s.id)}</strong></td><td>${dateDisplay(s.date)}</td><td><strong>${escapeHtml(p?.name||'Unknown product')}</strong><small class="sub-cell">${escapeHtml(p?.sku||'')}</small></td><td>${s.qty}</td><td>${escapeHtml(s.warehouse)}</td>${canAdminister()?`<td>${fmt((p?.selling||0)*s.qty)}</td>`:''}<td>${statusBadge(s.status)}</td><td><button class="row-action" data-view-sale="${s.id}">Details</button></td></tr>`;}).join('');
  return `<div class="summary-strip"><div><span>Transactions</span><strong>${db.sales.length}</strong></div><div><span>Units issued</span><strong>${db.sales.reduce((s,x)=>s+x.qty,0)}</strong></div>${canAdminister()?`<div><span>Demo sales value</span><strong>${fmt(db.sales.reduce((s,x)=>s+(productById(x.productId)?.selling||0)*x.qty,0))}</strong></div>`:`<div><span>Active warehouses</span><strong>${db.warehouses.length}</strong></div>`}</div><div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search transaction or product..." aria-label="Search sales"></div></div><section class="panel table-panel">${tableWrap(['TRANSACTION','DATE','PRODUCT','QTY','WAREHOUSE',...(canAdminister()?['TOTAL']:[]),'STATUS',''],rows,'No sales or stock issues found.')}</section>`;
}
function warehousesPage() {
  if(activeWarehouse) return warehouseDetails(activeWarehouse);
  const rows=db.warehouses.map(w=>{const entries=db.products.map(p=>p.stock[w.name]||0);const units=entries.reduce((s,x)=>s+x,0);const count=entries.filter(q=>q>0).length;return `<tr><td><div class="product-cell"><span class="warehouse-icon">${icon('warehouses')}</span><span><strong>${escapeHtml(w.name)}</strong><small>${escapeHtml(w.id)}</small></span></div></td><td>${escapeHtml(w.location)}</td><td>${count} of ${db.products.length}</td><td><strong>${units.toLocaleString('en-IN')}</strong></td><td>${statusBadge(w.status)}</td><td><button class="row-action" data-warehouse-details="${escapeHtml(w.name)}">View details ${icon('chevron')}</button></td></tr>`;}).join('');
  return `<div class="summary-strip"><div><span>Active locations</span><strong>${db.warehouses.filter(w=>w.status==='Active').length}</strong></div><div><span>Total stock units</span><strong>${totalUnits().toLocaleString('en-IN')}</strong></div><div><span>Network valuation</span><strong>${fmt(inventoryValue())}</strong></div></div><section class="panel table-panel">${tableWrap(['WAREHOUSE','LOCATION','PRODUCTS STOCKED','TOTAL UNITS','STATUS',''],rows,'No warehouses configured.')}</section>`;
}
function warehouseDetails(name) {
  const w=db.warehouses.find(x=>x.name===name);
  const rows=db.products.filter(p=>p.stock[name]>0||query).filter(p=>!query||`${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase())).map(p=>`<tr><td><strong>${escapeHtml(p.name)}</strong><small class="sub-cell">${escapeHtml(p.sku)}</small></td><td>${p.stock[name]||0}</td><td>${p.min}</td><td>${statusBadge((p.stock[name]||0)===0?'Out of Stock':(p.stock[name]||0)<=p.min?'Low Stock':'In Stock')}</td><td>${fmt((p.stock[name]||0)*p.purchase)}</td></tr>`).join('');
  return `<div class="detail-back"><button class="btn btn-outline" data-action="warehouse-back">← &nbsp;All warehouses</button><span>${escapeHtml(w?.location||'')}</span></div><div class="summary-strip"><div><span>Products stocked</span><strong>${db.products.filter(p=>p.stock[name]>0).length}</strong></div><div><span>Units available</span><strong>${db.products.reduce((s,p)=>s+(p.stock[name]||0),0)}</strong></div><div><span>Stock value</span><strong>${fmt(db.products.reduce((s,p)=>s+(p.stock[name]||0)*p.purchase,0))}</strong></div></div><section class="panel table-panel">${tableWrap(['PRODUCT','AVAILABLE','MINIMUM','STATUS','VALUE'],rows,`No products currently held at ${escapeHtml(name)}.`)}</section>`;
}
function reportsPage() {
  const end = new Date(`${dateNow()}T12:00:00`);
  const start = new Date(end);
  if (reportDateRange === 'Last 7 days') start.setDate(start.getDate() - 6);
  else if (reportDateRange === 'Last 30 days') start.setDate(start.getDate() - 29);
  else if (reportDateRange === 'This quarter') start.setMonth(Math.floor(start.getMonth() / 3) * 3, 1);
  else start.setMonth(0, 1);
  const startDate = start.toISOString().slice(0, 10);
  const reportProducts = db.products.filter(product => reportCategoryFilter === 'All categories' || product.category === reportCategoryFilter);
  const reportMovements = db.movements.filter(movement => movement.date >= startDate);
  const reportOrders = db.orders.filter(order => order.date >= startDate);
  const reportSales = db.sales.filter(sale => sale.date >= startDate);
  const productValue = reportProducts.reduce((sum, product) => sum + productQty(product) * product.purchase, 0);
  const categoryTotals = [...new Set(reportProducts.map(product => product.category))].map(name => {
    const items = reportProducts.filter(product => product.category === name);
    return { name, qty: items.reduce((sum, product) => sum + productQty(product), 0), value: items.reduce((sum, product) => sum + productQty(product) * product.purchase, 0) };
  });
  const reportLow = reportProducts.filter(product => statusOf(product) === 'Low Stock').length;
  const reportOut = reportProducts.filter(product => statusOf(product) === 'Out of Stock').length;
  const reportInStock = reportProducts.length - reportLow - reportOut;
  return `<div class="toolbar panel report-filters"><label>Date range<select class="select" id="report-range">${['Last 30 days','Last 7 days','This quarter','This year'].map(range=>`<option ${range===reportDateRange?'selected':''}>${range}</option>`).join('')}</select></label><label>Category<select class="select" id="report-category"><option ${reportCategoryFilter==='All categories'?'selected':''}>All categories</option>${categories().map(category=>`<option ${reportCategoryFilter===category?'selected':''}>${escapeHtml(category)}</option>`).join('')}</select></label><button class="btn btn-outline" data-action="export-report">${icon('download')} Export CSV</button></div><div class="metrics report-metrics">${metric('Inventory valuation',fmt(productValue),'reports','green','at purchase cost')}${metric('Stock movements',reportMovements.length,'movements','blue',`since ${dateDisplay(startDate)}`)}${metric('Low-stock products',reportLow,'alert','amber',`${reportOut} out of stock`)}${metric('Purchase order value',fmt(reportOrders.reduce((sum,order)=>sum+orderTotal(order),0)),'purchases','violet',`${reportOrders.length} orders in range`)}</div><div class="report-grid"><section class="panel"><div class="section-title"><div><h2>Category-wise stock</h2><p>Available units and purchase valuation</p></div></div>${categoryTotals.map(category=>`<div class="report-row"><span>${escapeHtml(category.name)}</span><div class="report-bar"><i style="width:${Math.max(2,category.qty/Math.max(1,reportProducts.reduce((sum,product)=>sum+productQty(product),0))*100)}%"></i></div><strong>${category.qty.toLocaleString('en-IN')}</strong><small>${fmt(category.value)}</small></div>`).join('')||'<div class="empty">No products in this category.</div>'}</section><section class="panel"><div class="section-title"><div><h2>Stock health</h2><p>Based on each product's minimum threshold</p></div></div><div class="health-donut"><div><strong>${reportProducts.length}</strong><small>products</small></div></div><div class="health-legend"><span><i class="legend-dot green-bg"></i>In stock <strong>${reportInStock}</strong></span><span><i class="legend-dot orange-bg"></i>Low stock <strong>${reportLow}</strong></span><span><i class="legend-dot red-bg"></i>Out of stock <strong>${reportOut}</strong></span></div></section><section class="panel"><div class="section-title"><div><h2>Purchase summary</h2><p>Demo orders in selected period</p></div></div>${['Draft','Ordered','Partially Received','Received','Cancelled'].map(status=>`<div class="report-line"><span>${statusBadge(status)}</span><strong>${reportOrders.filter(order=>order.status===status).length} orders</strong><small>${fmt(reportOrders.filter(order=>order.status===status).reduce((sum,order)=>sum+orderTotal(order),0))}</small></div>`).join('')}</section><section class="panel"><div class="section-title"><div><h2>Sales / issue summary</h2><p>Transactions in selected period</p></div></div><div class="report-line"><span>Issue transactions</span><strong>${reportSales.length}</strong><small>${reportSales.reduce((sum,sale)=>sum+sale.qty,0)} units</small></div><div class="report-line"><span>Estimated sales value</span><strong>${fmt(reportSales.reduce((sum,sale)=>sum+(productById(sale.productId)?.selling||0)*sale.qty,0))}</strong><small>at selling price</small></div><div class="report-line"><span>Movement records</span><strong>${reportMovements.length}</strong><small>selected period</small></div></section></div>`;
}
function categoriesPage() {
  const cards=categories().map((name,i)=>{const list=db.products.filter(p=>p.category===name), units=list.reduce((s,p)=>s+productQty(p),0), value=list.reduce((s,p)=>s+productQty(p)*p.purchase,0);return `<article class="category-card"><div class="category-card-head"><span class="category-tile tile-${i%6}">${icon('categories')}</span><button class="row-action" data-category-menu="${escapeHtml(name)}">${icon('more')}</button></div><h3>${escapeHtml(name)}</h3><p>${list.length} products · ${units.toLocaleString('en-IN')} units</p><div class="category-card-foot"><span>Inventory value</span><strong>${fmt(value)}</strong></div><button class="card-bottom-link" data-category-open="${escapeHtml(name)}">View products ${icon('chevron')}</button></article>`;}).join('');
  return `<div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search categories..." aria-label="Search categories"></div><span class="result-count">${categories().length} categories</span></div><div class="category-cards">${cards||'<div class="empty">No categories added yet.</div>'}</div>`;
}
function settingsPage() {
  const s=db.settings;
  return `<div class="settings-grid"><div class="panel settings-card"><div class="section-title"><div><h2>Business profile</h2><p>Basic details for your local demo workspace.</p></div></div><div class="logo-setting"><span class="logo-large">SP</span><div><strong>Business logo</strong><small>Logo placeholder · JPG, PNG or SVG</small></div><button class="btn btn-outline" data-action="logo-info">Change logo</button></div><label class="form-field">Business name<input name="business" value="${escapeHtml(s.business)}" maxlength="60"></label><div class="settings-tip">This name appears in your StockPilot workspace only.</div></div><div class="panel settings-card"><div class="section-title"><div><h2>Regional preferences</h2><p>Display and format options for this browser.</p></div></div><label class="form-field">Currency<select name="currency"><option value="INR" ${s.currency==='INR'?'selected':''}>INR — Indian Rupee (₹)</option><option value="USD" ${s.currency==='USD'?'selected':''}>USD — US Dollar ($)</option><option value="AED" ${s.currency==='AED'?'selected':''}>AED — UAE Dirham</option></select></label><label class="form-field">Date format<select name="dateFormat">${['DD MMM YYYY','DD/MM/YYYY','YYYY-MM-DD'].map(x=>`<option ${s.dateFormat===x?'selected':''}>${x}</option>`).join('')}</select></label><label class="form-field">Default low-stock threshold<input name="threshold" type="number" min="0" value="${s.threshold}"></label><label class="form-field">Theme preference<select name="theme"><option ${s.theme==='Light'?'selected':''}>Light</option><option ${s.theme==='System'?'selected':''}>System</option></select></label></div><div class="panel settings-card"><div class="section-title"><div><h2>Profile display</h2><p>Personal details shown in the navigation.</p></div></div><label class="form-field">Display name<input value="Arjun Kapoor" disabled></label><label class="form-field">Role<input value="Workspace admin · Demo profile" disabled></label></div><div class="panel settings-card local-settings"><div class="settings-symbol">${icon('settings')}</div><h3>Local demo settings</h3><p>Preferences are saved in this browser only. They are not synced to an account or server.</p><button class="btn btn-primary" data-action="save-settings">Save preferences</button><button class="btn btn-outline" data-action="reset-demo">Reset sample data</button></div></div>`;
}

function employeesPage() {
  const q = query.toLowerCase();
  const list = accounts.filter(account => account.role === 'Employee' && (!q || `${account.name} ${account.email}`.toLowerCase().includes(q)));
  const rows = list.map(account => `<tr><td><div class="product-cell"><span class="user-avatar">${escapeHtml(account.name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase())}</span><span><strong>${escapeHtml(account.name)}</strong><small>${escapeHtml(account.email)}</small></span></div></td><td>${statusBadge(account.active === false ? 'Inactive' : 'Active')}</td><td><span class="role-pill">Employee</span></td><td>${account.id === 'employee-demo' ? '<span class="muted">Built-in demo account</span>' : `<button class="row-action" data-remove-employee="${escapeHtml(account.id)}">Remove access</button>`}</td></tr>`).join('');
  return `<div class="access-banner"><div class="access-banner-icon">${icon('alert')}</div><div><strong>Employee permissions</strong><p>Employees can view products and inventory, receive stock, and record stock issues. They cannot edit the catalogue, view suppliers or purchase orders, transfer stock, access reports or settings, or manage employee accounts.</p></div></div><div class="toolbar panel"><div class="toolbar-search">${icon('search')}<input id="table-search" value="${escapeHtml(query)}" placeholder="Search employee name or email..." aria-label="Search employees"></div><span class="result-count">${list.length} employees</span></div><section class="panel table-panel">${tableWrap(['EMPLOYEE','ACCOUNT STATUS','ACCESS ROLE',''], rows, 'No employee accounts found.')}</section><p class="local-account-note">Employee credentials are part of this browser-only prototype and are not secure authentication. Do not use real passwords.</p>`;
}

function wire() {
  document.querySelectorAll('[data-page]').forEach(el=>{if(el.dataset.wired)return;el.dataset.wired='true';el.addEventListener('click',e=>{e.preventDefault();if(!navItems().includes(el.dataset.page)){toast('Your employee account does not have access to that page.');return;}page=el.dataset.page;activeWarehouse=null;query='';pageNumber=1;render();});});
  const global=document.getElementById('global-search');
  if(!global.dataset.wired){global.dataset.wired='true';global.addEventListener('input',()=>{query=global.value;if(page==='Products')pageNumber=1;refreshContent();});}
  document.querySelectorAll('[data-action]').forEach(el=>{if(el.dataset.wired)return;el.dataset.wired='true';el.addEventListener('click',()=>handleAction(el.dataset.action,el));});
  document.querySelectorAll('[data-modal]').forEach(el=>el.addEventListener('click',()=>openModal(el.dataset.modal,el.dataset.prefillProduct||'',el.dataset.warehouse||'')));
  document.querySelectorAll('[data-view-product]').forEach(el=>el.addEventListener('click',()=>viewProduct(el.dataset.viewProduct)));
  document.querySelectorAll('[data-edit-product]').forEach(el=>el.addEventListener('click',()=>openModal('product',el.dataset.editProduct)));
  document.querySelectorAll('[data-archive-product]').forEach(el=>el.addEventListener('click',()=>archiveProduct(el.dataset.archiveProduct)));
  document.querySelectorAll('[data-remove-employee]').forEach(el=>el.addEventListener('click',()=>removeEmployee(el.dataset.removeEmployee)));
  document.querySelectorAll('[data-adjust-product]').forEach(el=>el.addEventListener('click',()=>openModal('adjust',el.dataset.adjustProduct,el.dataset.warehouse)));
  document.querySelectorAll('[data-view-movement]').forEach(el=>el.addEventListener('click',()=>viewMovement(el.dataset.viewMovement)));
  document.querySelectorAll('[data-detail-movement]').forEach(el=>el.addEventListener('click',e=>{if(!e.target.closest('button'))viewMovement(el.dataset.detailMovement);}));
  document.querySelectorAll('[data-view-order]').forEach(el=>el.addEventListener('click',()=>viewOrder(el.dataset.viewOrder)));
  document.querySelectorAll('[data-receive-order]').forEach(el=>el.addEventListener('click',()=>receiveOrder(el.dataset.receiveOrder)));
  document.querySelectorAll('[data-view-sale]').forEach(el=>el.addEventListener('click',()=>viewSale(el.dataset.viewSale)));
  document.querySelectorAll('[data-view-supplier]').forEach(el=>el.addEventListener('click',()=>viewSupplier(el.dataset.viewSupplier)));
  document.querySelectorAll('[data-warehouse-details]').forEach(el=>el.addEventListener('click',()=>{activeWarehouse=el.dataset.warehouseDetails;render();}));
  document.querySelectorAll('[data-category-open]').forEach(el=>el.addEventListener('click',()=>{page='Products';productCategory=el.dataset.categoryOpen;render();}));
  document.querySelectorAll('[data-category-menu]').forEach(el=>el.addEventListener('click',()=>viewCategory(el.dataset.categoryMenu)));
  document.querySelectorAll('[data-sort]').forEach(el=>el.addEventListener('click',()=>{const key=el.dataset.sort;sort={key,direction:sort.key===key&&sort.direction==='asc'?'desc':'asc'};refreshContent();}));
  document.querySelectorAll('[data-page-number]').forEach(el=>el.addEventListener('click',()=>{pageNumber=Number(el.dataset.pageNumber);refreshContent();}));
  const tableSearch=document.getElementById('table-search');
  if(tableSearch)tableSearch.addEventListener('input',()=>{query=tableSearch.value;pageNumber=1;refreshContent(true);});
  const cat=document.getElementById('category-filter'); if(cat)cat.addEventListener('change',()=>{productCategory=cat.value;pageNumber=1;refreshContent();});
  const status=document.getElementById('status-filter');if(status)status.addEventListener('change',()=>{productStatus=status.value;pageNumber=1;refreshContent();});
  const type=document.getElementById('movement-filter');if(type)type.addEventListener('change',()=>{movementType=type.value;refreshContent();});
  ['movement-from','movement-to'].forEach(id=>{const input=document.getElementById(id);if(input)input.addEventListener('change',()=>refreshContent(true));});
  document.querySelectorAll('[data-export]').forEach(el=>el.addEventListener('click',()=>exportCsv(el.dataset.export)));
  document.querySelectorAll('[data-prefill-product]').forEach(el=>el.addEventListener('click',()=>openModal('purchase',el.dataset.prefillProduct)));
  document.querySelectorAll('[data-dismiss]').forEach(el=>el.addEventListener('click',()=>el.closest('.demo-banner')?.remove()));
  const reportCategory=document.getElementById('report-category');
  if(reportCategory)reportCategory.addEventListener('change',()=>{reportCategoryFilter=reportCategory.value;refreshContent();});
  const chartRange=document.getElementById('chart-range');
  if(chartRange)chartRange.addEventListener('change',()=>{chartPeriod=chartRange.value;refreshContent();});
  const reportRange=document.getElementById('report-range');
  if(reportRange)reportRange.addEventListener('change',()=>{reportDateRange=reportRange.value;refreshContent();});
}
function refreshContent(preserveFilters=false) {
  const oldFilters=['movement-from','movement-to'].map(id=>document.getElementById(id)?.value||'');
  const activeId=document.activeElement?.id;
  const selectionStart=document.activeElement?.selectionStart;
  const selectionEnd=document.activeElement?.selectionEnd;
  const content=document.getElementById('page-content');if(!content)return;
  content.innerHTML=renderPage();
  wire();
  if(preserveFilters&&page==='Stock Movements') ['movement-from','movement-to'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.value=oldFilters[i];});
  const mainSearch=document.getElementById('global-search');if(mainSearch)mainSearch.value=query;
  const restored=activeId&&document.getElementById(activeId);
  if(restored){restored.focus();if(typeof selectionStart==='number'&&restored.setSelectionRange)restored.setSelectionRange(selectionStart,selectionEnd);}
}
function handleAction(action,el) {
  if(action==='toggle-menu'){document.getElementById('sidebar').classList.toggle('open');document.querySelector('.mobile-scrim').classList.toggle('visible');}
  if(action==='close-menu'){document.getElementById('sidebar').classList.remove('open');document.querySelector('.mobile-scrim').classList.remove('visible');}
  if(action==='export-products')exportCsv('products');
  if(action==='export-report')exportCsv('report');
  if(action==='dismiss-banner')el.closest('.demo-banner')?.remove();
  if(action==='warehouse-back'){activeWarehouse=null;render();}
  if(action==='notifications')showNotifications();
  if(action==='profile')signOut();
  if(action==='workspace')toast('This is a local demonstration workspace.');
  if(action==='logo-info')toast('Logo upload is not connected in this frontend demo.');
  if(action==='save-settings')saveSettings();
  if(action==='reset-demo'&&confirm('Reset all local demo changes and restore the original sample data?')){db=structuredClone(seed);saveDemo();page='Dashboard';query='';render();toast('Sample data restored.');}
}
function openModal(type, productId='', warehouse='') {
  const adminOnlyModals = ['product','purchase','supplier','warehouse','transfer','category','adjust','employee','receive-order'];
  if (adminOnlyModals.includes(type) && !canAdminister()) {
    toast('This action is available to workspace administrators only.');
    return;
  }
  if(type==='receive')type='receive';
  const productOptions=db.products.map(p=>`<option value="${p.id}" ${p.id===productId?'selected':''}>${escapeHtml(p.name)} · ${escapeHtml(p.sku)} (${productQty(p)} available)</option>`).join('');
  const whOptions=db.warehouses.map(w=>`<option ${w.name===warehouse?'selected':''}>${escapeHtml(w.name)}</option>`).join('');
  let title='',intro='',fields='',submit='Save',orderId='';
  if(type==='product') {
    const edit=productId?productById(productId):null; title=edit?'Edit product':'Add product';intro=edit?'Update catalogue details. Stock adjustments are recorded separately.':'Add a product to the local demo catalogue.';submit=edit?'Save changes':'Add product';
    fields=`<div class="form-grid"><label class="form-field wide">Product name<input name="name" required maxlength="100" value="${escapeHtml(edit?.name||'')}" placeholder="e.g. Wireless mouse"></label><label class="form-field">SKU<input name="sku" required maxlength="32" value="${escapeHtml(edit?.sku||'')}" placeholder="e.g. EL-ACC-053"></label><label class="form-field">Category<select name="category" required><option value="">Choose category</option>${categories().map(c=>`<option ${edit?.category===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}</select></label><label class="form-field">Purchase price (₹)<input name="purchase" type="number" min="0.01" step=".01" required value="${edit?.purchase??''}"></label><label class="form-field">Selling price (₹)<input name="selling" type="number" min="0.01" step=".01" required value="${edit?.selling??''}"></label>${edit?'':`<label class="form-field">Opening stock<input name="qty" type="number" min="0" step="1" value="0" required></label><label class="form-field">Warehouse<select name="warehouse">${whOptions}</select></label>`}<label class="form-field">Minimum stock level<input name="min" type="number" min="0" step="1" required value="${edit?.min??10}"></label><label class="form-field wide">Description<textarea name="description" rows="3" maxlength="300" placeholder="A short product description">${escapeHtml(edit?.description||'')}</textarea></label></div>`;
  } else if(type==='receive-order') {
    const order=db.orders.find(item=>item.id===productId);
    if(!order)return;
    title=`Receive ${order.id}`;intro='Confirm the quantities delivered. Received stock is added to the order’s destination warehouse.';submit='Confirm receipt';
    const received=order.received||{};
    fields=`<div class="receive-lines">${order.items.map((item,index)=>{const remaining=item.qty-(received[item.productId]||0);return `<label class="receive-line"><span><strong>${escapeHtml(productLabel(item.productId))}</strong><small>${remaining} remaining of ${item.qty} ordered</small></span><input name="receive-${index}" type="number" min="0" max="${remaining}" value="${remaining}" required aria-label="Quantity received for ${escapeHtml(productLabel(item.productId))}"></label>`;}).join('')}<label class="form-field">Destination warehouse<select name="warehouse">${db.warehouses.map(w=>`<option ${(order.warehouse||'Mumbai Central')===w.name?'selected':''}>${escapeHtml(w.name)}</option>`).join('')}</select></label></div>`;
    orderId=order.id;
  } else if(type==='adjust'||type==='receive'||type==='issue') {
    title=type==='adjust'?'Adjust stock':type==='receive'?'Receive stock':'Record stock issue';intro=type==='issue'?'Create a demo issue and deduct stock from the selected warehouse.':'Record a stock change in the selected warehouse.';submit=type==='issue'?'Record issue':type==='receive'?'Receive stock':'Confirm adjustment';
    fields=`<div class="form-grid"><label class="form-field wide">Product<select name="productId" required>${productOptions}</select></label><label class="form-field">Warehouse<select name="warehouse" required>${whOptions}</select></label>${type==='adjust'?'<label class="form-field">Adjustment<select name="direction"><option value="add">Add stock</option><option value="remove">Remove stock</option></select></label>':''}<label class="form-field">Quantity<input name="qty" type="number" min="1" step="1" value="1" required></label>${type==='adjust'?'<label class="form-field">Reason<select name="reason"><option>Stock Adjustment</option><option>Opening Stock</option><option>Customer Return</option></select></label>':''}<label class="form-field wide">Reference / note<input name="note" maxlength="100" placeholder="Optional reference or note"></label></div>`;
  } else if(type==='transfer') {
    title='Transfer stock';intro='Move units between warehouses. Total network stock will remain unchanged.';submit='Transfer stock';
    fields=`<div class="form-grid"><label class="form-field wide">Product<select name="productId" required>${productOptions}</select></label><label class="form-field">From warehouse<select name="from" required>${whOptions}</select></label><label class="form-field">To warehouse<select name="to" required>${db.warehouses.map(w=>`<option ${w.name!==warehouse?'':'disabled'}>${escapeHtml(w.name)}</option>`).join('')}</select></label><label class="form-field">Quantity<input name="qty" type="number" min="1" step="1" value="1" required></label><label class="form-field">Reference<input name="note" placeholder="Optional transfer note"></label></div>`;
  } else if(type==='purchase') {
    title='Create purchase order';intro='Create a demo order. No supplier communication or payment is initiated.';submit='Create purchase order';
    fields=`<div class="form-grid"><label class="form-field wide">Supplier<select name="supplier" required><option value="">Choose supplier</option>${db.suppliers.map(s=>`<option>${escapeHtml(s.name)}</option>`).join('')}</select></label><label class="form-field wide">Product<select name="productId" required>${productOptions}</select></label><label class="form-field">Quantity<input name="qty" type="number" min="1" required value="1"></label><label class="form-field">Unit price (₹)<input name="price" type="number" min="0.01" step=".01" required value="${productById(productId)?.purchase||''}"></label><label class="form-field wide">Deliver to<select name="warehouse">${whOptions}</select></label></div>`;
  } else if(type==='supplier') {
    title='Add supplier';intro='Save supplier details in your local demo directory.';submit='Add supplier';
    fields=`<div class="form-grid"><label class="form-field wide">Business name<input name="name" required placeholder="e.g. Meridian Supply Co."></label><label class="form-field">Contact person<input name="contact" required placeholder="Full name"></label><label class="form-field">City<input name="city" required placeholder="City"></label><label class="form-field">Email<input name="email" type="email" required placeholder="orders@supplier.in"></label><label class="form-field">Phone<input name="phone" required placeholder="+91 22 1234 5678"></label></div>`;
  } else if(type==='warehouse') {
    title='Add warehouse';intro='Add a location to manage demo inventory.';submit='Add warehouse';
    fields=`<div class="form-grid"><label class="form-field wide">Warehouse name<input name="name" required placeholder="e.g. Hyderabad Hub"></label><label class="form-field wide">Location<input name="location" required placeholder="Area, city"></label></div>`;
  } else if(type==='category') {
    title='Add category';intro='Create a category for organising products.';submit='Add category';
    fields='<label class="form-field">Category name<input name="name" maxlength="40" required placeholder="e.g. Personal Care"></label>';
  } else if(type==='employee') {
    title='Add employee';intro='Create an employee demo account. Share the temporary password with them directly.';submit='Add employee';
    fields='<div class="form-grid"><label class="form-field wide">Employee name<input name="name" required maxlength="80" autocomplete="off" placeholder="e.g. Kavya Nair"></label><label class="form-field wide">Work email<input name="email" type="email" required autocomplete="off" placeholder="kavya@company.in"></label><label class="form-field wide">Temporary password<input name="password" type="password" minlength="6" required autocomplete="new-password" placeholder="At least 6 characters"></label></div><p class="local-account-note">Local demo only — this password is stored in browser storage and is not encrypted.</p>';
  } else return;
  document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" id="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${title}</h2><p>${intro}</p></div><button class="modal-x" data-modal-close aria-label="Close">${icon('close')}</button></header><form id="modal-form" data-type="${type}" data-edit-id="${productId}" data-order-id="${orderId}">${fields}<div class="modal-error" id="modal-error" role="alert"></div><footer class="modal-footer"><button type="button" class="btn btn-outline" data-modal-close>Cancel</button><button type="submit" class="btn btn-primary">${submit}</button></footer></form></section></div>`;
  document.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeModal));
  document.getElementById('modal-backdrop').addEventListener('click',e=>{if(e.target.id==='modal-backdrop')closeModal();});
  document.getElementById('modal-form').addEventListener('submit',submitModal);
  const prodSelect=document.querySelector('#modal-form [name="productId"]');
  if(prodSelect)prodSelect.addEventListener('change',()=>{const p=productById(prodSelect.value);const price=document.querySelector('#modal-form [name="price"]');if(price&&p)price.value=p.purchase;});
}
function submitModal(event) {
  event.preventDefault();
  const form=event.currentTarget,type=form.dataset.type,data=Object.fromEntries(new FormData(form)),error=document.getElementById('modal-error');
  if (['product','purchase','supplier','warehouse','transfer','category','adjust','employee','receive-order'].includes(type) && !canAdminister()) {
    error.textContent = 'This action is available to workspace administrators only.';
    return;
  }
  const fail=message=>{error.textContent=message;};
  const qty=Number(data.qty);
  const p=productById(data.productId);
  if(type==='product') {
    const edit=productById(form.dataset.editId),sku=data.sku.trim();
    if(db.products.some(item=>item.sku.toLowerCase()===sku.toLowerCase()&&item.id!==edit?.id))return fail('That SKU is already in use. Enter a unique SKU.');
    if(Number(data.purchase)<=0||Number(data.selling)<=0||Number(data.min)<0)return fail('Prices must be greater than zero and minimum stock cannot be negative.');
    const category=data.category;
    if(!category)return fail('Choose a category before saving this product.');
    if(edit){Object.assign(edit,{name:data.name.trim(),sku,category,purchase:Number(data.purchase),selling:Number(data.selling),min:Number(data.min),description:data.description.trim(),updated:dateNow()});toast('Product details updated locally.');}
    else {const stock=Object.fromEntries(db.warehouses.map(w=>[w.name,0]));stock[data.warehouse]=Number(data.qty);db.products.unshift({id:`P-${Date.now().toString().slice(-6)}`,name:data.name.trim(),sku,category,purchase:Number(data.purchase),selling:Number(data.selling),min:Number(data.min),description:data.description.trim(),stock,updated:dateNow()});toast('Product added to the demo catalogue.');}
    saveDemo();
  }
  if(['adjust','receive','issue'].includes(type)) {
    if(!p)return fail('Select a valid product.');
    if(!Number.isInteger(qty)||qty<=0)return fail('Enter a whole-number quantity greater than zero.');
    const wh=data.warehouse,available=p.stock[wh]||0;
    const subtract=type==='issue'||(type==='adjust'&&data.direction==='remove');
    if(subtract&&qty>available&&!confirm(`Only ${available} units are available at ${wh}. This demo transaction will create negative inventory. Continue?`))return;
    p.stock[wh]=(p.stock[wh]||0)+(subtract?-qty:qty);p.updated=dateNow();
    const moveType=type==='issue'?'Stock Issue':type==='receive'?'Stock Received':data.reason;
    addMovement(moveType,p.id,subtract?-qty:qty,wh,data.note||`${moveType} demo transaction`);
    if(type==='issue')db.sales.unshift({id:`SO-2026-${String(Date.now()).slice(-4)}`,date:dateNow(),productId:p.id,qty,warehouse:wh,status:'Completed'});
    saveDemo();toast(`${moveType} recorded in the local demo.`);
  }
  if(type==='transfer') {
    if(!p)return fail('Select a valid product.');
    if(data.from===data.to)return fail('Choose two different warehouses.');
    if(!Number.isInteger(qty)||qty<=0)return fail('Enter a whole-number quantity greater than zero.');
    const available=p.stock[data.from]||0;
    if(qty>available&&!confirm(`Only ${available} units are available at ${data.from}. This transfer will create negative inventory at the source. Continue?`))return;
    p.stock[data.from]=available-qty;p.stock[data.to]=(p.stock[data.to]||0)+qty;p.updated=dateNow();
    addMovement('Warehouse Transfer',p.id,qty,data.to,data.note||`Transfer from ${data.from}`);
    saveDemo();toast(`Transferred ${qty} units from ${data.from} to ${data.to}.`);
  }
  if(type==='purchase') {
    if(!data.supplier)return fail('Choose a supplier.');
    if(!p||!Number.isInteger(qty)||qty<1||Number(data.price)<=0)return fail('Enter a valid product, quantity, and unit price.');
    const order={id:`PO-2026-${String(Date.now()).slice(-4)}`,supplier:data.supplier,date:dateNow(),warehouse:data.warehouse,items:[{productId:p.id,qty,price:Number(data.price)}],status:'Ordered'};
    db.orders.unshift(order);saveDemo();toast(`${order.id} created locally. No supplier was contacted.`);
  }
  if(type==='receive-order') {
    const order=db.orders.find(item=>item.id===form.dataset.orderId);
    if(!order)return fail('This purchase order could not be found.');
    const received=order.received||{};
    for(let i=0;i<order.items.length;i++){
      const item=order.items[i],remaining=item.qty-(received[item.productId]||0),amount=Number(data[`receive-${i}`]);
      if(!Number.isInteger(amount)||amount<0||amount>remaining)return fail(`Enter a whole number from 0 to ${remaining} for ${productLabel(item.productId)}.`);
    }
    let fully=true;order.received=received;const wh=data.warehouse||order.warehouse||'Mumbai Central';order.warehouse=wh;
    order.items.forEach((item,i)=>{const remaining=item.qty-(received[item.productId]||0),amount=Number(data[`receive-${i}`]);if(amount){const product=productById(item.productId);product.stock[wh]=(product.stock[wh]||0)+amount;product.updated=dateNow();received[item.productId]=(received[item.productId]||0)+amount;addMovement('Stock Received',product.id,amount,wh,`Received against ${order.id}`);}if((received[item.productId]||0)<item.qty)fully=false;});
    order.status=fully?'Received':'Partially Received';saveDemo();toast(fully?'All remaining items received into stock.':'Partial receipt recorded and inventory updated.');
  }
  if(type==='supplier') {
    if(db.suppliers.some(s=>s.email.toLowerCase()===data.email.trim().toLowerCase()))return fail('A supplier with this email already exists.');
    db.suppliers.unshift({id:`S-${Date.now().toString().slice(-4)}`,name:data.name.trim(),contact:data.contact.trim(),email:data.email.trim(),phone:data.phone.trim(),city:data.city.trim(),products:0,status:'Active'});saveDemo();toast('Supplier added to the local directory.');
  }
  if(type==='warehouse') {
    if(db.warehouses.some(w=>w.name.toLowerCase()===data.name.trim().toLowerCase()))return fail('A warehouse with this name already exists.');
    const name=data.name.trim();db.warehouses.push({id:`W-${Date.now().toString().slice(-3)}`,name,location:data.location.trim(),status:'Active'});db.products.forEach(product=>{product.stock[name]=0;});saveDemo();toast('Warehouse added to the demo.');
  }
  if(type==='category') {
    const name=data.name.trim();if(categories().some(c=>c.toLowerCase()===name.toLowerCase()))return fail('This category already exists.');db.categories.push(name);saveDemo();toast('Category added.');
  }
  if(type==='employee') {
    const email=data.email.trim().toLowerCase();
    if(accounts.some(account=>account.email.toLowerCase()===email))return fail('An account with this email already exists.');
    accounts.push({id:`employee-${Date.now()}`,name:data.name.trim(),email,password:data.password,role:'Employee',active:true});
    if (!saveAccounts()) {
      accounts.pop();
      return fail('The employee account could not be saved. Check this browser’s local storage and try again.');
    }
    toast('Employee account created. They can sign in with the email and temporary password.');
  }
  closeModal();render();
}
function removeEmployee(id) {
  if (!canAdminister()) { toast('Only an administrator can manage employee accounts.'); return; }
  const account = accounts.find(item => item.id === id && item.role === 'Employee' && item.id !== 'employee-demo');
  if (!account) return;
  if (!confirm(`Remove sign-in access for ${account.name}?`)) return;
  const previousAccounts = accounts;
  accounts = accounts.filter(item => item.id !== id);
  if (!saveAccounts()) { accounts = previousAccounts; return; }
  render();
  toast('Employee access removed from this browser demo.');
}
function addMovement(type,productId,qty,warehouse,note) {
  db.movements.unshift({id:`MOV-${Date.now().toString().slice(-5)}`,type,productId,qty,warehouse,date:dateNow(),reference:`DEMO-${Date.now().toString().slice(-5)}`,note});
}
function closeModal(){document.getElementById('modal-root').innerHTML='';}
function viewProduct(id) {
  const p=productById(id);if(!p)return;
  const stockRows=db.warehouses.map(w=>`<div class="detail-row"><span>${escapeHtml(w.name)}</span><strong>${p.stock[w.name]||0} units</strong></div>`).join('');
  openDetail(`Product details`, `<div class="detail-product"><span class="product-monogram large">${escapeHtml(p.name.split(' ').slice(0,2).map(x=>x[0]).join(''))}</span><div><h3>${escapeHtml(p.name)}</h3><span class="mono">${escapeHtml(p.sku)}</span></div>${statusBadge(statusOf(p))}</div><div class="detail-grid"><div><small>Category</small><strong>${escapeHtml(p.category)}</strong></div><div><small>Available stock</small><strong>${productQty(p)} units</strong></div>${canAdminister()?`<div><small>Purchase price</small><strong>${fmt(p.purchase)}</strong></div>`:''}<div><small>Selling price</small><strong>${fmt(p.selling)}</strong></div><div><small>Minimum stock</small><strong>${p.min} units</strong></div><div><small>Last updated</small><strong>${dateDisplay(p.updated)}</strong></div></div><p class="detail-description">${escapeHtml(p.description||'No description provided.')}</p><h4 class="detail-subtitle">Stock by warehouse</h4>${stockRows}`,`<button class="btn btn-outline" data-detail-close>Close</button>${canAdminister()?`<button class="btn btn-primary" data-detail-edit="${p.id}">Edit product</button>`:''}`);
}
function openDetail(title,body,footer='') {
  document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" id="modal-backdrop"><section class="modal detail-modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>${title}</h2></div><button class="modal-x" data-modal-close>${icon('close')}</button></header><div class="detail-body">${body}</div><footer class="modal-footer">${footer}</footer></section></div>`;
  document.querySelectorAll('[data-modal-close],[data-detail-close]').forEach(el=>el.addEventListener('click',closeModal));
  document.getElementById('modal-backdrop').addEventListener('click',e=>{if(e.target.id==='modal-backdrop')closeModal();});
  const edit=document.querySelector('[data-detail-edit]');if(edit)edit.addEventListener('click',()=>{const id=edit.dataset.detailEdit;closeModal();openModal('product',id);});
}
function viewMovement(id) {
  const m=db.movements.find(item=>item.id===id);if(!m)return;
  openDetail('Movement details',`<div class="detail-grid"><div><small>Movement reference</small><strong class="mono">${escapeHtml(m.id)}</strong></div><div><small>Movement type</small><strong>${escapeHtml(m.type)}</strong></div><div><small>Product</small><strong>${escapeHtml(productLabel(m.productId))}</strong></div><div><small>Quantity change</small><strong class="${m.qty>0?'qty-plus':'qty-minus'}">${m.qty>0?'+':''}${m.qty} units</strong></div><div><small>Warehouse</small><strong>${escapeHtml(m.warehouse)}</strong></div><div><small>Date</small><strong>${dateDisplay(m.date)}</strong></div><div><small>Reference</small><strong class="mono">${escapeHtml(m.reference)}</strong></div></div><p class="detail-description">${escapeHtml(m.note||'No additional note.')}</p>`);
}
function viewOrder(id) {
  const o=db.orders.find(x=>x.id===id);if(!o)return;
  const rows=o.items.map(item=>`<tr><td>${escapeHtml(productLabel(item.productId))}</td><td>${item.qty}</td><td>${fmt(item.price)}</td><td>${fmt(item.qty*item.price)}</td></tr>`).join('');
  const received=o.received||{};
  openDetail(`Purchase order ${escapeHtml(o.id)}`,`<div class="detail-grid"><div><small>Supplier</small><strong>${escapeHtml(o.supplier)}</strong></div><div><small>Order date</small><strong>${dateDisplay(o.date)}</strong></div><div><small>Delivery status</small><strong>${statusBadge(o.status)}</strong></div><div><small>Demo destination</small><strong>${escapeHtml(o.warehouse||'Mumbai Central')}</strong></div></div>${tableWrap(['PRODUCT','ORDERED','UNIT PRICE','LINE TOTAL'],rows)}<div class="detail-total"><span>Order total</span><strong>${fmt(orderTotal(o))}</strong></div>${o.status==='Ordered'||o.status==='Partially Received'?`<div class="inline-note">Receiving stock updates the destination warehouse quantities. This does not contact the supplier.</div>`:''}`,`${['Ordered','Partially Received'].includes(o.status)?`<button class="btn btn-primary" data-detail-receive="${o.id}">Receive stock</button>`:''}<button class="btn btn-outline" data-detail-close>Close</button>`);
  const receive=document.querySelector('[data-detail-receive]');if(receive)receive.addEventListener('click',()=>{closeModal();receiveOrder(id);});
}
function receiveOrder(id) {
  const o=db.orders.find(x=>x.id===id);if(!o||!['Ordered','Partially Received'].includes(o.status))return;
  openModal('receive-order',id);
}
function viewSale(id) {
  const s=db.sales.find(x=>x.id===id),p=productById(s?.productId);if(!s)return;
  openDetail(`Transaction ${escapeHtml(s.id)}`,`<div class="detail-grid"><div><small>Date</small><strong>${dateDisplay(s.date)}</strong></div><div><small>Status</small><strong>${statusBadge(s.status)}</strong></div><div><small>Product</small><strong>${escapeHtml(p?.name||'Unknown')}</strong></div><div><small>Quantity</small><strong>${s.qty} units</strong></div><div><small>Warehouse</small><strong>${escapeHtml(s.warehouse)}</strong></div>${canAdminister()?`<div><small>Estimated total</small><strong>${fmt((p?.selling||0)*s.qty)}</strong></div>`:''}</div><p class="detail-description">Frontend demo transaction only. No customer or payment system is connected.</p>`);
}
function viewSupplier(id) {
  const s=db.suppliers.find(x=>x.id===id);if(!s)return;
  openDetail('Supplier details',`<div class="detail-product"><span class="supplier-monogram large">${escapeHtml(s.name.split(' ').slice(0,2).map(x=>x[0]).join(''))}</span><div><h3>${escapeHtml(s.name)}</h3><span>${escapeHtml(s.city)}, India</span></div>${statusBadge(s.status)}</div><div class="detail-grid"><div><small>Contact person</small><strong>${escapeHtml(s.contact)}</strong></div><div><small>Phone</small><strong>${escapeHtml(s.phone)}</strong></div><div><small>Email</small><strong>${escapeHtml(s.email)}</strong></div><div><small>Products supplied</small><strong>${s.products}</strong></div></div><p class="inline-note">Supplier communication is not connected in this frontend demo.</p>`);
}
function viewCategory(name) {
  const list=db.products.filter(p=>p.category===name);
  openDetail(`${escapeHtml(name)} category`,`${tableWrap(['PRODUCT','SKU','AVAILABLE','STATUS'],list.map(p=>`<tr><td><strong>${escapeHtml(p.name)}</strong></td><td class="mono">${escapeHtml(p.sku)}</td><td>${productQty(p)}</td><td>${statusBadge(statusOf(p))}</td></tr>`).join(''),'No products in this category.')}`);
}
function archiveProduct(id) {
  const p=productById(id);if(!p)return;
  if(!confirm(`Archive “${p.name}” from the demo catalogue? This removes it from the current product list.`))return;
  p.archived=true;saveDemo();render();toast('Product archived. Historical references and stock records are retained.');
}
function showNotifications() {
  const low=db.products.filter(p=>statusOf(p)!=='In Stock');
  openDetail('Inventory notifications',`${low.length?`<p class="detail-description">These products are at or below their minimum stock level.</p>${low.map(p=>`<div class="notification-row"><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.sku)} · ${productQty(p)} available / ${p.min} minimum</small></span>${statusBadge(statusOf(p))}</div>`).join('')}`:'<div class="empty">No stock alerts. All products are above minimum stock.</div>'}`);
}
function saveSettings() {
  const get=name=>document.querySelector(`[name="${name}"]`)?.value;
  db.settings.business=get('business')?.trim()||db.settings.business;
  db.settings.currency=get('currency')||'INR';db.settings.dateFormat=get('dateFormat')||'DD MMM YYYY';
  db.settings.theme=get('theme')||'Light';db.settings.threshold=Number(get('threshold')??10);
  saveDemo();render();toast('Local demo preferences saved in this browser.');
}
function exportCsv(kind) {
  let header,rows,name;
  if(kind==='products') {
    header=['Product','SKU','Category','Available quantity','Purchase price INR','Selling price INR','Minimum stock','Status','Description'];
    rows=db.products.map(p=>[p.name,p.sku,p.category,productQty(p),p.purchase,p.selling,p.min,statusOf(p),p.description]);name='stockpilot-products.csv';
  } else if(kind==='movements') {
    header=['Movement ID','Type','Product','Quantity','Warehouse','Reference','Date','Note'];
    rows=db.movements.map(m=>[m.id,m.type,productLabel(m.productId),m.qty,m.warehouse,m.reference,m.date,m.note]);name='stockpilot-movements.csv';
  } else {
    header=['Section','Name','Reference','Quantity / units','Value INR','Status'];
    rows=[...db.products.map(p=>['Inventory',p.name,p.sku,productQty(p),productQty(p)*p.purchase,statusOf(p)]),...db.orders.map(o=>['Purchase order',o.supplier,o.id,o.items.reduce((s,i)=>s+i.qty,0),orderTotal(o),o.status]),...db.sales.map(s=>['Sales issue',productLabel(s.productId),s.id,s.qty,(productById(s.productId)?.selling||0)*s.qty,s.status])];name='stockpilot-report.csv';
  }
  const q=value=>`"${String(value??'').replaceAll('"','""')}"`;
  const csv=[header,...rows].map(row=>row.map(q).join(',')).join('\r\n');
  const blob=new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('CSV export downloaded.');
}
function toast(message) {
  const root=document.getElementById('toast-root');if(!root)return;
  root.innerHTML=`<div class="toast" role="status">${escapeHtml(message)}</div>`;
  clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{if(root.isConnected)root.innerHTML='';},3200);
}

try {
  const sessionId = localStorage.getItem(SESSION_KEY);
  currentUser = accounts.find(account => account.id === sessionId && account.active !== false) || null;
  if (!currentUser) localStorage.removeItem(SESSION_KEY);
} catch (error) {
  console.warn('Session could not be restored. Please sign in again.', error);
}
render();
