import React, { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"

export const Hero = () => {
  // search
  const [value, setValue] = useState("")
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
              Bizda  <span>6,500</span>dan
            </label>
            <br />
            <label>
              Ortiq <span>Kompyuter & Telefon </span> mahsulotlarni
            </label>
          </h1>
          <p>Sotib olish qulay va mahsulotlarimiz jahon standartlariga mos.</p>
          <div className='search'>
            <span>Barcha kategoriyalar</span>
            <hr />
            <input type='text' placeholder='Search Products...' onChange={onChanage} value={value} />
            <button onClick={() => onSearch(value)}>
              <BiSearch className='serachIcon heIcon' />
            </button>
          </div>
          <SearchItems products={products} value={value} onSearch={onSearch} />
          <p>Misol uchun: Iphone, Samsung, Nokia 1280, Ipxone xs max ...</p>
        </div>
      </section>
    </>
  )
}
