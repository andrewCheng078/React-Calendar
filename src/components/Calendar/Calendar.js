import React, { Component } from 'react'
import './Calendar.scss';
import moment from 'moment';
import jsonData from '../../data/data5.json';

moment.suppressDeprecationWarnings = true;
export default class Calendar extends Component {

    state = {
        initYearMonth: this.props.initYearMonth || moment().format("YYYYMM"),
        dataSource: '',
        firstDayWeek: '',
        endDayWeek: '',
        daysInMonth: '',
        days: [],
        data: [],
        listLeft: '',
        listCenter: '',
        listRight: '',
        year: '',
        month: '',
        modeClass: true,
        activeId: NaN,

    }

    initData = () => {
        // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
        // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
        const { initYearMonth, dataSource } = this.state;
        const initDay = Date.parse(moment(initYearMonth, "YYYYMM").format(`YYYY/MM`))
        const newData = dataSource.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
        });


        function closest(num, arr) {
            var curr = Date.parse(arr[0].date);
            var diff = Math.abs(num - curr);
            for (var val = 0; val < arr.length; val++) {
                var newdiff = Math.abs(num - Date.parse(arr[val].date));
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = Date.parse(arr[val].date);
                    var currentobj = arr[val]
                }
            }
            return currentobj;
        }
        const closestDate = closest(initDay, dataSource)
        const initCloseDate = moment(closestDate.date, "YYYYMMDD").format("YYYYMM");

        this.setState({
            initYearMonth: initCloseDate
        })



        //統一時間格式YYYY/MM 方便用於原生換算秒數
        // const initDay = moment(initYearMonth,"YYYYMM").format(`YYYY/MM`);
        // const newDataDay =moment(Date.parse(newData[0].date)).format(`YYYY/MM`);
        //找出最接近資料當月
        // console.log(moment(initYearMonth,"YYYYMM").format(`YYYY/MM`),newDataDay)
        //如果當月沒有資料,排序資料的月份後將月曆月份初始化到有資料的那一個月

    }
    dataSourceCheck = () => {
        let dataSource = this.props.dataSource;


        // const regex = '';
        // if (dataSource === regex) {
        //     //do somehing call ajax and setData to dataSource
        // } else {
        //     alert('noooo')
        // }
        //regex do something and call ajax setState



        if (Array.isArray(dataSource)) {
            const checkJson = dataSource[0].guaranteed === undefined && dataSource[0].availableVancancy === undefined && dataSource[0].totalVacnacy === undefined;
            if (checkJson) {
                //轉換 for...
                for (let i = 0; i < dataSource.length; i++) {

                    dataSource[i]["guaranteed"] = dataSource[i]["certain"];
                    delete dataSource[i]["certain"];

                    dataSource[i]["availableVancancy"] = dataSource[i]["onsell"];
                    delete dataSource[i]["onsell"];

                    dataSource[i]["totalVacnacy"] = dataSource[i]["total"];
                    delete dataSource[i]["total"];

                    dataSource[i]["status"] = dataSource[i]["state"];
                    delete dataSource[i]["state"];
                }
            }
        }
        //資料格式過濾後才setState
        this.setState({
            dataSource: dataSource,
        })

    }

    finishData = (data) => {
        //把處理好的資料轉換成render的格式
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
            data: [],
        })

    }


    filterData = () => {
        let { year, data, month, dataSource } = this.state;

        //拿出當年當月的資料
        const result = dataSource.filter((json, index) => {
            return json.date.split("").slice(0, 4).join('') === year && json.date.split("").slice(5, 7).join('') === month
        })
        console.log('當月的資料', result);
        //過濾掉重複的資料
        const set = new Set();
        let newResult = result.filter(item => !set.has(item.date) ? set.add(item.date) : false);
        console.log('當月的資料過濾後', newResult)
        //把過濾好的資料塞進正式data裡面準備render
        for (let i = 0; i < newResult.length; i++) {
            for (let j = 0; j < data.length; j++) {

                // let resultDate = newResult[i].date.split("").slice(8,10).join('');
                // let dataDate = data[j].date.split("").slice(8,10).join('');
                //改用格式化時間來比對
                let resultDate = Date.parse(newResult[i].date)
                let dataDate = Date.parse(data[j].date)

                if (resultDate === dataDate) {
                    data[j].data = 'Data';
                    data[j].guaranteed = newResult[i].guaranteed;
                    data[j].price = newResult[i].price;
                    data[j].availableVancancy = newResult[i].availableVancancy;
                    data[j].totalVacnacy = newResult[i].totalVacnacy;
                    data[j].status = newResult[i].status;
                }
            }
        }
        console.log('data', data);
        this.finishData(data);
    }

    createDays = async () => {
        const { firstDayWeek, daysInMonth, data, initYearMonth } = this.state;

        for (let i = 1; i <= daysInMonth; i++) {
            data.push({
                data: "noData",
                date: moment(`${initYearMonth}`, 'YYYYMM').format(`YYYY/MM/${i}`),
                index: i,
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
            data: data,
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
            listCenter: moment(this.state.initYearMonth, "YYYYMM").add(0, "M").format("YYYY M"),
            listRight: moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYY M"),
        })
    }

    updateDayInfo(operation) {
        const initYearMonth = this.state.initYearMonth;
        const newDay = moment(initYearMonth, "YYYYMM").add(operation, "M").format("YYYYMM");
        const firstDayWeek = moment(newDay, "YYYYMM").startOf('month').format('d');
        const daysInMonth = moment(newDay).daysInMonth();
        const year = moment(newDay, "YYYYMM").format("YYYY");
        const month = moment(newDay, "YYYYMM").format("MM");
        this.setState({
            initYearMonth: newDay,
            firstDayWeek: firstDayWeek,
            daysInMonth: daysInMonth,
            year: year,
            month: month
        })
    }

    changeMode = () => {
        //changeMode
        const modeClass = this.state.modeClass;
        this.setState({ modeClass: !modeClass })
    }
    activeClass = (e) => {
        this.setState({
            activeId: e.currentTarget.id
        })
    }
    resetData = () => {
        //resetData
    }
    destroy = () => {
        //destroy
    }

    async componentDidMount() {
        await this.dataSourceCheck();
        await this.initData();
        await this.updateDayInfo(0);
        await this.listValue();
        await this.createDays();
        await this.filterData();
    }


    render() {
        const { listLeft, listCenter, listRight, days, modeClass, activeId } = this.state;
        return (
            <div>
                {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className={`calendars ${modeClass ? 'calendars_daymode' : 'calendars_listmode'}`}>
                    <a href="javascript:void(0)" className="prev on" onClick={this.changeMode} style={{ float: 'right' }}>切換模式</a>
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
                                return <tr key={week[index] + index}>
                                    {week.map((day, index2) => {
                                        return (
                                            <td key={day.index + index + index2} id={day.index} date={day.index} guaranteed={day.guaranteed ? '成團' : ''}
                                                className={`${day.index === '' ? 'disable' : ''} 
                                                ${+activeId === +day.index && day.data !== 'noData' && day.index !== "" ? `active` : ''} `}
                                                onClick={this.activeClass}>
                                                {day.data === 'noData' ? '' : (
                                                    <div className={`day js_day ${day.index === "" ? 'none' : ''}`}>
                                                        <div className="details js_details">
                                                            <span className={`status js_status ${day.status === "報名" ? 'status_org' : 'status_green'}`}>{day.status}</span>
                                                            <span className="sell">可賣: <i className="js_sell">{day.availableVancancy}</i></span>
                                                            <span className="group">團位: <i className="js_group">{day.totalVacnacy}</i></span>
                                                            <span className="price js_price">${day.price}</span>
                                                        </div>
                                                    </div>)
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
