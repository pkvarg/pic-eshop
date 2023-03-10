import React from 'react'
import { useStateContext } from '../context/StateContext'

const Footer = () => {
  const { chatButton, setChatButton } = useStateContext()

  return (
    <div className='bg-hero-grey flex flex-col lg:flex-row  gap-4 justify-around items-center h-[10rem]'>
      <div className=''>Info</div>
      <div className=''>Linky</div>
      <div className=''>Kontakt</div>
      <button
        className={chatButton ? 'chatButton' : 'Socket-none'}
        onClick={() => setChatButton(false)}
      >
        Chat
      </button>
    </div>
  )
}

export default Footer
