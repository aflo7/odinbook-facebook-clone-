const guestBtn = document.getElementById("guestBtn") as HTMLButtonElement | null
guestBtn?.addEventListener("click", handleGuestLogin)

function handleGuestLogin() {
    if (guestBtn === null) {
        return
    }

    const loginSubmitBtn = document.getElementById(
        "loginSubmitBtn"
    ) as HTMLInputElement | null
    const loginForm = document.getElementById(
        "loginForm"
    ) as HTMLFormElement | null

    if (loginSubmitBtn === null || loginForm === null) {
        return
    }

    const hiddenField = document.createElement("input")
    hiddenField.type = "hidden"
    hiddenField.name = "guest"
    hiddenField.value = "true"
    loginForm.appendChild(hiddenField)
    loginForm.submit()
}
