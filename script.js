/* ===================================
   VC_CENIMATIC WEBSITE CONFIGURATION
=================================== */
const CONFIG = {
    whatsapp: "919623854966",
    email: "vedant.gode2826@gmail.com",
    studioAddress: "Shahapur, Maharashtra, India",
    mapQuery: "Shahapur, Maharashtra, India"
};

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("active");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");
    });
});

// Booking date: past dates disabled using the visitor's local date
const dateInput = document.getElementById("date");
const today = new Date();
dateInput.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");

// Service selection from service cards
document.querySelectorAll(".service-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("service").value = link.dataset.service;
    });
});

// Collect and validate booking information
function getBookingDetails() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !service || !date) {
        alert("Please fill all required booking details.");
        return null;
    }
    if (!/^[0-9+\-\s()]{10,16}$/.test(phone)) {
        alert("Please enter a valid mobile number.");
        return null;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return null;
    }
    return { name, phone, email, service, date, location, message };
}

function createBookingMessage(data) {
    return `*NEW BOOKING ENQUIRY - VC_CENIMATIC*\n\nHello VC_CENIMATIC Team!\n\nI would like to book your service.\n\n*CUSTOMER DETAILS*\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "Not provided"}\n\n*BOOKING DETAILS*\nService: ${data.service}\nPreferred Date: ${data.date}\nLocation: ${data.location || "Not specified"}\n\n*ADDITIONAL INFORMATION*\n${data.message || "No additional information"}\n\nPlease contact me with availability and pricing.\n\nThank you!\nVC_CENIMATIC Customer`;
}

// WhatsApp booking
document.getElementById("whatsappBtn").addEventListener("click", () => {
    const data = getBookingDetails();
    if (!data) return;
    const text = encodeURIComponent(createBookingMessage(data));
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
});

// Email booking
document.getElementById("emailBtn").addEventListener("click", () => {
    const data = getBookingDetails();
    if (!data) return;
    const subject = encodeURIComponent(`New Booking - ${data.service} | VC_CENIMATIC`);
    const body = encodeURIComponent(createBookingMessage(data));
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
});

// Contact links and current year
const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}`;
document.getElementById("contactWhatsapp").href = whatsappUrl;
document.getElementById("floatingWhatsapp").href = whatsappUrl;
document.getElementById("contactEmail").href = `mailto:${CONFIG.email}`;
document.getElementById("studioAddress").textContent = CONFIG.studioAddress;
document.getElementById("directionLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`;
document.getElementById("currentYear").textContent = new Date().getFullYear();
