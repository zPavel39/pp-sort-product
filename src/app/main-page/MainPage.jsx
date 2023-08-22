import React, { useEffect, useState } from 'react'
import ListProducts from '../../components/ListProducts'
import { getAllList } from '../../api/list'
import ImageArrow from './../../assets/svg/arrow2.svg'
import './MainPage.scss'


const MainPage = () => {
    const [list, setList] = useState([])
    const [activeSort, setActiveSort] = useState({ name: 'noSort', check: false })
    const [sortList, setSortList] = useState([])

    const columns = {
        noSort: 'noSort',
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
        sortListNumber: (name) => {
            const keys = Object.keys(columns);
            const values = Object.values(columns);
            const index = values.indexOf(name);

            if (sortList.length > 1 && activeSort.check === true) {
                setActiveSort({ name: name, check: false })
                let sortAllList = sortList.sort((a, b) => {
                    let A = Number(a[keys[index]])
                    let B = Number(b[keys[index]])
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
            if (sortList.length > 1 && activeSort.check === false) {
                setActiveSort({ name: name, check: true })
                let sortAllList = sortList.sort((a, b) => {
                    let A = Number(a[keys[index]])
                    let B = Number(b[keys[index]])
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
        },
        sortListString: (name) => {
            const keys = Object.keys(columns);
            const values = Object.values(columns);
            const index = values.indexOf(name);

            if (sortList.length > 1 && activeSort.check === true) {
                setActiveSort({ name: name, check: false })
                let sortAllList = sortList.sort((a, b) => {
                    let nameA = a[keys[index]].toLowerCase().trim(), nameB = b[keys[index]].toLowerCase().trim()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                })
                setSortList([...sortAllList])
            }
            if (sortList.length > 1 && activeSort.check === false) {
                setActiveSort({ name: name, check: true })
                let sortAllList = sortList.sort((a, b) => {
                    let nameA = a[keys[index]].toLowerCase().trim(), nameB = b[keys[index]].toLowerCase().trim()
                    if (nameA > nameB)
                        return -1
                    if (nameA < nameB)
                        return 1
                    return 0
                })
                setSortList([...sortAllList])
            }
        }
    }
    /* console.log('activeSort', activeSort) */
    return (
        <div className='mainPage'>
            <h2 className='mainPage__title'>Сортировка</h2>
            <ul className='mainPage__actionList'>
                <li className='mainPage__actionList_btn'>{columns.name}</li>
                <li className='mainPage__actionList_btn'>{columns.phoneNumber}</li>
                <li className='mainPage__actionList_btn'>{columns.address}</li>
                <li className='mainPage__actionList_btn'>{columns.comment}</li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListNumber(columns.numberOfDeliveries)}>
                    {columns.numberOfDeliveries}
                    <img className={activeSort.name == columns.numberOfDeliveries && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListNumber(columns.amountOfDeliveries)}>
                    {columns.amountOfDeliveries}
                    <img className={activeSort.name == columns.amountOfDeliveries && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListString(columns.namePos)}>
                    {columns.namePos}
                    <img className={activeSort.name == columns.namePos && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
            </ul>
            <ListProducts list={sortList} />
        </div>
    )
}

export default MainPage