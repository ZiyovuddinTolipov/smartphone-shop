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
            {posts.map(item => {
               const category = item.filter(category => category.model === "Aplle")
               console.log(category);
               const { name, experience, department, id } = item
               return (
                  <li key={id}>
                     <div>
                        Name: <strong>{name}</strong>
                     </div>
                     <div>Experience: {experience} year(s)</div>
                     <div>Department: {department}</div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default Price;