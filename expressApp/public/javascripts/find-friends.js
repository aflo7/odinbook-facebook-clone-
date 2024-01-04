"use strict";
function followUser(userIdToFollow) {
    const buttons = document.getElementsByClassName("followbtn");
    for (let i = 0; i < buttons.length; i++) {
        ;
        buttons[i].disabled = true;
    }
    const data = { userIdToFollow };
    fetch(`http://localhost:5000/users/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 200) {
            for (let i = 0; i < buttons.length; i++) {
                ;
                buttons[i].disabled = false;
            }
            location.reload();
        }
        else {
            for (let i = 0; i < buttons.length; i++) {
                ;
                buttons[i].disabled = false;
            }
            alert("There was an error");
        }
    });
}
