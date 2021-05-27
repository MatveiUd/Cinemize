import React, { Component } from 'react'
import Footer from './footer'
import Header from './header'



class Visitors extends Component{
    render() {
        return (
            <div className="container">
                <Header />
                    <div className="content__for__visitors">
				        <h4 className="cinemize__description">
                        CINEMIZE — частный независимый камерный кинотеатр в <br /> Санкт-Петербурге. <br />
                        Наш проект — сообщество любителей кино, синефилов, которые смотрят классику авторского и жанрового кино. <br />
                        Наша миссия — продвигать культуру кинопоказов и кинематограф, как искусство.
				        </h4>
                        <div className="cinemize__photos">
                            <div className="cinemize__photo__container">
                                <div className="cinemize__photo1"></div>
                            </div>
                            <div className="cinemize__photo__container">
                                <div className="cinemize__photo2"></div>
                            </div>
                            <div className="cinemize__photo__container">
                                <div className="cinemize__photo3"></div>
                            </div>
                        </div>
                </div>
                <Footer/>
                
            </div>
        )
    }
}

export default Visitors