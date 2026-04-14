# Frontend Hookup Guide

You do **not** need to redesign the frontend. You only need to remove the mock blocks and uncomment the real `fetch()` calls in these functions inside `index.html`:

- `loadProducts()`
- `showDetail(id)`
- `placeOrder()`
- `loadOrders()`
- `handleAuth()`

## What to change

### 1. `loadProducts()`
Use:

```js
const res = await fetch(`${API}/products`);
const data = await res.json();
state.products = data;
```

Delete the mock part:

```js
await new Promise(r => setTimeout(r, 800));
state.products = getMockProducts();
```

---

### 2. `showDetail(id)`
Use:

```js
const res = await fetch(`${API}/products/${id}`);
const product = await res.json();
```

Delete the mock part:

```js
const product = state.products.find(p => p._id === id) || getMockProducts().find(p => p._id === id);
```

---

### 3. `placeOrder()`
Use:

```js
const res = await fetch(`${API}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${state.token}`,
  },
  body: JSON.stringify(orderPayload),
});

const order = await res.json();

if (!res.ok) {
  throw new Error(order.message || 'Order failed');
}
```

Delete the mock part:

```js
await new Promise(r => setTimeout(r, 1000));
```

---

### 4. `loadOrders()`
Use:

```js
const res = await fetch(`${API}/orders/myorders`, {
  headers: { 'Authorization': `Bearer ${state.token}` }
});

const orders = await res.json();

if (!res.ok) {
  throw new Error(orders.message || 'Failed to load orders');
}

state.orders = orders;
```

Delete the mock part:

```js
await new Promise(r => setTimeout(r, 600));
state.orders = getMockOrders();
```

---

### 5. `handleAuth()`
Use:

```js
const res = await fetch(`${API}/auth/${endpoint}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const data = await res.json();

if (!res.ok) {
  throw new Error(data.message || 'Authentication failed');
}

const { token, user } = data;
```

Delete the mock part:

```js
await new Promise(r => setTimeout(r, 800));
const token = 'mock_jwt_token_' + Date.now();
const user = { _id: 'usr_001', name: name || email.split('@')[0], email };
```

---

## Important note

The frontend expects backend error responses in this shape:

```js
{ message: 'Some error here' }
```

This backend already returns errors in that format.
