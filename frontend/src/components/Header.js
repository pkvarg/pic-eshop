import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'
/* Cart as component*/
import Cart from './Cart'
import { useStateContext } from '../context/StateContext'
import { socket } from './../Socket'
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
  removeChatRoom,
} from './../actions/chatActions'

const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }

  const [navbar, setNavbar] = useState(false)

  const { messageReceived } = useSelector((state) => state.adminChat)
  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      var audio = new Audio('/audio/chat-msg.mp3')
      socket.emit(
        'admin connected with server',
        'Admin' + Math.floor(Math.random() * 1000000000000)
      )
      socket.on(
        'server sends message from client to admin',
        ({ user, message }) => {
          console.log('hc:', user, message)

          dispatch(setChatRooms(user, message))
          dispatch(setMessageReceived(true))

          audio.play()
        }
      )
      socket.on('disconnected', ({ reason, socketId }) => {
        console.log(socketId, reason)
        dispatch(removeChatRoom(socketId))
      })
    }

    return () => socket.disconnect()
  }, [dispatch, userInfo])

  return (
    <>
      <div className=''>
        <div className='bg-[#777777] w-full text-white  justify-between px-auto md:items-center md:flex md:px-8 border-b '>
          <a href='/contact' className='text-[1.2rem] hover:text-dark-red'>
            Kontakt
          </a>
          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id='username'
              className='ml-[75%]'
            >
              <LinkContainer to='profile'>
                <NavDropdown.Item>Môj profil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Odhlásiť sa
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login' className='grey-navbar-sign-in'>
              <Nav.Link>
                <i className='fas fa-user'></i> Prihlásenie
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && messageReceived && (
            <span className='absolute right-[2.5%] top-[9px] -translate-y-[50%] p-2 bg-[#cd3049] border border-light rounded-full'></span>
          )}
          {userInfo && userInfo.isAdmin && !userInfo.isAssistant && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Používatelia</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Produkty</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Objednávky</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/chat'>
                <NavDropdown.Item>Chat</NavDropdown.Item>
              </LinkContainer>

              {/* <LinkContainer to='/admin/banner'>
                <NavDropdown.Item>Bannery</NavDropdown.Item>
              </LinkContainer> */}
            </NavDropdown>
          )}
          {userInfo && userInfo.isAssistant && (
            <NavDropdown title='Asistent' id='adminmenu'>
              <LinkContainer to='/admin/audio'>
                <NavDropdown.Item>Audio</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/video'>
                <NavDropdown.Item>Video</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/banner'>
                <NavDropdown.Item>Bannery</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {/* <a href='/login' className='text-[1.2rem] hover:text-dark-red'>
            Prihlásenie
          </a> */}
        </div>
      </div>
      <nav className='bg-[#777777] w-full text-white nav-font'>
        <div className='justify-between px-4 mx-auto lg:max-w-[90%] md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center justify-between py-3 md:py-5 md:block'>
              <div className='flex flex-row items-center justify-center gap-4'>
                <a className='text-[2.05rem]' href='/'>
                  Eshop
                </a>
                <div className='header-search-box'>
                  <SearchBox />
                </div>
                <i className='fa-solid fa-phone text-[25px]'></i>
                <a href='tel:+421900000000'>
                  <p>+421 900 000 000</p>
                </a>
                <i className='fa-solid fa-envelope  text-[25px]'></i>
                <a href='mailto:admin@prud.sk'>
                  <p>info@eshop.sk</p>
                </a>

                <button
                  onClick={() => setShowCart(true)}
                  className='flex flex-row gap-2 relative'
                >
                  <Nav.Link>
                    <i className='fas fa-shopping-cart text-[25px]'></i>
                    <p className='number-in-cart '>
                      <span>{totalQuantities}</span>
                    </p>
                  </Nav.Link>
                </button>

                {showCart && <Cart />}
              </div>

              <div className='md:hidden'>
                <button
                  className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              {/* <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                <li>
                  <a href='/' className='text-[2.05rem] hover:text-dark-red'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='/' className='text-[2.05rem] hover:text-dark-red'>
                    Link 2
                  </a>
                </li>

                <li>
                  <a href='/' className='text-[2.05rem] hover:text-dark-red'>
                    Link 3
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
