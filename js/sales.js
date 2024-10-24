if (document.referrer === "") {
  window.location.href = "index.html";
}
import { purchaseData as purchaseDataAll } from "./script.js";
console.log(purchaseDataAll);
let purchaseData = purchaseDataAll.map((products) => products);
console.log(purchaseData, "map");
let initialCustomerData = [
  {
    id: 1,
    customerName: "john",
    date: "2024-10-15",
    products: [
      {
        id: 1,
        product: "buttermilk",
        quantity: 2,
        sellingPrice: 10,
        total: 20
      },
      { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
    ],
    grandTotal: 50
  },
  {
    id: 2,
    customerName: "john",
    date: "2024-10-15",
    products: [
      {
        id: 1,
        product: "buttermilk",
        quantity: 2,
        sellingPrice: 10,
        total: 20
      },
      { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
    ],
    grandTotal: 50
  },
  {
    id: 3,
    customerName: "john",
    date: "2024-10-15",
    products: [
      {
        id: 1,
        product: "buttermilk",
        quantity: 2,
        sellingPrice: 10,
        total: 20
      },
      { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
    ],
    grandTotal: 50
  }
];

export let customerData =
  JSON.parse(localStorage.getItem("customerData")) || initialCustomerData;

function saveToLocalStorage() {
  localStorage.setItem("customerData", JSON.stringify(customerData));
}

let currentCustomerId;
let currentItemId;
let itemsPerPage = 5; // Default items per page
let currentPage = 1;
let totalPrice;
let selectedProducts = [];

// console.log(purchaseData);
const modal = document.getElementById("billModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const priceInput = document.getElementById("sellingPrice");
const productSelect = document.getElementById("productSelect");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  // formTable();
});

closeModalBtn.addEventListener("click", () => {
  document.getElementById("customerName").value = "";
  document.getElementById("date").value = "";
  modal.style.display = "none";
});

// // table render

function tableRender(page = 1) {
  const tableBody = document.querySelector("#salesTable tbody");
  tableBody.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedData = customerData.slice(start, end);
  console.log(paginatedData);

  paginatedData.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.customerName}</td>
      <td>${product.date}</td>
      <td>${product.grandTotal}</td>
      <td class="action-icons">
        <i class="fas fa-edit" data-action="edit"></i>
        <i class="fas fa-trash-alt" data-action="delete"></i>
      </td>
    `;

    row.addEventListener("click", (event) => {
      // const actionCell = event.target.closest(".action-icons");
      // if (actionCell) {
      //   return;
      // }

      localStorage.setItem("invoiceData", JSON.stringify(product));
      const invoiceUrl = `invoiceTemplate.html?id=${product.id}`;
      window.open(invoiceUrl);
    });

    // Add separate event listeners for edit and delete icons
    const editIcon = row.querySelector('[data-action="edit"]');
    const deleteIcon = row.querySelector('[data-action="delete"]');

    editIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      editProduct(product.id);
    });

    deleteIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteCustomer(product.id);
    });

    tableBody.appendChild(row);
  });

  renderPaginationControls();
}

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

// function populateDropdown(purchaseData) {
//   purchaseData.forEach((productObj) => {
//     // Create a new option element
//     const option = document.createElement("option");
//     option.value = productObj.productName;
//     option.textContent = productObj.productName;

//     productSelect.appendChild(option);
//   });
// }

// populateDropdown(purchaseData);
console.log(purchaseData);

// dropDown the all products
function populateDropdown(purchaseData) {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a category";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  productSelect.appendChild(defaultOption);

  purchaseData.forEach((productObj) => {
    const option = document.createElement("option");
    option.value = productObj.productName;
    option.textContent = productObj.productName;

    productSelect.appendChild(option);
  });
}

// Assuming you already have purchaseData
populateDropdown(purchaseData);

productSelect.addEventListener("change", (event) => {
  const selectedProductName = event.target.value;
  const selectedProduct = purchaseData.find(
    (product) => product.productName === selectedProductName
  );
  console.log(selectedProduct, "selectedProduct");
  if (selectedProduct) {
    priceInput.value = selectedProduct.sellingPrice;
  }
});

// Add Product in form table

document.getElementById("innerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedProductName = productSelect.value;
  const selectedPrice = priceInput.value;

  if (selectedProductName && selectedPrice) {
    // Find the selected product in purchaseData
    let selectedProduct = purchaseData.find(
      (product) => product.productName === selectedProductName
    );

    const allItems = {
      product: selectedProductName,
      sellingPrice: selectedPrice,
      quantity: document.getElementById("quantity").value,
      id: currentItemId || selectedProduct.id,
      total: selectedPrice * document.getElementById("quantity").value
    };

    // // Only check for duplicates if we're adding a new item (not editing)
    // if (!currentItemId) {
    //   // Check if the product already exists in the selectedProducts array
    //   const productExists = selectedProducts.some(
    //     (product) => product.id === selectedProduct.id
    //   );
    //   console.log(productExists,"product exist");
    //   if (productExists) {
    //     alert("Product is already selected or exists in the list.");
    //     return;
    //   }
    // }

    // check if i am adding same product not editing product in list then show me msg
    if (!currentItemId) {
      const existingProdcut = selectedProducts.some(
        (product) => product.id === selectedProduct
      );
      if (existingProdcut) {
        alert("product is existing");
      }
    }

    if (currentItemId) {
      // Editing existing product
      const index = selectedProducts.findIndex((i) => i.id === currentItemId);
      if (index !== -1) {
        // Update the existing product
        selectedProducts[index] = allItems;
      }
    } else {
      // Adding new product
      selectedProducts.push(allItems);
    }

    // Check if the available quantity is enough
    if (selectedProduct.quantity >= allItems.quantity) {
      // If editing, restore the previous quantity before calculating new quantity
      if (currentItemId) {
        const existingProduct = selectedProducts.find(
          (p) => p.id === currentItemId
        );
        if (existingProduct) {
          // Add back the previous quantity before subtracting new quantity
          selectedProduct.quantity += parseInt(existingProduct.quantity);
        }
      }

      let updateQuantity = selectedProduct.quantity - allItems.quantity;
      selectedProduct.quantity = updateQuantity;

      // Update purchaseData
      const productIndex = purchaseData.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (productIndex !== -1) {
        purchaseData[productIndex] = selectedProduct;
        localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
      }
    } else {
      alert(`Stocks available only ${selectedProduct.quantity}`);
      return;
    }

    // Reset form fields
    productSelect.value = "";
    priceInput.value = "";
    document.getElementById("quantity").value = "";
    currentItemId = null; // Reset currentItemId after successful edit

    // Calculate total price
    totalPrice = selectedProducts.reduce((total, product) => {
      return total + product.total;
    }, 0);

    // Render form table with updated data
    formTable();

    console.log("Updated Products:", selectedProducts);
    console.log("Total Price:", totalPrice);
  } else {
    alert("Please select a product and its price.");
  }
});

console.log(selectedProducts, "vv");

document.getElementById("CustomerAddForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newCustomer = {
    id: currentCustomerId || Date.now(),
    customerName: document.getElementById("customerName").value,
    date: document.getElementById("date").value,
    products: selectedProducts,
    grandTotal: totalPrice
  };
  if (currentCustomerId) {
    const index = customerData.findIndex((i) => i.id === currentCustomerId);
    customerData[index] = newCustomer;
  } else {
    customerData.unshift(newCustomer);
  }

  console.log(customerData);
  document.getElementById("customerName").value = "";
  document.getElementById("date").value = "";
  modal.style.display = "none";

  tableRender();
  saveToLocalStorage();
});

// Edit in SalesTable

window.editProduct = function (id) {
  currentCustomerId = id;
  console.log(currentCustomerId);
  // console.log(currentCustomerId);
  const customer = customerData.find((customer) => customer.id === id);
  console.log(customer);
  document.getElementById("customerName").value = customer.customerName;
  document.getElementById("date").value = customer.date;
  // Populate the selectedProducts array with the customer's products
  selectedProducts = customer.products.map((product) => ({
    ...product
  }));
  console.log(selectedProducts);
  console.log(selectedProducts);

  // Display the products in the form table
  formTable();
  modal.style.display = "flex";
};

//  form table function
function formTable() {
  const tableBody = document.querySelector("#productsTable tbody");
  tableBody.innerHTML = "";
  selectedProducts.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.product}</td>
<td>${product.quantity}</td>
<td>${product.sellingPrice}</td>
<td>${product.total}</td>
<td class="action-icons">
                    <i class="fas fa-edit" onclick="editItems(${product.id})"></i>
                    <i class="fas fa-trash-alt" onclick="deleteProduct(${product.id})"></i>
                </td>
        `;
    // row.addEventListener("click", () => {
    //   console.log(product);
    // });

    tableBody.appendChild(row);
  });
}

// formTable();
console.log(purchaseData);

///Edit Products in Table

window.editItems = function (id) {
  currentItemId = id;
  console.log(currentItemId);
  const items = selectedProducts.find((item) => item.id === id);
  console.log(items);
  document.getElementById("productSelect").value = items.product;
  document.getElementById("quantity").value = items.quantity;
  document.getElementById("sellingPrice").value = items.sellingPrice;
};

window.deleteCustomer = function (id) {
  customerData = customerData.filter((d) => d.id !== id);
  localStorage.setItem("customerData", JSON.stringify(customerData));

  tableRender();
};

console.log(selectedProducts);
