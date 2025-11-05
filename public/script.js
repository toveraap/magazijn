const API_URL = '/api/products';

// Fetch and display all products
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '';

  products.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input id="name-${p._id}" value="${p.name}" readonly /></td>
      <td><input id="quantity-${p._id}" type="number" value="${p.quantity}" readonly /></td>
      <td><input id="price-${p._id}" type="number" value="${p.price}" readonly /></td>
      <td>
        <button id="btn-${p._id}" onclick="toggleEdit('${p._id}')">Edit</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add a new product
async function addProduct() {
  const name = document.getElementById('name').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  });

  document.getElementById('name').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';

  loadProducts();
}

// Toggle edit mode for a product row
function toggleEdit(id) {
  const nameInput = document.getElementById(`name-${id}`);
  const qtyInput = document.getElementById(`quantity-${id}`);
  const priceInput = document.getElementById(`price-${id}`);
  const button = document.getElementById(`btn-${id}`);

  const isEditing = !nameInput.readOnly;

  if (isEditing) {
    // Save changes
    updateProduct(id);
    nameInput.readOnly = qtyInput.readOnly = priceInput.readOnly = true;
    button.textContent = 'Edit';
  } else {
    // Enable editing
    nameInput.readOnly = qtyInput.readOnly = priceInput.readOnly = false;
    button.textContent = 'Save';
  }
}

// Update an existing product
async function updateProduct(id) {
  const name = document.getElementById(`name-${id}`).value;
  const quantity = document.getElementById(`quantity-${id}`).value;
  const price = document.getElementById(`price-${id}`).value;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  });

  loadProducts();
}

// Delete a product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadProducts();
}

// Load products when the page opens
loadProducts();
