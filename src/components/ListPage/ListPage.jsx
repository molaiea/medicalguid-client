import React from 'react'

const ListPage = ({data}) => {
  return (
    <div>
        {data.map(table=>{
            return(
               <ul>
                {table.data.map(item=>{
                    return(<li>{item.name}</li>)
                })}
               </ul>
            )
        })}
        
    </div>
  )
}

export default ListPage