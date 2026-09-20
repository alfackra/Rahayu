/* =========================================================
   RAHAYU HARAMAIN SERVICES
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   1. HELPERS
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   2. FORMAT RUPIAH
========================================================= */

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}


/* =========================================================
   3. FORMAT NUMBER
========================================================= */

function formatNumber(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}


/* =========================================================
   4. CURRENT YEAR
========================================================= */

const currentYear = $("#currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   5. HEADER SCROLL EFFECT
========================================================= */

const header = $("#header");

function handleHeaderScroll() {

  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   6. MOBILE MENU
========================================================= */

const mobileMenuButton = $("#mobileMenuButton");
const mobileMenu = $("#mobileMenu");

if (mobileMenuButton && mobileMenu) {

  mobileMenuButton.addEventListener("click", () => {

    const isOpen =
      mobileMenu.classList.toggle("active");

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

    mobileMenuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

  });

}


/* =========================================================
   7. MOBILE SERVICE SUBMENU
========================================================= */

const mobileServiceButton =
  $("#mobileServiceButton");

const mobileServiceMenu =
  $("#mobileServiceMenu");

if (
  mobileServiceButton &&
  mobileServiceMenu
) {

  mobileServiceButton.addEventListener(
    "click",
    () => {

      mobileServiceMenu.classList.toggle(
        "active"
      );

      const icon =
        mobileServiceButton.querySelector("i");

      if (icon) {

        if (
          mobileServiceMenu.classList.contains(
            "active"
          )
        ) {

          icon.style.transform =
            "rotate(180deg)";

        } else {

          icon.style.transform =
            "rotate(0deg)";

        }

      }

    }
  );

}


/* =========================================================
   8. CLOSE MOBILE MENU AFTER CLICK
========================================================= */

if (mobileMenu) {

  const mobileLinks =
    $$("a", mobileMenu);

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

      document.body.classList.remove(
        "menu-open"
      );

      if (mobileMenuButton) {

        mobileMenuButton.innerHTML =
          '<i class="fa-solid fa-bars"></i>';

      }

    });

  });

}


/* =========================================================
   9. CLOSE MOBILE MENU WHEN RESIZED
========================================================= */

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 1100 &&
    mobileMenu
  ) {

    mobileMenu.classList.remove("active");

    document.body.classList.remove(
      "menu-open"
    );

    if (mobileMenuButton) {

      mobileMenuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

    }

  }

});


/* =========================================================
   10. SMOOTH SCROLL
========================================================= */

const anchorLinks =
  $$('a[href^="#"]');

