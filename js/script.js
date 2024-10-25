if (document.referrer === "") {
  window.location.href = "index.html";
}

export let initialPurchaseData = [
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

export let currentProductId = null;
let itemsPerPage = 5; // Default items per page
let currentPage = 1;

const modal = document.getElementById("productModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// Open modal box
openModalBtn?.addEventListener("click", () => {
  openModalBtn?.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "flex";
    }
  });
});
// close modal box
closeModalBtn?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// stored data inLocal storage
export let purchaseData =
  JSON.parse(localStorage.getItem("purchaseData")) || initialPurchaseData;

function saveToLocalStorage() {
  localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
}

// // Function to render the table with pagination
// function tableRender(page = 1) {
//   const tableBody = document.querySelector("#purchaseTable tbody");
//   if (tableBody) {
//     tableBody.innerHTML = "";

//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;

//     const paginatedData = purchaseData.slice(start, end);

//     paginatedData.forEach((product) => {
//       const costPrice = product.costPrice
//         ? product.costPrice.toFixed(2)
//         : "0.00";
//       const sellingPrice = product.sellingPrice
//         ? product.sellingPrice.toFixed(2)
//         : "0.00";

//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${product.productName}</td>
//         <td>₹${costPrice}</td>
//         <td>₹${sellingPrice}</td>
//         <td>${product.date}</td>
//         <td>${product.supplier}</td>
//         <td>${product.category}</td>
//         <td>${product.quantity}</td>

//  <td class="action-icons">
//                     <i class="fas fa-edit" onclick="editProduct(${product.id})"></i>
//                     <i class="fas fa-trash-alt" onclick="deleteProduct(${product.id})"></i>
//                 </td>

//       `;
//       tableBody.appendChild(row);
//     });

//     renderPaginationControls();
//   }
// }

