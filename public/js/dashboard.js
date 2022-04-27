const buttonCreate = document.querySelector('#add-post');
const buttonUpdate = document.querySelector('#update-post');
const btnAddComment = document.querySelector('#add-comment');
const btnUpdateComment = document.querySelector('#update-comment');
const btnDeleteComment = document.querySelector('#delete-comment');
const welcome = document.querySelector('#username');

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
        body: JSON.stringify({ acomment, id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to create a comment');
      }
    }
  }
};

const showComment = (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    if (welcome) {
      const username = welcome.textContent;

      fetch(`/api/comments/${id}`)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              console.log(data.username);
              if (data.username === username) {
                document.location.replace(`/change/${id}`);
              }
            });
          } else {
            alert('Failed to find comment!');
          }
        });
    }
  }
};

const updateComment = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value;
  const id = event.target.getAttribute('data-id');
  const postId = document.getElementById('post-id').getAttribute('data-id');
  console.log(postId);

  if (text) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to update a post, please try again');
    }
  }
};

const deleteComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postId = document.getElementById('post-id').getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to delete post');
    }
  }
};

// ---------------- Event Listeners ----------------

if (buttonCreate) {
  buttonCreate.addEventListener('click', createPost);
}

if (buttonUpdate) {
  buttonUpdate.addEventListener('click', updatePost);
}

if (btnAddComment) {
  btnAddComment.addEventListener('click', addComment);
}

if (btnUpdateComment) {
  btnUpdateComment.addEventListener('click', updateComment);
}

if (btnDeleteComment) {
  btnDeleteComment.addEventListener('click', deleteComment);
}

$('.delete-button').on('click', deletePost);

$('.each-comment').on('click', showComment);