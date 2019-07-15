import React, { Component } from 'react'
import './Calendar.scss';
import moment from 'moment';
import jsonData from '../../data/data5.json';


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
        year:'',
        month:'',

    }

    finishData = (data) => {
        let newArray = [];
        let allArray = [];

        for (let i = 0; i < data.length; i++) {
            newArray.push(data[i]);
            if (newArray.length === 7) {
                allArray.push(newArray);
                newArray = [];
            }
        }
        console.log(data);
        this.setState({
            days: allArray,
            data:[],
        })

    }
    

    filterData = () => {
        let { year, data, month } = this.state;
        //拿出當年當月的資料
        const result = jsonData.filter((json,index)=>{
             return  json.date.split("").slice(0,4).join('') === year && json.date.split("").slice(5,7).join('') === month
        })
        //過濾掉重複的資料
        const set = new Set();
        let newResult =  result.filter(item => !set.has(item.date) ? set.add(item.date) : false);
        //把過濾好的資料塞進正式data裡面準備render
        for(let i=0;i<newResult.length;i++){
            for(let j=0;j<data.length;j++){
                let resultDate = newResult[i].date.split("").slice(8,10).join('');
                let dataDate = data[j].date.split("").slice(7,9).join('');
                if(resultDate===dataDate){
                    data[j].data = 'Data';
                    data[j].guaranteed = newResult[i].guaranteed;
                    data[j].price = newResult[i].price;
                    data[j].availableVancancy = newResult[i].availableVancancy;
                    data[j].totalVacnacy = newResult[i].totalVacnacy;
                    data[j].status = newResult[i].status;
                }
            }
        }

        this.finishData(data);
    }

    createDays = async () => {
        const { firstDayWeek, daysInMonth,data,initYearMonth } = this.state;

        for (let i = 1; i <= daysInMonth; i++) {
            data.push({
                data: "noData",
                date:moment(`${initYearMonth}${i}`,'YYYYMMDD').format('YYYY/M/D'),
                index:i,
                guaranteed: false,
                price: 0,
                availableVancancy: 0,
                totalVacnacy: 0,
                status: " ",
            })
        }

        for (let i = 0; i < firstDayWeek; i++) {
            data.unshift({
                index: '',
                date: "noData",
                guaranteed: false,
                price: 0,
                availableVancancy: 0,
                totalVacnacy: 0,
                status: " ",
            })
        }

        const endDay = 42 - data.length;

        for (let i = 0; i < endDay; i++) {
            data.push({
                index: '',
                date: "noData",
                guaranteed: false,
                price: 0,
                availableVancancy: 0,
                totalVacnacy: 0,
                status: " ",
            })
        }
        this.setState({
            data:data,
        })
    }

    prevMonth = async () => {
        await this.updateDayInfo(-1);
        await this.listValue();
        await this.createDays();
        await this.filterData();
    }

    nextMonth = async () => {
        await this.updateDayInfo(+1);
        await this.listValue();
        await this.createDays();
        await this.filterData();
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
        const year = moment(initYearMonth, "YYYYMM").format("YYYY");
        const month = moment(initYearMonth, "YYYYMM").format("MM");
        this.setState({
            initYearMonth: newDay,
            firstDayWeek: firstDayWeek,
            daysInMonth: daysInMonth,
            year:year,
            month:month
        })
    }

    async  componentDidMount() {
        await this.updateDayInfo(0);
        await this.listValue();
        await this.createDays(); 
        await this.filterData();
    }


    render() {
        const { listLeft, listCenter, listRight, days } = this.state;
        return (
            <div>
                {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className="calendars calendars_daymode">
                    <a href="javascript:void(0)" className="prev on" style={{ float: 'right' }}>切換模式</a>
                    <div className="calendars_tabWrap">
                        <a href="javascript:void(0)" className="prev on" onClick={this.prevMonth}>{`<`}</a>
                        <ul className="ntb_tab">
                            <li className="tab" onClick={this.leftList}>
                                <a href="javascript:void(0)"><span>{listLeft}月</span></a>
                            </li>
                            <li className="tab" onClick={this.centerList}>
                                <a className={`active`} href="javascript:void(0)"><span>{listCenter}月</span></a>
                            </li>
                            <li className="tab" onClick={this.rightList}>
                                <a href="javascript:void(0)"><span>{listRight}月</span></a>
                            </li>
                        </ul>
                        <a href="javascript:void(0)" className="next on" onClick={this.nextMonth}>{`>`}</a>
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
                                        return (
                                        <td key={day.index+index+index2} date={day.index} guaranteed={day.guaranteed?'成團':''}
                                        className={`${day.index === ''?'disable':''}` }>
                                            {day.data==='noData'?'' :(
                                            <div className={`day js_day ${day.index ===""?'none':''}`}>
                                                    <div className="details js_details">
                                                        <span className={`status js_status ${day.status==="報名"?'status_org':'status_green'}`}>{day.status}</span>
                                                        <span className="sell">可賣: <i className="js_sell">{day.availableVancancy}</i></span>
                                                        <span className="group">團位: <i className="js_group">{day.totalVacnacy}</i></span>
                                                        <span className="price js_price">${day.price}</span>
                                                    </div>
                                                </div> )
                                        }
                                            
                                        </td>)
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
