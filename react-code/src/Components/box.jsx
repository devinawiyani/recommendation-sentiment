import React, {useState, useEffect} from 'react'
import "../styles.css";

function Box(props){
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTitleClick = (event) => {
    event.preventDefault();

    const inputData = props.item_url;

    // Send data to backend
    fetch('/input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputData }),
    })
      .then(response => response.json()
            )
      .catch((error) => {
        console.log('error', error)
      });

    // Redirect to the result page
    window.location.reload();
  };

    return(
        <div className="container">
                <div className="image-column">
                  <img className="item-img" src= {props.item_image} alt="Item 1" />
                </div>
                
                <div className="details-column">
                  <div className="item-title" style={{ color: '#272824', textDecoration: isHovered ? 'underline' : 'none', cursor: 'pointer' }} 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} onClick={handleTitleClick}>{props.item_name}</div>
                  
                  <div className="item-shop">{props.shop_name}</div>
                  <div className="item-price">{props.item_price}</div>
                  <div className="the-row" style ={{color:"black"}}>
                    <div className="item-rating">{props.item_rating} <strong>rating</strong></div>
                    <div className="item-sold">{props.item_sold}<strong> sold</strong></div>
                    <div className="item-number-of-ratings">{props.ratings_num} <strong>reviews</strong></div>
                  </div>
                  <div className="review-result-container">
                  <div className="review-title">Review Score</div>
                  <div className="item-review">{(props.accu_score/2*10).toFixed(2)}/10</div>
                  </div>

                  <div className="redirect-page-link">
                  <a href={props.item_url} target="_blank" rel="noopener noreferrer" 
                  style={{ color: 'grey', textDecoration: 'underline'}}> <u>Open Shopee page of this item </u></a>
                  </div>
                </div>
        </div>
    );
}

export default Box;
