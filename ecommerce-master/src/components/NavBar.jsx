import React from 'react'
import Cart from '../components/Cart'

const NavBar = (props) => {
    
    const {setIsFilterActive, setCategoryActive, setSearchQuery} = props
  return (  
    <>
    <nav className="flex justify-around items-center w-screen h-[60px] border">
        <div className="flex  gap-5 list-none">
            <li onClick={()=>{ setIsFilterActive(""); setSearchQuery("")  ; setCategoryActive("womens-dresses")}} className='cursor-pointer hover:text-red-600    '>
                Home
            </li>
            <li className='cursor-pointer hover:text-red-600 ' onClick={()=>{
                setSearchQuery("")
                setIsFilterActive("")
                setCategoryActive("smartPhones")}}>
                SmartPhones
            </li>
            <li className='cursor-pointer hover:text-red-600 ' onClick={()=>{
                setSearchQuery("")
                setIsFilterActive("")
                setCategoryActive("groceries")}}>
                groceries
            </li>
            <li className='cursor-pointer hover:text-red-600 ' onClick={()=>{
                setSearchQuery("")
                setIsFilterActive("")
                setCategoryActive("home-decoration")}}>
                home-decoration
            </li>
        </div>
        <div className=" ">
           
            <Cart/>
            
        </div>
    </nav>
    
    </>
  )
}

export default NavBar