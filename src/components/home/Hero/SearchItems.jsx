import React from "react"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ADD } from "../../../controller/action"

// all copy past from productItem page

export const SearchItems = ({ posts, value, onSearch }) => {
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
              const name = item.name.toLowerCase()

              return searchkey && name.startsWith(searchkey) && name !== searchkey
            })
            .slice(0, 12)
            .map((item) => (
              <div className='box' onClick={() => onSearch(item.name)} key={item.id}>
                <div className='img'>
                  {/* <img src={item.img_url} alt='' /> */}
                  <LazyLoadImage
              effect="opacity"
              useIntersectionObserver={true} 
              threshold={100}
              delayTime={30000}
               src={item.img_url} 
               alt={item.model} />
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
                  <h3>{item.model} </h3>
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
