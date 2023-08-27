// Attach event listener to the logout link

   async function logOutHandler(event) {
    event.preventDefault();
        try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Clear any session-related data on the client side
            // Redirect the user to the login page or homepage
            window.location.href = '/login'; // Or '/'
        } else {
            console.log('Logout failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

document.querySelector('#logOutNav').addEventListener('click', logOutHandler);
