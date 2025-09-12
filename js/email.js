emailjs.init("mKT9MRTWXg1bnih7o");

const CLOUD_NAME = "dlsoltptu";
const UPLOAD_PRESET = "jew8g2as";

async function uploadImage(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");
  const data = await response.json();
  return data.secure_url;
}

function collectFormData(formId) {
  const formData = {};
  document
    .querySelectorAll(
      `#${formId} input, #${formId} select, #${formId} textarea`
    )
    .forEach((el) => {
      if (
        el.type !== "hidden" &&
        el.type !== "file" &&
        el.type !== "button" &&
        el.type !== "submit"
      ) {
        formData[el.name] = el.value || "N/A";
      }
    });
  return formData;
}

const combinedForm = document.getElementById("buySellForm");
if (combinedForm) {
  combinedForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = collectFormData("buySellForm");
    const fileInput = combinedForm.querySelector(
      'input[name="vehicle_images"]'
    );
    const files = fileInput ? fileInput.files : [];

    let uploadedUrls = [];
    if (files.length > 0) {
      for (let file of files) {
        try {
          const url = await uploadImage(file);
          uploadedUrls.push(url);
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      }
    }

    emailjs
      .send("service_ra7yuxf", "template_sa69ofg", {
        ...formData,
        vehicle_images:
          uploadedUrls.length > 0
            ? uploadedUrls
                .map((url) => `<a href="${url}" target="_blank">${url}</a>`)
                .join("<br>")
            : "No images uploaded",
        reply_to: formData.email,
      })
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("✅ Form submitted successfully!");
        combinedForm.reset();
      })
      .catch((err) => {
        console.error("EmailJS failed", err);
        alert("❌ Something went wrong. Please try again.");
      });
  });
}