// Function to render the table with pagination
function tableRender(page = 1) {
  const tableBody = document.querySelector("#purchaseTable tbody");
  if (!tableBody) return;
  // Add CSS for action icons
  const style = document.createElement("style");
  style.textContent = `
    .action-icons i {
      cursor: pointer;
      margin: 0 5px;
    }
  `;
  document.head.appendChild(style);

  tableBody.innerHTML = "";

  // Check if there's no data
  if (!purchaseData || purchaseData.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="8" style="text-align: center; padding: 20px; font-size: 18px;">
        <strong>No Data Found</strong>
      </td>
    `;
    tableBody.appendChild(emptyRow);

    // Hide pagination when no data
    const paginationControls = document.getElementById("paginationControls");
    if (paginationControls) {
      paginationControls.style.display = "none";
    }
    return;
  }

  // Show pagination if there's data
  const paginationControls = document.getElementById("paginationControls");
  if (paginationControls) {
    paginationControls.style.display = "block";
  }

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedData = purchaseData.slice(start, end);

  paginatedData.forEach((product) => {
    const costPrice = product.costPrice ? product.costPrice.toFixed(2) : "0.00";
    const sellingPrice = product.sellingPrice
      ? product.sellingPrice.toFixed(2)
      : "0.00";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.productName}</td>
      <td>₹${costPrice}</td>
      <td>₹${sellingPrice}</td>
      <td>${product.date}</td>
      <td>${product.supplier}</td>
      <td>${product.category}</td>
      <td>${product.quantity}</td>
      <td class="action-icons">
        <i class="fas fa-edit" onclick="editProduct(${product.id})"></i>
        <i class="fas fa-trash-alt" onclick="deleteProduct(${product.id})"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });

  renderPaginationControls();
}
updateTotals();
function renderPaginationControls() {
  const paginationControls = document.getElementById("paginationControls");
  paginationControls.innerHTML = "";

  const totalItems = purchaseData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-btn");

    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      currentPage = i;
      tableRender(currentPage);
    });

    paginationControls.appendChild(button);
  }
}

document
  .getElementById("itemsPerPage")
  ?.addEventListener("change", function () {
    itemsPerPage = Number(this.value);
    currentPage = 1;
    tableRender(currentPage);
  });

// Initial render
tableRender(currentPage);

// Function to calculate and update totals
function updateTotals() {
  const totalPurchaseValue = purchaseData.reduce((total, item) => {
    return total + item.costPrice * item.quantity;
  }, 0);

  const totalItems = purchaseData.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Update the display
  const totalElement = document.getElementById("totalValue");
  if (totalElement) {
    const formattedValue = isNaN(totalPurchaseValue)
      ? "0.00"
      : totalPurchaseValue.toFixed(2);
    totalElement.textContent = `₹${formattedValue}`;
  }
  // document.getElementById(
  //   "totalValue"
  // ).textContent = `₹${totalPurchaseValue.toFixed(2)}`;
  // document.getElementById("totalPurchase").textContent =
  //   totalItems.toLocaleString() || "1";
  const totalPurchaseElement = document.getElementById("totalPurchase");
  if (totalPurchaseElement) {
    // Handle null, undefined, or invalid numbers
    const displayValue =
      !totalItems || isNaN(totalItems) ? "0" : totalItems.toString();
    totalPurchaseElement.textContent = displayValue;
  }
}

// deleteProduct

window.deleteProduct = function (id) {
  purchaseData = purchaseData.filter((d) => d.id !== id);
  localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
  tableRender();
  updateTotals();
};

// add product

function addingProducts() {
  document.getElementById("addProductForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const productName = document.getElementById("productName")?.value;

    // Check for duplicate product name only when adding new product (not editing)
    if (!currentProductId) {
      const productExists = purchaseData.some(
        (item) => item.productName.toLowerCase() === productName.toLowerCase()
      );

      if (productExists) {
        alert("This product already exists in inventory!");
        return;
      }
    }

    const product = {
      id: currentProductId || Date.now(),
      productName: productName,
      costPrice: Number(document.getElementById("costPrice")?.value),
      sellingPrice: Number(document.getElementById("sellingPrice")?.value),
      date: document.getElementById("date")?.value,
      supplier: document.getElementById("supplier")?.value,
      category: document.getElementById("category")?.value,
      quantity: Number(document.getElementById("quantity")?.value)
    };
    console.log(currentProductId, "currentProductId");
    if (currentProductId) {
      // Editing existing product
      const index = purchaseData.findIndex((i) => i.id === currentProductId);
      console.log(index, "index");
      if (index !== -1) {
        purchaseData[index] = product;
      }
    } else {
      purchaseData.unshift(product);
    }
    tableRender(currentPage);
    saveToLocalStorage();
    updateTotals();
    modal.style.display = "none";

    document.getElementById("addProductForm").reset();
    currentProductId = null;
  });
}

addingProducts();

console.log(currentProductId);
console.log(purchaseData);
// // total purchase value
// const totalPurchaseValue = purchaseData.reduce((total, item) => {
//   return total + item.costPrice * item.quantity;
// }, 0);

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("totalValue").textContent = `₹${totalPurchaseValue}`;
//   document.getElementById("totalPurchase").textContent =
//     totalItems.toLocaleString();
// });
// console.log("Total Purchase Value:", totalPurchaseValue);

// // total items
// const totalItems = purchaseData.reduce((total, item) => {
//   return total + item.quantity;
// }, 0);

// Edit Product

window.editProduct = function (id) {
  currentProductId = id;
  console.log(currentProductId);
  const product = purchaseData.find((p) => p.id === id);
  (document.getElementById("productName").value = product.productName),
    (document.getElementById("costPrice").value = product.costPrice),
    (document.getElementById("sellingPrice").value = product.sellingPrice),
    (document.getElementById("date").value = product.date),
    (document.getElementById("supplier").value = product.supplier),
    (document.getElementById("category").value = product.category),
    (document.getElementById("quantity").value = product.quantity);
  updateTotals();
  modal.style.display = "flex";
};

export default { purchaseData };
