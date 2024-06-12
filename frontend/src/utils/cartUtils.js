export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {

    // Calculate items price (price without tax)
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * 81 * item.qty) / 100, 0);
    console.log("itemsPrice: ", itemsPrice)

    state.itemsPrice = addDecimals(itemsPrice);
    
    // Calculate the tax price
    const taxPrice = 0.19 * (state.cartItems.reduce((acc, item) => acc + (item.price * 100 * item.qty) / 100, 0));
    state.taxPrice = addDecimals(taxPrice);
    console.log("taxPrice: ", taxPrice)

    // Calculate the shipping price 
    const shippingPrice = (itemsPrice + taxPrice) > 100 ? 0 : 4.99;
    state.shippingPrice = addDecimals(shippingPrice);

    // Calculate the total price
    const totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice);
    state.totalPrice = addDecimals(totalPrice);
    console.log("totalPrice: ", taxPrice)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
}