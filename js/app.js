
import { store } from './store.js';
import { ExpensesView } from './views/Expenses.js';
import { AdminView } from './views/Admin.js';
import { RulesView } from './views/Rules.js';
import { LoginView } from './views/Login.js';

const routes = {
    '/': ExpensesView,
    '/admin': AdminView,
    '/rules': RulesView,
    '/login': LoginView
};

class App {
    constructor() {
        this.currentUser = store.getCurrentUser();
    }

    init() {
        this.router();
        window.addEventListener('hashchange', () => this.router());
    }

    renderNavbar() {
        const nav = document.getElementById('navbar');

        if (!this.currentUser) {
            nav.innerHTML = `
                <a href="#/login" class="brand">
                    <i class="fas fa-wallet"></i>
                    ZeroMoney
                </a>
            `;
            return;
        }

        nav.innerHTML = `
            <a href="#/" class="brand">
                <i class="fas fa-wallet"></i>
                ZeroMoney
            </a>
            
            <div class="nav-links">
                <a href="#/" class="nav-item ${location.hash === '' || location.hash === '#/' ? 'active' : ''}">我的報帳</a>
                <a href="#/rules" class="nav-item ${location.hash === '#/rules' ? 'active' : ''}">規則說明</a>
                ${this.currentUser.role === 'admin' ? `<a href="#/admin" class="nav-item ${location.hash === '#/admin' ? 'active' : ''}">管理後台</a>` : ''}
            </div>

            <div style="margin-left:auto; display:flex; align-items:center; gap:1rem; font-size:0.9rem;">
                <div style="display:flex; flex-direction:column; align-items:flex-end; line-height:1.2;">
                     <span style="font-weight:600;">${this.currentUser.name}</span>
                     <span style="font-size:0.75rem; color:var(--text-secondary);">${this.currentUser.email}</span>
                </div>
                <button id="btn-logout" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                    <i class="fas fa-sign-out-alt"></i> 登出
                </button>
            </div>
        `;

        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                store.logout();
            });
        }
    }

    router() {
        this.currentUser = store.getCurrentUser();
        const path = location.hash.slice(1) || '/';

        // Auth Guard
        if (!this.currentUser && path !== '/login') {
            location.hash = '/login';
            return;
        }

        // Redirect if logged in trying to access login
        if (this.currentUser && path === '/login') {
            location.hash = '/';
            return;
        }

        const ViewClass = routes[path] || routes['/'];

        // Role Guard
        if (path === '/admin' && this.currentUser && this.currentUser.role !== 'admin') {
            location.hash = '/';
            return;
        }

        // Render Navbar first as it depends on auth state
        this.renderNavbar();

        const view = new ViewClass();
        document.getElementById('main-content').innerHTML = view.render();
        if (view.afterRender) view.afterRender();

        // Update Nav active state
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('href') === '#' + path) el.classList.add('active');
        });
    }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
