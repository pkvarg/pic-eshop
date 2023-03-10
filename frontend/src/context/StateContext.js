import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)
  const [chatButton, setChatButton] = useState(true)
  const [roomNumbers, setRoomNumbers] = useState('')

  let foundProduct
  let index

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    )

    setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity)
    let price
    product.discount
      ? (price = product.discountedPrice)
      : (price = product.price)

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} x ${product.name} bol vložený do košíka.`)
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)
    let foundProductPrice
    product.discount
      ? (foundProductPrice = foundProduct.discountedPrice)
      : (foundProductPrice = foundProduct.price)

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProductPrice * foundProduct.quantity
    )

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    )
    setCartItems(newCartItems)
  }

  const toggleCartItemQuanitity = (product, value) => {
    const id = product._id
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)

    let foundProductPrice
    product.discount
      ? (foundProductPrice = foundProduct.discountedPrice)
      : (foundProductPrice = foundProduct.price)

    const newCardItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: product.quantity + 1 } : item
    )

    if (value === 'inc') {
      newCardItems.map(
        (item) => item._id === id && (item.quantity = foundProduct.quantity + 1)
      )
      setCartItems([...newCardItems])

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProductPrice)

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        newCardItems.map(
          (item) =>
            item._id === id && (item.quantity = foundProduct.quantity - 1)
        )
        setCartItems([...newCardItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProductPrice)

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  useEffect(() => {
    const LocalStorageCartItems = window.localStorage.getItem('cartItems')
    if (LocalStorageCartItems !== null)
      setCartItems(JSON.parse(LocalStorageCartItems))
    const LocalStorageTotalQuantities =
      window.localStorage.getItem('totalQuantities')
    if (LocalStorageTotalQuantities !== null)
      setTotalQuantities(JSON.parse(LocalStorageTotalQuantities))
    const LocalStorageTotalPrice = window.localStorage.getItem('totalPrice')
    if (LocalStorageTotalPrice !== null)
      setTotalPrice(JSON.parse(LocalStorageTotalPrice))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
    window.localStorage.setItem(
      'totalQuantities',
      JSON.stringify(totalQuantities)
    )
    window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
  }, [cartItems, totalQuantities, totalPrice])

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        chatButton,
        setChatButton,
        roomNumbers,
        setRoomNumbers,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