anchorLinks.forEach((link) => {

  link.addEventListener(
    "click",
    function (event) {

      const targetID =
        this.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetID);

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
   11. ACTIVE NAVIGATION
========================================================= */

const sections =
  $$("section[id]");

const navigationLinks =
  $$(".desktop-nav a[href^='#']");

function updateActiveNavigation() {

  let currentSection = "";

  const scrollPosition =
    window.scrollY + 180;

  sections.forEach((section) => {

    const top =
      section.offsetTop;

    const height =
      section.offsetHeight;

    if (
      scrollPosition >= top &&
      scrollPosition <
        top + height
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });

  navigationLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  updateActiveNavigation
);


/* =========================================================
   12. FAQ ACCORDION
========================================================= */

const faqItems =
  $$(".faq-item");

faqItems.forEach((item) => {

  const button =
    $(".faq-question", item);

  if (!button) return;

  button.addEventListener(
    "click",
    () => {

      const alreadyOpen =
        item.classList.contains("active");

      /*
       Tutup semua FAQ terlebih dahulu.
      */

      faqItems.forEach(
        (otherItem) => {

          otherItem.classList.remove(
            "active"
          );

        }
      );

      /*
       Jika sebelumnya belum terbuka,
       buka item yang diklik.
      */

      if (!alreadyOpen) {

        item.classList.add("active");

      }

    }
  );

});


/* =========================================================
   13. CALCULATOR CHECKBOX UI
========================================================= */

const checkCards =
  $$(".check-card");

checkCards.forEach((card) => {

  const checkbox =
    $('input[type="checkbox"]', card);

  if (!checkbox) return;

  function updateCheckCard() {

    card.classList.toggle(
      "active",
      checkbox.checked
    );

  }

  checkbox.addEventListener(
    "change",
    updateCheckCard
  );

  updateCheckCard();

});


/* =========================================================
   14. RAHAYU PRICE CONFIGURATION
========================================================= */

/*
   =====================================================
   HARGA SEMENTARA

   Semua nominal menggunakan RUPIAH.

   Nanti bagian ini paling mudah kita ubah
   sesuai harga asli Rahayu.

   Struktur:

   VISA
   Harga per jamaah.

   HOTEL
   Estimasi per jamaah / malam.

   TRANSPORT
   Estimasi per kendaraan / layanan.

   MUTHAWWIF
   Estimasi per hari / grup.
   =====================================================
*/

const RAHAYU_PRICES = {

  visa: {
    pricePerPerson: 2300000
  },

  hotel: {
    pricePerPersonPerNight: 650000
  },

  transport: {
    basePrice: 3500000,

    capacity: 40
  },

  muthawwif: {
    pricePerDay: 1300000,

    days: 2
  }

};


/* =========================================================
   15. CALCULATOR ELEMENTS
========================================================= */

const calculator =
  $("#umrahCalculator");

const jamaahCount =
  $("#jamaahCount");

const duration =
  $("#duration");

const calcVisa =
  $("#calcVisa");

const calcHotel =
  $("#calcHotel");

const calcTransport =
  $("#calcTransport");

const calcGuide =
  $("#calcGuide");

const calculateButton =
  $("#calculateButton");

const calculatorResult =
  $("#calculatorResult");

const estimatedPrice =
  $("#estimatedPrice");

const resultDetails =
  $("#resultDetails");


/* =========================================================
   16. CALCULATOR FUNCTION
========================================================= */

function calculateUmrahCost() {

  if (
    !jamaahCount ||
    !duration
  ) {
    return;
  }

  let pax =
    parseInt(jamaahCount.value);

  let days =
    parseInt(duration.value);

  /*
   Validasi jumlah jamaah.
  */

  if (
    isNaN(pax) ||
    pax < 1
  ) {

    pax = 1;

    jamaahCount.value = 1;

  }

  if (
    isNaN(days) ||
    days < 1
  ) {

    days = 9;

  }


  /* =====================================================
     TOTAL VARIABLES
  ===================================================== */

  let total = 0;

  let breakdown = [];


  /* =====================================================
     VISA
  ===================================================== */

  if (
    calcVisa &&
    calcVisa.checked
  ) {

    const visaTotal =
      RAHAYU_PRICES.visa.pricePerPerson *
      pax;

    total += visaTotal;

    breakdown.push({

      name: "Visa Umrah",

      description:
        `${pax} jamaah × ${formatRupiah(
          RAHAYU_PRICES.visa.pricePerPerson
        )}`,

      amount: visaTotal

    });

  }


  /* =====================================================
     HOTEL
  ===================================================== */

  if (
    calcHotel &&
    calcHotel.checked
  ) {

    /*
      Asumsi malam = hari - 1
    */

    const nights =
      Math.max(days - 1, 1);

    const hotelTotal =
      RAHAYU_PRICES.hotel
        .pricePerPersonPerNight *
      pax *
      nights;

    total += hotelTotal;

    breakdown.push({

      name: "Hotel",

      description:
        `${pax} jamaah × ${nights} malam`,

      amount: hotelTotal

    });

  }


  /* =====================================================
     TRANSPORT
  ===================================================== */

  if (
    calcTransport &&
    calcTransport.checked
  ) {

    /*
      1 kendaraan maksimal 40 pax.

      Contoh:
      1 - 40 pax = 1 kendaraan
      41 - 80 pax = 2 kendaraan
    */

    const vehicleCount =
      Math.ceil(
        pax /
        RAHAYU_PRICES.transport.capacity
      );

    const transportTotal =
      RAHAYU_PRICES.transport.basePrice *
      vehicleCount;

    total += transportTotal;

    breakdown.push({

      name: "Transportasi",

      description:
        `${vehicleCount} kendaraan / layanan`,

      amount: transportTotal

    });

  }


  /* =====================================================
     MUTHAWWIF
  ===================================================== */

  if (
    calcGuide &&
    calcGuide.checked
  ) {

    const guideTotal =
      RAHAYU_PRICES.muthawwif
        .pricePerDay *
      RAHAYU_PRICES.muthawwif.days;

    total += guideTotal;

    breakdown.push({

      name: "Muthawwif",

      description:
        `${RAHAYU_PRICES.muthawwif.days} hari × ${formatRupiah(
          RAHAYU_PRICES.muthawwif.pricePerDay
        )}`,

      amount: guideTotal

    });

  }


  /* =====================================================
     NOTHING SELECTED
  ===================================================== */

  if (breakdown.length === 0) {

    showToast(
      "Pilih layanan",
      "Silakan pilih minimal satu layanan."
    );

    if (calculatorResult) {

      calculatorResult.classList.remove(
        "show"
      );

    }

    return;

  }


  /* =====================================================
     PRICE PER PERSON
  ===================================================== */

  const perPerson =
    Math.round(total / pax);


  /* =====================================================
     SHOW TOTAL
  ===================================================== */

  if (estimatedPrice) {

    estimatedPrice.textContent =
      formatRupiah(total);

  }


  /* =====================================================
     GENERATE BREAKDOWN
  ===================================================== */

  if (resultDetails) {

    let breakdownHTML = `
      <div class="result-breakdown">
    `;

    breakdown.forEach((item) => {

      breakdownHTML += `

        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            gap:15px;
            padding:7px 0;
          "
        >

          <div>

            <strong
              style="
                display:block;
                color:#082a35;
                font-size:10px;
                margin-bottom:2px;
              "
            >
              ${item.name}
            </strong>

            <span
              style="
                color:#879399;
                font-size:9px;
              "
            >
              ${item.description}
            </span>

          </div>

          <strong
            style="
              color:#082a35;
              font-size:10px;
              white-space:nowrap;
            "
          >
            ${formatRupiah(item.amount)}
          </strong>

        </div>

      `;

    });


    breakdownHTML += `

      <div
        style="
          border-top:1px solid rgba(201,169,110,.25);
          margin-top:8px;
          padding-top:10px;
          display:flex;
          justify-content:space-between;
          gap:10px;
        "
      >

        <span
          style="
            color:#66757c;
            font-size:10px;
          "
        >
          Estimasi / jamaah
        </span>

        <strong
          style="
            color:#a9874f;
            font-size:11px;
          "
        >
          ${formatRupiah(perPerson)}
        </strong>

      </div>

    `;


    breakdownHTML += `
      </div>
    `;


    resultDetails.innerHTML =
      breakdownHTML;

  }


  /* =====================================================
     DISPLAY RESULT
  ===================================================== */

  if (calculatorResult) {

    calculatorResult.classList.add(
      "show"
    );

  }


  /* =====================================================
     SCROLL RESULT INTO VIEW ON MOBILE
  ===================================================== */

  if (
    window.innerWidth < 650 &&
    calculatorResult
  ) {

    setTimeout(() => {

      calculatorResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }, 100);

  }

}


/* =========================================================
   17. CALCULATOR BUTTON
========================================================= */

if (calculateButton) {

  calculateButton.addEventListener(
    "click",
    calculateUmrahCost
  );

}


/* =========================================================
   18. PREVENT CALCULATOR FORM SUBMIT
========================================================= */

if (calculator) {

  calculator.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      calculateUmrahCost();

    }
  );

}


/* =========================================================
   19. ENTER KEY CALCULATOR
========================================================= */

if (jamaahCount) {

  jamaahCount.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        calculateUmrahCost();

      }

    }
  );

}


