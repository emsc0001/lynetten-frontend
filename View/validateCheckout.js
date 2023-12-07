
export default function enablePayNowButton() {
    const shippingForm = document.getElementById("shipping-details-form");
    const shippingFormButton = document.getElementById("shipping-details-form-button");
    const paymentForm = document.getElementById("payment-form");
    const payNowButton = document.getElementById("pay-now-button");

    function enablePayNowButton() {
        const shippingFormValid = shippingForm.checkValidity();
        const paymentFormValid = paymentForm.checkValidity();

        if (shippingFormValid) {
            shippingFormButton.removeAttribute("disabled");
        }else {
            shippingFormButton.setAttribute("disabled", "true");
        }

        if (shippingFormValid && paymentFormValid) {
            payNowButton.removeAttribute("disabled");
        } else {
            payNowButton.setAttribute("disabled", "true");
        }
    }

    shippingForm.addEventListener("input", enablePayNowButton);
    paymentForm.addEventListener("input", enablePayNowButton);
}

document.addEventListener("DOMContentLoaded", () => {
    enablePayNowButton();
});