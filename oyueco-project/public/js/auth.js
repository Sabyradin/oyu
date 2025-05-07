// Профиль бетіндегі шығу батырмасы
document.addEventListener('DOMContentLoaded', () => {
    const logoutForm = document.querySelector('form[action="/logout"]');
    if (logoutForm) {
      logoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            window.location.href = '/login';
          }
        } catch (err) {
          console.error('Шығу қатесі:', err);
        }
      });
    }
    
    // Формаларды валидациялау
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
          } else {
            input.style.borderColor = '';
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          alert('Барлық міндетті өрістерді толтырыңыз');
        }
      });
    });
  });