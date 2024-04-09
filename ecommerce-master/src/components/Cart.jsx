import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add, remove, totalPrice } from "../store/cartSlice";
import axios from "axios";
const Cart = () => {
  const [cartItems, setCartItems] = useState(getFromLocalStorage());
  const [isCartActive, setIsCartActive] = useState(false);
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  let price = useSelector(totalPrice);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartHeight, setCartHeight] = useState();
  

  useEffect(()=>{
    setUserName( localStorage.getItem('user'));
    console.log(username);
    setCartPrice(price);
   
    

   

  }, [])

  async function buynowBtn () {
    if(cartItems.length <= 0){ alert ("please add a product to the cart");
      return;
  }
    console.log(cartItems);
    for(let i=0 ;i < cartItems.length; i++){
      console.log(cartItems[i]);
      
    }
    

    const addProduct = await  axios.post('http://localhost:8081/buyproducts', {
      cartItems : cartItems,
      username : username,
      totalPrice : price
    })
    alert(addProduct.data.message);
    setIsCartActive(false);
    setCartPrice(0);
    localStorage.setItem('cart', '')
    setCartItems('');





  }

  function getFromLocalStorage () {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };
  function saveToLocalStorage(cartItems)  {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  useEffect(() => {
    setCartItems(getFromLocalStorage);
    setCartPrice(price);
    
  }, [items]);

  


  


  function handleRemove(id) {
    const updatedCart = cartItems.filter((item) => item.uniqueId !== id);
    dispatch(remove(id));
    

    saveToLocalStorage(updatedCart);
    console.log(price);
  }
  return (
    <div className="w-[100%]">
      <div  onClick={() => setIsCartActive((prev) => !prev)} className="cursor-pointer">
        Cart : {cartItems && cartItems.length}
      </div>

      <div className=" absolute transition-all delay-500 ease-in-out     ">
        <div className={`    relative right-[70%]  opacity-1 bg-slate-200 shadow-lg    ${isCartActive ? 'h-[550px] overflow-y-scroll p-3 top-10 w-[300px]' : 'top-7  w-[140px]'}    `}>
          {(isCartActive && cartItems) &&
            cartItems.map((product, index) => (
              <div className="  flex  items-center  p-3 border-gray-500" key={index}>
                <div className="flex mt-2 justify-normal items-center">
                  <div className="">
                    <img
                      className="object-contain  w-[100px] h-[100%]"
                      src={product.images[0]}
                      alt="image"
                    />
                  </div>
                  <div className="flex justify-around w-[100%] items-center">
                    <div className="flex justify-end  items-center flex-col">
                      <h3 className="ml-2">{product.title}</h3>
                      <span className="">{product.price}$</span>
                    </div>
                    <div className="">
                      <button
                        onClick={() => handleRemove(product.uniqueId)}
                        className="bg-blue-500 rounded p-1   text-white"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              
            ))}


          <div onClick={()=> setIsCartActive((prev) => !prev)} className=" cursor-pointer mt-3 p-1 border-blue-500  border-2">Total Price : <span className="cursor-pointer"> {cartPrice}$</span></div>
        <button hidden={!isCartActive} onClick={buynowBtn} className="border-2 border-black mt-2 p-2 bg-blue-500 text-white hover:bg-blue-400 ">Buy Now</button>

          
        </div>
      </div>
    </div>
  );
};

export default Cart;
