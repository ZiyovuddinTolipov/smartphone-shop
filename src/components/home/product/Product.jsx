import { useState,useEffect } from "react"
import { products } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { ProductItems } from "./ProductItems"

export const Product = () => {
  // const [cartItems, setCartItems] = useState(products)
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
     fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
        .then((res) => res.json())
        .then((item) => {

           // console.log(item);
           setCartItems(item);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  return (
    <>
      <section className='product'>
        <div className='container'>
          <Heading title='Ommabop Mahsulotlar' desc="Siz ham o'z biznesingizni boshlang!" />

          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  )
}
