
async function signupForm(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log('Grabbed New user Data ')
    if (username && email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          // Successful signup, redirect the user
          window.location.href = '/'; // Or '/dashboard' if desired
        } else {
          // Handle signup failure
          console.log('Signup failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  
  }
  

document.querySelector('#signup-form').addEventListener('submit', signupForm);