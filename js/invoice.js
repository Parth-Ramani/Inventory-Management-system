let allItems = [
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  },
  {
    id: "01",
    product: "milk",
    quantity: 1,
    sellingPrice: 30,
    total: 30
  }
];

function itemRender() {
  const tableBody = document.querySelector("#billItem tbody");
  tableBody.innerHTML = "";
  allItems.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.product}</td>
<td>${product.quantity}</td>
<td>${product.sellingPrice}</td>
<td>${product.total}</td>

        `;
    // row.addEventListener("click", () => {
    //   console.log(product);
    // });

    tableBody.appendChild(row);
  });
}
itemRender();
