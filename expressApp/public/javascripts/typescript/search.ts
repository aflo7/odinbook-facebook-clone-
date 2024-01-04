const searchBox: HTMLElement | null = document.getElementById("search-box")
const divs: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".person-wrapper")

searchBox?.addEventListener("input", (event: Event) => {
    const searchText: string = (
        event.target as HTMLInputElement
    ).value.toLowerCase()

    divs.forEach((div: HTMLDivElement) => {
        const firstChild: HTMLElement | null =
            div.firstElementChild as HTMLDivElement
        if (firstChild) {
            const divText: string = firstChild.textContent?.toLowerCase() ?? ""
            const displayValue: string = divText.includes(searchText)
                ? "flex"
                : "none"
            div.style.display = displayValue
        }
    })
})
