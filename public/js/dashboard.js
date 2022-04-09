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

// const addComment = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');
//     console.log("Current Post ID: " + id);

//     const response = await fetch(`/api/comments/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/homepage');
//     } else {
//       alert('Failed to read a post');
//     }
//   }
// };

// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', createPost);

document
  .querySelector('.delete-post')
  .addEventListener('click', deletePost);