class DataList extends HTMLElement {
  listElement: HTMLUListElement | null = null;

  onFilter(event: CustomEvent) {
    const { data } = event.detail;
    const listItems = data.map((item) => {
      const liElement = document.createElement("li");
      liElement.textContent = item.title;
      return liElement;
    });

    this.listElement?.replaceChildren(...listItems);
  }

  connectedCallback() {
    this.listElement = this.querySelector("ul");

    this.addEventListener("filter", this.onFilter);
  }

  disconnectedCallback() {
    this.removeEventListener("filter", this.onFilter);
  }
}

customElements.define("my-data-list", DataList);
