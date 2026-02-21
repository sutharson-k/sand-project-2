// ====== SAND DATA (6 types) ======
let sandTypes = window.__sandTypesData || [
    {
        id: 1, name: "River Sand", category: "construction", color: "linear-gradient(135deg,#C2B280,#A89060)", image: "images/river-sand.jpg", price: 850, grain: "0.5 - 2mm", moisture: "5-8%", density: "1520 kg/m³", origin: "River beds", icon: "fa-water",
        desc: "Premium natural river sand ideal for concrete mixing, plastering, and general construction. Sourced from riverbeds with consistent grain size and excellent binding properties. Washed and graded for optimal performance.",
        uses: "Concrete, Plastering, Brickwork, Floor screeding"
    },
    {
        id: 2, name: "M-Sand (Manufactured)", category: "construction", color: "linear-gradient(135deg,#8B8680,#6B6560)", image: "images/msand.jfif", price: 650, grain: "0.15 - 4.75mm", moisture: "2-4%", density: "1750 kg/m³", origin: "Granite crushing", icon: "fa-industry",
        desc: "Machine-manufactured sand produced by crushing granite rocks. Superior alternative to river sand with consistent quality, zero impurities, and controlled grain distribution. Eco-friendly and highly durable.",
        uses: "RCC work, Plastering, Block/Brick work"
    },
    {
        id: 3, name: "Silica Sand", category: "industrial", color: "linear-gradient(135deg,#F5F0DC,#E0D5B0)", image: "images/silica-sand.jfif", price: 1200, grain: "0.1 - 0.5mm", moisture: "<1%", density: "1600 kg/m³", origin: "Quartz deposits", icon: "fa-gem",
        desc: "High-purity silica sand with 99%+ SiO2 content. Used in glass manufacturing, water filtration, foundry casting, and industrial applications. Carefully processed to ensure consistent purity and grain size.",
        uses: "Glass making, Water filtration, Foundry casting, Sandblasting"
    },
    {
        id: 4, name: "P-Sand", category: "construction", color: "linear-gradient(135deg,#C8B08C,#A89070)", image: "images/psand.jfif", price: 500, grain: "0.15 - 4.75mm", moisture: "<2%", density: "1600 kg/m³", origin: "Crushed granite", icon: "fa-cubes",
        desc: "P-Sand (Plastering Sand) is manufactured sand specifically designed for plastering work. Produced by crushing granite rocks with controlled grain size for smooth finish. Superior bonding and consistency compared to natural sand.",
        uses: "Plastering, Wall finishing, Concrete work, Mortar mixing"
    },
    {
        id: 5, name: "Landscaping Sand", category: "landscaping", color: "linear-gradient(135deg,#DAA520,#CD853F)", image: "images/landscape-sand.jfif", price: 700, grain: "0.5 - 1mm", moisture: "3-5%", density: "1500 kg/m³", origin: "Natural deposits", icon: "fa-leaf",
        desc: "Premium landscaping sand ideal for garden paths, paver joints, and decorative features. Provides excellent drainage and aesthetic appeal. Available in natural golden tones for beautiful outdoor spaces.",
        uses: "Garden paths, Paver joints, Lawn top-dressing, Drainage"
    },
    {
        id: 6, name: "Black Sand (Volcanic)", category: "specialty", color: "linear-gradient(135deg,#2C2C2C,#4A4A4A)", image: "images/black-sand.jfif", price: 1800, grain: "0.25 - 1mm", moisture: "<3%", density: "1700 kg/m³", origin: "Volcanic basalt", icon: "fa-volcano",
        desc: "Rare volcanic black sand sourced from basalt rock formations. Rich in minerals like magnetite and ilmenite. Used for premium decorative projects, zen gardens, and specialty construction requiring unique aesthetics.",
        uses: "Decorative projects, Zen gardens, Premium landscaping, Art installations"
    }
];

// ====== DEALER DATA ======
const dealers = window.__dealersData || [
    { id: 1, name: "Sharma Quarries Pvt. Ltd.", location: "Pune, Maharashtra", rating: 4.8, reviews: 342, bg: "linear-gradient(135deg,#6C63FF,#B8B5FF)", priceMultiplier: 1.0 },
    { id: 2, name: "Ganesh Sand Suppliers", location: "Chennai, Tamil Nadu", rating: 4.6, reviews: 218, bg: "linear-gradient(135deg,#F2994A,#F2C94C)", priceMultiplier: 0.95 },
    { id: 3, name: "Rajput Mining Co.", location: "Jaipur, Rajasthan", rating: 4.9, reviews: 567, bg: "linear-gradient(135deg,#27AE60,#6FCF97)", priceMultiplier: 1.05 },
    { id: 4, name: "Krishna Sand Works", location: "Hyderabad, Telangana", rating: 4.5, reviews: 189, bg: "linear-gradient(135deg,#2D9CDB,#56CCF2)", priceMultiplier: 0.9 },
    { id: 5, name: "Patel Aggregates Ltd.", location: "Ahmedabad, Gujarat", rating: 4.7, reviews: 425, bg: "linear-gradient(135deg,#EB5757,#FF8A80)", priceMultiplier: 1.02 },
    { id: 6, name: "Southern Sand Exports", location: "Bangalore, Karnataka", rating: 4.4, reviews: 156, bg: "linear-gradient(135deg,#9B59B6,#D5A6E6)", priceMultiplier: 0.92 }
];

// ====== TRANSPORT DATA ======
const trucks = window.__trucksData || [
    { id: 1, name: "Mini Tipper (3 Ton)", icon: "fa-truck-pickup", capacity: "Up to 3 tons", eta: "Same day", baseCost: 1500, perTon: 200 },
    { id: 2, name: "Standard Tipper (7 Ton)", icon: "fa-truck", capacity: "Up to 7 tons", eta: "Same day", baseCost: 2500, perTon: 150 },
    { id: 3, name: "Heavy Dumper (14 Ton)", icon: "fa-truck-moving", capacity: "Up to 14 tons", eta: "Next day", baseCost: 4000, perTon: 120 },
    { id: 4, name: "Trailer Truck (20 Ton)", icon: "fa-trailer", capacity: "Up to 20 tons", eta: "1-2 days", baseCost: 6000, perTon: 100 },
    { id: 5, name: "Bulk Carrier (30 Ton)", icon: "fa-truck-monster", capacity: "Up to 30 tons", eta: "2-3 days", baseCost: 8000, perTon: 80 }
];
let sellerListings = window.__sellerListingsData || [];
let transporters = window.__transportersData || [];

// ====== STATE ======
let state = {
    user: JSON.parse(localStorage.getItem('sandify_user')) || null,
    location: localStorage.getItem('sandify_location') || '',
    theme: localStorage.getItem('sandify_theme') || 'dark',
    currentPage: 'home',
    selectedSand: null,
    selectedDealer: null,
    selectedTruck: null,
    orderQuantity: 5,
    distanceKm: 20,
    deliveryWindow: 'flexible',
    orders: JSON.parse(localStorage.getItem('sandify_orders')) || [],
    pendingAction: null
};
window.state = state;

// ====== INIT ======
function initApp() {
    applyTheme(state.theme);
    if (state.user) showLoggedInUI();
    updateSandCount();
    createParticles();
    animateCounters();
    renderFeatured();
    handleHashRoute();
    window.addEventListener('hashchange', handleHashRoute);
    document.getElementById('mobile-menu').addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('show');
    });
    document.getElementById('notif-btn')?.addEventListener('click', () => {
        const dd = document.getElementById('notif-dropdown');
        if (dd) dd.classList.toggle('show');
        if (dd) dd.style.display = dd.classList.contains('show') ? 'block' : 'none';
        if (window.__convexMarkNotificationsRead) {
            window.__convexMarkNotificationsRead();
        }
    });
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            const page = link.dataset.page;
            if (page === 'catalog' || page === 'seller') {
                e.preventDefault();
                navigateWithAuth(page);
                return;
            }
            if (page === 'admin') {
                e.preventDefault();
                window.location.hash = 'admin';
                return;
            }
        });
    });
    document.getElementById('profile-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profile-dropdown').classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        const dd = document.getElementById('profile-dropdown');
        if (dd && !e.target.closest('.profile-wrapper')) dd.classList.remove('show');
        const nd = document.getElementById('notif-dropdown');
        if (nd && !e.target.closest('.notif-wrapper')) {
            nd.classList.remove('show');
            nd.style.display = 'none';
        }
    });
    // Dropdown actions
    document.querySelectorAll('.dropdown-item[data-action]').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            document.getElementById('profile-dropdown').classList.remove('show');
            if (action === 'profile') navigateTo('profile');
            else if (action === 'orders') navigateTo('orders');
            else if (action === 'support') openModal('support-modal');
            else if (action === 'logout') handleLogout();
        });
    });
    document.getElementById('theme-toggle').addEventListener('change', (e) => {
        const t = e.target.checked ? 'light' : 'dark';
        applyTheme(t);
        state.theme = t;
        localStorage.setItem('sandify_theme', t);
    });
    document.getElementById('btn-nav-location')?.addEventListener('click', () => openModal('location-modal'));
    const termsLink = document.getElementById('terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('terms-modal');
        });
    }
    const termsCheck = document.getElementById('login-terms-check');
    const loginBtn = document.querySelector('#login-form button[type="submit"]');
    const googleBtn = document.getElementById('btn-google-auth');
    if (termsCheck && loginBtn) {
        termsCheck.addEventListener('change', () => {
            if (loginBtn) loginBtn.dataset.termsOk = termsCheck.checked ? 'true' : 'false';
            if (googleBtn) googleBtn.dataset.termsOk = termsCheck.checked ? 'true' : 'false';
        });
    }
    ['btn-google-auth', 'btn-google-auth-signup'].forEach((id) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (id === 'btn-google-auth') {
                const termsCheck = document.getElementById('login-terms-check');
                if (termsCheck && !termsCheck.checked) {
                    openModal('terms-warning-modal');
                    return toast('Please accept the Terms & Conditions', 'error');
                }
            }
            if (window.__convexAuthSignIn) {
                window.__convexAuthSignIn('google', { flow: 'signIn', redirectTo: window.location.origin });
            }
        });
    });
    document.querySelectorAll('.upload-box input[type="file"]').forEach((input) => {
        input.addEventListener('change', (e) => updateUploadPreview(e.target));
    });
    const magicBtn = document.getElementById('btn-magic-link');
    if (magicBtn) {
        magicBtn.remove();
    }
    const signupPwd = document.getElementById('signup-password');
    const strengthEl = document.getElementById('signup-password-strength');
    if (signupPwd && strengthEl) {
        const updateStrength = () => {
            const pwd = signupPwd.value || '';
            const score = passwordStrengthScore(pwd);
            const label = score >= 3 ? 'Strong' : score === 2 ? 'Medium' : 'Weak';
            strengthEl.textContent = `Password strength: ${label}`;
            strengthEl.classList.remove('weak', 'medium', 'strong');
            strengthEl.classList.add(label.toLowerCase());
        };
        signupPwd.addEventListener('input', updateStrength);
        updateStrength();
    }
}

