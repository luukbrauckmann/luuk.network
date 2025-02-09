class Filter extends HTMLElement {
  formElement: HTMLFormElement | null = null;

  onSubmit(event: SubmitEvent) {
    const target = event.target as HTMLFormElement;

    const getData = async () => {
      try {
        const response = await fetch(target.action);
        const { data } = await response.json();

        this.dispatchEvent(
          new CustomEvent("filter", {
            bubbles: true,
            detail: { data },
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    event.preventDefault();
  }

  connectedCallback() {
    this.formElement = this.querySelector("form");

    if (this.formElement) {
      this.formElement.addEventListener("submit", this.onSubmit);
    }
  }

  disconnectedCallback() {
    if (this.formElement) {
      this.formElement.removeEventListener("submit", this.onSubmit);
    }
  }
}

customElements.define("my-filter", Filter);
