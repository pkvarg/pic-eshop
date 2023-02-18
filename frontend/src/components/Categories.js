import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'

const Categories = () => {
  return (
    <div className='flex flex-col border relative'>
      <div className='flex flex-row items-center justify-between border-b border-grey'>
        <a
          className='text-[25px] font-[500] text-black  py-2 px-6 cat-link'
          href='/'
        >
          Kategória a podkategórie
        </a>
        <NavDropdown className='text-[35px] home-categs'>
          <LinkContainer to='/'>
            <NavDropdown.Item>Podkategória</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/'>
            <NavDropdown.Item>Podkategória</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/'>
            <NavDropdown.Item>Podkategória</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </div>
      <a
        className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
        href='/'
      >
        Kategória druhá
      </a>
      <a
        className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
        href='/'
      >
        Kategória tretia
      </a>
      <a
        className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
        href='/'
      >
        Kategória štvrtá
      </a>
      <a
        className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
        href='/'
      >
        Kategória prvá
      </a>
    </div>
  )
}

export default Categories
