// ====== SAND DATA (6 types) ======
const sandTypes = window.__sandTypesData || [
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
    orders: JSON.parse(localStorage.getItem('sandify_orders')) || [],
    pendingAction: null
};
window.state = state;

// ====== INIT ======
function initApp() {
    applyTheme(state.theme);
    if (state.user) showLoggedInUI();
    createParticles();
    animateCounters();
    renderFeatured();
    handleHashRoute();
    window.addEventListener('hashchange', handleHashRoute);
    document.getElementById('mobile-menu').addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('show');
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
                navigateTo('admin');
                return;
            }
        });
    });
    document.querySelectorAll('.admin-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            const section = tab.dataset.section;
            document.querySelectorAll('.admin-tab').forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('#admin-panel > div').forEach((panel) => {
                panel.style.display = 'none';
            });
            const target = document.getElementById(`admin-${section}`);
            if (target) target.style.display = 'block';
        });
    });
    document.getElementById('profile-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profile-dropdown').classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        const dd = document.getElementById('profile-dropdown');
        if (dd && !e.target.closest('.profile-wrapper')) dd.classList.remove('show');
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
    if (termsCheck && loginBtn) {
        loginBtn.disabled = !termsCheck.checked;
        termsCheck.addEventListener('change', () => {
            loginBtn.disabled = !termsCheck.checked;
        });
    }
    ['btn-google-auth', 'btn-google-auth-signup'].forEach((id) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.__convexAuthSignIn) {
                window.__convexAuthSignIn('google', { flow: 'signIn', redirectTo: '/' });
            }
        });
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

function updateAdminUI() {
    const adminLink = document.getElementById('admin-nav-link');
    if (!adminLink) return;
    const isAdmin = window.__isAdmin === true;
    adminLink.style.display = isAdmin ? 'inline-flex' : 'none';
}

