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
        sortListAmountOfDeliveries: (name) => {
            if (sortList.length > 1 && activeSort.check === true) {
                setActiveSort({ name: name, check: false })
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
            if (sortList.length > 1 && activeSort.check === false) {
                setActiveSort({ name: name, check: true })
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
        },
        sortListNumberOfDeliveries: (name) => {
            if (sortList.length > 1 && activeSort.check === true) {
                setActiveSort({ name: name, check: false })
                let sortAllList = sortList.sort((a, b) => {
                    let A = Number(a.numberOfDeliveries)
                    let B = Number(b.numberOfDeliveries)
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
                    let A = Number(a.numberOfDeliveries)
                    let B = Number(b.numberOfDeliveries)
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
        sortListNamePos: (name) => {
            if (sortList.length > 1 && activeSort.check === true) {
                setActiveSort({ name: name, check: false })
                let sortAllList = sortList.sort((a, b) => {
                    let nameA = a.namePos.toLowerCase().trim(), nameB = b.namePos.toLowerCase().trim()
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
                    let nameA = a.namePos.toLowerCase().trim(), nameB = b.namePos.toLowerCase().trim()
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
    console.log('activeSort', activeSort)
    return (
        <div className='mainPage'>
            <h2 className='mainPage__title'>Сортировка</h2>
            <ul className='mainPage__actionList'>
                <li className='mainPage__actionList_btn'>{columns.name}</li>
                <li className='mainPage__actionList_btn'>{columns.phoneNumber}</li>
                <li className='mainPage__actionList_btn'>{columns.address}</li>
                <li className='mainPage__actionList_btn'>{columns.comment}</li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListNumberOfDeliveries(columns.numberOfDeliveries)}>
                    {columns.numberOfDeliveries}
                    <img className={activeSort.name == columns.numberOfDeliveries && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListAmountOfDeliveries(columns.amountOfDeliveries)}>
                    {columns.amountOfDeliveries}
                    <img className={activeSort.name == columns.amountOfDeliveries && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
                <li className='mainPage__actionList_btn' onClick={() => callback.sortListNamePos(columns.namePos)}>
                    {columns.namePos}
                    <img className={activeSort.name == columns.namePos && activeSort.check === true ? 'mainPage__actionList_imgTop' : 'mainPage__actionList_imgBottom'} src={ImageArrow}></img>
                </li>
            </ul>
            <ListProducts list={sortList} />
        </div>
    )
}

export default MainPage