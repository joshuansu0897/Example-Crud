const userTable = document.getElementById('user-table')
async function updateUserTable() {
  let response = undefined

  try {
    response = await fetch('http://localhost:3000/api/v1/users', {
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

  userTable.innerHTML = ''

  for (const user of response) {
    userTable.innerHTML += `
                            <tr>
                                <th scope="row">${user.id}</th>
                                <td>${user.username}</td>
                                <td>${user.email}</td>
                                <td>${user.password}</td>
                            </tr>
                            `
  }
}

function getUserContent() {
  let user = {
    email: document.getElementById('email').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }

  return user
}

function clearUserContent() {
  document.getElementById('email').value = ''
  document.getElementById('username').value = ''
  document.getElementById('password').value = ''
}

const userButton = document.getElementById('create-user')
userButton.addEventListener('click', async _ => {

  let response = undefined

  const data = getUserContent()

  try {
    response = await fetch('http://localhost:3000/api/v1/users', {
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

  updateUserTable()
})

updateUserTable()