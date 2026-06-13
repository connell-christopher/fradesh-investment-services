class Fradesh {

    constructor() {

        this.products = [
            {
                id:1,
                name:"Premium Bottled Water",
                price:500,
                category:"water"
            },
            {
                id:2,
                name:"Family Bread",
                price:1200,
                category:"bread"
            },
            {
                id:3,
                name:"Corporate Water Supply",
                price:50000,
                category:"bulk"
            }
        ];

        this.load();
    }

    load() {

        this.orders =
            JSON.parse(
                localStorage.getItem("fradesh_orders")
            ) || [];

        this.bookings =
            JSON.parse(
                localStorage.getItem("fradesh_bookings")
            ) || [];

        this.leads =
            JSON.parse(
                localStorage.getItem("fradesh_leads")
            ) || [];
    }

    save() {

        localStorage.setItem(
            "fradesh_orders",
            JSON.stringify(this.orders)
        );

        localStorage.setItem(
            "fradesh_bookings",
            JSON.stringify(this.bookings)
        );

        localStorage.setItem(
            "fradesh_leads",
            JSON.stringify(this.leads)
        );
    }

    createLead(data){

        this.leads.push({
            id:Date.now(),
            ...data,
            created:new Date()
        });

        this.save();
    }

    createBooking(data){

        this.bookings.push({
            id:Date.now(),
            status:"pending",
            ...data
        });

        this.save();
    }

    createOrder(data){

        this.orders.push({
            id:Date.now(),
            status:"pending",
            ...data
        });

        this.save();
    }

    dashboard(){

        return {

            orders:this.orders.length,

            bookings:this.bookings.length,

            leads:this.leads.length,

            revenue:this.orders.reduce(
                (a,b)=>a+b.total,
                0
            )

        };
    }

}

const app = new Fradesh();

window.fradesh = app;


const bookingForm =
document.getElementById(
"waterBookingForm"
);

if(bookingForm){

bookingForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

app.createBooking({

name:
document.getElementById(
"customerName"
).value,

email:
document.getElementById(
"customerEmail"
).value,

date:
document.getElementById(
"deliveryDate"
).value,

quantity:
document.getElementById(
"quantity"
).value,

address:
document.getElementById(
"address"
).value

});

alert(
"Water delivery reserved successfully."
);

bookingForm.reset();

});
}


/* =========================
   SLIDESHOW (ONLY FIXED PART)
========================= */

document.querySelectorAll(".slideshow").forEach(slideshow => {
  const slides = slideshow.querySelectorAll(".slide");

  if (slides.length === 0) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000);
});


/* =========================
   ORDER SECTION (UNCHANGED)
========================= */

const productType = document.getElementById("productType");
const breadSection = document.getElementById("breadSection");
const waterSection = document.getElementById("waterSection");

function updateSections() {
  const value = productType.value;

  if (value === "bread") {
    breadSection.style.display = "block";
    waterSection.style.display = "none";
  } 
  else if (value === "water") {
    breadSection.style.display = "none";
    waterSection.style.display = "block";
  } 
  else {
    // default state (FIX)
    breadSection.style.display = "block";
    waterSection.style.display = "block";
  }
}
productType.addEventListener("change", updateSections);
updateSections();


const breadType = document.getElementById("breadType");
const breadQty = document.getElementById("breadQty");

const waterType = document.getElementById("waterType");
const waterQty = document.getElementById("waterQty");

const totalPrice = document.getElementById("totalPrice");

if (
    breadType &&
    breadQty &&
    waterType &&
    waterQty &&
    totalPrice
) {

    function calculateTotal() {

        let total = 0;

        total +=
            (Number(breadType.value) || 0) *
            (Number(breadQty.value) || 0);

        total +=
            (Number(waterType.value) || 0) *
            (Number(waterQty.value) || 0);

        totalPrice.textContent =
            total.toLocaleString();
    }

    [breadType, breadQty, waterType, waterQty].forEach(element => {

        element.addEventListener("input", calculateTotal);
        element.addEventListener("change", calculateTotal);

    });

    calculateTotal();
}
