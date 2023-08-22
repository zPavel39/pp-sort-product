import React from 'react'
import './ListProducts.scss'
const ListProducts = ({ ...props }) => {
    return (
        <div className='listProduct'>
            <ul className='listProduct__list'>
                {props.list.length > 0 ?
                    props.list.map((i, key) => {
                        return (
                            <li className='listProduct__list_str' key={i.id}>
                                <ul className='listProduct__item'>
                                    {/* <li>{key + 1}</li>
                                    <li>{i.name}</li>
                                    <li>{i.phoneNumber}</li>
                                    <li>{i.address}</li>
                                    <li>{i.comment}</li> */}
                                    {/* <li>{i.name}</li> */}
                                    <li>{i.restaurant}</li>
                                    {/* <li>{i.legalEntity}</li> */}
                                </ul>
                            </li>
                        )
                    })
                    :
                    ''
                }
            </ul>
        </div>
    )
}

export default ListProducts