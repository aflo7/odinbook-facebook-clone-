"use strict";
const guestBtn = document.getElementById("guestBtn");
guestBtn === null || guestBtn === void 0 ? void 0 : guestBtn.addEventListener('click', handleGuestLogin);
function handleGuestLogin() {
    if (guestBtn === null) {
        return;
    }
    const loginUsernameInput = document.getElementById("loginUsernameInput");
    const loginPasswordInput = document.getElementById("loginPasswordInput");
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    if (loginUsernameInput === null ||
        loginPasswordInput === null ||
        loginSubmitBtn === null) {
        return;
    }
    loginUsernameInput.value = "guest";
    loginPasswordInput.value = "pass";
    loginSubmitBtn.click();
}
