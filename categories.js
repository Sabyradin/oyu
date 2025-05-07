document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
    //   alert(`${card.querySelector('p').innerText} категориясы ашылды!`);
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
  