import React,{ useState, useEffect } from "react"
// import { price } from "../../assets/data/data" 
import { Heading } from "../../common/Heading"

export const Price = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  return (
    <>
      <section className='price'>
        <Heading title='Choose The Plans' desc='Meet our newbies! The latest templates uploaded to the marketplace.' />

        <div className='content'>
          {posts.slice(0, 3).map((item) => (
            <div className='box' key={item.id}>
              <h3>{item.name} </h3>
              <h1>
                <span>$</span>
                {item.price}
                <label htmlFor=''>/user per month</label>
              </h1>
              <p>{item.img_url}</p>
              <button className='button'>GET STATRED</button>

              <ul>
                {/* {item.list.map((lists) => (
                  <li>
                    <i>{lists.icon}</i>
                    <span>{lists.para}</span>
                  </li>
                ))} */}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