function updateSandCount() {
    const count = sandTypes.length || 0;
    const stat = document.getElementById('sand-count-stat');
    if (stat) stat.dataset.count = String(count);
    document.querySelectorAll('.sand-count-text').forEach((el) => {
        el.textContent = String(count);
    });
}

function updateAdminUI() {
    const adminLink = document.getElementById('admin-nav-link');
    if (!adminLink) return;
    const isAdmin = window.__isAdmin === true;
    adminLink.style.display = isAdmin ? 'inline-flex' : 'none';
}

function updatePartnerUI() {
    const sellerLink = document.getElementById('seller-dashboard-link');
    const transportLink = document.getElementById('transport-dashboard-link');
    if (!sellerLink || !transportLink) return;
    const status = window.__partnerStatus || { seller: false, transporter: false };
    sellerLink.style.display = status.seller ? 'flex' : 'none';
    transportLink.style.display = status.transporter ? 'flex' : 'none';
}

function renderAdminSummary() {
    const data = window.__adminSnapshot;
    if (!data || !data.ok) return;
    const totalUsers = document.getElementById('admin-total-users');
    const totalOrders = document.getElementById('admin-total-orders');
    const totalSellers = document.getElementById('admin-total-sellers');
    const totalTransport = document.getElementById('admin-total-transport');
    if (totalUsers) totalUsers.textContent = `Users: ${data.totals.users}`;
    if (totalOrders) totalOrders.textContent = `Orders: ${data.totals.orders}`;
    if (totalSellers) totalSellers.textContent = `Sellers: ${data.totals.sellers}`;
    if (totalTransport) totalTransport.textContent = `Transport: ${data.totals.transporters}`;

    renderAdminList('admin-latest-orders', data.latestOrders, 'order');
    renderAdminList('admin-latest-sellers', data.latestSellers, 'seller');
    renderAdminList('admin-latest-transporters', data.latestTransporters, 'transport');
    bindAdminActions();
}

function renderAdminList(containerId, items, kind) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!items || items.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'admin-row';
        empty.textContent = kind === 'order' ? 'No recent orders' : (kind === 'seller' ? 'No seller applications' : 'No transport applications');
        container.appendChild(empty);
        return;
    }
    items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'admin-row';
        if (kind !== 'order') {
            row.dataset.appId = item._id;
            row.dataset.kind = kind;
        }
        const left = document.createElement('span');
        left.textContent = kind === 'order' ? item.orderNumber : item.company;
        const right = document.createElement('span');
        right.className = 'admin-status';
        right.textContent = item.status;
        row.appendChild(left);
        row.appendChild(right);
        if (kind !== 'order' && item.status === 'pending') {
            const actions = document.createElement('span');
            actions.className = 'admin-actions';
            const approve = document.createElement('button');
            approve.className = 'admin-btn admin-approve';
            approve.dataset.status = 'approved';
            approve.textContent = 'Approve';
            const reject = document.createElement('button');
            reject.className = 'admin-btn admin-reject';
            reject.dataset.status = 'rejected';
            reject.textContent = 'Reject';
            actions.appendChild(approve);
            actions.appendChild(reject);
            row.appendChild(actions);
        }
        container.appendChild(row);
    });
}

function bindAdminActions() {
    if (window.__adminActionsBound) return;
    window.__adminActionsBound = true;
    const attach = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('button.admin-btn');
            if (!btn) return;
            const row = btn.closest('.admin-row');
            if (!row) return;
            const appId = row.dataset.appId;
            const kind = row.dataset.kind;
            const status = btn.dataset.status;
            if (!appId || !kind || !status) return;
            const update = kind === 'seller'
                ? window.__convexUpdateSellerAppStatus
                : window.__convexUpdateTransportAppStatus;
            if (!update) {
                toast('Admin action not available', 'error');
                return;
            }
            btn.disabled = true;
            update({ applicationId: appId, status })
                .then(() => {
                    const statusEl = row.querySelector('.admin-status');
                    if (statusEl) statusEl.textContent = status;
                    const actions = row.querySelector('.admin-actions');
                    if (actions) actions.remove();
                    toast(`Application ${status}`, 'success');
                })
                .catch(() => {
                    btn.disabled = false;
                    toast('Unable to update application', 'error');
                });
        });
    };
    attach('admin-latest-sellers');
    attach('admin-latest-transporters');
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ====== ROUTING ======
function handleHashRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (['home', 'catalog', 'detail', 'dealers', 'transport', 'order', 'payment', 'tracking', 'seller', 'profile', 'orders', 'about'].includes(hash)) {
        navigateTo(hash);
    }
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (page === 'catalog' && !state.user) {
        document.getElementById('page-home').classList.add('active');
        updateNavActive('home');
        showAuth('login');
        return;
    }
    if (page === 'admin') {
        if (!window.__isAdmin) {
            document.getElementById('page-home').classList.add('active');
            updateNavActive('home');
            showAuth('login');
            toast('Admin access only (Google login)', 'error');
            return;
        }
    }
    if (page === 'about') {
        document.getElementById('page-home').classList.add('active');
        setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
        updateNavActive('about');
        return;
    }
    const el = document.getElementById('page-' + page);
    if (el) { el.classList.add('active'); window.scrollTo(0, 0); }
    state.currentPage = page;
    updateNavActive(page);
    document.getElementById('nav-links').classList.remove('show');
    if (page === 'catalog') renderCatalog();
    if (page === 'profile') renderProfile();
    if (page === 'orders') renderOrders();
}

function navigateWithAuth(page, extra) {
    if (!state.user) {
        state.pendingAction = { page, extra };
        showAuth('login');
        return;
    }
    if (!state.location) {
        state.pendingAction = { page, extra };
        openModal('location-modal');
        return;
    }
    if (page === 'seller' && extra === 'transport') {
        navigateTo('seller');
        setTimeout(() => switchSellerTab('transport', document.querySelectorAll('.seller-tab')[1]), 100);
        return;
    }
    window.location.hash = page;
    navigateTo(page);
}

function updateNavActive(page) {
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.page === page);
    });
}

// ====== AUTH ======
function showAuth(type) {
    document.getElementById('login-form').style.display = type === 'login' ? 'block' : 'none';
    document.getElementById('signup-form').style.display = type === 'signup' ? 'block' : 'none';
    document.getElementById('auth-title').textContent = type === 'login' ? 'Welcome Back' : 'Create Account';
    document.getElementById('auth-subtitle').textContent = type === 'login' ? 'Login to continue' : 'Join Sandify today';
    openModal('auth-modal');
}

function handleLogin(e) {
    e.preventDefault();
    const termsCheck = document.getElementById('login-terms-check');
    if (termsCheck && !termsCheck.checked) {
        openModal('terms-warning-modal');
        return toast('Please accept the Terms & Conditions', 'error');
    }
    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-password').value;
    if (!email || !pwd) return toast('Please fill all fields', 'error');
    if (window.__convexSignInWithPassword) {
        window.__convexSignInWithPassword(email, pwd)
            .then(() => {
                toast('Signed in successfully', 'success');
            })
            .catch(() => {
                toast('Invalid email or password', 'error');
            });
        return;
    }
    state.user = { name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), email, phone: '+91 98765 43210', joined: new Date().toLocaleDateString('en-IN') };
    localStorage.setItem('sandify_user', JSON.stringify(state.user));
    showLoggedInUI();
    closeModal('auth-modal');
    toast('Welcome back, ' + state.user.name + '!', 'success');
    if (!state.location) {
        setTimeout(() => openModal('location-modal'), 500);
    } else if (state.pendingAction) {
        const act = state.pendingAction; state.pendingAction = null;
        setTimeout(() => navigateWithAuth(act.page, act.extra), 300);
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const pwd = document.getElementById('signup-password').value;
    if (!name || !email || !phone || !pwd) return toast('Please fill all fields', 'error');
    if (pwd.length < 8) return toast('Password must be at least 8 characters', 'error');
    if (passwordStrengthScore(pwd) < 2) return toast('Password strength must be Medium or stronger', 'error');
    if (window.__convexSignUpWithPassword) {
        window.__convexSignUpWithPassword(name, email, pwd)
            .then(() => {
                toast('Account created. Please log in.', 'success');
                showAuth('login');
            })
            .catch(() => {
                toast('Unable to create account', 'error');
            });
        return;
    }
}

