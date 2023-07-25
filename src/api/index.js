export async function getTracks() {
  const res = await fetch('https://painassasin.online/catalog/track/all/')

  const jsonData = await res.json()

  return jsonData
}

// const password = 'gleb@fokin.ru'
// const email = 'gleb@fokin.ru'

export async function login({ email, password }) {
  const res = await fetch('https://painassasin.online/user/login/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })

  const jsonData = await res.json()

  if (!res.ok) {
    throw new Error(jsonData.detail ?? 'Ошибка сервера')
  }

  return jsonData
}

export async function register({ email, password }) {
  const res = await fetch('https://painassasin.online/user/signup/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      username: email,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })

  const jsonData = await res.json()

  if (!res.ok) {
    const error =
      jsonData.email?.[0] ??
      jsonData.password?.[0] ??
      jsonData.email?.[0] ??
      'Ошибка сервера'

    console.log(jsonData, error)
    throw new Error(error)
  }

  return jsonData
}
