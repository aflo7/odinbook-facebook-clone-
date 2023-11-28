"use strict";
const searchBox = document.getElementById("search-box");
const divs = document.querySelectorAll(".person-wrapper");
searchBox === null || searchBox === void 0 ? void 0 : searchBox.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    divs.forEach((div) => {
        var _a, _b;
        const firstChild = div.firstElementChild;
        if (firstChild) {
            const divText = (_b = (_a = firstChild.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
            const displayValue = divText.includes(searchText)
                ? "flex"
                : "none";
            div.style.display = displayValue;
        }
    });
});