function handleLogout() {
    if (window.__convexAuthSignOut) {
        window.__convexAuthSignOut();
    }
    state.user = null;
    state.location = '';
    localStorage.removeItem('sandify_user');
    localStorage.removeItem('sandify_location');
    document.getElementById('profile-wrapper').style.display = 'none';
    document.getElementById('btn-login').style.display = 'flex';
    document.getElementById('btn-nav-location').style.display = 'none';
    const notif = document.getElementById('notif-wrapper');
    if (notif) notif.style.display = 'none';
    navigateTo('home');
    toast('You have been signed out.', 'info');
}

function showLoggedInUI() {
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('profile-wrapper').style.display = 'block';
    document.getElementById('btn-nav-location').style.display = 'flex';
    const notif = document.getElementById('notif-wrapper');
    if (notif) notif.style.display = 'block';
    const initial = state.user.name.charAt(0).toUpperCase();
    document.getElementById('profile-avatar').textContent = initial;
    document.getElementById('dropdown-avatar').textContent = initial;
    document.getElementById('dropdown-name').textContent = state.user.name;
    document.getElementById('dropdown-email').textContent = state.user.email;
    if (state.location) document.getElementById('nav-location-text').textContent = state.location;
    document.getElementById('theme-toggle').checked = state.theme === 'light';
}

// ====== LOCATION ======
function selectLocation(loc) {
    document.getElementById('location-search').value = loc;
}
function useCurrentLocation() {
    if (!navigator.geolocation) {
        toast('Geolocation not supported by your browser', 'error');
        return;
    }
    toast('Detecting your location...', 'info');
    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`;
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error('Geocoding failed');
            const data = await res.json();
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || '';
            const state = addr.state || '';
            const country = addr.country || '';
            const label = [city, state].filter(Boolean).join(', ') || country || 'Current location';
            document.getElementById('location-search').value = label;
            toast('Location detected: ' + label, 'success');
        } catch (err) {
            toast('Unable to resolve your location. Please type it manually.', 'error');
        }
    }, () => {
        toast('Location permission denied. Please type it manually.', 'error');
    }, { enableHighAccuracy: true, timeout: 10000 });
}

function passwordStrengthScore(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 3);
}

function openProfileSetup(user) {
    if (!user) return;
    document.getElementById('profile-name').value = user.name || '';
    document.getElementById('profile-email').value = user.email || '';
    document.getElementById('profile-phone').value = user.phone || '';
    openModal('profile-setup-modal');
}

function handleProfileSetup(e) {
    e.preventDefault();
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    if (!name || !email || !phone) return toast('Please fill all fields', 'error');
    if (window.__convexSaveProfile) {
        window.__convexSaveProfile({ name, email, phone });
    }
    state.user = { ...state.user, name, email, phone };
    localStorage.setItem('sandify_user', JSON.stringify(state.user));
    showLoggedInUI();
    closeModal('profile-setup-modal');
    toast('Profile saved!', 'success');
}
function confirmLocation() {
    const loc = document.getElementById('location-search').value.trim();
    if (!loc) return toast('Please enter a location', 'error');
    state.location = loc;
    localStorage.setItem('sandify_location', loc);
    if (window.__convexSetPrefs) {
        window.__convexSetPrefs({ location: loc, theme: state.theme });
    }
    document.getElementById('nav-location-text').textContent = loc;
    closeModal('location-modal');
    toast('Location set to ' + loc, 'success');
    if (state.pendingAction) {
        const act = state.pendingAction; state.pendingAction = null;
        setTimeout(() => navigateWithAuth(act.page, act.extra), 300);
    }
}

// ====== THEME ======
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.checked = theme === 'light';
    state.theme = theme;
    localStorage.setItem('sandify_theme', theme);
    if (window.__convexSetPrefs) {
        window.__convexSetPrefs({ location: state.location || '', theme });
    }
}

// ====== CATALOG ======
function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    grid.innerHTML = sandTypes.slice(0, 3).map(s => sandCardHTML(s)).join('');
}

function renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    const search = (document.getElementById('catalog-search')?.value || '').toLowerCase();
    const cat = document.querySelector('.filter-chip.active')?.dataset.cat || 'all';
    const filtered = sandTypes.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search) || s.category.includes(search);
        const matchCat = cat === 'all' || s.category === cat;
        return matchSearch && matchCat;
    });
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><h3>No sand types found</h3><p>Try adjusting your search or filter</p></div>';
        return;
    }
    grid.innerHTML = filtered.map(s => sandCardHTML(s)).join('');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function sanitizeUrl(value) {
    const url = String(value ?? '').trim();
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('data:image/')) return url;
    if (url.startsWith('/')) return url;
    return '';
}

function sanitizeIcon(value) {
    const icon = String(value ?? '').trim();
    return /^fa-[a-z0-9-]+$/i.test(icon) ? icon : 'fa-box';
}

function sanitizeColor(value) {
    const color = String(value ?? '').trim();
    if (/^#[0-9a-f]{3,8}$/i.test(color)) return color;
    if (/^linear-gradient\\([a-z0-9#,%\\.\\s-]+\\)$/i.test(color)) return color;
    return 'linear-gradient(135deg,#C2B280,#A89060)';
}

function sandCardHTML(s) {
    const imageUrl = sanitizeUrl(s.image);
    const iconClass = sanitizeIcon(s.icon);
    const imageContent = imageUrl
        ? `<img src="${imageUrl}" alt="${escapeHtml(s.name)}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="sand-texture"></div><i class="fas ${iconClass}"></i>`;
    const safeColor = sanitizeColor(s.color);
    return `<div class="sand-card" onclick="viewSandDetail(${s.id})">
        <div class="sand-card-image" style="background:${safeColor}">
            ${imageContent}
        </div>
        <div class="sand-card-body">
            <div class="sand-cat">${s.category.charAt(0).toUpperCase() + s.category.slice(1)}</div>
            <h3>${escapeHtml(s.name)}</h3>
            <div class="sand-price">₹${s.price.toLocaleString('en-IN')} <span>/ton</span></div>
        </div>
    </div>`;
}

function filterCatalog() { renderCatalog(); }
function filterByCategory(cat, el) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    renderCatalog();
}

// ====== DETAIL PAGE ======
function viewSandDetail(id) {
    const sand = sandTypes.find(s => s.id === id);
    if (!sand) return;
    state.selectedSand = sand;
    const sandKey = String(sand.dbId || sand._id || sand.id);
    if (window.__setSelectedSandId) {
        window.__setSelectedSandId(sandKey);
    }
    const sellersForSand = sellerListings.filter(l => String(l.sandId) === sandKey);
    const sandReviews = (window.__sandReviewsData || []).filter(r => String(r.sandId) === sandKey);
    const sellersHtml = sellersForSand.length
        ? `<div class="detail-sellers">
            <h4>Available Sellers</h4>
            ${sellersForSand.map(s => `
                <div class="detail-seller-row">
                    <span>${escapeHtml(s.company)}</span>
                    <span>₹${Number(s.price).toLocaleString('en-IN')}/ton</span>
                </div>
            `).join('')}
        </div>`
        : `<div class="detail-sellers empty">No sellers listed yet.</div>`;
    const container = document.getElementById('detail-container');
    const detailImageUrl = sanitizeUrl(sand.image);
    const detailImageContent = detailImageUrl
        ? `<img src="${detailImageUrl}" alt="${escapeHtml(sand.name)}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);">`
        : `<i class="fas ${sanitizeIcon(sand.icon)}"></i>`;
    container.innerHTML = `
        <div class="detail-grid">
            <div class="detail-image" style="background:${sanitizeColor(sand.color)};overflow:hidden;">
                ${detailImageContent}
            </div>
            <div class="detail-info">
                <div class="detail-cat">${sand.category.charAt(0).toUpperCase() + sand.category.slice(1)}</div>
                <h1>${escapeHtml(sand.name)}</h1>
                <div class="detail-price">₹${sand.price.toLocaleString('en-IN')} <span>/ton</span></div>
                <p class="detail-desc">${escapeHtml(sand.desc)}</p>
                <div class="detail-specs">
                    <div class="spec-item"><div class="spec-label">Grain Size</div><div class="spec-value">${escapeHtml(sand.grain)}</div></div>
                    <div class="spec-item"><div class="spec-label">Moisture</div><div class="spec-value">${escapeHtml(sand.moisture)}</div></div>
                    <div class="spec-item"><div class="spec-label">Density</div><div class="spec-value">${escapeHtml(sand.density)}</div></div>
                    <div class="spec-item"><div class="spec-label">Origin</div><div class="spec-value">${escapeHtml(sand.origin)}</div></div>
                </div>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:20px"><strong>Applications:</strong> ${escapeHtml(sand.uses)}</p>
                ${sellersHtml}
                <div id="reviews-container" class="detail-sellers" style="margin-top:12px;"></div>
                ${window.__isAdmin ? `
                    <button class="btn btn-outline btn-full" style="margin-top:12px" onclick="removeSandTypePrompt('${sandKey}')">
                        <i class="fas fa-trash"></i> Remove Sand Type
                    </button>
                ` : ''}
                <button class="btn btn-primary btn-large btn-full" onclick="goToDealers()">
                    <i class="fas fa-shopping-cart"></i> Order This Sand
                </button>
            </div>
        </div>`;
    renderReviews(sandReviews);
    navigateTo('detail');
}

