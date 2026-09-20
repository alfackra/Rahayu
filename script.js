/* =========================================================
   RAHAYU — UMRAH SERVICES
   script.js
========================================================= */

"use strict";


/* =========================================================
   1. SHORTCUT
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   2. FORMAT RUPIAH
========================================================= */

function formatRupiah(value) {

  const number = Number(value) || 0;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);

}


/* =========================================================
   3. CURRENT YEAR
========================================================= */

const currentYear = $("#currentYear");

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* =========================================================
   4. HEADER SCROLL
========================================================= */

const mainHeader = $("#mainHeader");

function updateHeader() {

  if (!mainHeader) return;

  mainHeader.classList.toggle(
    "scrolled",
    window.scrollY > 15
  );

}

window.addEventListener(
  "scroll",
  updateHeader
);

updateHeader();


/* =========================================================
   5. MOBILE MENU
========================================================= */

const mobileMenuBtn =
  $("#mobileMenuBtn");

const mobileMenu =
  $("#mobileMenu");


if (mobileMenuBtn && mobileMenu) {

  mobileMenuBtn.addEventListener(
    "click",
    () => {

      const open =
        mobileMenu.classList.toggle("active");

      document.body.classList.toggle(
        "menu-open",
        open
      );

      mobileMenuBtn.innerHTML =
        open
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';

    }
  );


  /*
    Tutup menu setelah link diklik
  */

  $$("a", mobileMenu).forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

      document.body.classList.remove(
        "menu-open"
      );

      mobileMenuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

    });

  });

}


/* =========================================================
   6. RESPONSIVE MOBILE MENU RESET
========================================================= */

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 900 &&
    mobileMenu &&
    mobileMenuBtn
  ) {

    mobileMenu.classList.remove("active");

    document.body.classList.remove(
      "menu-open"
    );

    mobileMenuBtn.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

  }

});


/* =========================================================
   7. SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach((link) => {

  link.addEventListener(
    "click",
    function(event) {

      const targetId =
        this.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});


/* =========================================================
   8. FAQ
========================================================= */

const faqItems =
  $$(".faq-item");


faqItems.forEach((item) => {

  const question =
    $(".faq-question", item);

  if (!question) return;


  question.addEventListener(
    "click",
    () => {

      const isOpen =
        item.classList.contains("active");


      /*
        Tutup semua
      */

      faqItems.forEach((faq) => {

        faq.classList.remove("active");

      });


      /*
        Buka yang diklik
      */

      if (!isOpen) {

        item.classList.add("active");

      }

    }
  );

});


/* =========================================================
   9. REVEAL ANIMATION
========================================================= */

const revealElements =
  $$(
    ".service-card," +
    ".step," +
    ".route-card," +
    ".faq-item"
  );


if (
  "IntersectionObserver" in window
) {

  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(15px)";

    element.style.transition =
      "opacity .45s ease, transform .45s ease";

  });


  const observer =
    new IntersectionObserver(

      (entries, obs) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            obs.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.1
      }

    );


  revealElements.forEach((element) => {

    observer.observe(element);

  });

}


/* =========================================================
   10. TOAST NOTIFICATION
========================================================= */

function createToastContainer() {

  let container =
    $("#rahayuToastContainer");

  if (container) {
    return container;
  }


  container =
    document.createElement("div");

  container.id =
    "rahayuToastContainer";


  Object.assign(
    container.style,
    {

      position: "fixed",

      top: "90px",

      right: "20px",

      zIndex: "99999",

      display: "flex",

      flexDirection: "column",

      gap: "8px",

      width: "min(340px, calc(100% - 40px))"

    }
  );


  document.body.appendChild(container);

  return container;

}


/* =========================================================
   11. SHOW TOAST
========================================================= */

