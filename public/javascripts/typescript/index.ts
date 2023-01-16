const guestBtn = document.getElementById("guestBtn") as HTMLButtonElement | null
guestBtn?.addEventListener('click', handleGuestLogin)
function handleGuestLogin() {
  if (guestBtn === null) {
    return
  }

  const loginUsernameInput = document.getElementById(
    "loginUsernameInput"
  ) as HTMLInputElement | null
  const loginPasswordInput = document.getElementById(
    "loginPasswordInput"
  ) as HTMLInputElement | null
  const loginSubmitBtn = document.getElementById(
    "loginSubmitBtn"
  ) as HTMLInputElement | null

  if (
    loginUsernameInput === null ||
    loginPasswordInput === null ||
    loginSubmitBtn === null
  ) {
    return
  }
  loginUsernameInput.value = "guest"
  loginPasswordInput.value = "pass"
  loginSubmitBtn.click()
}
