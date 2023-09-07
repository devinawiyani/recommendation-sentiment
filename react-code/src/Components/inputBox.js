import React, {useState, useEffect} from 'react'
import "../styles.css";

function InputBox(props){

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

    return(
        <div className="container" style={{backgroundColor:"#272824"}}>
                <div className="image-column">
                  <img className="item-img" src={props.item_image} alt="Item 1" />
                </div>
                
                <div className="details-column">
                  <div className="item-title" style={{ color: 'white'}}>{props.item_name}</div>
                  <div className="item-shop" style={{color:"white"}}>{props.shop_name}</div>
                  <div className="item-price">{props.item_price}</div>
                  <div className="the-row">
                      <div className="item-rating">{props.item_rating}<strong> rating</strong></div>
                      <div className="item-sold">{props.item_sold} <strong> sold</strong></div>
                      <div className="item-number-of-ratings">{props.ratings_num} <strong> reviews</strong></div>
                    </div>
                    <div className="review-result-container">
                    <div className="review-title">Review Score</div>
                    <div className="item-review">{(props.accu_score/2*10).toFixed(2)}/10</div>
                    
                  </div>
                  <div className="redirect-page-link">
                  <a href={props.item_url} target="_blank" rel="noopener noreferrer" 
                  style={{ color: 'white', textDecoration: isHovered ? 'underline' : 'none' }}> <u>Open Shopee page of this item </u></a>
                  </div>
                  </div>
                
                </div>
            
        
    );
  }

  export default InputBox;