function showToast(
  title,
  message,
  type = "success"
) {

  const container =
    createToastContainer();


  const toast =
    document.createElement("div");


  let icon =
    "fa-circle-check";

  let iconColor =
    "#159669";


  if (type === "warning") {

    icon =
      "fa-circle-exclamation";

    iconColor =
      "#b88727";

  }


  if (type === "error") {

    icon =
      "fa-circle-xmark";

    iconColor =
      "#c04c4c";

  }


  toast.innerHTML = `

    <div
      style="
        width:38px;
        height:38px;
        flex:0 0 38px;
        display:grid;
        place-items:center;
        border-radius:50%;
        background:#f4f7f6;
        color:${iconColor};
      "
    >
      <i class="fa-solid ${icon}"></i>
    </div>


    <div
      style="
        flex:1;
        min-width:0;
      "
    >

      <strong
        style="
          display:block;
          margin-bottom:2px;
          color:#172326;
          font-size:11px;
        "
      >
        ${title}
      </strong>

      <span
        style="
          display:block;
          color:#778386;
          font-size:9px;
          line-height:1.5;
        "
      >
        ${message}
      </span>

    </div>


    <button
      type="button"
      aria-label="Tutup"
      style="
        width:28px;
        height:28px;
        border:0;
        background:transparent;
        color:#9ba4a6;
        cursor:pointer;
      "
    >
      <i class="fa-solid fa-xmark"></i>
    </button>

  `;


  Object.assign(
    toast.style,
    {

      display: "flex",

      alignItems: "center",

      gap: "10px",

      padding: "13px",

      border: "1px solid #e4e8e7",

      borderRadius: "11px",

      background: "#ffffff",

      boxShadow:
        "0 15px 40px rgba(18,40,39,.13)",

      opacity: "0",

      transform:
        "translateX(25px)",

      transition:
        ".25s ease"

    }
  );


  container.appendChild(toast);


  requestAnimationFrame(() => {

    toast.style.opacity = "1";

    toast.style.transform =
      "translateX(0)";

  });


  const closeButton =
    $("button", toast);


  function removeToast() {

    toast.style.opacity = "0";

    toast.style.transform =
      "translateX(25px)";


    setTimeout(() => {

      toast.remove();

    }, 250);

  }


  closeButton.addEventListener(
    "click",
    removeToast
  );


  setTimeout(
    removeToast,
    4500
  );

}


/* =========================================================
   12. NUMBER INPUT HELPER
========================================================= */

function positiveInteger(value, fallback = 1) {

  const number =
    parseInt(value);

  if (
    isNaN(number) ||
    number < 1
  ) {

    return fallback;

  }

  return number;

}


/* =========================================================
   13. QUERY PARAMETER
========================================================= */

function getQuery(name) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return params.get(name);

}


/* =========================================================
   14. DATE FORMAT
========================================================= */

function formatDateIndonesia(dateString) {

  if (!dateString) {
    return "-";
  }


  const date =
    new Date(
      `${dateString}T00:00:00`
    );


  if (
    Number.isNaN(date.getTime())
  ) {
    return dateString;
  }


  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  ).format(date);

}


/* =========================================================
   15. DIFFERENCE BETWEEN DATES
========================================================= */

function differenceInDays(
  startDate,
  endDate
) {

  if (
    !startDate ||
    !endDate
  ) {
    return 0;
  }


  const start =
    new Date(
      `${startDate}T00:00:00`
    );


  const end =
    new Date(
      `${endDate}T00:00:00`
    );


  const difference =
    end.getTime() -
    start.getTime();


  if (difference <= 0) {
    return 0;
  }


  return Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );

}


/* =========================================================
   16. PRICE DATABASE
========================================================= */

/*
   =========================================================
   PENTING

   Database ini dipakai oleh halaman-halaman berikutnya.

   Angka referensi awal mengikuti harga publik
   yang sedang kita jadikan rujukan.

   Untuk hotel, harga tidak dibuat tetap karena
   hotel berubah berdasarkan:
   - tanggal
   - musim
   - tipe kamar
   - meal plan
   - availability

   Detail hotel akan kita buat di hotel.html.
   =========================================================
*/


const RAHAYU_PRICES = {


  /* ===============================
     VISA
  =============================== */

  visa: {

    pricePerPerson: 2550000,

    minimumPersons: 1,

    externalHotelApproval: 490000

  },


  /* ===============================
     MUTHAWWIF
  =============================== */

  muthawwif: {

    pricePerDay: 1470000,

    minimumDays: 3

  },


  /* ===============================
     TRANSPORT
  =============================== */

  transport: {

    routes: {

      jeddahAirportMakkah: {

        name:
          "Jeddah Airport → Makkah",

        startingPrice:
          1430000

      },


      jeddahAirportMadinah: {

        name:
          "Jeddah Airport → Madinah",

        startingPrice:
          2600000

      },


      madinahAirportHotel: {

        name:
          "Madinah Airport → Hotel Madinah",

        startingPrice:
          980000

      },


      makkahMadinah: {

        name:
          "Makkah → Madinah",

        startingPrice:
          2430000

      }

    }

  }

};


