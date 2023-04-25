import React from "react"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { ADD } from "../../../controller/action"

// all copy past from productItem page

export const Searchitem = ({ posts, value, onSearch }) => {
  const dispatch = useDispatch()
  const addToCart = (e) => {
    dispatch(ADD(e))
  }

  return (
    <>
      <section className='searchitem'>
        <div className='product_item'>
          {posts
            .filter((item) => {
              const searchkey = value.toLowerCase()
              const title = item.title.toLowerCase()

              return searchkey && title.startsWith(searchkey) && title !== searchkey
            })
            .slice(0, 10)
            .map((item) => (
              <div className='box' onClick={() => onSearch(item.title)} key={item.id}>
                <div className='img'>
                  <img src={item.img_url} alt='' />
                  <div className='overlay'>
                    <button className='button' onClick={() => addToCart(item)}>
                      <FiShoppingBag />
                    </button>
                    <button className='button'>
                      <AiOutlineHeart />
                    </button>
                    <button className='button'>
                      <FiSearch />
                    </button>
                  </div>
                </div>
                <div className='details'>
                  <h3>{item.model}</h3>
                  <p>{item.model}</p>
                  <h4>${item.price}</h4>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  )
}
