export default class ItemRenderer {
    constructor(item) {
        this.item = item;
    }

    // Render the item
    render() {
        return `<li>${this.item}</li>`;
    }

    // Render the item and append it to the element
    rerender(element) {
        // Find the index of the element within its parent's children
        const children = element.parentElement.children;
        let index = 0;
        while (index < children.length && children[index] !== element) {
            index++;
        }

        // Replace the element's outerHTML with the updated rendering

        element.outerHTML = this.render();

        // Get the new element
        const newElement = children.item(index);
        if (this.postRender) {
            this.postRender(newElement);
        }
    }
}
