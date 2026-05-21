let cart = [], favorites = [], currentOrderId = null, discount = 0, userRating = 0;

const items = [
    // COFFEE
    {name:'Spanish Latte', price:230,rating:4.8, category:'Coffee', img:'https://www.nescafe.com/ph/sites/default/files/2024-05/nescafe-gold-spanish-latte-recipe-banner-1066x1066.jpg'},
    {name:'Cold Brew', price:210, rating:4.6, category:'Coffee', img:'https://www.simplyrecipes.com/thmb/7zYXgL4vpOhXfa04v7_vPO4Dv84=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Cold-Brew-Coffee-LEAD-6-896c6872ac3e421ca4d88f29b528b349.jpg'},
    {name:'Flat White', price:180, rating:4.5, category:'Coffee', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqIZb8l8CH-zReZawatcBBCsSZvn_d5XqATQ&s'},
    {name:'Iced Americano', price:160, rating:4.3, category:'Coffee', img:'https://mocktail.net/wp-content/uploads/2022/03/homemade-Iced-Americano-recipe_1ig-500x500.jpg'},
    {name:'Pistachio Latte', price:260, rating:4.9, category:'Coffee', img:'https://hannahcooking.com/wp-content/uploads/2025/04/Pistachio-latte-cup.jpg'},
    {name:'Caramel Macchiato', price:245, rating:4.7, category:'Coffee', img:'https://gatherforbread.com/wp-content/uploads/2017/04/Iced-Caramel-Macchiato-16-683x1024-1.jpg'},
    // TEA
    {name:'Matcha Latte', price:280, rating:4.8, category:'Tea', img:'https://myeverydaytable.com/wp-content/uploads/IcedMatcha-7.jpg'},
    {name:'Earl Grey', price:120, rating:4.2, category:'Tea', img:'https://upload.wikimedia.org/wikipedia/commons/d/d0/Frisch_aufgebr%C3%BChter_EarlGrey_Tee.jpg'},
    {name:'Hibiscus Tea', price:150, rating:4.4, category:'Tea', img:'https://veganlovlie.com/wp-content/uploads/lemongrass-hibiscus-tea-02.jpg'},
    {name:'Lavender Chamomile', price:175, rating:4.5, category:'Tea', img:'http://mositea.com/cdn/shop/articles/lavender-green-chamomile-herbal-tea-335537.jpg?v=1659798240'},
    // BITES / SNACKS
    {name:'Avocado Toast', price:320, rating:4.9, category:'Snacks', type:'Veg', img:'https://alegumeaday.com/wp-content/uploads/2024/03/Bean-avocado-toast-3.jpg'},
    {name:'Chicken Wrap', price:240, rating:4.8, category:'Snacks', type:'Non-Veg', img:'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Buffalo-Chicken-Wrap-3.jpg'},
    {name:'Truffle Fries', price:190, rating:4.7, category:'Snacks', type:'Veg', img:'https://www.simplyscratch.com/wp-content/uploads/2026/02/DSC3195.jpg'},
    {name:'Pesto Panini', price:270, rating:4.6,  category:'Snacks', type:'Veg & Non-Veg', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Hva95XPrYSDCe4xkKxarJIYZBoWFff6yAw&s'},
    {name:'Croissant Sandwich', price:210, rating:4.5, category:'Snacks', type:'Veg & Non-Veg', img:'https://aflavorjournal.com/wp-content/uploads/2023/09/Favorite-Chicken-Salad-Croissant-Sandwiches-13-scaled.jpg'},
    // SWEETS / DESSERTS
    {name:'NY Cheesecake', price:290, rating:4.9, category:'Desserts', img:'https://www.allrecipes.com/thmb/R4reoZMOwUpDh9SJnc5xgRYH4No=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/221142-new-york-style-cheesecake-VAT-Beauty-2x1-4d4d4be1f12b4473ae748387fff54290.jpg'},
    {name:'Choco Brownie', price:140, rating:4.7, category:'Desserts', img:'https://www.recipetineats.com/uploads/2016/08/Brownies_0.jpg'},
    {name:'Blueberry Muffin', price:110, rating:4.4, category:'Desserts', img:'https://www.rainbownourishments.com/wp-content/uploads/2022/03/vegan-blueberry-muffins-1-1.jpg'},
    {name:'Classic Tiramisu', price:310, rating:5.0, category:'Desserts', img:'https://butternutbakeryblog.com/wp-content/uploads/2024/05/classic-tiramisu.jpg'},
    {name:'Lemon Tart', price:185, rating:4.5, category:'Desserts', img:'https://happyvegannie.com/wp-content/uploads/2024/07/vegan-lemon-tarts-1200x1200-1-1.jpg'},
];

let filteredItems = [...items];

function renderMenu(list = filteredItems) {
    let box = document.getElementById('menuList');
    box.innerHTML = '';
    if (list.length === 0) {
        box.innerHTML = `<div class="no-results">
            <h3>No Result Found</h3>
            <p>We couldn't find anything matching your search. Try another delicious brew!</p>
        </div>`;
        return;
    }
    list.forEach(i => { box.innerHTML += `<div class="card"><img src="${i.img}"><div class="card-info"><h4>${i.name}</h4>
<p style="color:#f39c12; font-size:0.9rem;">
⭐ ${i.rating}
</p>
<span class="price">₹${i.price}</span><div style="display:flex; gap:8px; margin-top:10px">

    <button class="btn"
    onclick="add('${i.name}', ${i.price}, this)">
    Add to Cart
</button>

<button class="btn"
    style="width:auto"
    onclick="toggleFavorite('${i.name}')">
    ❤️
</button>
    </div>
    </div>
    </div>`;

    });
}

let favorite = JSON.parse(localStorage.getItem("favorites")) || [];

// ❤️ TOGGLE FAVORITE (ADD + REMOVE in one function)
function toggleFavorite(name) {
    let item = items.find(i => i.name === name);
    if (!item) return;

    let index = favorites.findIndex(f => f.name === name);

    if (index === -1) {
        favorites.push(item); // ADD
        alert("❤️ Added to favorites");
    } else {
        favorites.splice(index, 1); // REMOVE
        alert("❌ Removed from favorites");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    let box = document.getElementById("favoritesList");

    favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        box.innerHTML = "<p style='color:#888'>No favorites yet</p>";
        return;
    }

    box.innerHTML = favorites.map(i => `
        <div class="card">
            <img src="${i.img}">
            <div class="card-info">
                <h4>${i.name}</h4>

                <p style="color:#f39c12">⭐ ${i.rating}</p>

                <span class="price">₹${i.price}</span>

                <div style="display:flex; gap:8px; margin-top:10px">

                    <button class="btn"
                        onclick="add('${i.name}', ${i.price}, this)">
                        Add to Cart
                    </button>

                    <button class="btn"
                        style="background:#c0392b"
                        onclick="toggleFavorite('${i.name}')">
                        ❌ Remove
                    </button>

                </div>
            </div>
        </div>
    `).join("");
}

function search(val) { renderMenu(items.filter(i => i.name.toLowerCase().includes(val.toLowerCase()))); }
function filterCategory(cat) { renderMenu(cat === 'all' ? items : items.filter(i => i.category === cat)); }

function add(name, price, btn) {
    let found = cart.find(i => i.name === name);
    if (found) found.qty++; else cart.push({name, price, qty: 1});
    btn.innerText = "Added!"; setTimeout(()=>btn.innerText="Add", 600);
    updateBill();
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateBill();
}

// LOAD USER ON START
function loadUser() {
    let user = JSON.parse(localStorage.getItem("user"));

    // Hide everything first
    document.getElementById("customerFeedbackSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "none";

    // ❌ HIDE ADMIN FEEDBACK PANEL FOR EVERYONE BY DEFAULT
    let adminFeedback = document.getElementById("adminFeedback");
    if (adminFeedback) adminFeedback.style.display = "none";

    if (user) {

        document.getElementById("loginModal").style.display = "none";

        document.getElementById("userDisplay").innerText =
            `${user.role}: ${user.name}`;

        // CUSTOMER VIEW
        if (user.role === "Customer") {
            document.getElementById("customerFeedbackSection").style.display = "block";
            document.getElementById("orders").style.display = "block";
        }

        // ADMIN VIEW
        else if (user.role === "Admin") {
            document.getElementById("adminPanel").style.display = "block";

            //hide customer My orders section for admin
            document.getElementById("orders").style.display = "none";

            // ❌ SHOW ADMIN FEEDBACK PANEL ONLY FOR ADMIN
            if (adminFeedback) adminFeedback.style.display = "block";

            loadCustomerReviews();
            loadAdminOrders();
        }

    } else {
        document.getElementById("loginModal").style.display = "flex";
    }
}

function saveUser() {

    let role = document.getElementById("userRole").value;
    let name = document.getElementById("userName").value.trim();
    let phone = document.getElementById("userPhone").value.trim();

    if (!name || !phone) {
        alert("Please fill all fields");
        return;
    }

    // ✅ ONLY ADMIN NEEDS PASSWORD
    if (role === "Admin") {

        let password = prompt("Enter Admin Password");

        const ADMIN_PHONE = "6239633281";
        const ADMIN_PASSWORD = "brew@admin";

        if (
            phone !== ADMIN_PHONE ||
            password !== ADMIN_PASSWORD
        ) {
            alert("❌ Invalid Admin Credentials");
            return;
        }
    }

    let user = { name, phone, role };

    // admin token
    if (role === "Admin") {
        user.token = "ADMIN_AUTH";
    }

    localStorage.setItem("user", JSON.stringify(user));

    loadUser();
}

// LOGOUT
function logout() {
    let confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {
        localStorage.removeItem("user");
        location.reload();
    }
}

function applyPromo() {
    let code = document.getElementById('promoCode').value.toUpperCase();
    let sub = parseFloat(document.getElementById('subtotal').innerText);
    let msg = document.getElementById('promoMsg');
    if (code === 'COFFEE10') { discount = sub * 0.1; msg.innerText = "10% Off Applied!"; msg.style.color="green"; }
    else { discount = 0; msg.innerText = "Invalid Code"; msg.style.color="red"; }
    updateBill();
}

function updateBill() {
    let box = document.getElementById('cartItems'), sub = 0;
    if (!cart.length) { box.innerHTML = '<p style="color:#888">Empty</p>'; discount = 0; }
    else {
        box.innerHTML = cart.map((item, i) => {
            sub += item.price * item.qty;
            return `<div class="cart-item"><div><b>${item.name}</b><br><small>₹${item.price} x ${item.qty}</small></div><div style="display:flex; gap:5px"><button class="btn btn-small" onclick="changeQty(${i},-1)">-</button><button class="btn btn-small" onclick="changeQty(${i},1)">+</button></div></div>`;
        }).join('');
    }
    let gst = (sub - discount) * 0.05, del = sub > 0 ? 40 : 0;
    document.getElementById('subtotal').innerText = sub.toFixed(2);
    document.getElementById('distAmt').innerText = discount.toFixed(2);
    document.getElementById('gst').innerText = gst.toFixed(2);
    document.getElementById('delivery').innerText = del;
    document.getElementById('total').innerText = (sub - discount + gst + del).toFixed(2);
}

function loadAddresses() {
    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

    let select = document.getElementById('addressSelect');
    select.innerHTML = '<option value="">-- Select Address --</option>';

    addresses.forEach(addr => {
        let opt = document.createElement("option");
        opt.value = addr;
        opt.textContent = addr;
        select.appendChild(opt);
    });
}

function splitBill() {
    let people = parseInt(document.getElementById("peopleCount").value);
    let total = parseFloat(document.getElementById("total").innerText);
    let result = document.getElementById("splitResult");

    if (!people || people <= 0) {
        result.innerText = "⚠️ Enter valid number of people";
        return;
    }

    if (total === 0) {
        result.innerText = "⚠️ Cart is empty";
        return;
    }

    let perPerson = (total / people).toFixed(2);

    result.innerText = `Each person pays ₹${perPerson}`;
}

function saveAddress() {
    let newAddr = document.getElementById('newAddress').value;
    if (!newAddr) return;

    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses.push(newAddr);
    localStorage.setItem("addresses", JSON.stringify(addresses));

    document.getElementById('newAddress').value = "";
    loadAddresses();
}

function togglePay(m) {
    document.getElementById('upiInp').style.display = (m==='UPI'?'block':'none');
    document.getElementById('cardInp').style.display = (m==='Card'?'block':'none');
}

function placeOrder() {
    let selectedAddress = document.getElementById("addressSelect").value;
    let paymentMethod = document.getElementById("payMethod").value;
    let upi = document.getElementById("vpa").value.trim();

    if (!selectedAddress) {
        alert("⚠️ Please select a delivery address before placing order!");
        return;
    }

    if (!cart.length) {
        alert("⚠️ Your cart is empty!");
        return;
    }

    // ✅ UPI VALIDATION
    if (paymentMethod === "UPI") {
        let upiPattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;

        if (!upiPattern.test(upi)) {
            alert("❌ Invalid UPI ID! Example: name@upi");
            return;
        }
    }

    let order = {
        id: 'BB' + Math.floor(1000 + Math.random() * 9000),
        items: [...cart],
        total: document.getElementById('total').innerText,
        address: selectedAddress,
        date: new Date().toLocaleString(),
        status: "Preparing",
        createdAt: Date.now()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    currentOrderId = order.id;

    document.getElementById('orderId').innerText = order.id;
    document.getElementById('confirmation').style.display = 'block';

    cart = [];
    updateBill();

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    loadOrders(); // refresh UI
}

function trackOrder() {
    let id = document.getElementById('trackId').value.trim();
    let statusBox = document.getElementById('status');

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Find order
    let orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
        statusBox.innerText = "❌ ID Not Found";
        return;
    }

    let order = orders[orderIndex];

    // STEP 1 → PREPARING
    order.status = "Preparing";
    localStorage.setItem("orders", JSON.stringify(orders));

    statusBox.innerHTML = "Status: Preparing ☕";
    loadOrders();

    // STEP 2 → OUT FOR DELIVERY
    setTimeout(() => {
        order.status = "Out for Delivery";
        localStorage.setItem("orders", JSON.stringify(orders));

        statusBox.innerHTML = "Status: Out for Delivery 🛵";
        loadOrders();
    }, 2000);

    // STEP 3 → DELIVERED
    setTimeout(() => {
        order.status = "Delivered";
        localStorage.setItem("orders", JSON.stringify(orders));

        statusBox.innerHTML = "Status: Delivered ✅";

        // refresh My Orders section
        loadOrders();

        // show review
        document.getElementById('reviewBox').style.display = 'block';
    }, 4000);
}

function setRating(n) {
    userRating = n;
    const stars = document.querySelectorAll('#stars span');
    stars.forEach((s, i) => s.style.opacity = i < n ? "1" : "0.3");
}

function submitReview() {
    let text = document.getElementById('reviewText').value.trim();

    // 🚫 Check rating
    if (userRating === 0) {
        alert("⚠️ Please select a star rating!");
        return;
    }

    // 🚫 Check feedback text (optional but recommended)
    if (text === "") {
        alert("⚠️ Please write your feedback!");
        return;
    }

    // ✅ If everything is valid
    alert("Thanks for your review!");
    
    document.getElementById('reviewBox').style.display = 'none';
    
    // Reset values
    userRating = 0;
    document.getElementById('reviewText').value = "";
    
    let stars = document.querySelectorAll('#stars span');
    stars.forEach(s => s.style.opacity = "0.3");
}

function toggleTheme() { document.body.classList.toggle('dark-theme'); }

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let box = document.getElementById("ordersList");

    if (orders.length === 0) {
        box.innerHTML = "<p style='color:#888'>No orders yet</p>";
        return;
    }

    // newest first
    let displayOrders = [...orders].reverse();

    box.innerHTML = displayOrders.map((order, index) => {
        // AUTO FIX OLD ORDERS
        if (
            order.status === "Preparing" &&
            Date.now() - order.createdAt > 10000
        ) {
            order.status = "Delivered";
        }

        let itemsStr = order.items
            .map(i => `${i.name} x${i.qty}`)
            .join(", ");

        return `
        <div style="border-bottom:1px solid #ddd; padding:12px 0">
            <b>Order ID:</b> ${order.id}<br>
            <small>${order.date}</small><br>
            <b>Items:</b> ${itemsStr}<br>
            <b>Total:</b> ₹${order.total}<br>
            <b>Address:</b> ${order.address}<br>
            <b>Status:</b>
            <span style="color:green">
                ${order.status}
            </span>

            <div style="margin-top:8px; display:flex; gap:8px;">
                <button class="btn"
                style="width:auto"
                onclick="reOrder(${orders.length - 1 - index})">
                    Re-order
                </button>
                ${
                    order.status !== "Cancelled" &&
                    order.status !== "Delivered"
                    ? `
                    <button class="btn"
                    style="width:auto; background:#c0392b"
                    onclick="cancelOrder(${orders.length - 1 - index})">
                        Cancel
                    </button>
                    `
                    : ""
                }
            </div>
        </div>
        `;
    }).join("");

    localStorage.setItem("orders", JSON.stringify(orders));
}

function cancelOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // ❌ Cannot cancel delivered order
    if (orders[index].status === "Delivered") {
        alert("Delivered orders cannot be cancelled!");
        return;
    }

    // ❌ Cannot cancel already cancelled order
    if (orders[index].status === "Cancelled") {
        alert("Order already cancelled!");
        return;
    }

    let confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    // ✅ cancel order
    orders[index].status = "Cancelled";

    localStorage.setItem("orders", JSON.stringify(orders));

    loadOrders();
    loadAdminOrders();
    alert("✅ Order Cancelled");
}

function reOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let oldItems = orders[index].items;

    oldItems.forEach(item => {
        let found = cart.find(i => i.name === item.name);
        if (found) {
            found.qty += item.qty;
        } else {
            cart.push({...item});
        }
    });

    updateBill();
    alert("✅ Items added back to cart!");
}

