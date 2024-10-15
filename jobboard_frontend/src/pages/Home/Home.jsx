import { useState } from 'react'
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';



export function Home(){
  return (
    <div>
      <Banner />
      <SearchBar />
      <Footer />

    </div>

  )
}
