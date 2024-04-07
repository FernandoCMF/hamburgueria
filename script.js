const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = [];

cartBtn.addEventListener('click', () => {
  updateCartModal()
  cartModal.style.display = 'flex'
})

cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
})

closeModalBtn.addEventListener('click', () => {
  cartModal.style.display = 'none'
})

menu.addEventListener('click', (event) => {
  let parentButton = event.target.closest('.add-to-cart-btn')

  if (parentButton) {
    const name = parentButton.getAttribute('data-name')
    const price = parseFloat(parentButton.getAttribute('data-price'))

    addToCart(name, price)
  }
})

const addToCart = (name, price) => {
  const existingItem = cart.find(items => items.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  } else {

    cart.push({
      name,
      price,
      quantity: 1
    })
  }

  updateCartModal()
}


const updateCartModal = () => {
  cartItemsContainer.innerHTML = ''
  let total = 0;

  cart.forEach(item => {
    const cartItemsElement = document.createElement('div');
    cartItemsElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
    cartItemsElement.innerHTML = `
      <div class='flex items-center justify-between'>
        <div>
          <p class='font-bold'>${item.name}</p>
          <p>Qtd:${item.quantity}</p>
          <p class='font-medium mt-2'>R$:${item.price.toFixed(2)}</p>
        </div>
        <div>
          <button class='remove-from-cart-btn text-red-500' data-name='${item.name}'>
            Remover
          </button>
        </div>
      </div>
    `

    total += item.price * item.quantity
    cartItemsContainer.appendChild(cartItemsElement)
  })

  cartTotal.textContent = total.toLocaleString('pt-BR',{
    style: 'currency',
    currency: 'BRL'
  })

  cartCounter.innerHTML = cart.length
}


cartItemsContainer.addEventListener('click',(event) => {
  if(event.target.classList.contains("remove-from-cart-btn")){
    const name = event.target.getAttribute('data-name')
    removeItemCart(name)
  }
})

const removeItemCart = (name) => {
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1){
    const item = cart[index];
    if(item.quantity > 1){
      item.quantity -= 1
      updateCartModal()
      return
    }

    cart.splice(index, 1)
    updateCartModal()
    
  }
}