/* =========================================================
   17. VISA CALCULATOR
   Akan otomatis bekerja jika visa.html
   memiliki ID yang sesuai.
========================================================= */

const visaForm =
  $("#visaForm");

const visaPersons =
  $("#visaPersons");

const visaExternalHotel =
  $("#visaExternalHotel");

const visaTotal =
  $("#visaTotal");

const visaBreakdown =
  $("#visaBreakdown");


function calculateVisa() {

  if (!visaPersons) return;


  let persons =
    positiveInteger(
      visaPersons.value,
      2
    );


  /*
    Minimum 2 jamaah
  */

  if (
    persons <
    RAHAYU_PRICES.visa.minimumPersons
  ) {

    persons =
      RAHAYU_PRICES.visa.minimumPersons;

    visaPersons.value =
      persons;


    showToast(
      "Minimum 2 jamaah",
      "Referensi layanan visa menggunakan minimum pemesanan 2 jamaah.",
      "warning"
    );

  }


  const visaPrice =
    persons *
    RAHAYU_PRICES.visa
      .pricePerPerson;


  let approvalPrice = 0;


  if (
    visaExternalHotel &&
    visaExternalHotel.checked
  ) {

    approvalPrice =
      RAHAYU_PRICES.visa
        .externalHotelApproval;

  }


  const total =
    visaPrice +
    approvalPrice;


  if (visaTotal) {

    visaTotal.textContent =
      formatRupiah(total);

  }


  if (visaBreakdown) {

    visaBreakdown.innerHTML = `

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:15px;
          padding:8px 0;
          border-bottom:1px solid #edf0ef;
        "
      >

        <span
          style="
            color:#647174;
            font-size:10px;
          "
        >
          Visa Umrah
          (${persons} jamaah)
        </span>

        <strong
          style="
            color:#172326;
            font-size:10px;
          "
        >
          ${formatRupiah(visaPrice)}
        </strong>

      </div>


      ${
        approvalPrice > 0
        ? `

          <div
            style="
              display:flex;
              justify-content:space-between;
              gap:15px;
              padding:8px 0;
              border-bottom:1px solid #edf0ef;
            "
          >

            <span
              style="
                color:#647174;
                font-size:10px;
              "
            >
              Approval hotel eksternal
            </span>

            <strong
              style="
                color:#172326;
                font-size:10px;
              "
            >
              ${formatRupiah(approvalPrice)}
            </strong>

          </div>

        `
        : ""
      }


      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:15px;
          padding-top:10px;
        "
      >

        <strong
          style="
            color:#08665d;
            font-size:11px;
          "
        >
          Total
        </strong>

        <strong
          style="
            color:#08665d;
            font-size:13px;
          "
        >
          ${formatRupiah(total)}
        </strong>

      </div>

    `;

  }

}


if (visaPersons) {

  visaPersons.addEventListener(
    "input",
    calculateVisa
  );

}


if (visaExternalHotel) {

  visaExternalHotel.addEventListener(
    "change",
    calculateVisa
  );

}


if (visaForm) {

  visaForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      calculateVisa();


      showToast(
        "Detail visa siap",
        "Silakan periksa rincian harga sebelum melanjutkan pemesanan."
      );

    }
  );


  calculateVisa();

}


/* =========================================================
   18. MUTHAWWIF CALCULATOR
========================================================= */

const muthawwifForm =
  $("#muthawwifForm");

const muthawwifDays =
  $("#muthawwifDays");

const muthawwifTotal =
  $("#muthawwifTotal");


function calculateMuthawwif() {

  if (!muthawwifDays) return;


  let days =
    positiveInteger(
      muthawwifDays.value,
      3
    );


  if (
    days <
    RAHAYU_PRICES.muthawwif.minimumDays
  ) {

    days =
      RAHAYU_PRICES.muthawwif.minimumDays;

    muthawwifDays.value =
      days;


    showToast(
      "Minimum 3 hari",
      "Referensi layanan muthawwif menggunakan minimum pemesanan 3 hari.",
      "warning"
    );

  }


  const total =
    days *
    RAHAYU_PRICES.muthawwif
      .pricePerDay;


  if (muthawwifTotal) {

    muthawwifTotal.textContent =
      formatRupiah(total);

  }

}


