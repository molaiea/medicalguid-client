import React from 'react'
import { Rating } from 'react-simple-star-rating'
import ListNav from '../ListNav/ListNav'
import './ListPage.css'
const ListPage = ({data, route}) => {
    
  return (
    <div className='list_container'>
        <ListNav className="list_nav"/>
        <ul>
        {data.map(item=>{
            return(
                <>
                <li className='my_item'>
                <h5>{item.name}</h5>
                <Rating initialValue={item.rating}
        onClick={(rate)=>{
            fetch(`https://medicalguide-api-production.up.railway.app/addRating?rating=${rate}&table=${route.split('//')[1]}&id=${item.id}`, 
      {method: 'post', crossDomain:true})
        }}

        /* Available Props */
      />
                </li>
                <hr />
                </>
                
                

            )
        })}
        </ul>
    </div>
  )
}

export default ListPage