// Combined array: normal items + items with variants
const allItems = [
  { 
    name: "ടേബിൾ സെറ്റ്",
    variants: [
      { name: "ടേബിൾ സെറ്റ് (08)", price: 350 },
      { name: "ടേബിൾ സെറ്റ് (10)", price: 400 }
    ]
  },
  { name: "ചെയർ സെറ്റിങ്‌സ്", price: 20 },
  { name: "കുഷ്യൻ ചെയർ", price: 50 },
  { 
    name: "ടേബിൾ",
    variants: [
      { name: "ടേബിൾ", price: 25 },
      { name: "ടേബിൾ (വൺ സൈഡ്)", price: 35 }
    ]
  },
  { name: "സ്റ്റൂൾ", price: 5 },
  { name: "ഫൈബർ", price: 10 },
  { name: "vip", price: 8 },
  { name: "വട്ടചെമ്പ്", price: 200 },
  { name: "ചെമ്പ് (per kg)", price: 8 },
  { name: "ചട്ടകം", price: 30 },
  { name: "കൊട്ടകൈൽ", price: 100 },
  { name: "കൊട്ട", price: 50 },
  { name: "ഷവ്വൽ", price: 50 },
  { 
    name: "ഉരുളി",
    variants: [
      { name: "ഉരുളി (S)", price: 150 },
      { name: "ഉരുളി (M)", price: 200 },
      { name: "ഉരുളി (VC)", price: 250 },
      { name: "ഉരുളി (B)", price: 500 }
    ]
  },
  { name: "അടുപ്പ്", price: 50 },
  { name: "എണ്ണ കോരി", price: 25 },
  { 
    name: "ഗ്യാസ് അടുപ്പ്",
    variants: [
      { name: "ഗ്യാസ് അടുപ്പ് (I)", price: 150 },
      { name: "ഗ്യാസ് അടുപ്പ് (II)", price: 200 },
      { name: "ഗ്യാസ് അടുപ്പ് (III)", price: 600 }
    ]
  },
  { name: "വാഷ് ബെയ്‌സിൻ", price: 350 },
  { 
    name: "ട്രമ്മ്",
    variants: [
      { name: "ട്രമ്മ് (S)", price: 100 },
      { name: "ട്രമ്മ് (B)", price: 200 }
    ]
  },
  { 
    name: "സ്റ്റാൻഡ്",
    variants: [
      { name: "സ്റ്റാൻഡ് (S)", price: 15 },
      { name: "സ്റ്റാൻഡ്(B)", price: 50 }
    ]
  },
  
  { name: "വെള്ള ടാങ്ക്", price: 600 },
  { name: "ഫ്ലാസ്ക്", price: 150 },
  { name: "ഫാൻ", price: 300 },
  { name: "അണ്ഡാവ്", price: 50 },
  { name: "വേസ്റ്റ് ബക്കറ്റ്", price: 25 },
  { name: "മിക്‌സി", price: 350 },
  { name: "സെറ്റ് ചെമ്പ്", price: 25 },
  { name: "വലിയ കൈൽ", price: 10 },
  { name: "തൊലുങ്ക്", price: 50 },
  { name: "ഷാൻ", price: 10 },
  { name: "കോരി", price: 2 },
  { name: "കറിബോൾ", price: 5 },
  { name: "കൈൽ", price: 2 },
  { name: "ബക്കറ്റ് /കൈൽ", price: 35 },
  { name: "തൂക്കി", price: 30 },
  { name: "ജഗ്ഗ്", price: 10 },
  { name: "അരപ്ലേറ്റ്", price: 3 },
  { name: "അരകോരി", price: 2 }
];

const itemSelect = document.getElementById('item');
const qtyInput = document.getElementById('quantity');
const tbody = document.querySelector('#invoiceTable tbody');
const grandEl = document.getElementById('grandTotal');
const customerInput = document.getElementById('customer');
const transportInput = document.getElementById('transport');
const variantWrapper = document.getElementById('variantWrapper');
const extra1Input = document.getElementById('extra1');
const extra2Input = document.getElementById('extra2');
const extra3Input = document.getElementById('extra3');
const uruliInput = document.getElementById('uruli');

let invoiceItems = [];
let selectedVariantPrice = null;

// Populate dropdown
function populateItemDropdown() {
  itemSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = "";
  placeholder.textContent = "Select Item";
  placeholder.disabled = true;
  placeholder.selected = true;
  itemSelect.appendChild(placeholder);

  allItems.forEach(it => {
    const opt = document.createElement('option');
    opt.value = it.name;
    opt.textContent = it.name;
    itemSelect.appendChild(opt);
  });
}
populateItemDropdown();

// Variant dropdown
itemSelect.addEventListener('change', () => {
  const selectedMain = itemSelect.value;
  variantWrapper.innerHTML = '';
  selectedVariantPrice = null;

  const item = allItems.find(i => i.name === selectedMain);

  if (item.variants) {
    const variantSelect = document.createElement('select');
    variantSelect.id = 'variantSelect';
    variantSelect.innerHTML = '<option value="" disabled selected>Select Variant</option>';
    item.variants.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.price;
      opt.textContent = v.name;
      variantSelect.appendChild(opt);
    });
    variantWrapper.appendChild(variantSelect);

    variantSelect.addEventListener('change', () => {
      selectedVariantPrice = parseFloat(variantSelect.value);
    });
  }
});

