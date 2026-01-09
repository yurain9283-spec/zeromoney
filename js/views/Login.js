
import { store } from '../store.js';

export class LoginView {
    render() {
        return `
            <div style="max-width: 400px; margin: 4rem auto;">
                <div class="card">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <i class="fas fa-wallet" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h2 style="font-weight: 700;">ZeroMoney</h2>
                        <p style="color: var(--text-secondary);">請登入您的帳號</p>
                    </div>
                    
                    <form id="login-form">
                        <div class="input-group">
                            <label class="label">Email 信箱</label>
                            <input type="email" id="login-email" class="input" placeholder="name@company.com" required autofocus>
                        </div>
                        
                        <div id="login-error" style="color: var(--danger); font-size: 0.9rem; margin-bottom: 1rem; display: none;">
                            <i class="fas fa-exclamation-circle"></i> 找不到此 Email，請聯繫管理員。
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            登入系統
                        </button>
                    </form>
                    
                    <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-secondary);">
                        如需申請帳號，請聯繫系統管理員
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        const form = document.getElementById('login-form');
        const errorMsg = document.getElementById('login-error');
        const emailInput = document.getElementById('login-email');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email) {
                const success = store.loginByEmail(email);
                if (!success) {
                    errorMsg.style.display = 'block';
                    emailInput.style.borderColor = 'var(--danger)';
                }
            }
        });
        
        emailInput.addEventListener('input', () => {
            errorMsg.style.display = 'none';
            emailInput.style.borderColor = '';
        });
    }
}
