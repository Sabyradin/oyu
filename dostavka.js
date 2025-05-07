document.addEventListener("DOMContentLoaded", () => {
    console.log("Жеткізу беті жүктелді");
    
    // Себеттегі тауарлар санын көрсету
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }
    
    updateCartCount();
    
    // Карточкаларға анимация қосу
    const deliveryCards = document.querySelectorAll('.delivery-card');
    deliveryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          const rootStyles = getComputedStyle(document.documentElement);
          const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
          const white = rootStyles.getPropertyValue('--white').trim();

          icon.style.backgroundColor = primaryColor;
          icon.style.color = white;

        
        card.addEventListener('mouseleave', () => {
            const rootStyles = getComputedStyle(document.documentElement);
            const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
            const white = rootStyles.getPropertyValue('--white').trim();

            icon.style.backgroundColor = primaryColor;
            icon.style.color = white;

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
  })
});