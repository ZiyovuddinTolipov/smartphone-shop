import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"

export const Details = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => setData(data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
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
          <h2 className='details_title'>Product Details Pages</h2>
          {data.slice(0,2).map((item) => (
            <div className='details_content' id={`phone-${item.id}`}>
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
                  <label htmlFor=''>(1 customer review)</label>
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
                  <button className='button'>Add To Cart</button>
                </div>
                <div className='desc'>
                  <h4>PRODUCTS DESCRIPTION</h4>
                  <p>{item.name}</p>
                  <h4> PRODUCT DETAILS</h4>
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
                    <li>
                      <p>Depth: 52 cm</p>
                    </li>
                    <li>
                      <p>Seat Height: 44 cm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}
