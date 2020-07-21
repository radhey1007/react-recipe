import React, { Component } from 'react'
import style from '../styles/header.module.css'

export class header extends Component {
    render() {
        return (
            <div className={style.appHeader}>
                <p>header</p> 
            </div>
        )
    }
}

export default header
