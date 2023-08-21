import React, { useEffect, useState } from 'react'
import ListProducts from '../../components/ListProducts'
import { getAllList } from '../../api/list'
import './MainPage.scss'


const MainPage = () => {
    const [list, setList] = useState([])
    const [activeSort, setActiveSort] = useState({ name: 'noSort', check: false })

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


    const callback = {
        sortListNumberOfDeliveries: (name) => {
            callback.clickSort(name)
            const columnArr = columns
            const keyColumn = activeSort.name
            if (activeSort.name === 'noSort') {
                return list
            }
            if (columnArr[keyColumn] === "Точка") {
                return setList.sort((a, b) => {
                    return a[keyColumn].toLowerCase().localeCompare(b[keyColumn].toLowerCase())
                })
            }
            if (columnArr[keyColumn] === "Сумма поставок") {
                return setList.sort((a, b) => {
                    return a[keyColumn].toLowerCase().localeCompare(b[keyColumn].toLowerCase())
                })
            }
            if (columnArr[keyColumn] === "Сумма поставок") {
                return setList.sort((a, b) => {
                    return a[keyColumn] - b[keyColumn]
                })
            }
            if (columnArr[keyColumn] === "Кол-во поставок") {
                return setList.sort((a, b) => {
                    return a[keyColumn] - b[keyColumn]
                })
            }
            return list
        },
        clickSort: (name) => {
            setActiveSort({ name: name, checkout: !false })
        },
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
                <li className='mainPage__actionList_btn' onClick={callback.sortListNumberOfDeliveries}>{columns.numberOfDeliveries}</li>
                <li className='mainPage__actionList_btn'>{columns.amountOfDeliveries}</li>
                <li className='mainPage__actionList_btn'>{columns.namePos}</li>
            </ul>
            <ListProducts list={list} />
        </div>
    )
}

export default MainPage