import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0.8, scale: 0.8 }
};

export const Details = () => {
  
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);


  const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
        .then((res) => res.json())
        .then((item) => {

          // console.log(item);
          setData(item);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
    const { id } = useParams()

    console.log(id)

    const getdata = useSelector((state) => state.cartReducer.carts)
    console.log(getdata)

    const compare = () => {
      let compareData = getdata.filter((e) => {
        return e.id == id
      })
      setData(compareData)
    }

    useEffect(() => {
      compare()
    }, [id])

    // delete item
    const history = useHistory()
    const deletes = (id) => {
      dispatch(DELETE(id))
      history.push("/")
    }

    // increment item
    const dispatch = useDispatch()
    const increment = (e) => {
      dispatch(ADD(e))
    }

    // descriment item
    const decrement = (item) => {
      dispatch(REMOVE_INT(item))
    }

    return (
      <>
        <article>
          <section className='details'>
            <h2 className='details_title'>Mahsulot tafsilotlari sahifalari</h2>
            {data[id].map((item => (
              <motion.div 
              className='details_content box'
              id={`phone-${item.id}`}
              ref={ref}
              variants={boxVariant}
              initial="hidden"
              animate={control}
              >
                <div className='details_content_img'>
                  <img src={item.img_url} alt='' />
                </div>
                <div className='details_content_detail'>
                  <h1>{item.name}</h1>
                  <div className='rating'>
                    <MdStarRate />
                    <MdStarRate />
                    <MdStarRate />
                    <MdStarRate />
                    <MdStarRate />
                    <label htmlFor=''>(1 ta ko'rish)</label>
                  </div>
                  <h3> ${item.price * item.id}</h3>
                  <p>{item.model}</p>
                  <div className='id'>
                    <div className='count'>
                      <button onClick={() => increment(item)}>
                        <AiOutlinePlus />
                      </button>
                      <span>{item.id}</span>
                      <button onClick={item.id <= 1 ? () => deletes(item.id) : () => decrement(item)}>
                        <AiOutlineMinus />
                      </button>
                    </div>
                    <button className='button'>Savatga</button>
                  </div>
                  <div className='desc'>
                    <h4>MAHSULOTLAR TAVSIFI</h4>
                    <p>{item.name}</p>
                    <h4> MAHSULOT HAQIDA</h4>
                    <ul>
                      <li>
                        <p> RAM: <span>{item.ram}</span></p>
                      </li>
                      <li>
                        <p>Xotira: <span>{item.memory}</span></p>
                      </li>
                      <li>
                        <p>Model: <span>{item.model}</span></p>
                      </li>
                      <li>
                        <p>Rangi <span>{item.color}</span></p>
                      </li>
                      {/* <li>
                        <p>Depth: 52 cm</p>
                      </li>
                      <li>
                        <p>Seat Height: 44 cm</p>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )))}
          </section>
        </article>
      </>
    )
  }