function renderAdmin() {
    const data = window.__adminData;
    if (!data || !data.ok) return;
    const overview = document.getElementById('admin-overview');
    if (overview) {
        overview.innerHTML = `
            <div class="admin-card"><strong>${data.totals.users}</strong><div>Total Users</div></div>
            <div class="admin-card"><strong>${data.totals.orders}</strong><div>Total Orders</div></div>
            <div class="admin-card"><strong>${data.totals.sellers}</strong><div>Seller Applications</div></div>
            <div class="admin-card"><strong>${data.totals.transporters}</strong><div>Transport Applications</div></div>
        `;
    }
    const orders = document.getElementById('admin-orders');
    if (orders) {
        orders.innerHTML = data.orders.map((o) => `
            <div class="admin-row"><span>${o.orderNumber}</span><span>${o.status}</span></div>
        `).join('') || '<div class="admin-row">No orders</div>';
    }
    const users = document.getElementById('admin-users');
    if (users) {
        const seen = new Set();
        const uniqueUsers = data.users.filter((u) => {
            const key = u.email || u._id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        users.innerHTML = uniqueUsers.map((u) => `
            <div class="admin-row"><span>${u.email || 'Unknown'}</span><span>${new Date(u._creationTime).toLocaleDateString('en-IN')}</span></div>
        `).join('') || '<div class="admin-row">No users</div>';
    }
    const sellers = document.getElementById('admin-sellers');
    if (sellers) {
        sellers.innerHTML = data.sellerApps.map((s) => `
            <div class="admin-row"><span>${s.company}</span><span>${s.status}</span></div>
        `).join('') || '<div class="admin-row">No seller applications</div>';
    }
    const logistics = document.getElementById('admin-logistics');
    if (logistics) {
        logistics.innerHTML = data.transportApps.map((t) => `
            <div class="admin-row"><span>${t.company}</span><span>${t.status}</span></div>
        `).join('') || '<div class="admin-row">No transport applications</div>';
    }
    const payments = document.getElementById('admin-payments');
    if (payments) {
        payments.innerHTML = data.orders.map((o) => `
            <div class="admin-row"><span>${o.orderNumber}</span><span>${o.paymentMethod || 'N/A'}</span></div>
        `).join('') || '<div class="admin-row">No payments</div>';
    }
    const analytics = document.getElementById('admin-analytics');
    if (analytics) {
        analytics.innerHTML = Object.entries(data.analytics || {}).map(([k, v]) => `
            <div class="admin-row"><span>${k}</span><span>${v}</span></div>
        `).join('') || '<div class="admin-row">No analytics</div>';
    }
    const sales = document.getElementById('admin-sales');
    if (sales) {
        const total = (data.orders || []).reduce((sum, o) => sum + (o.total || 0), 0);
        sales.innerHTML = `<div class="admin-row"><span>Total Revenue</span><span>₹${total.toLocaleString('en-IN')}</span></div>`;
    }
    const ai = document.getElementById('admin-ai');
    if (ai) {
        ai.innerHTML = '<div class="admin-row">AI Verification pipeline pending</div>';
    }
    const settings = document.getElementById('admin-settings');
    if (settings) {
        settings.innerHTML = '<div class="admin-row">Settings controls pending</div>';
    }
    const security = document.getElementById('admin-security');
    if (security) {
        security.innerHTML = '<div class="admin-row">No alerts</div>';
    }
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
        openModal('terms-modal');
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
    navigateTo('home');
    toast('You have been signed out.', 'info');
}

function showLoggedInUI() {
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('profile-wrapper').style.display = 'block';
    document.getElementById('btn-nav-location').style.display = 'flex';
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

function sandCardHTML(s) {
    const imageContent = s.image
        ? `<img src="${s.image}" alt="${s.name}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="sand-texture"></div><i class="fas ${s.icon}"></i>`;
    return `<div class="sand-card" onclick="viewSandDetail(${s.id})">
        <div class="sand-card-image" style="background:${s.color}">
            ${imageContent}
        </div>
        <div class="sand-card-body">
            <div class="sand-cat">${s.category.charAt(0).toUpperCase() + s.category.slice(1)}</div>
            <h3>${s.name}</h3>
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
    const container = document.getElementById('detail-container');
    const detailImageContent = sand.image
        ? `<img src="${sand.image}" alt="${sand.name}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);">`
        : `<i class="fas ${sand.icon}"></i>`;
    container.innerHTML = `
        <div class="detail-grid">
            <div class="detail-image" style="background:${sand.color};overflow:hidden;">
                ${detailImageContent}
            </div>
            <div class="detail-info">
                <div class="detail-cat">${sand.category.charAt(0).toUpperCase() + sand.category.slice(1)}</div>
                <h1>${sand.name}</h1>
                <div class="detail-price">₹${sand.price.toLocaleString('en-IN')} <span>/ton</span></div>
                <p class="detail-desc">${sand.desc}</p>
                <div class="detail-specs">
                    <div class="spec-item"><div class="spec-label">Grain Size</div><div class="spec-value">${sand.grain}</div></div>
                    <div class="spec-item"><div class="spec-label">Moisture</div><div class="spec-value">${sand.moisture}</div></div>
                    <div class="spec-item"><div class="spec-label">Density</div><div class="spec-value">${sand.density}</div></div>
                    <div class="spec-item"><div class="spec-label">Origin</div><div class="spec-value">${sand.origin}</div></div>
                </div>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:20px"><strong>Applications:</strong> ${sand.uses}</p>
                <button class="btn btn-primary btn-large btn-full" onclick="goToDealers()">
                    <i class="fas fa-shopping-cart"></i> Order This Sand
                </button>
            </div>
        </div>`;
    navigateTo('detail');
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
    const list = document.getElementById('dealers-list');
    document.getElementById('dealer-subtitle').textContent = `Verified dealers for ${state.selectedSand.name}`;
    list.innerHTML = dealers.map(d => {
        const price = Math.round(state.selectedSand.price * d.priceMultiplier);
        return `<div class="dealer-card" onclick="selectDealer(${d.id}, ${price}, this)">
            <div class="dealer-avatar" style="background:${d.bg}">${d.name.charAt(0)}</div>
            <div class="dealer-info">
                <h3>${d.name}</h3>
                <div class="dealer-location"><i class="fas fa-map-marker-alt"></i> ${d.location}</div>
                <div class="dealer-rating">${'★'.repeat(Math.floor(d.rating))}${'☆'.repeat(5 - Math.floor(d.rating))} ${d.rating} (${d.reviews} reviews)</div>
            </div>
            <div class="dealer-price">
                <div class="price">₹${price.toLocaleString('en-IN')}</div>
                <div class="price-unit">per ton</div>
            </div>
        </div>`;
    }).join('');
    navigateTo('dealers');
}

function selectDealer(id, price, el) {
    state.selectedDealer = { ...dealers.find(d => d.id === id), finalPrice: price };
    document.querySelectorAll('.dealer-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    setTimeout(() => goToTransport(), 400);
}

// ====== TRANSPORT ======
function goToTransport() {
    const list = document.getElementById('transport-list');
    list.innerHTML = trucks.map(t => {
        const cost = t.baseCost + (t.perTon * state.orderQuantity);
        return `<div class="transport-card" onclick="selectTruck(${t.id}, this)">
            <div class="transport-icon"><i class="fas ${t.icon}"></i></div>
            <div class="transport-info">
                <h3>${t.name}</h3>
                <p><i class="fas fa-box"></i> ${t.capacity} &nbsp;|&nbsp; <i class="fas fa-clock"></i> ${t.eta}</p>
            </div>
            <div class="transport-price">
                <div class="price">₹${cost.toLocaleString('en-IN')}</div>
                <div class="price-unit">delivery</div>
            </div>
        </div>`;
    }).join('');
    navigateTo('transport');
}

function selectTruck(id, el) {
    state.selectedTruck = trucks.find(t => t.id === id);
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
                <div style="width:60px;height:60px;border-radius:12px;background:${state.selectedSand.color};display:flex;align-items:center;justify-content:center">
                    <i class="fas ${state.selectedSand.icon}" style="color:rgba(255,255,255,0.7);font-size:1.2rem"></i>
                </div>
                <div><strong>${state.selectedSand.name}</strong><br><span style="color:var(--text-secondary);font-size:0.85rem">${state.selectedSand.category}</span></div>
            </div>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-store"></i> Dealer</h3>
            <p><strong>${state.selectedDealer.name}</strong></p>
            <p style="font-size:0.85rem;color:var(--text-secondary)">${state.selectedDealer.location} — ₹${state.selectedDealer.finalPrice.toLocaleString('en-IN')}/ton</p>
        </div>
        <div class="order-section">
            <h3><i class="fas fa-truck"></i> Transport</h3>
            <p><strong>${state.selectedTruck.name}</strong></p>
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
            <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
            <div class="form-group"><label>Full Address *</label><input type="text" placeholder="Site/Plot number, Street..." id="order-address" required></div>
            <div class="form-row">
                <div class="form-group"><label>City</label><input type="text" value="${state.location.split(',')[0] || ''}" id="order-city"></div>
                <div class="form-group"><label>Pincode</label><input type="text" placeholder="400001" id="order-pin"></div>
            </div>
            <div class="form-group"><label>Contact Number</label><input type="tel" value="${state.user?.phone || ''}" id="order-phone"></div>
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

function updatePriceCard() {
    const sandCost = state.selectedDealer.finalPrice * state.orderQuantity;
    const transportCost = state.selectedTruck.baseCost + (state.selectedTruck.perTon * state.orderQuantity);
    const gst = Math.round((sandCost + transportCost) * 0.05);
    const total = sandCost + transportCost + gst;
    document.getElementById('price-card').innerHTML = `
        <h3><i class="fas fa-receipt" style="color:var(--primary)"></i> Price Breakdown</h3>
        <div class="price-row"><span class="label">Sand (${state.orderQuantity} tons × ₹${state.selectedDealer.finalPrice.toLocaleString('en-IN')})</span><span>₹${sandCost.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">Transport</span><span>₹${transportCost.toLocaleString('en-IN')}</span></div>
        <div class="price-row"><span class="label">GST (5%)</span><span>₹${gst.toLocaleString('en-IN')}</span></div>
        <div class="price-row total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
        <button class="btn btn-primary btn-full btn-large" style="margin-top:20px" onclick="goToPayment(${total})">
            <i class="fas fa-credit-card"></i> Proceed to Pay
        </button>`;
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
                    <div class="upi-qr-wrap">
                        <img src="/images/upi.jpeg" alt="UPI QR" class="upi-qr">
                    </div>
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
            <button class="btn btn-primary btn-full btn-large" onclick="processPayment(${total})">
                <i class="fas fa-lock"></i> Pay ₹${total.toLocaleString('en-IN')}
            </button>
        </div>`;
    navigateTo('payment');
}

function selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    el.querySelector('input').checked = true;
}

function processPayment(total) {
    const orderId = 'SND' + Date.now().toString().slice(-8);
    const orderNumber = 'ORD-' + Date.now().toString().slice(-10);
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.closest('.payment-option')?.innerText?.trim() || 'UPI';
    const order = {
        id: orderId, orderNumber, sand: state.selectedSand.name, dealer: state.selectedDealer.name,
        transport: state.selectedTruck.name, quantity: state.orderQuantity,
        total, date: new Date().toLocaleDateString('en-IN'), status: 'processing',
        color: state.selectedSand.color, icon: state.selectedSand.icon
    };
    state.orders.push(order);
    localStorage.setItem('sandify_orders', JSON.stringify(state.orders));
    if (window.__convexCreateOrder && state.user) {
        const address = document.getElementById('order-address')?.value || '';
        window.__convexCreateOrder({
            orderNumber,
            sandName: state.selectedSand.name,
            dealerName: state.selectedDealer.name,
            truckName: state.selectedTruck.name,
            quantity: state.orderQuantity,
            total,
            paymentMethod,
            address
        }).then((dbId) => {
            order.dbId = dbId;
            localStorage.setItem('sandify_orders', JSON.stringify(state.orders));
        }).catch(() => {});
    }
    showSuccess('Payment Successful!', `Order #${orderNumber} confirmed. Your sand is being prepared for dispatch.`, () => goToTracking(orderId));
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
            <div class="tracking-order-id">Order #${order.id}</div>
        </div>
        <div class="tracking-map">
            <div class="tracking-map-content">
                <div class="truck-anim"><i class="fas fa-truck-moving"></i></div>
                <div class="map-label">Simulated Live Map — ${state.location || 'Your Location'}</div>
            </div>
        </div>
        <div class="tracking-timeline" id="tracking-timeline">
            <div class="timeline-item completed"><div class="timeline-dot"><i class="fas fa-check"></i></div>
                <div class="timeline-content"><h4>Order Confirmed</h4><p>Your order has been placed successfully</p><div class="time">${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div></div>
            </div>
            <div class="timeline-item" id="tl-1"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>Quarry Processing</h4><p>${order.dealer} is preparing your ${order.sand}</p><div class="time">Estimated: 15 min</div></div>
            </div>
            <div class="timeline-item" id="tl-2"><div class="timeline-dot"><i class="fas fa-spinner"></i></div>
                <div class="timeline-content"><h4>Loading & Dispatch</h4><p>Sand loaded onto ${order.transport}</p><div class="time">Pending</div></div>
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
    simulateTracking();
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
    const inputs = form.querySelectorAll('input, select, textarea');
    const company = inputs[0].value.trim();
    const owner = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const phone = inputs[3].value.trim();
    const location = inputs[6].value.trim();
    const details = `${inputs[4].value.trim()} | ${inputs[5].value.trim()} | ${inputs[6].value.trim()} | ${inputs[7].value.trim()} | ${inputs[8].value.trim()} | ${inputs[9].value.trim()} | ${inputs[10].value.trim()} | ${inputs[11].value.trim()}`;
    if (window.__convexSubmitSellerApp && state.user) {
        window.__convexSubmitSellerApp({
            company,
            contactName: owner,
            phone,
            email,
            location,
            details
        }).catch(() => {});
    }
    showSuccess('Application Submitted!', 'Your quarry registration is under review. We will notify you after approval.', () => navigateTo('home'));
}
function handleTransportSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('transport-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    const company = inputs[0].value.trim();
    const owner = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const phone = inputs[3].value.trim();
    const vehicleType = inputs[6].value.trim();
    const capacity = inputs[7].value.trim();
    const baseLocation = inputs[8].value.trim();
    if (window.__convexSubmitTransportApp && state.user) {
        window.__convexSubmitTransportApp({
            company,
            contactName: owner,
            phone,
            email,
            vehicleType,
            capacity,
            baseLocation
        }).catch(() => {});
    }
    showSuccess('Application Submitted!', 'Your fleet registration is under review. We will notify you after approval.', () => navigateTo('home'));
}

// ====== PROFILE ======
function renderProfile() {
    if (!state.user) return navigateTo('home');
    const c = document.getElementById('profile-page-content');
    c.innerHTML = `
        <div class="profile-card">
            <div class="profile-large-avatar">${state.user.name.charAt(0).toUpperCase()}</div>
            <h2>${state.user.name}</h2>
            <p class="profile-email">${state.user.email}</p>
            <div class="profile-detail-grid">
                <div class="profile-detail-item"><div class="pd-label">Phone</div><div class="pd-value">${state.user.phone}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Member Since</div><div class="pd-value">${state.user.joined}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Location</div><div class="pd-value">${state.location || 'Not set'}</div></div>
                <div class="profile-detail-item"><div class="pd-label">Total Orders</div><div class="pd-value">${state.orders.length}</div></div>
            </div>
        </div>`;
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
                <h4>${o.sand} — ${o.quantity} tons</h4>
                <p>#${o.id} • ${o.date} • ₹${o.total.toLocaleString('en-IN')}</p>
            </div>
            <span class="order-status delivered">Delivered</span>
        </div>`).join('');
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
    t.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${msg}`;
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
window.renderAdmin = renderAdmin;
