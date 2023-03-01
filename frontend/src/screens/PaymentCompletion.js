import React, { useEffect } from 'react'
import { useStateContext } from '../context/StateContext'

const PaymentCompletion = () => {
  const {
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    cartItems,
    setCartItems,
  } = useStateContext()

  useEffect(() => {
    setCartItems([])
    setTotalQuantities(0)
  }, [])

  return (
    <div className='h-[37.5vh] text-[30px] mt-[15%] text-center'>
      <h1>Platba bola uspešná! 🎉 Ďakujeme!</h1>
      <h2 className='mt-2'>Očakávajte potvrdzujúci email.</h2>
    </div>
  )
}

export default PaymentCompletion
