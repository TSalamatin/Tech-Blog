async function logOut(event) {
    event.preventDefault();
        try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            window.location.href = '/'; 
        } else {
            console.log('Logout failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

document.querySelector('#logOutNav').addEventListener('click', logOut);