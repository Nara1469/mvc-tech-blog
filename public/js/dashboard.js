const readOnePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/posted');
    } else {
      alert('Failed to read a post');
    }
  }
};

document
  .querySelector('.post')
  .addEventListener('click', readOnePost);