/* =========================================================
   20. TRACKING
========================================================= */

const trackingNumber =
  $("#trackingNumber");

const trackingButton =
  $("#trackingButton");


/*
  Demo database.

  Nanti ketika website dikembangkan dengan
  database/backend, bagian ini dapat diganti
  dengan Firebase / Supabase / API.
*/

const demoOrders = {

  "RHY-260901": {
    customer: "Jamaah Rahayu",
    service: "Hotel + Transport",
    status: "Diproses"
  },

  "RHY-260902": {
    customer: "Group Rahayu",
    service: "Visa Umrah",
    status: "Selesai"
  },

  "RHY-260903": {
    customer: "Jamaah Indonesia",
    service: "Muthawwif",
    status: "Menunggu Konfirmasi"
  }

};


/* =========================================================
   21. TRACK ORDER FUNCTION
========================================================= */

function trackOrder() {

  if (!trackingNumber) return;

  let orderID =
    trackingNumber.value
      .trim()
      .toUpperCase();

  if (!orderID) {

    showToast(
      "Nomor pesanan kosong",
      "Masukkan nomor pesanan Rahayu."
    );

    trackingNumber.focus();

    return;

  }


  const order =
    demoOrders[orderID];


  if (order) {

    showToast(
      `Status: ${order.status}`,
      `${order.service} • ${orderID}`
    );

  } else {

    showToast(
      "Pesanan belum ditemukan",
      `Nomor ${orderID} tidak ditemukan.`
    );

  }

}


