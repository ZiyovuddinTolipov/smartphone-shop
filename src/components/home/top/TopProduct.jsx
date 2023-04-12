import React, { useState, useEffect } from "react"
import { topProducts } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { ProductItems } from "../product/ProductItems"

export const TopProduct = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCartItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const allCategories = ["all", ...new Set(cartItems.map((item) => item.model))]
  const [model, setmodel] = useState(allCategories)

  /*console.log(setCartItems)
  console.log(setmodel)
  console.log(allCategories)*/

  const handleFilter = (model) => {
    const newItem = topProducts.filter((item) => item.model === model)
    setCartItems(newItem)

    if (model === "all") {
      setCartItems(topProducts)
      return
    }
  }
  return (
    <>
      <section className='topproduct'>
        <div className='container'>
          <div className='head'>
            <Heading title='Top Selling Products' desc='Meet our newbies! The latest templates uploaded to the marketplace.' />
            <div className='model'>
              {model.map((model) => (
                <button className='button' onClick={() => handleFilter(model)}>
                  {model}
                </button>
              ))}
            </div>
          </div>
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  )
}
