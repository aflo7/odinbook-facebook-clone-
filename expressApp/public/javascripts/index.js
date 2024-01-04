"use strict";
const guestBtn = document.getElementById("guestBtn");
guestBtn === null || guestBtn === void 0 ? void 0 : guestBtn.addEventListener("click", handleGuestLogin);
function handleGuestLogin() {
    if (guestBtn === null) {
        return;
    }
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const loginForm = document.getElementById("loginForm");
    if (loginSubmitBtn === null || loginForm === null) {
        return;
    }
    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "guest";
    hiddenField.value = "true";
    loginForm.appendChild(hiddenField);
    loginForm.submit();
}
