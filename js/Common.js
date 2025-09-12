function openForm() {
  document.getElementById("formSpace").style.display = "block";
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeForm() {
  document.getElementById("formSpace").style.display = "none";
  document.body.style.overflow = "auto"; // restore background scroll
}

//    <!-- logic for when we click book AN Appointment it shows the form -->

// const openFormBtn = document.getElementById("openFormBtn");
const formSpace = document.getElementById("formSpace");

// openFormBtn.addEventListener("click", function () {
//   formSpace.style.display = "block";
// });

window.onclick = function (event) {
  console.log(event.target);
  if (event.target == formSpace) {
    formSpace.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[type="radio"]');
  const formSpace = document.getElementById("formSpace");

  const buySellForm = document.getElementById("buySellForm");
  const servicesDetails = document.getElementById("serviceDetails");
  const doorStepFields = document.getElementById("doorfiels");
  const otherFields = document.querySelectorAll(".otherFields");

  const buyFields = document.getElementById("buyFields");
  const sellFields = document.getElementById("sellFields");

  // Hide everything on start
  if (doorStepFields) doorStepFields.style.display = "none";
  if (servicesDetails) servicesDetails.style.display = "none";
  if (buySellForm) buySellForm.style.display = "none";
  if (buyFields) buyFields.classList.add("d-none");
  if (sellFields) sellFields.classList.add("d-none");

  // Radio button toggle
  radios.forEach((radio) => {
    radio.addEventListener("change", function (event) {
      document
        .querySelectorAll("#formSpace form")
        .forEach((form) => (form.style.display = "none"));

      if (this.value === "buy") {
        // Show Buy/Sell container
        if (buySellForm) buySellForm.style.display = "block";

        // Hide services
        if (servicesDetails) servicesDetails.style.display = "none";
        if (doorStepFields) doorStepFields.style.display = "none";

        otherFields.forEach((field) => (field.style.display = "block"));

        // Decide Buy / Sell fields
        toggleTransactionFields();
        toggleRequired();
      } else if (this.value === "services") {
        // Show services container
        if (servicesDetails) servicesDetails.style.display = "block";

        // Keep form container visible
        if (buySellForm) buySellForm.style.display = "block";

        // Hide buy/sell specific fields
        if (buyFields) buyFields.classList.add("d-none");
        if (sellFields) sellFields.classList.add("d-none");

        otherFields.forEach((field) => (field.style.display = "none"));

        // Run service type toggle
        toggleDoorStepSeviceField();
        toggleRequired();
      }
    });
  });

  // Auto-trigger default selection
  if (radios.length > 0 && radios[0].checked) {
    radios[0].dispatchEvent(new Event("change"));
  }

  // Attach service type change event
  const serviceTypeSelect = document.getElementById("service-type");
  if (serviceTypeSelect) {
    serviceTypeSelect.addEventListener("change", toggleDoorStepSeviceField);
  }
});

// Toggle Buy / Sell fields
function toggleTransactionFields() {
  const transactionType = document.getElementById("transactionType").value;
  const buyFields = document.getElementById("buyFields");
  const sellFields = document.getElementById("sellFields");

  if (!buyFields || !sellFields) return;

  buyFields.classList.add("d-none");
  sellFields.classList.add("d-none");
  toggleRequired();

  if (transactionType === "buy") {
    buyFields.classList.remove("d-none");
  } else if (transactionType === "sell") {
    sellFields.classList.remove("d-none");
    toggleRequired();
  }
}

// Toggle Doorstep service fields
function toggleDoorStepSeviceField() {
  const serviceType = document.getElementById("service-type").value;
  const doorStepFields = document.getElementById("doorfiels");
  const otherFields = document.querySelectorAll(".otherFields");
  const buyFields = document.getElementById("buyFields");
  const sellFields = document.getElementById("sellFields");

  if (!doorStepFields) return;

  if (serviceType === "Door Step Services(pickup and drop)") {
    doorStepFields.style.display = "block";
    otherFields.forEach((field) => (field.style.display = "none"));
    if (buyFields) buyFields.classList.add("d-none");
    if (sellFields) sellFields.classList.add("d-none");
    toggleRequired();
  } else if (
    serviceType === "Regular service" ||
    serviceType === "Inspection" ||
    serviceType === "Repair"
  ) {
    doorStepFields.style.display = "none";
    otherFields.forEach((field) => (field.style.display = "block"));
    if (buyFields) buyFields.classList.add("d-none");
    if (sellFields) sellFields.classList.add("d-none");
    toggleRequired();
  } else {
    doorStepFields.style.display = "none";
    otherFields.forEach((field) => (field.style.display = "none"));
    if (buyFields) buyFields.classList.add("d-none");
    if (sellFields) sellFields.classList.add("d-none");
    toggleRequired();
  }
}

// Initialize the form fields based on default selection
document.addEventListener("DOMContentLoaded", function () {
  toggleTransactionFields();
});

//  <!-- Required fields logic -->

function toggleRequired() {
  // Only set required for visible fields
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    if (field.offsetParent !== null) {
      field.setAttribute("required", "required");
    } else {
      field.removeAttribute("required");
    }
  });
}

formContainer = document.getElementsByClassName("form-container");
function formOpen() {
  document.getElementById("formSpace").style.display = "block";
  document.body.classList.add(formContainer);
}

function formClose() {
  document.getElementById("formSpace").style.display = "none";
  document.body.classList.remove(formContainer);
}