function updateOrderStatus() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let now = Date.now();

    orders.forEach(order => {
        // Skip cancelled/delivered
        if (
            order.status === "Delivered" ||
            order.status === "Cancelled"
        ) return;

        // ✅ OLD ORDERS FIX
        if (!order.createdAt) {
            order.status = "Delivered";
            return;
        }

        let diff = now - order.createdAt;

        // First 10 sec
        if (diff < 10000) {
            order.status = "Preparing";
        }
        // After 10 sec
        else {
            order.status = "Delivered";
        }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

function sortPrice(type) {
    if (type === "low") {
        filteredItems.sort((a, b) => a.price - b.price);
    } 
    else if (type === "high") {
        filteredItems.sort((a, b) => b.price - a.price);
    }
    else if (type === "under200") {
        filteredItems = items.filter(item => item.price < 200);
    }
    else if (type === "under300") {
        filteredItems = items.filter(item => item.price < 300);
    }

    renderMenu(filteredItems);
}

function filterVeg(type) {
    if (type === "Veg") {
        filteredItems = items.filter(item =>
            item.category === "Snacks" &&
            (item.type === "Veg" || item.type === "Veg & Non-Veg")
        );
    }
    else if (type === "Non-Veg") {
        filteredItems = items.filter(item =>
            item.category === "Snacks" &&
            (item.type === "Non-Veg" || item.type === "Veg & Non-Veg")
        );
    }
    else {
        filteredItems = [...items];
    }

    renderMenu(filteredItems);
}

function sortRating(type) {
    let sorted = [...items];

    if (type === "high") {
        sorted.sort((a, b) => b.rating - a.rating);
    }
    else if (type === "low") {
        sorted.sort((a, b) => a.rating - b.rating);
    }

    renderMenu(sorted);
}

function resetFilters() {
    // reset dataset
    filteredItems = [...items];
    renderMenu(filteredItems);

    // reset search box
    document.querySelector('.search-input').value = '';

    // reset dropdowns
    document.querySelectorAll('.filter-select').forEach(select => {
        select.selectedIndex = 0;
    });
}

function sendAdminFeedback() {
    let msg = document.getElementById("adminReply").value.trim();

    if(msg === ""){
        alert("Please write feedback first!");
        return;
    }

    document.getElementById("adminMsg").innerText = "✅ Feedback sent successfully!";
    document.getElementById("adminReply").value = "";
}

function submitCustomerFeedback() {
    let text = document.getElementById("customerFeedback").value.trim();

    if (text === "") {
        alert("Please write feedback!");
        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));
    let reviews = JSON.parse(localStorage.getItem("customerReviews")) || [];

    reviews.push({
        name: user.name,
        feedback: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("customerReviews", JSON.stringify(reviews));

    alert("✅ Feedback Submitted");
    document.getElementById("customerFeedback").value = "";
}

function loadCustomerReviews() {
    let reviews = JSON.parse(localStorage.getItem("customerReviews")) || [];
    let box = document.getElementById("allReviews");

    if (reviews.length === 0) {
        box.innerHTML = "<p style='color:#888'>No reviews yet</p>";
        return;
    }

    box.innerHTML = reviews.map(r => `
        <div style="padding:15px; border-bottom:1px solid #ddd;">
            <b>${r.name}</b><br>
            <small>${r.date}</small>
            <p style="margin-top:8px">
                ${r.feedback}
            </p>
        </div>
    `).reverse().join("");
}

function checkAdminAccess() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "Admin" || user.token !== "ADMIN_AUTH") {
        let adminPanel = document.getElementById("adminPanel");
        let adminFeedback = document.getElementById("adminFeedback");

        if (adminPanel) adminPanel.style.display = "none";
        if (adminFeedback) adminFeedback.style.display = "none";
    }
}

function loadAdminOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let box = document.getElementById("adminOrders");

    if (!box) return;

    if (orders.length === 0) {
        box.innerHTML = "<p style='color:#888'>No customer orders</p>";
        return;
    }

    box.innerHTML = orders.map(order => `
        <div style="border-bottom:1px solid #ddd; padding:12px 0;">
            <b>Order ID:</b> ${order.id}<br>
            <b>Status:</b> ${order.status}<br>
            <b>Total:</b> ₹${order.total}<br>
            <b>Address:</b> ${order.address}<br>
            <small>${order.date}</small>
        </div>
    `).reverse().join("");
}

// Initial logic & startup execution
filteredItems = [...items];
renderMenu(filteredItems);
loadUser();
setInterval(updateOrderStatus, 10000);
loadOrders();
renderFavorites();
setInterval(checkAdminAccess, 1000);
