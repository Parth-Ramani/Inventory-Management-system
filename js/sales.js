if (document.referrer === "") {
  window.location.href = "registration.html";
}
import { purchaseData as purchaseDataAll } from "./script.js";
console.log(purchaseDataAll);
// console.log(purchaseData);
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

openModalBtn?.addEventListener("click", () => {
  modal.style.display = "flex";
  formTable();
});

closeModalBtn?.addEventListener("click", () => {
  document.getElementById("customerName").value = "";
  document.getElementById("date").value = "";
  selectedProducts = [];
  currentCustomerId = null;
  currentItemId = null;
  modal.style.display = "none";
  formTable();
});

// table render

function tableRender(page = 1) {
  const tableBody = document.querySelector("#salesTable tbody");
  if (tableBody) {
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
    if (!customerData || customerData.length === 0) {
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
  }

  renderPaginationControls();
}

function renderPaginationControls() {
  const paginationControls = document.getElementById("paginationControls");
  if (paginationControls) {
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
  } else {
    console.error("paginationControls element not found in the DOM.");
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

console.log(purchaseData);

// dropDown the all products
function populateDropdown(purchaseData) {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a category";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  productSelect?.appendChild(defaultOption);

  purchaseData?.forEach((productObj) => {
    const option = document.createElement("option");
    option.value = productObj.productName;
    option.textContent = productObj.productName;

    productSelect?.appendChild(option);
  });
}

// Assuming you already have purchaseData
populateDropdown(purchaseData);

productSelect?.addEventListener("change", (event) => {
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
    let selectedProduct = purchaseData.find(
      (product) => product.productName === selectedProductName
    );

    // Check if there's enough quantity available
    if (selectedProduct.quantity < document.getElementById("quantity").value) {
      alert(`Stocks available only ${selectedProduct.quantity}`);
      return;
    }

    const allItems = {
      product: selectedProductName,
      sellingPrice: selectedPrice,
      quantity: document.getElementById("quantity").value,
      id: currentItemId || selectedProduct.id,
      total: selectedPrice * document.getElementById("quantity").value,
      originalProductId: selectedProduct.id // Store original product ID for later
    };

    if (!currentItemId) {
      const productExists = selectedProducts.some(
        (product) => product.id === selectedProduct.id
      );
      if (productExists) {
        alert("Product is already selected or exists in the list.");
        return;
      }
    }

    if (currentItemId) {
      const index = selectedProducts.findIndex((i) => i.id === currentItemId);
      if (index !== -1) {
        selectedProducts[index] = allItems;
      }
    } else {
      selectedProducts.push(allItems);
    }

    // Reset form fields
    productSelect.value = "";
    priceInput.value = "";
    document.getElementById("quantity").value = "";
    currentItemId = null;

    formTable();
  } else {
    alert("Please select a product and its price.");
  }
});

console.log(selectedProducts, "vv");

// Form submit handler
const customerForm = document.getElementById("CustomerAddForm");
const addAllBtn = document.querySelector(".addAllBtn");

addAllBtn.addEventListener("click", () => {
  // Check if both products and form fields are filled
  const customerName = document.getElementById("customerName").value.trim();
  const date = document.getElementById("date").value;

  if (!customerName || !date) {
    customerForm.reportValidity();
    return;
  }

  // if (selectedProducts.length === 0) {
  //   alert("Please select at least one product");
  //   return;
  // }

  handleFormSubmission();
});

// Update handleFormSubmission to handle editing properly
function handleFormSubmission() {
  const customerName = document.getElementById("customerName").value.trim();
  const date = document.getElementById("date").value;

  if (!customerName || !date) {
    alert("Please fill in all required fields");
    return;
  }

  if (currentCustomerId) {
    const originalCustomer = customerData.find(
      (c) => c.id === currentCustomerId
    );
    if (originalCustomer) {
      originalCustomer.products.forEach((originalProduct) => {
        const stillExists = selectedProducts.find(
          (p) => p.id === originalProduct.id
        );
        if (!stillExists) {
          const purchaseProduct = purchaseData.find(
            (p) => p.id === originalProduct.originalProductId
          );
          if (purchaseProduct) {
            purchaseProduct.quantity += parseInt(originalProduct.quantity);
          }
        }
      });
    }
  }

  for (let selectedProduct of selectedProducts) {
    const purchaseProduct = purchaseData.find(
      (p) => p.id === selectedProduct.originalProductId
    );

    if (purchaseProduct) {
      if (purchaseProduct.quantity >= selectedProduct.quantity) {
        purchaseProduct.quantity -= parseInt(selectedProduct.quantity);
      } else {
        alert(`Not enough stock for ${selectedProduct.product}`);
        return;
      }
    }
  }

  // Calculate total price
  const totalPrice = selectedProducts.reduce((total, product) => {
    return total + product.total;
  }, 0);

  const newCustomer = {
    id: currentCustomerId || Date.now(),
    customerName: customerName,
    date: date,
    products: selectedProducts,
    grandTotal: totalPrice
  };

  if (currentCustomerId) {
    const index = customerData.findIndex((i) => i.id === currentCustomerId);
    customerData[index] = newCustomer;
  } else {
    customerData.unshift(newCustomer);
  }

  // Save all changes
  localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
  localStorage.setItem("customerData", JSON.stringify(customerData));

  // Reset form and state
  customerForm.reset();
  selectedProducts = [];
  currentCustomerId = null;
  modal.style.display = "none";
  tableRender();
}

// Edit in Sales Table
// First, modify the editProduct function to handle quantities properly
window.editProduct = function (id) {
  currentCustomerId = id;
  const customer = customerData.find((customer) => customer.id === id);

  customer.products.forEach((product) => {
    const purchaseItem = purchaseData.find(
      (p) => p.id === product.originalProductId
    );
    if (purchaseItem) {
      purchaseItem.quantity += parseInt(product.quantity);
    }
  });

  // Update localStorage with restored quantities
  localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

  // Now set up the form for editing
  document.getElementById("customerName").value = customer.customerName;
  document.getElementById("date").value = customer.date;
  selectedProducts = customer.products.map((product) => ({
    ...product
  }));

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
                    <i class="fas fa-trash-alt" onclick="removeItem(${product.id})"></i>
                </td>
        `;

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

// Modify removeItem function to handle quantity restoration
window.removeItem = function (id) {
  console.log(id);
  const selectedProduct = selectedProducts.find((prod) => prod.id === id);
  console.log(selectedProduct);
  // if (selectedProduct) {
  //   // Find the original product in purchaseData using originalProductId
  //   const purchaseProduct = purchaseData.find(
  //     (product) => product.id === selectedProduct.originalProductId
  //   );
  // if (purchaseProduct) {
  //   // Restore the quantity
  //   purchaseProduct.quantity += parseInt(selectedProduct.quantity);
  //   console.log(purchaseProduct.quantity, "purchaseProduct.quantity");
  //   localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
  // }
  // Remove from selectedProducts
  //   selectedProducts = selectedProducts.filter((prod) => prod.id !== id);
  //   formTable();
  // }
};
//////////////////
document
  .getElementById("calculateTotalBtn")
  ?.addEventListener("click", function () {
    const selectedDate = document.getElementById("dateInput").value;
    const resultElement = document.getElementById("result");

    if (!selectedDate) {
      resultElement.textContent = "Please select a date.";
      return;
    }

    // Filter customer data by selected date
    const customersOnDate = customerData.filter(
      (customer) => customer.date === selectedDate
    );

    if (customersOnDate.length === 0) {
      resultElement.textContent = "No sales for the selected date.";
      return;
    }

    // Calculate total sales for the selected date
    const totalSales = customersOnDate.reduce(
      (total, customer) => total + customer.grandTotal,
      0
    );
    const totalCustomers = customersOnDate.length;

    resultElement.textContent = `Total Sales: $${totalSales} from ${totalCustomers} customers on ${selectedDate}`;
  });

console.log(selectedProducts);

export default { customerData };
