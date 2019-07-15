import React, { Component } from 'react'
import './Calendar.scss';
import moment from 'moment';
import jsonData from '../../data/data1.json';


export default class Calendar extends Component {

    state = {
        initYearMonth: moment().format("YYYYMM") || this.props.initYearMonth,
        firstDayWeek: '',
        endDayWeek: '',
        daysInMonth: '',
        days: [],
        data: [],
        listLeft: '',
        listCenter: '',
        listRight: '',

    }

    filterData = () => {
   
        let result = Array.from(new Set(jsonData));
        console.log('result',result.length); // [1, 2, "a", 3, "b"]
        console.log('origin',jsonData.length);
        //do something

    }

    createDays = async () => {
        let { firstDayWeek, daysInMonth, } = this.state;
        let data = [];
        for (let i = 0; i < daysInMonth; i++) {
            data.push({
                data: i,
                year: '1',
                month: '1',
                year: '1',
            })
        }

        for (let i = 0; i < firstDayWeek; i++) {
            data.unshift({
                data: 'n',
            })
        }

        const endDay = 42 - data.length;

        for (let i = 0; i < endDay; i++) {
            data.push({
                data: 'n',
            })
        }

        let newArray = [];
        let allArray = [];

        for (let i = 0; i < data.length; i++) {
            newArray.push(data[i]);
            if (newArray.length === 7) {
                allArray.push(newArray);
                newArray = [];
            }
        }

        console.log('allArray', allArray)
        await this.setState({
            days: allArray,
        })
    }

    prevMonth = async () => {
        await this.updateDayInfo(-1);
        await this.listValue();
        await this.createDays();
    }

    nextMonth = async () => {
        await this.updateDayInfo(+1);
        await this.listValue();
        await this.createDays();
    }

    leftList = () => { this.prevMonth() }
    centerList = () => { /*center*/ }
    rightList = () => { this.nextMonth() }
    
    listValue = () => {
        this.setState({
            listLeft: moment(this.state.initYearMonth, "YYYYMM").add(-1, "M").format("YYYY M"),
            listCenter: this.state.initYearMonth,
            listRight: moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYY M"),
        })
    }

    updateDayInfo(operation) {
        const initYearMonth = this.state.initYearMonth;
        const newDay = moment(initYearMonth, "YYYYMM").add(operation, "M").format("YYYYMM");
        const firstDayWeek = moment(newDay, "YYYYMM").startOf('month').format('d');
        const daysInMonth = moment(newDay).daysInMonth();

        this.setState({
            initYearMonth: newDay,
            firstDayWeek: firstDayWeek,
            daysInMonth: daysInMonth,
        })
    }

    async  componentDidMount() {
        await this.updateDayInfo(0);
        await this.listValue();
        await this.filterData();
        await this.createDays();
    }


    render() {
        const { listLeft, listCenter, listRight, days } = this.state;
        return (
            <div>
                {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className="calendars calendars_daymode">
                    <a href="javascript:void(0)" className="prev on" style={{ float: 'right' }}>切換模式</a>
                    <div className="calendars_tabWrap">
                        <a href="javascript:void(0)" className="prev on" onClick={this.prevMonth}>向左</a>
                        <ul className="ntb_tab">
                            <li className="tab" onClick={this.leftList}>
                                <a href="javascript:void(0)"><span>{listLeft}月</span></a>
                            </li>
                            <li className="tab" onClick={this.centerList}>
                                <a href="javascript:void(0)"><span>{listCenter}月</span></a>
                            </li>
                            <li className="tab" onClick={this.rightList}>
                                <a href="javascript:void(0)"><span>{listRight}月</span></a>
                            </li>
                        </ul>
                        <a href="javascript:void(0)" className="next on" onClick={this.nextMonth}>向右</a>
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
                            {days.map((week, index) => {
                                return <tr key={week[index]+index}>
                                    {week.map((day, index2) => {
                                        return <td key={day.data+index+index2} date={day.data}></td>
                                    })}
                                </tr>
                            })}
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



                    // <td className="currentDays" date="2019/08/01">
                    // <div className="day js_day">
                    //     <span class="num">1</span>
                    //     <span class="tip js_tip">成團</span>
                    //     <div className="details js_details">
                    //         <span class="status js_status lb-org">報名</span>
                    //         <span class="sell">可賣 : <i class="js_sell">2</i></span>
                    //         <span class="group">團位 : <i class="js_group">8</i></span>
                    //         <span class="price js_price">$22,900</span>
                    //     </div>
                    // </div> 