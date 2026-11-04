
/* ===================================
   VC_CENIMATIC WEBSITE CONFIGURATION
=================================== */

// Apna actual WhatsApp number aur email yahan add karo.
// WhatsApp number: country code + mobile number, without +
// Example: 919876543210

const CONFIG = {
    whatsapp: "91XXXXXXXXXX",
    email: "yourmail@gmail.com",
    studioAddress: "Your Studio Address, Maharashtra, India",
    mapQuery: "Your Studio Address, Maharashtra, India"
};

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuBtn.textContent = navbar.classList.contains("active") ? "✕" : "☰";
});

navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// Booking date: past dates disabled
const dateInput = document.getElementById("date");

const today = new Date();
const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localDate;

// Service selection from service cards
document.querySelectorAll(".service-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("service").value =
            link.dataset.service;
    });
});

// Collect booking information
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

// Format booking message
function createBookingMessage(data) {
    return `*NEW BOOKING ENQUIRY - VC_CENIMATIC*

Hello VC_CENIMATIC Team!

I would like to book your service.

*CUSTOMER DETAILS*
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}

*BOOKING DETAILS*
Service: ${data.service}
Preferred Date: ${data.date}
Location: ${data.location || "Not specified"}

*ADDITIONAL INFORMATION*
${data.message || "No additional information"}

Please contact me with availability and pricing.

Thank you!
VC_CENIMATIC Customer`;
}

// WhatsApp booking
document.getElementById("whatsappBtn").addEventListener("click", () => {
    const data = getBookingDetails();
    if (!data) return;

    if (!/^91\d{10}$/.test(CONFIG.whatsapp)) {
        alert("Please add your correct WhatsApp number in script.js first.");
        return;
    }

    const text = encodeURIComponent(createBookingMessage(data));
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${text}`;

    window.open(url, "_blank");
});

// Email booking
document.getElementById("emailBtn").addEventListener("click", () => {
    const data = getBookingDetails();
    if (!data) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.email)) {
        alert("Please add your correct email address in script.js first.");
        return;
    }

    const subject = encodeURIComponent(
        `New Booking - ${data.service} | VC_CENIMATIC`
    );

    const body = encodeURIComponent(createBookingMessage(data));

    window.location.href =
        `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
});

// Contact section links
const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}`;

document.getElementById("contactWhatsapp").href = whatsappUrl;
document.getElementById("floatingWhatsapp").href = whatsappUrl;

document.getElementById("contactEmail").href =
    `mailto:${CONFIG.email}`;

document.getElementById("studioAddress").textContent =
    CONFIG.studioAddress;

document.getElementById("directionLink").href =
    `https://www.google.com/maps/search/?api=1&query=${
        encodeURIComponent(CONFIG.mapQuery)
    }`;
