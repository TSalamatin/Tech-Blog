const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();

    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        try {
            const response = await fetch(`/api/posts`, {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
            
            } else {
                alert('Failed to create blog');
            }
        } catch (error) {
            res.status(500).json(error)
        }
    };
}
    document.querySelector('#post-btn').addEventListener('click', newPost);