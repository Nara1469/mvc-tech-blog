const newFormComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const textArea = document.querySelector('#comment-text').value.trim();

    if (textArea) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ textArea, user_id, id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to create a comment');
      }
    }
  }
};

const delButtonComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormComment);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonComment);
