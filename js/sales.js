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
// console.log(purchaseData);
const modal = document.getElementById("billModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

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
