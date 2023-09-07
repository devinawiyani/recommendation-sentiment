import React, { useState, useEffect } from 'react';
import PreviewBox from "./Components/previewBox.jsx";
import Pagination from './Components/pagination.jsx';

function MainPage(){
  const [data, setData]=useState([{}])
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery]=useState('');
  const [currentPage, setCurrentPage]=useState(1)
  const[postsPerPage, setPostPerPage]=useState(25)


  useEffect(() => {
    fetch('/main', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  
  
  const filteredList = data.prodList && data.prodList.filter((listing) =>
    listing.item_name.toLowerCase().includes(query.toLowerCase())
  );
  
  const lastPostIndex=currentPage*postsPerPage;
  const firstPostIndex=lastPostIndex-postsPerPage;
  const currentPosts=filteredList && filteredList.slice(firstPostIndex,lastPostIndex)

  return(
    <div>
      <div className="navigation-panel">
        <span class="material-symbols-outlined" style={{fontSize:'30', marginTop:'3px'}}>
          sentiment_satisfied
        </span>
      
        <div><span className="brand-name">SENTI</span></div>

        <span class="material-symbols-outlined" style={{color: 'grey', margin: '9px 10px 0px 0px' ,fontSize:'3.5rem'}}>
          search
        </span>

        <div><input className ="search-bar" type="text" placeholder="Search product"onChange={e=>setQuery(e.target.value)} /></div>
      
      </div>

      <div className='page'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (

          currentPosts.map((listing)=>(
            <PreviewBox
            data={currentPosts} 
            
            key={listing.item_id}
            item_name={listing.item_name}
            shop_name={listing.shop_name}
            item_url={listing.item_url}
            item_price={listing.item_price}
            item_image={listing.item_image}

            />)
          )
        )}
      </div>
      
      <Pagination 
        totalPosts={filteredList&&filteredList.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
       />
    </div>

  )
}


export default MainPage;
