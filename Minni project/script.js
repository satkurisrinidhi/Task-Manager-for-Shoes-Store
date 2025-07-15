let shoes = [];
let editingIndex = null;

function addShoe() {
  const name = document.getElementById("shoeName").value;
  const price = document.getElementById("shoePrice").value;
  const category = document.getElementById("shoeCategory").value;
  const imageInput = document.getElementById("shoeImage");
  const imageUrl = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : "";

  shoes.push({ name, price, category, imageUrl });
  renderShoes();
  clearForm();
}

function renderShoes(filter = "Men") {
  const list = document.getElementById("shoeList");
  list.innerHTML = "";

  shoes
    .filter(shoe => shoe.category === filter)
    .forEach((shoe, index) => {
      const card = document.createElement("div");
      card.className = "shoe-card";
      card.innerHTML = `
        <b>${shoe.name}</b><br>₹${shoe.price}<br>
        <img src="${shoe.imageUrl}" alt="Shoe"/><br>
        <button class="order-btn">Order</button>
        <button class="edit-btn" onclick="editShoe(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteShoe(${index})">🗑️</button>
      `;
      list.appendChild(card);
    });
}

function editShoe(index) {
  const shoe = shoes[index];
  document.getElementById("shoeName").value = shoe.name;
  document.getElementById("shoePrice").value = shoe.price;
  document.getElementById("shoeCategory").value = shoe.category;
  editingIndex = index;
}

function updateShoe() {
  if (editingIndex === null) return;

  const name = document.getElementById("shoeName").value;
  const price = document.getElementById("shoePrice").value;
  const category = document.getElementById("shoeCategory").value;
  const imageInput = document.getElementById("shoeImage");
  const imageUrl = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : shoes[editingIndex].imageUrl;

  shoes[editingIndex] = { name, price, category, imageUrl };
  editingIndex = null;
  renderShoes(category);
  clearForm();
}

function deleteShoe(index) {
  shoes.splice(index, 1);
  renderShoes();
}

function clearForm() {
  document.getElementById("shoeName").value = "";
  document.getElementById("shoePrice").value = "";
  document.getElementById("shoeCategory").value = "Men";
  document.getElementById("shoeImage").value = "";
}

function filterShoes(category) {
  document.querySelectorAll(".tab-button").forEach(btn =>
    btn.classList.remove("active")
  );
  const activeBtn = Array.from(document.querySelectorAll(".tab-button")).find(
    btn => btn.innerText === category
  );
  if (activeBtn) activeBtn.classList.add("active");

  renderShoes(category);
}

// Initial render
renderShoes();
