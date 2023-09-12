async function loginForm(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
        
          window.location.href = '/dashboard'; 
        
        } else {
          // Handle signup failure
          console.log('Login failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
  
    }
  }
  

document.querySelector('#login-form').addEventListener('submit', loginForm);