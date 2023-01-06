function followUser(userIdToFollow: string) {
  const buttons = document.getElementsByClassName("followbtn")

  for (let i = 0; i < buttons.length; i++) {
    ;(buttons[i] as HTMLButtonElement).disabled = true
  }

  const data = { userIdToFollow }

  fetch(`http://localhost:5000/users/follow`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {

    if (response.status === 200) {
      for (let i = 0; i < buttons.length; i++) {
        ;(buttons[i] as HTMLButtonElement).disabled = false
      }

      location.reload()
    } else {
      for (let i = 0; i < buttons.length; i++) {
        ;(buttons[i] as HTMLButtonElement).disabled = false
      }
      alert("There was an error")
    }
  })
}
