import React, { useState, useEffect } from "react"
// import { banner } from "../../assets/data/data"

export const Banner = () => {
   const [posts, setPosts] = useState([]);


   useEffect(() => {
      fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
         .then((res) => res.json())
         .then((data) => {
            // console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   return (
      <>
         <section className='banner'>
            <div className='posts'>
               {posts.map((data) => (
                  <div className='post' key={data.id}>
                     <div className='content'>
                        <div className='img'>
                           <img src={data.img_url} alt='banner' />
                        </div>
                        <div className='text'>
                           <h2>{data.price}</h2>
                           <h2>{data.color}</h2>
                           <p>{data.ram}</p>
                           <button className='button'>SHOP NOW</button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </>
   )
}
