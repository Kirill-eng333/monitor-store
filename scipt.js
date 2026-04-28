// КОРЗИНА
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Добавлено в корзину ✅");
}

// Проверяем, есть ли блок корзины
let cartItems = document.getElementById('cart-items');

if (cartItems) {
    let total = 0;

    cart.forEach((item, index) => {
        let div = document.createElement('div');
        div.classList.add('cart-item');

        div.innerHTML = `
            <p>${item.name}</p>
            <span>${item.price} ₸</span>
            <button onclick="removeItem(${index})">❌</button>
        `;

        cartItems.appendChild(div);
        total += item.price;
    });

    let totalBlock = document.getElementById('total');
    if (totalBlock) {
        totalBlock.innerHTML = "Итого: " + total + " ₸";
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}


// РЕГИСРАЦИЯ
const regForm = document.getElementById('regForm');

if (regForm) {
    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const message = document.getElementById('message');

        if (username.length < 3) {
            message.innerText = 'Имя слишком короткое';
            return;
        }

        if (password.length < 5) {
            message.innerText = 'Пароль слишком короткий';
            return;
        }

        if (password !== confirmPassword) {
            message.innerText = 'Пароли не совпадают';
            return;
        }

        if (localStorage.getItem('user_' + username)) {
            message.innerText = 'Пользователь уже существует';
            return;
        }

        localStorage.setItem('user_' + username, JSON.stringify({
            username,
            email,
            password
        }));

        message.style.color = 'green';
        message.innerText = 'Регистрация успешна!';

        this.reset();
    });
}


// АВТОРИЗАЦИЯ
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const message = document.getElementById('loginMessage');

        const user = JSON.parse(localStorage.getItem('user_' + username));

        if (!user) {
            message.innerText = 'Пользователь не найден';
            return;
        }

        if (user.password !== password) {
            message.innerText = 'Неверный пароль';
            return;
        }

        localStorage.setItem('currentUser', username);

        message.style.color = 'green';
        message.innerText = 'Вход успешен!';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}


function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}