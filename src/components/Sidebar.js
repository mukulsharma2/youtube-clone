import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  
  if(!isMenuOpen) {
    return null;
  }

  return (
    <>
    <div className='bg-white border border-black min-w-[150px] h-screen'>
      <ul>
        <li className='font-bold'>
          <Link to="/">
            Home
            </Link>
        </li>
        <li>Trending</li>
        <li>Music</li>
        <li>Sports</li>
        <li>Movies</li>
      </ul>
    </div>
    </>
  )
}

export default Sidebar