if (muthawwifDays) {

  muthawwifDays.addEventListener(
    "input",
    calculateMuthawwif
  );

}


if (muthawwifForm) {

  muthawwifForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      calculateMuthawwif();


      showToast(
        "Estimasi diperbarui",
        "Rincian biaya muthawwif sudah dihitung."
      );

    }
  );


  calculateMuthawwif();

}


/* =========================================================
   19. TRANSPORT ROUTE PRICE
========================================================= */

const transportRoute =
  $("#transportRoute");

const transportPrice =
  $("#transportPrice");


function updateTransportPrice() {

  if (
    !transportRoute ||
    !transportPrice
  ) {
    return;
  }


  const route =
    RAHAYU_PRICES.transport.routes[
      transportRoute.value
    ];


  if (!route) {

    transportPrice.textContent =
      "Pilih rute";

    return;

  }


  transportPrice.textContent =
    formatRupiah(
      route.startingPrice
    );

}


if (transportRoute) {

  transportRoute.addEventListener(
    "change",
    updateTransportPrice
  );


  updateTransportPrice();

}


/* =========================================================
   20. ORDER TRACKING
========================================================= */

const orderTrackingForm =
  $("#orderTrackingForm");

const orderNumber =
  $("#orderNumber");

const orderResult =
  $("#orderResult");


/*
  Ini masih demo lokal.

  Nanti dapat diganti database sebenarnya
  seperti Supabase/Firebase/backend.
*/

const DEMO_ORDERS = {

  "RHY-VISA-001": {

    service:
      "Visa Umrah",

    customer:
      "Jamaah Rahayu",

    status:
      "Sedang diproses"

  },


  "RHY-TR-001": {

    service:
      "Transportasi",

    customer:
      "Jamaah Rahayu",

    status:
      "Terkonfirmasi"

  },


  "RHY-HTL-001": {

    service:
      "Hotel",

    customer:
      "Jamaah Rahayu",

    status:
      "Menunggu konfirmasi"

  }

};


function trackOrder() {

  if (!orderNumber) return;


  const number =
    orderNumber.value
      .trim()
      .toUpperCase();


  if (!number) {

    showToast(
      "Masukkan nomor pesanan",
      "Nomor pesanan tidak boleh kosong.",
      "warning"
    );

    orderNumber.focus();

    return;

  }


  const order =
    DEMO_ORDERS[number];


  if (!order) {

    if (orderResult) {

      orderResult.innerHTML = `

        <div
          style="
            padding:18px;
            border:1px solid #eadede;
            border-radius:10px;
            background:#fffafa;
          "
        >

          <strong
            style="
              display:block;
              margin-bottom:5px;
              color:#a84b4b;
              font-size:11px;
            "
          >
            Pesanan tidak ditemukan
          </strong>

          <span
            style="
              color:#7b6969;
              font-size:9px;
            "
          >
            Periksa kembali nomor pesanan
            ${number}.
          </span>

        </div>

      `;

    }


    return;

  }


  if (orderResult) {

    orderResult.innerHTML = `

      <div
        style="
          padding:18px;
          border:1px solid #dbeae6;
          border-radius:10px;
          background:#f8fcfb;
        "
      >

        <span
          style="
            display:block;
            margin-bottom:5px;
            color:#647174;
            font-size:8px;
          "
        >
          ${number}
        </span>


        <strong
          style="
            display:block;
            margin-bottom:4px;
            color:#08665d;
            font-size:13px;
          "
        >
          ${order.status}
        </strong>


        <span
          style="
            color:#647174;
            font-size:9px;
          "
        >
          ${order.service}
        </span>

      </div>

    `;

  }

}


if (orderTrackingForm) {

  orderTrackingForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      trackOrder();

    }
  );

}


/* =========================================================
   21. EXTERNAL LINKS
========================================================= */

$$('a[target="_blank"]').forEach(
  (link) => {

    if (!link.rel) {

      link.rel =
        "noopener noreferrer";

    }

  }
);


/* =========================================================
   22. INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "%c RAHAYU ",
      "background:#08665d;color:white;padding:7px 12px;border-radius:5px;font-weight:700;"
    );

    console.log(
      "Rahayu Umrah Services loaded."
    );

  }
);
