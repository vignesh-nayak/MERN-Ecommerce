import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/actionProduct';

const Products = () => {
  window.scrollTo(0,0);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const [searchStr, setSearchStr] = useState('');

  const { products, loading, error } = productList;

  const searchFunction = ( searchString ) => {
    setSearchStr(searchString);
  }
  
  useEffect(() => {
    dispatch(getAllProducts(searchStr))
  }, [dispatch, searchStr])
    
  return (
    <div className='main'>
      <Navbar searchFunction={searchFunction}/>
      <div className='products'>
        {
          loading ? 
            <div>Loading...</div> 
            :
            products?.length === undefined ?
              <div className='noProductFound'>{ searchStr === '' ? "No product found" : `No product found for "${searchStr}"`}</div> 
            :
            products?.map(product => {
              return <Link to={`product/${product._id}`} key={product._id} className='text-white'>
                  <div className='product'>
                    <img src={product?.image} alt="No images Found" className='productImgInPage'/>
                    {product?.avaiableStock === 0 ? 
                    <div className='productDetailsInPage text-red'>
                      Out of Stock
                    </div> 
                    : 
                    <div className='productDetailsInPage'>
                      <div className='productNameInPage'>{product?.name}</div>
                      <div className='productPriceInPage'>{product?.price}</div>
                      <div className='productRatingInPage'>{product?.rating} Star</div>
                    </div>
                    } 
                  </div>
                </Link>
          })   
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Products