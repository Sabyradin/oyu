document.addEventListener('DOMContentLoaded', function() {
    // localStorage-дан тауар мәліметтерін алу
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    // Егер мәліметтер болмаса, әдепкі мәндерді қолдану
    if (!product) {
      product = {
        name: "Тауар аты анықталмады",
        price: "0 ₸",
        image: "default-product.jpg"
      };
    }
  
    // HTML-ге мәліметтерді қосу
    const infoDiv = document.getElementById('product-info');
    infoDiv.innerHTML = `
      <div class="product-card">
        <div class="product-image">
<img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>Сатып алынатын өнім</h3>
          <p class="product-name"><strong>${product.name}</strong></p>
          <p class="product-price">${product.price}</p>
          <div class="product-meta">
            <span><i class="fas fa-box"></i> ${product.quantity || 1} бірлік</span>
            <span><i class="fas fa-shield-alt"></i> Қамтамасыз етілген</span>
          </div>
        </div>
      </div>
    `;
  });
  
    // Төлем әдісін таңдау батырмалары
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
      option.addEventListener('click', function () {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
  
  // Телефон нөмірін көшіру функциясы
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Нөмір көшірілді: ' + text);
    });
  }
  