document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({id, name, price, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} себетке қосылды!`);
    });
});

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const name = product.dataset.name;
        const price = product.dataset.price;
        // alert(`Сіз ${name} өнімін ${price} ₸ бағасына сатып алуға тапсырыс бердіңіз!`);
        // Мұнда сатып алу процесі жүзеге асады (тапсырысты рәсімдеу)
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Қазір сатып алу батырмаларын табу
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: Number(productCard.dataset.price),
                quantity: 1
            };

            // Себеттен бұрын бар ма, тексеру
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Төлем бетіне өту
            window.location.href = 'payment.html';
        });
    });
});

// Иконкаларға функционал қосу
document.getElementById('search-btn').addEventListener('click', () => {
    window.location.href = 'search.html';
  });
  
  document.getElementById('profile-btn').addEventListener('click', () => {
    window.location.href = 'profile.html';
  });
  
  document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'cart.html';
  });