function renderReviews(items) {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.classList.add('empty');
        container.textContent = 'No reviews yet.';
        return;
    }
    container.classList.remove('empty');
    const title = document.createElement('h4');
    title.textContent = 'Reviews';
    container.appendChild(title);
    items.forEach((r) => {
        const row = document.createElement('div');
        row.className = 'detail-seller-row';
        const stars = document.createElement('span');
        stars.textContent = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        const comment = document.createElement('span');
        comment.textContent = r.comment;
        row.appendChild(stars);
        row.appendChild(comment);
        container.appendChild(row);
    });
}

function removeSandTypePrompt(sandId) {
    window.__pendingRemoveSandId = sandId;
    const reasonEl = document.getElementById('remove-sand-reason');
    if (reasonEl) reasonEl.value = '';
    openModal('remove-sand-modal');
}

function confirmRemoveSand() {
    const sandId = window.__pendingRemoveSandId;
    const reason = document.getElementById('remove-sand-reason')?.value || '';
    if (!sandId || !reason.trim()) {
        return toast('Reason is required', 'error');
    }
    if (window.__convexRemoveSandType) {
        window.__convexRemoveSandType({ sandId, reason: reason.trim() })
            .then(() => {
                sandTypes = sandTypes.filter(s => String(s.dbId || s._id || s.id) !== String(sandId));
                renderCatalog();
                navigateTo('catalog');
                closeModal('remove-sand-modal');
                toast('Sand type removed', 'success');
            })
            .catch(() => toast('Unable to remove sand type', 'error'));
    }
}

// ====== DEALERS ======
function goToDealers() {
    if (!state.user) {
        document.getElementById('page-home').classList.add('active');
        updateNavActive('home');
        showAuth('login');
        return;
    }
    if (!state.selectedSand) return;
    const sandKey = String(state.selectedSand.dbId || state.selectedSand._id || state.selectedSand.id);
    const listings = sellerListings.filter(l => String(l.sandId) === sandKey);
    const list = document.getElementById('dealers-list');
    document.getElementById('dealer-subtitle').textContent = `Verified sellers for ${state.selectedSand.name}`;
    list.innerHTML = '';
    if (listings.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'no-results';
        empty.innerHTML = '<i class="fas fa-store"></i><h3>No sellers yet</h3><p>Please check back soon.</p>';
        list.appendChild(empty);
        navigateTo('dealers');
        return;
    }
    listings.forEach((d) => {
        const price = Number(d.price);
        const card = document.createElement('div');
        card.className = 'dealer-card';
        card.addEventListener('click', () => selectDealer(d.listingId, price, card));
        const avatar = document.createElement('div');
        avatar.className = 'dealer-avatar';
        avatar.style.background = sanitizeColor(state.selectedSand.color);
        avatar.textContent = (d.company || '').charAt(0);
        const info = document.createElement('div');
        info.className = 'dealer-info';
        const h3 = document.createElement('h3');
        h3.textContent = d.company;
        const loc = document.createElement('div');
        loc.className = 'dealer-location';
        loc.innerHTML = '<i class="fas fa-map-marker-alt"></i> ';
        const locText = document.createElement('span');
        locText.textContent = d.location;
        loc.appendChild(locText);
        const rating = document.createElement('div');
        rating.className = 'dealer-rating';
        rating.textContent = 'Verified Seller';
        const availability = document.createElement('div');
        availability.className = 'dealer-availability';
        const stockLabel = typeof d.availableTons === 'number'
            ? `${d.availableTons} tons available`
            : 'Stock available';
        const restockLabel = d.nextRestockLabel ? ` • Restock: ${d.nextRestockLabel}` : '';
        availability.textContent = `${d.availability === 'limited' ? 'Limited' : 'Available'} — ${stockLabel}${restockLabel}`;
        info.appendChild(h3);
        info.appendChild(loc);
        info.appendChild(rating);
        info.appendChild(availability);
        const priceWrap = document.createElement('div');
        priceWrap.className = 'dealer-price';
        const priceEl = document.createElement('div');
        priceEl.className = 'price';
        priceEl.textContent = `₹${price.toLocaleString('en-IN')}`;
        const unit = document.createElement('div');
        unit.className = 'price-unit';
        unit.textContent = 'per ton';
        priceWrap.appendChild(priceEl);
        priceWrap.appendChild(unit);
        card.appendChild(avatar);
        card.appendChild(info);
        card.appendChild(priceWrap);
        list.appendChild(card);
    });
    navigateTo('dealers');
}

