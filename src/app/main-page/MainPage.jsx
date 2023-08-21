import React, { useEffect, useState } from 'react'
import ListProducts from '../../components/ListProducts'
import { getAllList } from '../../api/list'
import './MainPage.scss'


const MainPage = () => {
    const [list, setList] = useState([])
    const [activeSort, setActiveSort] = useState(false)
    const [sortList, setSortList] = useState([])

    const columns = {
        name: 'Название',
        phoneNumber: 'Номер телефона',
        address: 'Адрес',
        comment: 'Комментарий',
        numberOfDeliveries: 'Кол-во поставок',
        amountOfDeliveries: 'Сумма поставок',
        namePos: 'Точка',
    }
    useEffect(() => {
        setList(getAllList())
    }, [])

    useEffect(() => {
        setSortList([...list])
    }, [list])

    const callback = {
        sortListNumberOfDeliveries: () => {
            setActiveSort(!activeSort)
            if (sortList.length > 1 && activeSort === true) {
                setActiveSort(!activeSort)
                let sortAllList = sortList.sort((a, b) => {
                    let A = Number(a.amountOfDeliveries)
                    let B = Number(b.amountOfDeliveries)
                    if (A >= B) {
                        return 1
                    }
                    if (A < B) {
                        return -1
                    }
                    return 0;
                })
                setSortList([...sortAllList])
            }
            if (sortList.length > 1 && activeSort === false) {
                setActiveSort(!activeSort)
                let sortAllList = sortList.sort((a, b) => {
                    let A = Number(a.amountOfDeliveries)
                    let B = Number(b.amountOfDeliveries)
                    if (A <= B) {
                        return 1
                    }
                    if (A > B) {
                        return -1
                    }
                    return 0;
                })
                setSortList([...sortAllList])
            }
            else {
                setSortList([...sortList])
            }
            
        }
    }
    return (
        <div className='mainPage'>
            <h2 className='mainPage__title'>Сортировка</h2>
            <ul className='mainPage__actionList'>
                <li className='mainPage__actionList_btn'>№</li>
                <li className='mainPage__actionList_btn'>{columns.name}</li>
                <li className='mainPage__actionList_btn'>{columns.phoneNumber}</li>
                <li className='mainPage__actionList_btn'>{columns.address}</li>
                <li className='mainPage__actionList_btn'>{columns.comment}</li>
                <li className='mainPage__actionList_btn' >{columns.numberOfDeliveries}</li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListNumberOfDeliveries()}>{columns.amountOfDeliveries}</li>
                <li className='mainPage__actionList_btn'>{columns.namePos}</li>
            </ul>
            <ListProducts list={sortList} />
        </div>
    )
}

export default MainPage