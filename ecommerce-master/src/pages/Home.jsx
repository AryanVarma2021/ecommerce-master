import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Product from "../components/Product";
import "../App.css";
import NavBar from "../components/NavBar";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const dispatch = useDispatch();
  const [coo, setcoo] = useState("");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryActive, setCategoryActive] = useState("");
  const [isFilterActive, setIsFilterActive] = useState("");

  function saveToLocalStorage(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  function getFromLocalStorage()  {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const fetchData = async (url = "") => {
    try {
      
      
      if (url == "" && categoryActive == "") {
        url = `https://dummyjson.com/products`;
      } else if (searchQuery !== "") {
      } else {
        url = `https://dummyjson.com/products/category/${categoryActive}`;
      }
      

      const response = await fetch(url);
      console.log(url);
      const data = await response.json();
      setProducts(data.products);

      
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    } 
  };

  useEffect(() => {
    const co = Cookies.get("token");
    setcoo(co);
    console.log(isFilterActive);

    fetchData();
    
  }, [categoryActive]);

  function search() {
    let url = `https://dummyjson.com/products/search?q=${searchQuery.substring(0,5)}`;
    fetchData(url);
  }
  let originalProductList;
  function handleFilter() {
    console.log("Click");
    setIsFilterActive((prev) => {
      if (prev === "") {
        return "border-blue-600 border-2";
      } else {
        return "";
      }
    });

    if (isFilterActive === "") {
      setProducts((prevProducts) => {
        originalProductList = [...prevProducts];
        console.log("Original List : ", originalProductList);
        return [...prevProducts].sort((a, b) => a.price - b.price);
      });
    }
    else {
      console.log("Original List : ", originalProductList);
    }
    

    
  }
  
  function handleAdd(product) {
    const uniqueId = uuidv4();
    const updatedProduct = { ...product, uniqueId };
    dispatch(add(updatedProduct));
    const previousCart = getFromLocalStorage();
    const updatedCart = [...previousCart, updatedProduct];
    saveToLocalStorage(updatedCart);
  }
  return (
    <div>
      {/* <button onClick={()=>{
        Cookies.remove('token', { path: '' })
        console.log("removed");
        setcoo("")
      }}>Clear Cookies</button> */}
      <NavBar
        setIsFilterActive={setIsFilterActive}
        setCategoryActive={setCategoryActive}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex gap-2 ml-5 flex-row justify-start items-center">
      
      <input
        className=" m-5  p-2  border border-gray-800 rounded "
        id="search"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);

          if (e.target.value == "") fetchData();
        }}
      />
      <button
        onClick={search}
        className=" mr-4 border p-2 px-4 rounded bg-blue-500 text-white font-semibold"
      >
        Search
      </button>

      <label htmlFor="filter">Filter : </label>
      <button
        onClick={handleFilter}
        className={` ${isFilterActive}  p-1 px-5   `}
      >
        Price
      </button>
      </div>

      {
        <div className=" m-auto  gap-3 overflow-hidden justify-center grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-col-4 w-[80%] h-full ">
          {products.map((product, index) => (
            <div key={index} className="border p-3 justify-normal flex flex-col  ">
              <Product
                id={product.id}
                title={product.title}
                desc={product.description}
                image={product.images[0]}
                price={product.price}
              />
              <button
                onClick={() => handleAdd(product)}
                className="border  align-baseline mt-auto mx-auto  p-2 rounded bg-blue-500 text-white font-semibold"
              >
                Add to the cart
              </button>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default Home;
