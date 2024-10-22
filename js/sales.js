if (document.referrer === "") {
  window.location.href = "index.html";
}
import { purchaseData as purchaseDataAll } from "./script.js";
console.log(purchaseDataAll);
const purchaseData = purchaseDataAll.map((products) => products);
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
let selectedProducts = [];

// console.log(purchaseData);
const modal = document.getElementById("billModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const priceInput = document.getElementById("sellingPrice");
const productSelect = document.getElementById("productSelect");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  formTable();
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// table render
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
                    <i class="fas fa-edit" onclick="editProduct(${product.id})"></i>
                    <i class="fas fa-trash-alt" onclick="deleteCustomer(${product.id})"></i>
                </td>

        `;

    // row.addEventListener("click", () => {
    //   const invoiceUrl = `invoiceTemplate.html`;
    //   console.log(invoiceUrl);
    //   // Open invoice.html in a new tab
    //   window.open(invoiceUrl);
    // });
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
  if (selectedProduct) {
    priceInput.value = selectedProduct.sellingPrice;
  }
});

// add products in form
document.getElementById("innerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedProductName = productSelect.value;
  const selectedPrice = priceInput.value;

  if (selectedProductName && selectedPrice) {
    const selectedProduct = purchaseData.find(
      (product) => product.productName === selectedProductName
    );
    const allItems = {
      product: selectedProductName,
      sellingPrice: selectedPrice,
      quantity: document.getElementById("quantity").value,
      id: currentItemId || selectedProduct.id,
      total: selectedPrice * document.getElementById("quantity").value
    };

    if (currentItemId) {
      const index = selectedProducts.findIndex((i) => i.id === currentItemId);
      selectedProducts[index] = allItems;
    } else {
      selectedProducts.push(allItems);
    }

    productSelect.value = "";
    priceInput.value = "";
    document.getElementById("quantity").value = "";
    console.log(selectedProducts);
    formTable();
    console.log(purchaseData);

    // updateProductList();
  } else {
    alert("Please select a product and its price.");
  }
});
console.log(selectedProducts, "vv");

/// Add Customer Bill

document.getElementById("CustomerAddForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newCustomer = {
    id: currentCustomerId || Date.now(),
    customerName: document.getElementById("customerName").value,
    date: document.getElementById("date").value,
    products: selectedProducts,
    sellingPrice: document.getElementById("sellingPrice").value,
    grandTotal: 50
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
  tableRender();
};
