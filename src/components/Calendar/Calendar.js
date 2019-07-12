import React, { Component } from 'react'
import './Calendar.scss';
const moment = require('moment');
// import jsonData from '../../data/data1.json';
// console.log('jsonData',jsonData);
console.log(moment().format())

export default class Calendar extends Component {
constructor() {
            super();
        this.state = {
            initYearMonth:'',

        }
    }


    render() {
        return (
            <div>
                 {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className="calendars calendars_daymode">
                    <div className="calendars_tabWrap">
                        <a href="#" className="prev on">向左</a>
                        <ul className="ntb_tab">
                            <li className="tab">
                                <a href="#"><span>2017 7月</span></a>
                            </li>
                            <li className="tab">
                                <a href="#"><span>2017 8月</span></a>
                            </li>
                            <li className="tab">
                                <a href="#"><span>2017 9月</span></a>
                            </li>
                        </ul>
                        <a href="#" className="next on">向右</a>
                    </div>
                    <table>
                        <thead>
                                <tr className="calendars_weeksWrap">
                                    <th>星期日</th>
                                    <th>星期一</th>
                                    <th>星期二</th>
                                    <th>星期三</th>
                                    <th>星期四</th>
                                    <th>星期五</th>
                                    <th>星期六</th>
                                </tr>
                        </thead>
                        <tbody>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                           <tr>
                               <td>1</td>
                               <td>2</td>
                               <td>3</td>
                               <td>4</td>
                               <td>5</td>
                               <td>6</td>
                               <td>7</td>
                           </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}





  /* <ul className="calendars_daysWrap">
                        <li className="calendars_days disabled"></li>
                        <li className="calendars_days hasData">
                            <div className="date">
                                <span className="num">1</span>
                                <span className="weekday">星期四</span>
                            </div>
                            <span className="status">候補</span>
                            <span className="sell">可賣：0</span>
                            <span className="group">團位：0</span>
                            <span className="tip"><i className="ic-ln productreferf"></i>保證出團</span>
                            <span className="price">$4,999</span>
                        </li>
                        <li className="calendars_days hasData">
                            <div className="date">
                                <span className="num">1</span>
                                <span className="weekday">星期五</span>
                            </div>
                            <span className="status">候補</span>
                            <span className="sell">可賣：0</span>
                            <span className="group">團位：0</span>
                            <span className="tip"><i className="ic-ln productreferf"></i>保證出團</span>
                            <span className="price">$4,999</span>
                        </li>
                    </ul> */



