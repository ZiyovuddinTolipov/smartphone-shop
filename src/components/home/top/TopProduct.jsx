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

  const allCategories = ["all", ...new Set(cartItems.map((data) => data.model))]
  const [model, setmodel] = useState(allCategories)

  /*console.log(setCartItems)
  console.log(setmodel)
  console.log(allCategories)*/

  const handleFilter = (model) => {
    const newItem = topProducts.filter((data) => data.model === model)
    setCartItems(newItem)

    if (model === "all") {
      setCartItems(topProducts)
      return <>
        hi
      </>
    }
  }
  return (
    <>
      <section className='topproduct'>
        <div className='container'>
          <div className='head'>
            <Heading title='Kategoriyalar' desc='Mahsulotni turiga qarab izlash' />
            <div className='model'>
              {/* {model.map((model) => (
                <button className='button' onClick={() => handleFilter(model)}>
                  {model}
                </button>
              ))} */}
              <button className='button' onClick={() => handleFilter(model)}>
                APPLE
              </button>
              <button className='button' onClick={() => handleFilter(model)}>
                SAMSUNG
              </button>                <button className='button' onClick={() => handleFilter(model)}>
                NOKIA
              </button>
              <button className='button' onClick={() => handleFilter(model)}>
                HONOR
              </button>
              <button className='button' onClick={() => handleFilter(model)}>
                  LG
                </button>
            </div>
          </div>
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  )
}
