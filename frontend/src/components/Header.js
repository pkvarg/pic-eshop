import React, { useState } from 'react'

const Header = () => {
  const [navbar, setNavbar] = useState(false)

  return (
    <>
      <div className=''>
        <div className='bg-[#777777] w-full text-white  justify-between px-auto md:items-center md:flex md:px-8 border-b '>
          <a href='/contact' className='text-[1.2rem] hover:text-dark-red'>
            Kontakt
          </a>
          <a href='/login' className='text-[1.2rem] hover:text-dark-red'>
            Prihlásenie
          </a>
        </div>
      </div>
      <nav className='bg-[#777777] w-full text-white nav-font'>
        <div className='justify-between px-4 mx-auto lg:max-w-[90%] md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center justify-between py-3 md:py-5 md:block'>
              <a className='text-[2.05rem]' href='/'>
                Eshop
              </a>
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
              <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
