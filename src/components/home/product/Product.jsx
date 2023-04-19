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
          <Heading title='Trendings Products' desc='Check the hottest designs of the week. These rising stars are worth your attention.' />

          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  )
}
