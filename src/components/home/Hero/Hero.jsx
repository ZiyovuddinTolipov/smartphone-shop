import React, { useState,useEffect } from "react"
import { BiSearch } from "react-icons/bi"
// import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"

export const Hero = () => {
  // search

  const [value, setValue] = useState("");
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


  const onChanage = (e) => {
    setValue(e.target.value)
  }

  const onSearch = (key) => {
    setValue(key)
    console.log("search", key)
  }
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <h1>
            <label>
              Bizda  <span>6,500</span>dan  Ortiq
            </label>
            <br />
            <label>
            Ortiq<span>Kompyuter </span> & <span>Telefon </span> mahsulotlarni
            </label> <br/>
            <label>
            Xarid qilishingiz mumkun !!!
            </label>
          </h1>
          <p>Sotib olish qulay va mahsulotlarimiz jahon standartlariga mos.</p>
          <div className='search'>
            <span>Barcha kategoriyalar</span>
            <hr />
            <input type='text' placeholder='Mahsulotlarni qidirish...' onChange={onChanage} value={value} />
            <button onClick={() => onSearch(value)}>
              <BiSearch className='serachIcon heIcon' />
            </button>
          </div>
          <SearchItems item={value} value={value} onSearch={onSearch} />
          <p>Misol uchun: Iphone, Samsung, Nokia 1280, Ipxone xs max ...</p>
        </div>
      </section>
    </>
  )
}
