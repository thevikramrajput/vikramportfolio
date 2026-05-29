/**
 * ============================================
 * CONTACT FORM HANDLER — WhatsApp Redirect
 * Cyberpunk Validation & Transition Actions
 * ============================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const contactName = document.getElementById("contact-name");
  const contactEmail = document.getElementById("contact-email");
  const contactMessage = document.getElementById("contact-message");
  const contactSubmit = document.getElementById("contact-submit");

  if (!contactForm) return;

  // Add HTML5 novalidate to suppress default browser alert popups
  contactForm.setAttribute("novalidate", "true");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Clear previous error states
    clearErrors();

    // 2. Extract values and perform validation
    const nameVal = contactName.value.trim();
    const emailVal = contactEmail.value.trim();
    const messageVal = contactMessage.value.trim();

    let hasErrors = false;

    // Validate Name
    if (nameVal === "") {
      showError(contactName, "[ERR] IDENTITY_REQUIRED");
      hasErrors = true;
    }

    // Validate Email
    if (emailVal === "") {
      showError(contactEmail, "[ERR] COMMS_CHANNEL_REQUIRED");
      hasErrors = true;
    } else if (!isValidEmail(emailVal)) {
      showError(contactEmail, "[ERR] INVALID_CHANNEL_ADDRESS");
      hasErrors = true;
    }

    // Validate Message
    if (messageVal === "") {
      showError(contactMessage, "[ERR] TRANSMISSION_REQUIRED");
      hasErrors = true;
    }

    // 3. Stop submission if validation fails
    if (hasErrors) return;

    // 4. Successful validation: Disable button, show processing, redirect to WhatsApp
    contactSubmit.disabled = true;
    contactSubmit.textContent = "SENDING_TRANSMISSION...";

    // Generate formatted message exactly as expected
    const formattedMessage = `Hello Vikram,

I'm ${nameVal}
Email: ${emailVal}

${messageVal}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/919817010712?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset Form Fields and Button State after redirect
    setTimeout(() => {
      contactForm.reset();
      contactSubmit.disabled = false;
      contactSubmit.textContent = "SEND_MESSAGE";
    }, 1500);
  });

  // Helper function to validate email addresses via regular expression
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to display custom cyberpunk inline error messages
  function showError(inputElement, errorMessageText) {
    inputElement.classList.add("is-invalid");

    const errorContainer = document.createElement("span");
    errorContainer.className = "contact__error-message";
    errorContainer.textContent = errorMessageText;

    // Append error container to the parent .contact__field container
    const parentField = inputElement.closest(".contact__field");
    if (parentField) {
      parentField.appendChild(errorContainer);
    }
  }

  // Helper function to remove all inline error messages and invalid classes
  function clearErrors() {
    const invalidInputs = contactForm.querySelectorAll(".is-invalid");
    invalidInputs.forEach((input) => input.classList.remove("is-invalid"));

    const errorMessages = contactForm.querySelectorAll(".contact__error-message");
    errorMessages.forEach((msg) => msg.remove());
  }

  // ── High-Tech View Counter (Dynamic API + Local Fallback) ──
  const viewCounter = document.getElementById("view-counter");
  if (viewCounter) {
    const namespace = "thevikramrajput";
    const key = "portfolio_views";
    const fallbackBase = 1432; // Realistic baseline views starting count
    
    // Calculate local fallback increment
    let localViews = localStorage.getItem("vm_views_fallback");
    if (!localViews) {
      localViews = fallbackBase;
    } else {
      localViews = parseInt(localViews) + 1;
    }
    localStorage.setItem("vm_views_fallback", localViews);

    // Helper to format with leading zeros for terminal HUD look
    const formatCount = (num) => String(num).padStart(6, '0');

    // Fetch and increment from free public CounterAPI
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then(res => {
        if (!res.ok) throw new Error("API Offline");
        return res.json();
      })
      .then(data => {
        const count = data.value !== undefined ? data.value : (data.count !== undefined ? data.count : localViews);
        viewCounter.textContent = formatCount(count);
      })
      .catch(err => {
        // Fallback to local incremental baseline if API is offline or blocked by adblockers
        viewCounter.textContent = formatCount(localViews);
      });
  }
});
