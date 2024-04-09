import React from "react";

function Product(props) {
  const { title, id, desc, price, image } = props;
  return (
    <>
      <div className="   overflow-hidden flex flex-col  h-auto w-[100%] ">
        <img
          className="mb-3 w-[320px] m-auto  h-[100px] object-contain "
          src={image}
          alt="image"
          />
          <h2 className="font-bold text-md items-start">
            {title} 
          </h2>
        <span>Price : {price}$</span>
        <p className="inline">{desc.substring(0, 100)}</p>
      </div>
    </>
  );
}

export default Product;
