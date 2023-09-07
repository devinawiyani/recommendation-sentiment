import React, {useState, useEffect} from 'react'
import Box from "./Components/box.jsx"
import InputBox from './Components/inputBox.js';
import { Link } from 'react-router-dom';

function createListing(listing){
  return <Box 
    key={listing.item_id}
    item_name={listing.item_name}
    item_rating={listing.item_rating}
    ratings_num={listing.ratings_num}
    shop_name={listing.shop_name}
    item_url={listing.item_url}
    item_description={listing.item_description}
    item_price={listing.item_price}
    accu_score={listing.accu_score}
    item_sold={listing.item_sold}
    item_image={listing.item_image}
  />;
}

function createInputListing(listing){
  return <InputBox
    key={listing.item_id}
    item_name={listing.item_name}
    item_rating={listing.item_rating}
    ratings_num={listing.ratings_num}
    shop_name={listing.shop_name}
    item_url={listing.item_url}
    item_description={listing.item_description}
    item_price={listing.item_price}
    accu_score={listing.accu_score}
    item_sold={listing.item_sold}
    item_image={listing.item_image}
  />;
}


function ResultPage() {

  const [data, setData]=useState([{}])
  const [isLoading, setIsLoading] = useState(true);
  
  

  useEffect(() => {
    fetch('/result', {
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

  return (
    <div className="body">
      <div className="navigation-panel">
      <span class="material-symbols-outlined" style={{fontSize:'30', marginTop:'3px'}}>
        sentiment_satisfied
        </span>
        
        <div ><Link to="/" className="brand-name" style={{ textDecoration: 'none' }}>SENTI</Link></div>
        
        
      </div>

      <div>
          <div className="black-background">
          
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            
            data['item_result'].map(createInputListing)
          )}

          </div>


          <div className="white-background">

          

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            
            data['best_product'].map(createListing)
          )}

            
            
          </div>
          
      </div>
    </div>
    
  )
}

export default ResultPage