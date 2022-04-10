const buttonUpdate = document.querySelector('#update-post');

const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;
  const id = event.target.getAttribute('data-id');

  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update a post, please try again');
    }
  }
};


buttonUpdate.addEventListener('click', updatePost);