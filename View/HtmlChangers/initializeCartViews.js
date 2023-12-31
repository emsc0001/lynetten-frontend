import ListRenderer from "../Renderer/ListRenderer.js";
import ProductCartRenderer from "../Renderer/ProductCartRenderer.js";
import { cart } from "../../main.js";

let cartList = null;

//Initiliaze views the cart for products.html, koebeguide.html, handelsBetingelser and index.html
function initializeCartView() {
    if (cart.length > 0) {
        cartList = new ListRenderer(cart, ".cart-items", ProductCartRenderer);
        cartList.render();
    } else {
        document.querySelector(".cart-items").innerHTML = "<p>Der er ingen varer i din kurv</p>";
    }
    const totalPriceSection = new ProductCartRenderer().renderTotalPriceCart();
    document.querySelector(".cart-total-container").innerHTML = totalPriceSection;
}

//Initiliaze views the cart for kurv.html
async function initializeCartHtmlView() {
    if (cart.length > 0) {
        cartList = new ListRenderer(cart, ".cart-items", ProductCartRenderer);
        cartList.render();
    } else {
        document.querySelector(".cart-items").innerHTML = "<p>Der er ingen varer i din kurv</p>";
    }

    const totalPriceSection = new ProductCartRenderer().renderTotalPriceCartHtml();
    document.querySelector(".cart-summary").innerHTML = totalPriceSection;

    if (cart.length > 0) {
        const recommendationSection = await new ProductCartRenderer().renderRecomendationCartHtml(cart);
        document.querySelector("#recommended-items").innerHTML = recommendationSection;
    
            const renderer = new ProductCartRenderer(); // Create an instance
            renderer.addRecommendedItemsListeners();
        
    }
}

export { initializeCartView, initializeCartHtmlView };