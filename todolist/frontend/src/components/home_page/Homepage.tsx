import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreateOrder } from '../create_order/CreateOrder';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';


interface IFormOrder {
    service: number,
    quantity: number,
    nickname: string,
}

interface ServiceCost {
    cost: number;
    ID: number, 
}

interface IQiwiPayment {
    amount_currency: string,
    amount_value: number,
}

export const Homepage: FC = () => {
    const navigate = useNavigate()
    const defaultValue = 1;
    const [serviceCost, setServiceCost] = useState<ServiceCost | any>()
    const [qiwiPayment, setQiwiPayment] = useState(0)
    const [currency, setCurrency] = useState('RUB')
    const { handleSubmit, control } = useForm<IFormOrder>();
    const service = useWatch({
        control,
        name: "service",
    })
    const quantity = useWatch({
        control,
        name: "quantity",
    })
    const handleOutClick = () => {
        axios.get('http://localhost:8000/api/signout', {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            if (response.status === 200) {
                console.log('вышел')
            } else {
                console.log('ошибка')
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    

    const onSubmit: SubmitHandler<IFormOrder> = (data) => {
        axios.post('http://localhost:8000/api/wiq/create-order',
        {
            service: data.service,
            quantity: data.quantity,
            nickname: data.nickname,
        })
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/wiq/insta-services')
        .then((response) => {
            if (response.status === 200) {
                response.json()
                .then((data) => {
                    const serv = data.find((item: { ID: any; }) => item.ID === service)
                    if (serv) {
                        const cost: number = serv.cost
                        const finalcost: any = ((cost * 98) / 1000).toFixed(2)
                        setServiceCost(finalcost)
                    } else {
                        console.log('Не удача')
                    }
                })
                if (serviceCost) {
                    const payment: any = ((quantity * serviceCost) / 0.65).toFixed(2)
                    setQiwiPayment(payment)
                }
            } else {
                console.log("Ошибка в запросе!")
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [() => {}])

    const submitPayment = () => {
        axios.post('http://localhost:8000/api/qiwi/invoice-form', {
                amount_value: qiwiPayment,
            }).then((response) => {
            if (response.status === 200) {
                console.log('Передресируем чувака')
                const redirect = response.data
                window.location.href = redirect
            } else {
                console.log('я ебался')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="header-container">
                <header className="header">
                    <Link to="/">
                        <img alt="Логотип" className="logo" src="images/logo.svg" />
                    </Link>
                    <nav className="right-nav">
                        <ul className="center-ul">
                            <li>
                                <Link className="link" to="/create-order">
                                    Создать заказ
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/myorders">
                                    Мои заказы
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="left-nav">
                        <ul className="left-ul">
                            <li>
                                <Link className="link" to="/login">
                                    Войти
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/" onClick={handleOutClick}>
                                    Выйти
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <div className="main-container">
                <main className="main-section">
                    <section className="left-section">
                        <h1 className="CreateOrder-tag">Создай свой заказ</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="Service-tag">Выберите сервис</h3>
                            <Controller
                                control={ control }
                                name="service"
                                render={({ field }) => (
                                    <select
                                        id="service" 
                                        title="get-service"
                                        className="service-select"
                                        onChange={(e) => field.onChange(e)}
                                    >
                                        <option value="" disabled selected>
                                            Выберите сервис:
                                        </option>
                                        <option value="3">
                                            👤 Followers
                                        </option>
                                        <option value="4">
                                            👤 Followers (MIX + BOT)
                                        </option>
                                        <option value="8">
                                            👤 Followers Fast (♻️ AR30) ⚡️ 
                                        </option>
                                        <option value="20">
                                            👤 Followers (REAL-LUXE) (♻️R120) ⭐️
                                        </option>
                                        <option value="26">
                                            👤 Followers (REAL-PREMIUM) (♻️R90) HIT! ⭐️🔥
                                        </option>
                                        <option value="44">
                                            👤 Followers (Real) (♻️ AR60)
                                        </option>
                                        <option value="46">
                                            👤 Followers (RU 100%) MIX (♻️ R60) HIT! ⭐️🔥
                                        </option>
                                        <option value="53">
                                            👤 Followers ☆VIP☆ guaranteed (♻️ R365) 
                                        </option>
                                        <option value="70">
                                            👤 Followers REAL (♻️ AR60) 
                                        </option>
                                        <option value="73">
                                            👤 Followers (Offers + Real) 
                                        </option>
                                        <option value="83">
                                            👤 Followers ☆REAL☆ NATURAL INCREASE  
                                        </option>
                                        <option value="97">
                                            👤 Followers - pratial RU (REAL) (♻️ R60) HIT! 
                                        </option>
                                        <option value="118">
                                            👤 Followers REAL PEOPLE (From the app) (♻️ R30) ⭐️⚡️
                                        </option>
                                        <option value="148">
                                            👤 Followers  (♻️ R15)
                                        </option>
                                        <option value="155">
                                            👤 Followers (REAL-PEOPLE) (♻️R60) ⭐️🔥
                                        </option>
                                        <option value="162">
                                            👤 Followers MIX (♻️ AR365) ⚡️ 
                                        </option>
                                    </select>
                                )}
                            />
                            <h3 className="quantity-tag">Введите кол-во</h3>
                            <Controller
                                control={control}
                                name="quantity"
                                render={({field}) => (
                                    <input
                                        className="quantity-input"
                                        type="number"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ""}
                                        placeholder="Введите кол-во под-ков"
                                    />
                                )}
                            />
                            <h3 className="nickname-tag">Введите имя профиля</h3>
                            <Controller
                                control={control}
                                name="nickname"
                                render={({field}) => (
                                    <input
                                        className="nickname-input"
                                        type="text"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ""}
                                        placeholder="Введите имя профиля"
                                    />
                                )}
                            />
                            <button className="submit-button" type="submit">
                                Создать
                            </button>
                        </form>
                    </section>
                    <section className="right-section">
                        <h1>Ваша стоимость заказа состовляет: {qiwiPayment} RUB</h1>
                        <img src="images/qiwi.svg" alt="Qiwi" className="qiwi-icon" />
                        <button type="submit" className="submit-button" onClick={submitPayment}>
                            Оплатить
                        </button>
                    </section>
                </main>
            </div>
            <div className="footer-container">
                <footer className="footer">
                    <img alt="Логотип" className="logo-footer" src="images/logo.svg" />
                    <ul className="footer-ul">
                        <li className="disabled-li" aria-disabled >My Social</li>
                        <li className="footer-li">
                            <Link to="https://t.me/dmitriy_junior" className="link">Telegram</Link>
                        </li>
                        <li className="footer-li">
                            <Link to="https://github.com/Andrets" className="link">Github</Link>
                        </li>
                    </ul>
                    <div className="footer-div">
                        <p className="footer-p">Dimas 2023 © All Rights reserved</p>
                    </div>
                </footer>
            </div>
        </>
    )
}