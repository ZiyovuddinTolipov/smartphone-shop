import React, { useState,useEffect } from "react"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ADD } from "../../../controller/action"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.8 }
};
export const ProductItems = ({ cartItems }) => {

  // animation 
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  
  const dispatch = useDispatch()
  const addToCart = (e) => {
    console.log(e)
    ADD= (e) => dispatch(ADD(e))
  }

  const [openImage, setOpenImage] = useState(false)
  const [img, setImg] = useState("")
  const onOpenImage = (src) => {
    setImg(src)
    setOpenImage(true)
  }

  return (
    <>
      <div className='product_items'>
        {cartItems.slice(0,8).map((items) => (
          <motion.div className='box' 
          key={items.id}
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
          >
            <div className='img'>
              <Link to={`/cart/${items.id}#phone-${items.id}`}>
              <LazyLoadImage
              effect="opacity"
              useIntersectionObserver={true} 
              threshold={100}
              delayTime={300}
               src={items.img_url} 
               alt={items.model} />
              </Link>
              
              <div className='overlay'>

                <button className='button' onClick={() => addToCart(items)}>
                  <FiShoppingBag />
                </button>
                <button className='button'>
                  <AiOutlineHeart />
                </button>
                <button className='button' onClick={() => onOpenImage(items.img_url)}>
                  <FiSearch />
                </button>
              </div>
            </div>
            <div className='details'>
              <h3>{items.name} </h3>
              <p>{items.model}</p>
              <h4>{items.price*11376} So'm</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={openImage ? "modelOpen" : "modelClose"}>
        <div className='onClickImage'>
          <img src={img} alt='' />
          <button className='button' onClick={() => setOpenImage(false)}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  )
}