/* =========================================================
   22. TRACKING BUTTON
========================================================= */

if (trackingButton) {

  trackingButton.addEventListener(
    "click",
    trackOrder
  );

}


/* =========================================================
   23. TRACKING ENTER KEY
========================================================= */

if (trackingNumber) {

  trackingNumber.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        trackOrder();

      }

    }
  );

}


/* =========================================================
   24. TOAST SYSTEM
========================================================= */

const toast =
  $("#toast");

const toastTitle =
  $("#toastTitle");

const toastMessage =
  $("#toastMessage");

const toastClose =
  $("#toastClose");

let toastTimer = null;


function showToast(
  title,
  message
) {

  if (
    !toast ||
    !toastTitle ||
    !toastMessage
  ) {
    return;
  }


  toastTitle.textContent =
    title;

  toastMessage.textContent =
    message;


  toast.classList.add("show");


  if (toastTimer) {

    clearTimeout(toastTimer);

  }


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 4500);

}


if (toastClose) {

  toastClose.addEventListener(
    "click",
    () => {

      toast.classList.remove("show");

      if (toastTimer) {

        clearTimeout(toastTimer);

      }

    }
  );

}


/* =========================================================
   25. SCROLL REVEAL
========================================================= */

/*
  Animasi ringan saat section masuk layar.
  Tidak membutuhkan library tambahan.
*/

const revealElements =
  $$(
    ".service-card, " +
    ".destination-card, " +
    ".step-card, " +
    ".why-item, " +
    ".faq-item"
  );


if (
  "IntersectionObserver" in window
) {

  revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform =
      "translateY(18px)";

    element.style.transition =
      "opacity .55s ease, transform .55s ease";

  });


  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

}


/* =========================================================
   26. DESTINATION QUERY PARAMETER
========================================================= */

/*
  Contoh:
  hotel.html?city=makkah

  Fitur ini nanti akan dipakai ketika
  halaman hotel dibuat.
*/

function getQueryParameter(name) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return params.get(name);

}


/* =========================================================
   27. BASIC EXTERNAL LINK SAFETY
========================================================= */

const externalLinks =
  $$('a[target="_blank"]');

externalLinks.forEach((link) => {

  if (
    !link.getAttribute("rel")
  ) {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  }

});


/* =========================================================
   28. WHATSAPP PLACEHOLDER WARNING
========================================================= */

/*
  Karena HTML awal masih menggunakan:

  966XXXXXXXXX

  kode ini mencegah link placeholder
  membuka WhatsApp yang salah.

  Setelah nomor asli dimasukkan,
  tombol otomatis bekerja normal.
*/

const whatsappLinks =
  $$('a[href*="wa.me"]');

whatsappLinks.forEach((link) => {

  const href =
    link.getAttribute("href") || "";

  if (
    href.includes("XXXXXXXXX")
  ) {

    link.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        showToast(
          "WhatsApp belum diatur",
          "Masukkan nomor WhatsApp Rahayu pada index.html."
        );

      }
    );

  }

});


/* =========================================================
   29. CONSOLE
========================================================= */

console.log(
  "%c RAHAYU ",
  "background:#082a35;color:#e3c996;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
);

console.log(
  "Haramain Services website loaded successfully."
);


/* =========================================================
   END OF RAHAYU SCRIPT
========================================================= */
