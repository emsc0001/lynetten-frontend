export default class Dialog {
  constructor(id) {
    this.dialog = document.createElement("dialog");
    this.dialog.id = id;
    document.querySelector("main").insertAdjacentElement("afterend", this.dialog);
  }

  close() {
    this.dialog.close();
  }

  show() {
    this.dialog.showModal();
  }

  render() {
    const html = this.renderHTML();
    this.dialog.innerHTML = html;
    this.postRender();
  }

  postRender() {
    this.dialog.querySelectorAll("[data-action]").forEach((element) =>
      element.addEventListener("click", (event) => {
        const action = event.target.dataset.action;
        switch (action) {
          case "create":
            this.create();
            break;
          case "submit":
            this.submit();
            break;
          case "update":
            this.update();
            break;
          case "delete":
            this.delete();
            break;
          case "cancel":
          case "close":
            this.close();
            break;
          default:
            console.error("Unknown action: " + action);
        }
      })
    );
  }
}