// Add item
function addItem() {
  const name = itemSelect.value;
  const qty = parseInt(qtyInput.value) || 0;
  if (!name || qty <= 0) {
    alert("Please select a valid item and quantity.");
    return;
  }

  const item = allItems.find(i => i.name === name);
  let price, displayName;

  if (item.variants) {
    if (selectedVariantPrice === null) {
      alert("Please select a variant for this item.");
      return;
    }
    price = selectedVariantPrice;
    const variantSelect = document.getElementById('variantSelect');
    displayName = variantSelect.options[variantSelect.selectedIndex].text;
  } else {
    price = item.price;
    displayName = item.name;
  }

  invoiceItems.push({
    name: displayName,
    price: price,
    quantity: qty,
    total: price * qty
  });

  renderInvoice();
  qtyInput.value = 1;
  itemSelect.value = "";
  variantWrapper.innerHTML = '';
  selectedVariantPrice = null;
}

// Extra charges
function addCharge(label, input) {
  const fee = parseFloat(input.value);
  if (isNaN(fee) || fee <= 0) { input.value = ""; renderInvoice(); return; }
  const existing = invoiceItems.find(i => i.name === label);
  if (existing) { existing.total = fee; existing.price = fee; existing.quantity = "-"; }
  else { invoiceItems.push({ name: label, price: fee, quantity: "-", total: fee }); }
  input.value = "";
  renderInvoice();
}
function addExtra1() { addCharge("പന്തൽ", extra1Input); }
function addExtra2() { addCharge("കാർപെറ്റ്", extra2Input); }
function addExtra3() { addCharge("Ceiling & Decoration", extra3Input); }
function addTransport() { addCharge("Loading & Transportation", transportInput); }

// Remove / clear
function removeItem(index) { invoiceItems.splice(index, 1); renderInvoice(); }
function clearAll() {
  if (confirm("Are you sure you want to clear all items?")) {
    invoiceItems = [];
    customerInput.value = '';
    itemSelect.value = '';
    transportInput.value = '';
    extra1Input.value = '';
    extra2Input.value = '';
    extra3Input.value = '';
    uruliInput.value = '';
    variantWrapper.innerHTML = '';
    renderInvoice();
  }
}

// Render table
function renderInvoice() {
  tbody.innerHTML = '';
  let grand = 0;
  invoiceItems.forEach((it, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${it.name}</td><td>${it.price.toFixed(2)}</td><td>${it.quantity}</td><td>${it.total.toFixed(2)}</td><td><button style="background:#dc3545;color:white;border:none;padding:5px 8px;border-radius:4px;" onclick="removeItem(${idx})">X</button></td>`;
    tbody.appendChild(tr);
    grand += Number(it.total);
  });
  grandEl.textContent = grand.toFixed(2);
}

// ✅ Updated printInvoice with bigger Grand Total
function printInvoice() {
  if (invoiceItems.length === 0) { alert('No items to print'); return; }
  const sortedItems = [...invoiceItems];
  const customer = customerInput.value || "N/A";
  const dateStr = new Date().toLocaleDateString();
  const grand = grandEl.textContent;

  let html = `<html><head><meta charset="utf-8"><title>Invoice</title><style>
    body{font-family:Arial,sans-serif;padding:20px;color:#333;font-size:14px;}
    .header{text-align:center;margin-bottom:20px; border-bottom:2px solid #004085; padding-bottom:10px;}
    .header h1{color:#004085;font-size:28px;letter-spacing:1px;margin:0;font-weight:bold;}
    .header p{margin:2px 0;font-size:14px;font-weight:500;color:#555;}
    .customer-date{display:flex;justify-content:space-between;margin-bottom:15px;flex-wrap:wrap; border-bottom:1px solid #333; padding-bottom:5px;}
    table{width:100%;border-collapse:collapse;margin-top:15px;}
    th,td{border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold;}
    th{background-color:#f2f2f2;}
    tr.item-row td{border-bottom:1px dashed #aaa;}
    /* 🔹 Bigger, Bolder Grand Total */
	.total{
		margin-top:20px;
		text-align:right;
		font-weight:700; /* slightly bold, not too heavy */
		font-size:24px;  /* a bit smaller but still clear */
		border-top:2px solid #333;
		padding-top:8px;
		color:#000;
		}

    @media print{
      body{margin:0;}
      .header h1{font-size:26px;}
      th,td{font-size:12px; padding:6px;}
    }
    </style></head><body>
    
    <div class="header">
      <i><h1>FMS EVENTS & CATERING</h1></i>
      <p>Pakkadapuraya</p>
      <h2>+91 7736600949</h2>
    </div>

    <div class="customer-date">
      <div><strong>Customer:</strong> ${customer}</div>
      <div><strong>Date:</strong> ${dateStr}</div>
    </div>

    <table>
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Total</th></tr>
      </thead>
      <tbody>`;

  sortedItems.forEach(it => {
    html += `<tr class="item-row"><td>${it.name}</td><td>${it.quantity}</td><td>${it.total.toFixed(2)}</td></tr>`;
  });

  html += `</tbody></table><div class="total">Grand Total: ${grand}</div></body></html>`;

  const w = window.open('', '_blank', 'width=800,height=600');
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print();
}

renderInvoice();
