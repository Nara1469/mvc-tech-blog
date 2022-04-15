const buttonCreate = document.querySelector('#add-post');
const buttonUpdate = document.querySelector('#update-post');
const buttonDelete = document.querySelector('delete-post');
const buttonComment = document.querySelector('#add-comment');

const createPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a post');
    }
  }
};

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

const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log("Delete ID: " + id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const addComment = async (event) => {
  const acomment = document.querySelector('#comment-text').value;
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log("Current Post ID: " + id);

    if (acomment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ acomment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create a comment');
      }
    }
  }
};

if (buttonCreate) {
  buttonCreate.addEventListener('click', createPost);
}

if (buttonUpdate) {
  buttonUpdate.addEventListener('click', updatePost);
}

if (buttonDelete) {
  buttonDelete.addEventListener('click', deletePost);
}

if (buttonComment) {
  buttonComment.addEventListener('click', addComment);
}