function selectDealer(id, price, el) {
    const listing = sellerListings.find(d => String(d.listingId) === String(id));
    if (!listing) return;
    state.selectedDealer = {
        id: listing.listingId,
        name: listing.company,
        location: listing.location,
        sellerId: listing.sellerId,
        sandId: listing.sandId,
        finalPrice: price
    };
    document.querySelectorAll('.dealer-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    setTimeout(() => goToTransport(), 400);
}

// ====== TRANSPORT ======
function goToTransport() {
    const list = document.getElementById('transport-list');
    const available = transporters.length ? transporters : trucks.map(t => ({
        id: t.id,
        transporterId: null,
        company: t.name,
        baseCost: t.baseCost,
        perTon: t.perTon,
        eta: t.eta,
        icon: t.icon,
        capacity: t.capacity
    }));
    list.innerHTML = '';
    available.forEach((t) => {
        const cost = t.baseCost + (t.perTon * state.orderQuantity);
        const card = document.createElement('div');
        card.className = 'transport-card';
        card.addEventListener('click', () => selectTruck(t.transporterId ?? t.id, card));
        const icon = document.createElement('div');
        icon.className = 'transport-icon';
        icon.innerHTML = `<i class="fas ${sanitizeIcon(t.icon)}"></i>`;
        const info = document.createElement('div');
        info.className = 'transport-info';
        const h3 = document.createElement('h3');
        h3.textContent = t.company || t.name;
        const p = document.createElement('p');
        p.innerHTML = `<i class="fas fa-box"></i> ${escapeHtml(t.capacity)} &nbsp;|&nbsp; <i class="fas fa-clock"></i> ${escapeHtml(t.eta)}`;
        info.appendChild(h3);
        info.appendChild(p);
        const priceWrap = document.createElement('div');
        priceWrap.className = 'transport-price';
        const priceEl = document.createElement('div');
        priceEl.className = 'price';
        priceEl.textContent = `₹${cost.toLocaleString('en-IN')}`;
        const unit = document.createElement('div');
        unit.className = 'price-unit';
        unit.textContent = 'delivery';
        priceWrap.appendChild(priceEl);
        priceWrap.appendChild(unit);
        card.appendChild(icon);
        card.appendChild(info);
        card.appendChild(priceWrap);
        list.appendChild(card);
    });
    navigateTo('transport');
}

function selectTruck(id, el) {
    const found = transporters.find(t => String(t.transporterId) === String(id));
    state.selectedTruck = found || trucks.find(t => String(t.id) === String(id));
    document.querySelectorAll('.transport-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    setTimeout(() => goToOrderForm(), 400);
}

// ====== ORDER FORM ======
function goToOrderForm() {
    state.orderQuantity = 5;
    const details = document.getElementById('order-details');
    details.innerHTML = `
        <div class="order-section">
            <h3><i class="fas fa-cube"></i> Selected Sand</h3>
            <div style="display:flex;align-items:center;gap:16px">
                <div style="width:60px;height:60px;border-radius:12px;background:${sanitizeColor(state.selectedSand.color)};display:flex;align-items:center;justify-content:center">
                    <i class="fas ${sanitizeIcon(state.selectedSand.icon)}" style="color:rgba(255,255,255,0.7);font-size:1.2rem"></i>
                </div>
                <div><strong>${escapeHtml(state.selectedSand.name)}</strong><br><span style="color:var(--text-secondary);font-size:0.85rem">${escapeHtml(state.selectedSand.category)}</span></div>
            </div>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-store"></i> Dealer</h3>
            <p><strong>${escapeHtml(state.selectedDealer.name)}</strong></p>
            <p style="font-size:0.85rem;color:var(--text-secondary)">${state.selectedDealer.location} — ₹${state.selectedDealer.finalPrice.toLocaleString('en-IN')}/ton</p>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-truck"></i> Transport</h3>
            <p><strong>${escapeHtml(state.selectedTruck.name)}</strong></p>
            <p style="font-size:0.85rem;color:var(--text-secondary)">${state.selectedTruck.capacity} — ETA: ${state.selectedTruck.eta}</p>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-weight-hanging"></i> Quantity</h3>
            <div class="quantity-control">
                <button class="qty-btn" onclick="changeQty(-1)">−</button>
                <span class="qty-value" id="qty-value">${state.orderQuantity}</span>
                <span class="qty-unit">tons</span>
                <button class="qty-btn" onclick="changeQty(1)">+</button>
            </div>
            <input type="range" min="1" max="30" value="${state.orderQuantity}" id="qty-slider" oninput="setQty(this.value)" style="width:100%;margin-top:12px;accent-color:var(--primary)">
        </div>
        <div class="order-section">
            <h3><i class="fas fa-clock"></i> Delivery Window</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Preferred window</label>
                    <select id="delivery-window" onchange="setDeliveryWindow(this.value)">
                        <option value="same-day" ${state.deliveryWindow === 'same-day' ? 'selected' : ''}>Same day</option>
                        <option value="next-day" ${state.deliveryWindow === 'next-day' ? 'selected' : ''}>Next day</option>
                        <option value="flexible" ${state.deliveryWindow === 'flexible' ? 'selected' : ''}>Flexible (2-3 days)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estimated distance (km)</label>
                    <input type="number" min="1" id="distance-km" value="${state.distanceKm}" oninput="setDistanceKm(this.value)" />
                </div>
            </div>
            <div style="margin-top:10px">
                <button class="btn btn-outline" onclick="openQuoteModal()">Request Bulk Quote</button>
            </div>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
            <div class="form-group"><label>Full Address *</label><input type="text" placeholder="Site/Plot number, Street..." id="order-address" required></div>
            <div class="form-row">
                <div class="form-group"><label>City</label><input type="text" value="${escapeHtml(state.location.split(',')[0] || '')}" id="order-city"></div>
                <div class="form-group"><label>Pincode</label><input type="text" placeholder="400001" id="order-pin"></div>
            </div>
            <div class="form-group"><label>Contact Number</label><input type="tel" value="${escapeHtml(state.user?.phone || '')}" id="order-phone"></div>
            <div class="form-group"><label>Special Instructions</label><textarea placeholder="Gate access, unloading area..." rows="2" id="order-notes"></textarea></div>
        </div>`;
    updatePriceCard();
    navigateTo('order');
}

function changeQty(delta) {
    state.orderQuantity = Math.max(1, Math.min(30, state.orderQuantity + delta));
    document.getElementById('qty-value').textContent = state.orderQuantity;
    document.getElementById('qty-slider').value = state.orderQuantity;
    updatePriceCard();
}
function setQty(val) {
    state.orderQuantity = parseInt(val);
    document.getElementById('qty-value').textContent = state.orderQuantity;
    updatePriceCard();
}

function setDeliveryWindow(val) {
    state.deliveryWindow = val;
    updatePriceCard();
}

function setDistanceKm(val) {
    state.distanceKm = Math.max(1, parseInt(val || '1'));
    updatePriceCard();
}

let pricingRequestId = 0;

function updatePriceCard() {
    const sandCost = state.selectedDealer.finalPrice * state.orderQuantity;
    const transportCost = state.selectedTruck.baseCost + (state.selectedTruck.perTon * state.orderQuantity);
    const distanceFee = Math.round(state.distanceKm * 12);
    const windowMultiplier = state.deliveryWindow === 'same-day' ? 1.15 : state.deliveryWindow === 'next-day' ? 1.05 : 1;
    const windowFee = Math.round((sandCost + transportCost) * (windowMultiplier - 1));
    const gst = Math.round((sandCost + transportCost + distanceFee + windowFee) * 0.05);
    const total = sandCost + transportCost + distanceFee + windowFee + gst;
    const priceCard = document.getElementById('price-card');
    priceCard.innerHTML = `
        <h3><i class="fas fa-receipt" style="color:var(--primary)"></i> Price Breakdown</h3>
        <div class="price-row"><span class="label">Sand (${state.orderQuantity} tons × ₹${state.selectedDealer.finalPrice.toLocaleString('en-IN')})</span><span>₹${sandCost.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">Transport</span><span>₹${transportCost.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">Distance (${state.distanceKm} km)</span><span>₹${distanceFee.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">Delivery window</span><span>₹${windowFee.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">GST (5%)</span><span>₹${gst.toLocaleString('en-IN')}</span></div>
        <div class="price-row total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
        <button class="btn btn-primary btn-full btn-large" style="margin-top:20px" onclick="goToPayment(${total})">
            <i class="fas fa-credit-card"></i> Proceed to Pay
        </button>`;

    if (!window.__convexCalculatePrice || !state.selectedDealer?.id) return;
    const requestId = ++pricingRequestId;
    window.__convexCalculatePrice({
        listingId: state.selectedDealer.id,
        transporterId: state.selectedTruck?.transporterId || undefined,
        truckId: state.selectedTruck?.dbId || undefined,
        quantity: state.orderQuantity,
        distanceKm: state.distanceKm,
        deliveryWindow: state.deliveryWindow
    }).then((serverPrice) => {
        if (!serverPrice || requestId !== pricingRequestId) return;
        priceCard.innerHTML = `
            <h3><i class="fas fa-receipt" style="color:var(--primary)"></i> Price Breakdown</h3>
            <div class="price-row"><span class="label">Sand</span><span>₹${serverPrice.sandCost.toLocaleString('en-IN')}</span></div>
            <div class="price-row"><span class="label">Transport</span><span>₹${serverPrice.transportCost.toLocaleString('en-IN')}</span></div>
            <div class="price-row"><span class="label">Distance</span><span>₹${serverPrice.distanceFee.toLocaleString('en-IN')}</span></div>
            <div class="price-row"><span class="label">Delivery window</span><span>₹${serverPrice.windowFee.toLocaleString('en-IN')}</span></div>
            <div class="price-row"><span class="label">GST (5%)</span><span>₹${serverPrice.gst.toLocaleString('en-IN')}</span></div>
            <div class="price-row total"><span>Total</span><span>₹${serverPrice.total.toLocaleString('en-IN')}</span></div>
            <button class="btn btn-primary btn-full btn-large" style="margin-top:20px" onclick="goToPayment(${serverPrice.total})">
                <i class="fas fa-credit-card"></i> Proceed to Pay
            </button>`;
    }).catch(() => {});
}

// ====== PAYMENT ======
function goToPayment(total) {
    const addr = document.getElementById('order-address')?.value;
    if (!addr) return toast('Please enter delivery address', 'error');
    const container = document.getElementById('payment-container');
    container.innerHTML = `
        <div class="payment-card">
            <div class="payment-total">
                <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:4px">Total Amount</div>
                <div class="amount">₹${total.toLocaleString('en-IN')}</div>
            </div>
            <h3 style="margin-bottom:16px">Select Payment Method</h3>
            <div class="payment-method">
                <label class="payment-option selected" onclick="selectPayment(this)">
                    <input type="radio" name="payment" checked> <i class="fas fa-mobile-alt"></i> <span>UPI / Google Pay / PhonePe</span>
                </label>
                <label class="payment-option" onclick="selectPayment(this)">
                    <input type="radio" name="payment"> <i class="fas fa-credit-card"></i> <span>Credit / Debit Card</span>
                </label>
                <label class="payment-option" onclick="selectPayment(this)">
                    <input type="radio" name="payment"> <i class="fas fa-university"></i> <span>Net Banking</span>
                </label>
                <label class="payment-option" onclick="selectPayment(this)">
                    <input type="radio" name="payment"> <i class="fas fa-money-bill-wave"></i> <span>Cash on Delivery</span>
                </label>
            </div>
            <div id="payment-confirm-wrap" style="display:block;margin-top:16px;">
                <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;">Selected: <span class="confirm-method">UPI / Google Pay / PhonePe</span></div>
                <button class="btn btn-primary btn-full btn-large" onclick="processPayment(${total})">
                    <i class="fas fa-lock"></i> Confirm & Pay ₹${total.toLocaleString('en-IN')}
                </button>
            </div>
        </div>`;
    navigateTo('payment');
}

function openQuoteModal() {
    if (!state.user) return showAuth('login');
    const sandName = state.selectedSand?.name || '';
    const qtyEl = document.getElementById('quote-qty');
    const windowEl = document.getElementById('quote-window');
    const addressEl = document.getElementById('quote-address');
    const sandEl = document.getElementById('quote-sand');
    if (sandEl) sandEl.textContent = sandName;
    if (qtyEl) qtyEl.value = state.orderQuantity;
    if (windowEl) windowEl.value = state.deliveryWindow;
    if (addressEl) addressEl.value = state.location || '';
    openModal('quote-modal');
}

function submitQuoteRequest(e) {
    e.preventDefault();
    const qty = parseInt(document.getElementById('quote-qty')?.value || '0', 10);
    const deliveryWindow = document.getElementById('quote-window')?.value || 'flexible';
    const address = document.getElementById('quote-address')?.value || '';
    const notes = document.getElementById('quote-notes')?.value || '';
    if (!qty || !address) {
        return toast('Quantity and address are required', 'error');
    }
    if (!window.__convexSubmitQuoteRequest) {
        return toast('Quote service unavailable', 'error');
    }
    window.__convexSubmitQuoteRequest({
        sandId: state.selectedSand?.dbId,
        sellerId: state.selectedDealer?.sellerId,
        quantity: qty,
        deliveryWindow,
        address,
        notes: notes.trim()
    }).then(() => {
        closeModal('quote-modal');
        toast('Quote request sent', 'success');
    }).catch(() => toast('Unable to submit quote', 'error'));
}

function selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    el.querySelector('input').checked = true;
    const method = el.innerText.trim().split('\n')[0] || 'UPI';
    const confirmWrap = document.getElementById('payment-confirm-wrap');
    if (confirmWrap) {
        confirmWrap.style.display = 'block';
        confirmWrap.querySelector('.confirm-method').textContent = method;
    }
}

function processPayment(total) {
    const methodLabel = document.querySelector('input[name="payment"]:checked')?.closest('.payment-option')?.innerText?.trim() || 'UPI';
    const lowerMethod = methodLabel.toLowerCase();
    if (lowerMethod.includes('upi')) {
        openUpiWindow(total);
        return;
    }
    if (lowerMethod.includes('credit') || lowerMethod.includes('debit')) {
        openCardWindow(total);
        return;
    }
    if (lowerMethod.includes('net banking')) {
        openNetBankingWindow(total);
        return;
    }
    if (lowerMethod.includes('cash') || lowerMethod.includes('cod')) {
        openCodWindow(total);
        return;
    }
    const orderId = 'SND' + Date.now().toString().slice(-8);
    const orderNumber = 'ORD-' + Date.now().toString().slice(-10);
    const paymentMethod = methodLabel;
    const order = {
        id: orderId, orderNumber, sand: state.selectedSand.name, dealer: state.selectedDealer.name,
        transport: (state.selectedTruck.company || state.selectedTruck.name), quantity: state.orderQuantity,
        total, date: new Date().toLocaleDateString('en-IN'), status: 'processing',
        color: sanitizeColor(state.selectedSand.color), icon: sanitizeIcon(state.selectedSand.icon),
        sellerId: state.selectedDealer.sellerId || null,
        transporterId: state.selectedTruck.transporterId || null
    };
    state.orders.push(order);
    localStorage.setItem('sandify_orders', JSON.stringify(state.orders));
    if (window.__convexCreateOrder && state.user) {
        const address = document.getElementById('order-address')?.value || '';
        window.__convexCreateOrder({
            orderNumber,
            sandId: state.selectedSand.dbId,
            sellerId: state.selectedDealer.sellerId || undefined,
            transporterId: state.selectedTruck.transporterId || undefined,
            sandName: state.selectedSand.name,
            dealerName: state.selectedDealer.name,
            truckName: (state.selectedTruck.company || state.selectedTruck.name),
            quantity: state.orderQuantity,
            total,
            paymentMethod,
            address,
            pickupLocation: state.selectedDealer.location || '',
            distanceKm: state.distanceKm,
            deliveryWindow: state.deliveryWindow
        }).then((dbId) => {
            order.dbId = dbId;
            localStorage.setItem('sandify_orders', JSON.stringify(state.orders));
        }).catch(() => {});
    }
    showSuccess('Payment Successful!', `Order #${orderNumber} confirmed. Your sand is being prepared for dispatch.`, () => goToTracking(orderId));
}

function openUpiWindow(total) {
    const win = window.open('', '_blank');
    if (!win) {
        return toast('Popup blocked. Allow popups to pay via UPI.', 'error');
    }
    const expiresAt = Date.now() + 10 * 60 * 1000;
    win.document.write(`
        <html>
        <head>
            <title>UPI Payment</title>
            <style>
                body { font-family: 'Work Sans', Arial, sans-serif; background:linear-gradient(160deg,#f8efe1,#e4c9a6); color:#2b2014; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; }
                .card { background:#fff7ec; padding:24px; border-radius:20px; width:320px; box-shadow:0 24px 50px rgba(43,32,20,0.18); text-align:center; border:1px solid #e7d2b8; }
                h3 { margin:0 0 6px; letter-spacing:0.12rem; text-transform:uppercase; font-size:14px; color:#7a5a3a; }
                img { width:220px; height:220px; object-fit:cover; border-radius:14px; border:1px solid #e0d3c0; background:#fff; }
                .timer { margin-top:16px; font-size:14px; color:#7a6650; }
                .amount { font-size:20px; font-weight:700; margin:10px 0 12px; color:#3b2a18; }
                .btn { margin-top:16px; padding:10px 16px; border-radius:999px; border:none; background:#2b2014; color:#fff; font-weight:700; cursor:pointer; width:100%; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3>Pay with UPI</h3>
                <div class="amount">₹${total.toLocaleString('en-IN')}</div>
                <img src="/images/upi.jpeg" alt="UPI QR" />
                <div class="timer" id="timer">10:00</div>
                <button class="btn" id="paidBtn">I have paid</button>
            </div>
            <script>
                const expiresAt = ${expiresAt};
                const timerEl = document.getElementById('timer');
                const interval = setInterval(() => {
                    const diff = Math.max(0, expiresAt - Date.now());
                    const min = String(Math.floor(diff / 60000)).padStart(2,'0');
                    const sec = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
                    timerEl.textContent = min + ':' + sec;
                    if (diff <= 0) {
                        clearInterval(interval);
                        window.close();
                    }
                }, 1000);
                document.getElementById('paidBtn').addEventListener('click', () => {
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

function openCardWindow(total) {
    const win = window.open('', '_blank');
    if (!win) {
        return toast('Popup blocked. Allow popups to pay by card.', 'error');
    }
    win.document.write(`
        <html>
        <head>
            <title>Card Payment</title>
            <style>
                body { font-family: 'Work Sans', Arial, sans-serif; background:linear-gradient(160deg,#f8efe1,#e4c9a6); color:#2b2014; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; }
                .card { background:#fff7ec; padding:24px; border-radius:20px; width:360px; box-shadow:0 24px 50px rgba(43,32,20,0.18); border:1px solid #e7d2b8; }
                h3 { margin:0 0 6px; letter-spacing:0.12rem; text-transform:uppercase; font-size:14px; color:#7a5a3a; }
                .row { display:flex; gap:10px; }
                input, select { width:100%; padding:10px 12px; margin-top:10px; border-radius:10px; border:1px solid #e0d3c0; background:#fff; }
                .amount { font-size:18px; font-weight:700; margin:8px 0 12px; color:#3b2a18; }
                .btn { margin-top:14px; padding:10px 16px; border-radius:999px; border:none; background:#2b2014; color:#fff; font-weight:700; cursor:pointer; width:100%; }
                label { font-size:12px; color:#7a6650; display:block; margin-top:10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3>Pay by Card</h3>
                <div class="amount">₹${total.toLocaleString('en-IN')}</div>
                <label>Card Type</label>
                <select>
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>RuPay</option>
                    <option>American Express</option>
                </select>
                <label>Card Number</label>
                <input placeholder="1234 5678 9012 3456" />
                <div class="row">
                    <div style="flex:1;">
                        <label>Expiry Date</label>
                        <input placeholder="MM/YY" />
                    </div>
                    <div style="flex:1;">
                        <label>CVV (Back of card)</label>
                        <input placeholder="123" />
                    </div>
                </div>
                <label>Name on Card</label>
                <input placeholder="Full name" />
                <button class="btn" id="payBtn">Confirm & Pay</button>
            </div>
            <script>
                document.getElementById('payBtn').addEventListener('click', () => {
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

function openNetBankingWindow(total) {
    const win = window.open('', '_blank');
    if (!win) {
        return toast('Popup blocked. Allow popups to pay by net banking.', 'error');
    }
    win.document.write(`
        <html>
        <head>
            <title>Net Banking</title>
            <style>
                body { font-family: 'Work Sans', Arial, sans-serif; background:linear-gradient(160deg,#f8efe1,#e4c9a6); color:#2b2014; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; }
                .card { background:#fff7ec; padding:24px; border-radius:20px; width:360px; box-shadow:0 24px 50px rgba(43,32,20,0.18); border:1px solid #e7d2b8; }
                h3 { margin:0 0 6px; letter-spacing:0.12rem; text-transform:uppercase; font-size:14px; color:#7a5a3a; }
                select, input { width:100%; padding:10px 12px; margin-top:10px; border-radius:10px; border:1px solid #e0d3c0; background:#fff; }
                .amount { font-size:18px; font-weight:700; margin:8px 0 12px; color:#3b2a18; }
                .btn { margin-top:14px; padding:10px 16px; border-radius:999px; border:none; background:#2b2014; color:#fff; font-weight:700; cursor:pointer; width:100%; }
                label { font-size:12px; color:#7a6650; display:block; margin-top:10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3>Net Banking</h3>
                <div class="amount">₹${total.toLocaleString('en-IN')}</div>
                <label>Select Bank</label>
                <select>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra</option>
                    <option>Canara Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Punjab National Bank</option>
                </select>
                <label>Customer ID</label>
                <input placeholder="Customer ID" />
                <label>Login Password</label>
                <input type="password" placeholder="Password" />
                <button class="btn" id="payBtn">Confirm & Pay</button>
            </div>
            <script>
                document.getElementById('payBtn').addEventListener('click', () => {
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

function openCodWindow(total) {
    const win = window.open('', '_blank');
    if (!win) {
        return toast('Popup blocked. Allow popups to confirm COD.', 'error');
    }
    win.document.write(`
        <html>
        <head>
            <title>Cash on Delivery</title>
            <style>
                body { font-family: 'Work Sans', Arial, sans-serif; background:linear-gradient(160deg,#f8efe1,#e4c9a6); color:#2b2014; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; }
                .card { background:#fff7ec; padding:24px; border-radius:20px; width:360px; box-shadow:0 24px 50px rgba(43,32,20,0.18); text-align:center; border:1px solid #e7d2b8; }
                h3 { margin:0 0 6px; letter-spacing:0.12rem; text-transform:uppercase; font-size:14px; color:#7a5a3a; }
                .amount { font-size:18px; font-weight:700; margin:8px 0 12px; color:#3b2a18; }
                .btn { margin-top:14px; padding:10px 16px; border-radius:999px; border:none; background:#2b2014; color:#fff; font-weight:700; cursor:pointer; width:100%; }
                .note { font-size:13px; color:#7a6650; margin-top:8px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3>Cash on Delivery</h3>
                <div class="amount">₹${total.toLocaleString('en-IN')}</div>
                <div class="note">Pay in cash when the order is delivered.</div>
                <button class="btn" id="payBtn">Confirm COD Order</button>
            </div>
            <script>
                document.getElementById('payBtn').addEventListener('click', () => {
                    window.close();
                });
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

// ====== TRACKING ======
function goToTracking(orderId) {
    const order = state.orders.find(o => o.id === orderId) || state.orders[state.orders.length - 1];
    if (!order) return;
    const container = document.getElementById('tracking-container');
    container.innerHTML = `
        <div class="tracking-header">
            <h1><i class="fas fa-map-marked-alt" style="color:var(--primary)"></i> Live Tracking</h1>
            <p>Real-time order tracking</p>
            <div class="tracking-order-id">Order #${escapeHtml(order.id)}</div>
        </div>
        <div class="tracking-map">
            <div class="tracking-map-content">
                <div class="truck-anim"><i class="fas fa-truck-moving"></i></div>
                <div class="map-label">Simulated Live Map — ${escapeHtml(state.location || 'Your Location')}</div>
            </div>
        </div>
        <div class="tracking-timeline" id="tracking-timeline">
            <div class="timeline-item completed"><div class="timeline-dot"><i class="fas fa-check"></i></div>
                <div class="timeline-content"><h4>Order Confirmed</h4><p>Your order has been placed successfully</p><div class="time">${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div></div>
            </div>
            <div class="timeline-item" id="tl-1"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>Quarry Processing</h4><p>${escapeHtml(order.dealer)} is preparing your ${escapeHtml(order.sand)}</p><div class="time">Estimated: 15 min</div></div>
            </div>
            <div class="timeline-item" id="tl-2"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>Loading & Dispatch</h4><p>Sand loaded onto ${escapeHtml(order.transport)}</p><div class="time">Pending</div></div>
            </div>
            <div class="timeline-item" id="tl-3"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>In Transit</h4><p>Your order is on the way</p><div class="time">Pending</div></div>
            </div>
            <div class="timeline-item" id="tl-4"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>Delivered</h4><p>Sand delivered to your site</p><div class="time">Pending</div></div>
            </div>
        </div>
        <div class="tracking-eta">
            <div class="eta-label">Estimated Delivery</div>
            <div class="eta-time" id="eta-text">Calculating...</div>
        </div>`;
    navigateTo('tracking');
    if (window.__setTrackingOrderId && order.dbId) {
        window.__setTrackingOrderId(order.dbId);
    }
    if (window.__trackingUpdatesData && window.__trackingUpdatesData.length) {
        renderTrackingUpdates(window.__trackingUpdatesData);
    } else {
        simulateTracking();
    }
}

function simulateTracking() {
    const steps = ['tl-1', 'tl-2', 'tl-3', 'tl-4'];
    const times = ['Processing...', 'Loading...', '25 min away', 'Arriving!'];
    const statusMap = ['processing', 'loading', 'delivering', 'delivered'];
    let i = 0;
    const interval = setInterval(() => {
        if (i >= steps.length) { clearInterval(interval); return; }
        const el = document.getElementById(steps[i]);
        if (!el) { clearInterval(interval); return; }
        if (i > 0) { const prev = document.getElementById(steps[i - 1]); if (prev) { prev.classList.remove('active'); prev.classList.add('completed'); prev.querySelector('.timeline-dot').innerHTML = '<i class="fas fa-check"></i>'; } }
        el.classList.add('active');
        el.querySelector('.timeline-dot').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        const eta = document.getElementById('eta-text');
        if (eta) eta.textContent = times[i];
        if (window.__convexUpdateOrderStatus) {
            const currentOrder = state.orders[state.orders.length - 1];
            if (currentOrder?.dbId) {
                window.__convexUpdateOrderStatus({ orderId: currentOrder.dbId, status: statusMap[i] });
            }
        }
        if (i === steps.length - 1) {
            setTimeout(() => {
                el.classList.remove('active'); el.classList.add('completed');
                el.querySelector('.timeline-dot').innerHTML = '<i class="fas fa-check"></i>';
                if (eta) eta.textContent = 'Delivered ✓';
                toast('Your sand has been delivered! 🎉', 'success');
            }, 3000);
        }
        i++;
    }, 3000);
}

// ====== SELLER FORMS ======
function switchSellerTab(tab, el) {
    document.querySelectorAll('.seller-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('supplier-form-container').style.display = tab === 'supplier' ? 'block' : 'none';
    document.getElementById('transport-form-container').style.display = tab === 'transport' ? 'block' : 'none';
}

function handleSupplierSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('supplier-form');
    const company = document.getElementById('supplier-company')?.value.trim() || '';
    const owner = document.getElementById('supplier-owner')?.value.trim() || '';
    const email = document.getElementById('supplier-email')?.value.trim() || '';
    const phone = document.getElementById('supplier-phone')?.value.trim() || '';
    const quarryName = document.getElementById('supplier-quarry-name')?.value.trim() || '';
    const quarryLicense = document.getElementById('supplier-quarry-license')?.value.trim() || '';
    const quarryLocation = document.getElementById('supplier-quarry-location')?.value.trim() || '';
    const state = document.getElementById('supplier-state')?.value.trim() || '';
    const sandTypes = document.getElementById('supplier-sand-types')?.value.trim() || '';
    const capacity = document.getElementById('supplier-capacity')?.value.trim() || '';
    const radius = document.getElementById('supplier-radius')?.value.trim() || '';
    const location = [quarryLocation, state].filter(Boolean).join(', ');
    const details = `${quarryName} | ${quarryLicense} | ${location} | Radius: ${radius}km | ${sandTypes} | ${capacity}`;
    if (!validateRequiredUploads(form)) {
        toast('Please upload all required documents', 'error');
        return;
    }
    const submit = async () => {
        let documents = [];
        try {
            documents = await collectApplicationDocuments(form);
        } catch (err) {}
        if (window.__convexSubmitSellerApp && state.user) {
            window.__convexSubmitSellerApp({
                company,
                contactName: owner,
                phone,
                email,
                location,
                details,
                documents
            }).catch(() => {});
        }
    };
    submit();
    showSuccess('Application Submitted!', 'Your quarry registration is under review. We will notify you after approval.', () => navigateTo('home'));
}
function handleTransportSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('transport-form');
    const company = document.getElementById('transport-company')?.value.trim() || '';
    const owner = document.getElementById('transport-owner')?.value.trim() || '';
    const email = document.getElementById('transport-email')?.value.trim() || '';
    const phone = document.getElementById('transport-phone')?.value.trim() || '';
    const vehicleType = document.getElementById('transport-vehicle-type')?.value.trim() || '';
    const capacity = document.getElementById('transport-capacity')?.value.trim() || '';
    const baseLocation = document.getElementById('transport-base-location')?.value.trim() || '';
    const radius = document.getElementById('transport-radius')?.value.trim() || '';
    const baseLocationWithMeta = `${baseLocation} | Radius: ${radius}km`;
    if (!validateRequiredUploads(form)) {
        toast('Please upload all required documents', 'error');
        return;
    }
    const submit = async () => {
        let documents = [];
        try {
            documents = await collectApplicationDocuments(form);
        } catch (err) {}
        if (window.__convexSubmitTransportApp && state.user) {
            window.__convexSubmitTransportApp({
                company,
                contactName: owner,
                phone,
                email,
                vehicleType,
                capacity,
                baseLocation: baseLocationWithMeta,
                documents
            }).catch(() => {});
        }
    };
    submit();
    showSuccess('Application Submitted!', 'Your fleet registration is under review. We will notify you after approval.', () => navigateTo('home'));
}

// ====== PROFILE ======
function renderProfile() {
    if (!state.user) return navigateTo('home');
    const c = document.getElementById('profile-page-content');
    c.innerHTML = `
        <div class="profile-card">
            <div class="profile-large-avatar">${state.user.name.charAt(0).toUpperCase()}</div>
            <h2>${escapeHtml(state.user.name)}</h2>
            <p class="profile-email">${escapeHtml(state.user.email)}</p>
            <div class="profile-detail-grid">
                <div class="profile-detail-item"><div class="pd-label">Phone</div><div class="pd-value">${escapeHtml(state.user.phone)}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Member Since</div><div class="pd-value">${escapeHtml(state.user.joined)}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Location</div><div class="pd-value">${escapeHtml(state.location || 'Not set')}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Total Orders</div><div class="pd-value">${state.orders.length}</div></div>
            </div>
        </div>
        <div class="profile-card" style="margin-top:20px">
            <h3>Saved Locations</h3>
            <div class="location-form">
                <input type="text" id="location-label" placeholder="Label (Home, Site A)">
                <input type="text" id="location-address" placeholder="Full address">
                <label style="display:flex;align-items:center;gap:8px;">
                    <input type="checkbox" id="location-default">
                    Set as default
                </label>
                <button class="btn btn-outline" onclick="addSavedLocation()">Add Location</button>
            </div>
            <div id="locations-list" class="locations-list"></div>
        </div>
        <div class="profile-card" style="margin-top:20px">
            <h3>Quote Requests</h3>
            <div id="quote-requests-list" class="quote-requests-list"></div>
        </div>`;
    renderLocations(window.__userLocationsData || []);
    renderQuoteRequests(window.__quoteRequestsData || []);
}

function addSavedLocation() {
    const label = document.getElementById('location-label')?.value.trim() || '';
    const address = document.getElementById('location-address')?.value.trim() || '';
    const makeDefault = document.getElementById('location-default')?.checked || false;
    if (!label || !address) {
        return toast('Label and address required', 'error');
    }
    if (!window.__convexAddLocation) return;
    window.__convexAddLocation({ label, address, makeDefault })
        .then(() => {
            document.getElementById('location-label').value = '';
            document.getElementById('location-address').value = '';
            document.getElementById('location-default').checked = false;
        })
        .catch(() => toast('Unable to add location', 'error'));
}

function renderLocations(items) {
    const container = document.getElementById('locations-list');
    if (!container) return;
    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="no-results">No saved locations yet.</div>';
        return;
    }
    items.forEach((loc) => {
        const row = document.createElement('div');
        row.className = 'location-row';
        row.innerHTML = `
            <div>
                <div class="location-name">${escapeHtml(loc.label)} ${loc.isDefault ? '• Default' : ''}</div>
                <div class="location-address">${escapeHtml(loc.address)}</div>
            </div>
            <div class="location-actions">
                ${loc.isDefault ? '' : `<button class="btn btn-outline" onclick="setDefaultLocation('${loc._id}')">Set Default</button>`}
                <button class="btn btn-outline" onclick="removeLocation('${loc._id}')">Remove</button>
            </div>`;
        container.appendChild(row);
    });
}

function setDefaultLocation(id) {
    if (!window.__convexSetDefaultLocation) return;
    window.__convexSetDefaultLocation({ locationId: id })
        .then(() => toast('Default location updated', 'success'))
        .catch(() => toast('Unable to update location', 'error'));
}

function removeLocation(id) {
    if (!window.__convexRemoveLocation) return;
    window.__convexRemoveLocation({ locationId: id })
        .then(() => toast('Location removed', 'success'))
        .catch(() => toast('Unable to remove location', 'error'));
}

function renderQuoteRequests(items) {
    const container = document.getElementById('quote-requests-list');
    if (!container) return;
    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="no-results">No quote requests yet.</div>';
        return;
    }
    items.forEach((q) => {
        const row = document.createElement('div');
        row.className = 'quote-row';
        row.innerHTML = `
            <div>
                <div class="quote-title">${q.quantity} tons • ${escapeHtml(q.deliveryWindow)}</div>
                <div class="quote-meta">${new Date(q.createdAt).toLocaleDateString('en-IN')} • ${escapeHtml(q.status)}</div>
                <div class="quote-address">${escapeHtml(q.address)}</div>
            </div>`;
        container.appendChild(row);
    });
}

function renderOrders() {
    const list = document.getElementById('orders-list');
    if (state.orders.length === 0) {
        list.innerHTML = '<div class="no-results"><i class="fas fa-box-open"></i><h3>No orders yet</h3><p>Start by ordering some sand!</p><button class="btn btn-primary" onclick="navigateWithAuth(\'catalog\')" style="margin-top:16px">Browse Sand</button></div>';
        return;
    }
    list.innerHTML = state.orders.map(o => `
        <div class="order-card">
            <div class="order-icon" style="background:${o.color}"><i class="fas ${o.icon}" style="color:rgba(255,255,255,0.8)"></i></div>
            <div class="order-meta">
                <h4>${escapeHtml(o.sand)} — ${escapeHtml(o.quantity)} tons</h4>
                <p>#${escapeHtml(o.id)} • ${escapeHtml(o.date)} • ₹${o.total.toLocaleString('en-IN')}</p>
            </div>
            <span class="order-status delivered">Delivered</span>
            ${o.status === 'delivered' && o.dbId ? `
                <button class="btn btn-outline" style="margin-left:auto;" onclick="promptReview('${o.dbId}')">Rate</button>
            ` : ''}
        </div>`).join('');
}

function promptReview(orderId) {
    const ratingStr = prompt('Rate this order (1-5):');
    const rating = parseInt(ratingStr, 10);
    if (!rating || rating < 1 || rating > 5) {
        return toast('Invalid rating', 'error');
    }
    const comment = prompt('Write a short review:') || '';
    if (!comment.trim()) {
        return toast('Review text required', 'error');
    }
    if (window.__convexSubmitReview) {
        window.__convexSubmitReview({ orderId, rating, comment: comment.trim() })
            .then(() => toast('Thanks for your review!', 'success'))
            .catch(() => toast('Unable to submit review', 'error'));
    }
}

// ====== UTILITIES ======
function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function showSuccess(title, msg, cb) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = msg;
    const btn = document.getElementById('success-btn');
    btn.onclick = () => { closeModal('success-modal'); if (cb) cb(); };
    openModal('success-modal');
}

function toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${escapeHtml(msg)}`;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; setTimeout(() => t.remove(), 400); }, 3500);
}

function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 10 + 8}s;animation-delay:${Math.random() * 10}s;`;
        container.appendChild(p);
    }
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toLocaleString('en-IN');
        }, 30);
    });
}
window.updateAdminUI = updateAdminUI;
window.renderAdminSummary = renderAdminSummary;
window.updatePartnerUI = updatePartnerUI;
window.__renderTrackingUpdates = renderTrackingUpdates;
window.__renderLocations = renderLocations;
window.__renderQuoteRequests = renderQuoteRequests;
window.__updateSellerListings = (data) => {
    sellerListings = Array.isArray(data) ? data : [];
    renderCatalog();
};
window.__updateTransporters = (data) => {
    transporters = Array.isArray(data) ? data : [];
};

window.__renderNotifications = (items) => {
    const wrapper = document.getElementById('notif-wrapper');
    const dd = document.getElementById('notif-dropdown');
    const countEl = document.getElementById('notif-count');
    if (!wrapper || !dd || !countEl) return;
    dd.innerHTML = '';
    if (!items || items.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'notif-item';
        empty.textContent = 'No notifications';
        dd.appendChild(empty);
        countEl.style.display = 'none';
        return;
    }
    const unread = items.filter(n => !n.read).length;
    countEl.textContent = String(unread);
    countEl.style.display = unread > 0 ? 'inline-flex' : 'none';
    items.forEach((n) => {
        const item = document.createElement('div');
        item.className = 'notif-item';
        item.textContent = n.message;
        dd.appendChild(item);
    });
};

function detectLocationAddress(type) {
    if (!navigator.geolocation) {
        return toast('Geolocation not supported by your browser', 'error');
    }
    toast('Detecting your location...', 'info');
    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`;
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error('Geocoding failed');
            const data = await res.json();
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || '';
            const state = addr.state || '';
            const location = [city, state].filter(Boolean).join(', ') || data.display_name || '';
            if (type === 'supplier') {
                const locEl = document.getElementById('supplier-quarry-location');
                if (locEl) locEl.value = location;
                const stateEl = document.getElementById('supplier-state');
                if (stateEl && state) stateEl.value = state;
            } else if (type === 'transport') {
                const locEl = document.getElementById('transport-base-location');
                if (locEl) locEl.value = location;
            }
        } catch {
            toast('Unable to detect location', 'error');
        }
    }, () => {
        toast('Unable to get location', 'error');
    });
}

function renderTrackingUpdates(items) {
    if (!items || items.length === 0) return;
    const timeline = document.getElementById('tracking-timeline');
    if (!timeline) return;
    timeline.innerHTML = '';
    items.slice().reverse().forEach((u) => {
        const row = document.createElement('div');
        row.className = 'timeline-item completed';
        row.innerHTML = `
            <div class="timeline-dot"><i class="fas fa-check"></i></div>
            <div class="timeline-content">
                <h4>${escapeHtml(u.status)}</h4>
                <p>${escapeHtml(u.message)}</p>
                <div class="time">${new Date(u.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>`;
        timeline.appendChild(row);
    });
    const last = items[0];
    const eta = document.getElementById('eta-text');
    if (eta) {
        eta.textContent = last.etaMinutes ? `${last.etaMinutes} min` : 'Tracking live';
    }
}

async function collectApplicationDocuments(form) {
    const files = [];
    form.querySelectorAll('.upload-box').forEach((box) => {
        const input = box.querySelector('input[type="file"]');
        const label = box.querySelector('span')?.textContent?.trim() || 'Document';
        const file = input?.files?.[0];
        if (file) {
            files.push({ file, label });
        }
    });
    if (files.length === 0 || !window.__convexGenerateAppUploadUrl) {
        return [];
    }
    const maxBytes = 5 * 1024 * 1024;
    for (const item of files) {
        if (item.file.size > maxBytes) {
            toast('File too large (max 5MB)', 'error');
            return [];
        }
        const okType = /pdf|png|jpe?g/i.test(item.file.type);
        if (!okType) {
            toast('Invalid file type. Use PDF/JPG/PNG.', 'error');
            return [];
        }
    }
    const results = [];
    for (const item of files) {
        const uploadUrl = await window.__convexGenerateAppUploadUrl();
        const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': item.file.type },
            body: item.file,
        });
        if (!res.ok) {
            continue;
        }
        const { storageId } = await res.json();
        results.push({ label: item.label, storageId });
    }
    return results;
}

function validateRequiredUploads(form) {
    let ok = true;
    form.querySelectorAll('.upload-box input[type="file"]').forEach((input) => {
        if (!input.files || !input.files[0]) {
            ok = false;
        }
    });
    return ok;
}

function updateUploadPreview(input) {
    const box = input.closest('.upload-box');
    if (!box) return;
    const file = input.files?.[0];
    if (!file) return;
    let preview = box.querySelector('.upload-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'upload-preview';
        box.appendChild(preview);
    }
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            preview.innerHTML = `<img src="${reader.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.textContent = file.name;
    }
}
