export default {
  AddCounter(state, payload) {
    payload.count += 1
  },
  AddToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
  
}