import React, { useState, useEffect } from "react"
// import { price } from "../../assets/data/data"

export const Price = () => {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('https://onlinemarketshop.pythonanywhere.com/get_all_phones/')
         .then((res) => res.json())
         .then((item) => {

            // console.log(item);
            setPosts(item);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


   return (
      <div className="App">
         <ul>
            {
            posts
            // .filter(item => item.price === 851)
            .map(item => {
               const { name, img_url, model, id ,color,price} = item
               if (item.price >= 200 && item.price <= 1400 && item.color === 'Gold'){
               
                  // console.log(item.length+1);
                  return (
                     <li key={id}>
                        <div>
                           Name: <strong>{name}</strong>
                        </div>
                        <div><img src={img_url} alt={model} width="200px"/>{color} year(s)</div>
                        <div>Model: {model}</div>
                        <div>Price: {price}$</div>

                     </li>
                  )
               }else{
                  return (
                     <>
                     {/* Empty */}
                     </>
                  )
               }
               // const category = item.filter(category => category.model === "Aplle")
               // console.log(category);
              
            })}
         </ul>
      </div>
   )
}

export default Price;