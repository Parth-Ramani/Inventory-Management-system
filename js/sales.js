import { purchaseData } from "./script.js";
console.log(purchaseData);
let customerData = [
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
let currentCustomerId;
let selectedProducts = [];

// console.log(purchaseData);
const modal = document.getElementById("billModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const priceInput = document.getElementById("sellingPrice");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// table render
// function tableRender() {
//   const tableBody = document.querySelector("#salesTable tbody");
//   tableBody.innerHTML = "";
//   customerData.forEach((product) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `<td>${product.customerName}</td>
// <td>${product.date}</td>
// <td>${product.grandTotal}</td>
//  <td>
//               <button onclick="editProduct(${product.id})">Edit</button>
//               <button onclick="deleteProduct(${product.id})">Delete</button>
//           </td>
// `;
//     tableBody.appendChild(row);
//   });
// }

// tableRender();

function tableRender() {
  const tableBody = document.querySelector("#salesTable tbody");
  tableBody.innerHTML = "";
  customerData.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.customerName}</td>
<td>${product.date}</td>
<td>${product.grandTotal}</td>
 <td>
               <button onclick="editProduct(${product.id})">Edit</button>
               <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        
        `;
    tableBody.appendChild(row);
  });
}

tableRender();

// document.getElementById("innerForm").addEventListener("submit",()=>{
//   const allProducts={
//     id: Date.now(),
//     product:
//   }
// })

const productSelect = document.getElementById("productSelect");

function populateDropdown(purchaseData) {
  purchaseData.forEach((productObj) => {
    // Create a new option element
    const option = document.createElement("option");
    option.value = productObj.productName;
    option.textContent = productObj.productName;

    productSelect.appendChild(option);
  });
}

// Call the function to populate the dropdown with product names
populateDropdown(purchaseData);

// Event listener to update selling price when a product is selected
productSelect.addEventListener("change", (event) => {
  const selectedProductName = event.target.value;
  // Find the product object based on the selected product name
  const selectedProduct = purchaseData.find(
    (product) => product.productName === selectedProductName
  );
  if (selectedProduct) {
    priceInput.value = selectedProduct.sellingPrice;
  }
});

// Event listener for the "Add Product" button
document.getElementById("innerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedProductName = productSelect.value;
  const selectedPrice = priceInput.value;

  if (selectedProductName && selectedPrice) {
    // Find the selected product object
    const selectedProduct = purchaseData.find(
      (product) => product.productName === selectedProductName
    );

    // Add the selected product to the array
    selectedProducts.push({
      product: selectedProductName,
      sellingPrice: selectedPrice,
      id: selectedProduct.id
    });

    // Clear the product dropdown and price input for the next selection
    productSelect.value = "";
    priceInput.value = "";
    selectedProductName = "";
    selectedPrice = "";
    // Update the list of selected products
    updateProductList();
  } else {
    alert("Please select a product and its price.");
  }
});
console.log(selectedProducts);
/// Add Customer Bill

document.getElementById("addProductForm").addEventListener("submit", (e) => {
  const newCustomer = {
    id: Date.now(),
    customerName: document.getElementById("customerName").value,
    date: document.getElementById("date").value,
    products: [],
    sellingPrice: document.getElementById("sellingPrice").value,
    grandTotal: 50
  };
});
