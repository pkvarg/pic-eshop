import React from 'react'
import { useStateContext } from '../context/StateContext'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const { chatButton, setChatButton } = useStateContext()

  const location = useLocation()

  return (
    location.pathname !== '/admin/chat' && (
      <div className='bg-hero-grey flex flex-col lg:flex-row  gap-4 justify-around items-center h-[10rem]'>
        <div className=''>Info</div>
        <div className=''>Linky</div>
        <div className=''>Kontakt</div>
        {/* <button
        className={chatButton ? 'chatButton' : 'Socket-none'}
        onClick={() => setChatButton(false)}
      >
        Chat
      </button> */}
      </div>
    )
  )
}

export default Footer
