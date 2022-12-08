export const createUser = (name, email, password, role) => {
  return fetch('https://lab-api-bq.onrender.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
      restaurant: 'Burguer Queen',
    }),
  });
};

export const login = (email, password) => {
  return fetch('https://lab-api-bq.onrender.com/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const saveUser = (userName) => {
  localStorage.setItem('name', userName);
}

const token = () => localStorage.getItem('token');

export const userName = () => localStorage.getItem('name');

export const menu = () => {
  return fetch('https://lab-api-bq.onrender.com/products', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token(),
    },
  })
};

// return fetch('https://lab-api-bq.up.onrender.app/products', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json',
//       'Authorization': token },
//     }),
