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

export const createOrder = (client, table, products) => {
  return fetch('https://lab-api-bq.onrender.com/orders', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token(),
    },
    body: JSON.stringify({
      client: client,
      table: table,
      products: products
    }),
  })
};

export const getAllOrders = () => {
  return fetch('https://lab-api-bq.onrender.com/orders', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token(),
    },
  })
}

export const updateStatus = (status, orderId) => {
  return fetch(`https://lab-api-bq.onrender.com/orders/${orderId}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json',
    'Authorization': token() },
    body: JSON.stringify({
      status
    }),
  });
}
