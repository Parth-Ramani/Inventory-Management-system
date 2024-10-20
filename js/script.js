if (document.referrer === "") {
  window.location.href = "index.html";
}

export let purchaseData = [
  {
    id: 1,
    productName: "Smartphone X",
    stockQuantity: 50,
    costPrice: 300,
    sellingPrice: 599.99,
    date: "2024-10-15",
    supplier: "TechCorp",
    category: "Electronics",
    quantity: 100
  },
  {
    id: 2,
    productName: "T-Shirt",
    stockQuantity: 200,
    costPrice: 5,
    sellingPrice: 19.99,
    date: "2024-10-16",
    supplier: "FashionHub",
    category: "Clothing",
    quantity: 500
  },
  {
    id: 3,
    productName: "Organic Apples",
    stockQuantity: 150,
    costPrice: 1.5,
    sellingPrice: 3.99,
    date: "2024-10-17",
    supplier: "FreshFoods",
    category: "Grocery",
    quantity: 300
  }
];

console.log(purchaseData, "ff");
export let currentProductId = null;

const modal = document.getElementById("productModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// table render

function tableRender() {
  const tableBody = document.querySelector("#purchaseTable tbody");
  if (tableBody) {
    tableBody.innerHTML = "";
    tableBody.innerHTML = "";
    purchaseData.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>         ${product.productName}</td>
            <td>  ${product.stockQuantity}</td>
            <td> $${product.costPrice.toFixed(2)}</td>
            <td> $${product.sellingPrice.toFixed(2)}</td>
            <td> ${product.date}</td>
            <td> ${product.supplier}</td>
            <td> ${product.category}</td>
            <td> ${product.quantity}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
  `;
      tableBody.appendChild(row);
    });
  } else {
    return;
  }
}
tableRender();
// add product
document.getElementById("addProductForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    id: currentProductId || Date.now(),
    productName: document.getElementById("productName")?.value,
    stockQuantity: Number(document.getElementById("stockQuantity")?.value),
    costPrice: Number(document.getElementById("costPrice")?.value),
    sellingPrice: Number(document.getElementById("sellingPrice")?.value),
    date: document.getElementById("date")?.value,
    supplier: document.getElementById("supplier")?.value,
    category: document.getElementById("category")?.value,
    quantity: Number(document.getElementById("quantity")?.value)
  };

  if (currentProductId) {
    console.log(currentProductId);

    const index = purchaseData.findIndex((i) => i.id === currentProductId);
    purchaseData[index] = product;
  } else {
    purchaseData.unshift(product);
  }

  tableRender();
  console.log(product);
  modal.style.display = "none";
});
console.log(currentProductId);

// Edit Product

function editProduct(id) {
  currentProductId = id;
  console.log(currentProductId);
  const product = purchaseData.find((p) => p.id === id);
  (document.getElementById("productName").value = product.productName),
    (document.getElementById("stockQuantity").value = product.stockQuantity),
    (document.getElementById("costPrice").value = product.costPrice),
    (document.getElementById("sellingPrice").value = product.sellingPrice),
    (document.getElementById("date").value = product.date),
    (document.getElementById("supplier").value = product.supplier),
    (document.getElementById("category").value = product.category),
    (document.getElementById("quantity").value = product.quantity);
  modal.style.display = "flex";
}

// deleteProduct

function deleteProduct(id) {
  purchaseData = purchaseData.filter((d) => d.id !== id);
  tableRender();
}

console.log(purchaseData, "ff");

export default { purchaseData };
