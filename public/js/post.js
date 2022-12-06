const postTable = document.getElementById('post-table')
async function updatePostTable() {
  let response = undefined

  try {
    response = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    response = await response.json()
  } catch (err) {
    console.error(`Error: ${err}`)
  }

  postTable.innerHTML = ''

  for (const post of response) {
    postTable.innerHTML += `
                            <tr>
                                <th scope="row">${post.id}</th>
                                <td>${post.title}</td>
                                <td>${post.published}</td>
                                <td>${post.authorId}</td>
                            </tr>
                            `
  }
}

function getPostContent() {

  let post = {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    published: document.getElementById('published').checked,
    authorId: document.getElementById('authorId').value
  }

  return post
}

function clearPostContent() {
  document.getElementById('title').value = ''
  document.getElementById('content').value = ''
  document.getElementById('published').value = ''
  document.getElementById('authorId').value = ''
}

const postButton = document.getElementById('create-post')
postButton.addEventListener('click', async _ => {

  let response = undefined

  const data = getPostContent()

  try {
    response = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    response = await response.json()
  } catch (err) {
    console.error(`Error: ${err}`)
  }

  updatePostTable()
})

updatePostTable()