import React, { Component } from 'react'
import './Calendar.scss';
import moment from 'moment';



export default class Calendar extends Component {

    state = {
        initYearMonth: moment().format("YYYYMM") || this.props.initYearMonth,
        firstDayWeek: '',
        endDayWeek: '',
        daysInMonth: '',
        days:[],
        data:[],
        listLeft: '',
        listCenter: '',
        listRight: '',

    }

    filterData = () => {
        //do something

    } 

    createDays = () => {
        const { firstDayWeek, endDayWeek, daysInMonth, data } = this.state;

        for(let i=0;i<daysInMonth;i++){
            data.push({
                data:i,
                year:'',
                month:'',
                year:'',
            })
        }

        for(let i=0;i<firstDayWeek;i++){
            data.unshift({
                data:'null',
                year:'',
                month:'',
                year:'',
            })
        }
        const endDay = 42-data.length;
        console.log(endDay);
        
        for(let i=0;i<endDay;i++){
            data.push({
                data:'null',
                year:'',
                month:'',
                year:'',
            })
        }
        console.log('data',data)
        

    }

     prevMonth = async ()=> {

        let prev = moment(this.state.initYearMonth, "YYYYMM").add(-1, "M").format("YYYYMM");
        await this.setState({
            initYearMonth: prev,

        })
        await this.listValue();
        console.log('prev',prev);
    }

    nextMonth = async () => {

        let next = moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYYMM");
        await this.setState({
            initYearMonth: next,

        })
        await this.listValue();
        console.log('next',next);
    }

    leftList = () => {this.prevMonth()}
    centerList = () => { /*center*/}
    rightList = () => {this.nextMonth()}

    listValue = () => {
        this.setState({
            listLeft: moment(this.state.initYearMonth, "YYYYMM").add(-1, "M").format("YYYY M"),
            listCenter: this.state.initYearMonth,
            listRight: moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYY M"),
        })
    }


  async  componentDidMount() {
        let { initYearMonth } = this.state;
        
        const firstDayWeek = moment(initYearMonth, "YYYYMM").startOf('month').format('d');
        const endDayWeek = moment(initYearMonth, "YYYYMM").endOf('month').format('d');
        const daysInMonth = moment(initYearMonth).daysInMonth();
        console.log('firstDayWeek', firstDayWeek);
        console.log('endDayWeek', endDayWeek);
        console.log('daysInMonth', daysInMonth);
     await   this.setState({
            firstDayWeek: firstDayWeek,
            endDayWeek: endDayWeek,
            daysInMonth: daysInMonth,
        });
     await   this.listValue();
     await   this.createDays();
        
    }


    render() {
        const { initYearMonth, listLeft, listCenter, listRight, } = this.state;
        return (
            <div>
                {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className="calendars calendars_daymode">
                <a href="#" className="prev on"  style={{float:'right'}}>切換模式</a>
                    <div className="calendars_tabWrap">
                        <a href="#" className="prev on" onClick={this.prevMonth}>向左</a>
                        <ul className="ntb_tab">
                            <li className="tab" onClick={this.leftList}>
                                <a href="#"><span>{listLeft}月</span></a>
                            </li>
                            <li className="tab" onClick={this.centerList}>
                                <a href="#"><span>{listCenter}月</span></a>
                            </li>
                            <li className="tab" onClick={this.rightList}>
                                <a href="#"><span>{listRight}月</span></a>
                            </li>
                        </ul>
                        <a href="#" className="next on" onClick={this.nextMonth}>向右</a>
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