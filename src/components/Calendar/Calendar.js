import React, { Component } from 'react'
import './Calendar.scss';
import moment from 'moment';
import 'moment/locale/zh-tw';

moment.suppressDeprecationWarnings = true;
export default class Calendar extends Component {
    state = {
        initYearMonth: this.props.initYearMonth || moment().format("YYYYMM"),
        dataSource:  this.props.dataSource,
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
        dataDateMax: "",
        dataDateMin: "",
        dataSourceTmp: [],
        listLeftYYYYMM: '',
        listCenterYYYYMM: '',
        listRightYYYYMM: '',
    }

    initData = () => {
        // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
        // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
        //誰離我比較近>距離一樣>誰資料比較多
        const { initYearMonth, dataSource } = this.state;
        const initDay = Date.parse(moment(initYearMonth, "YYYYMM").format(`YYYY/MM`));
        const dataDateMaxMin = dataSource.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
        })
        const minDate = moment(dataDateMaxMin[0].date, "YYYY/MM/DD").format(`YYYY/MM`);
        const maxDate = moment(dataDateMaxMin[dataDateMaxMin.length - 1].date, "YYYY/MM/DD").format(`YYYY/MM`);
        console.log('maxmin', minDate, maxDate);
        console.log('data', dataSource);


        //處理找相近月的邏輯
        //https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
        function findClosestMonth(num, arr) {
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
        const closestDate = findClosestMonth(initDay, dataSource);
        console.log(findClosestMonth(initDay, dataSource));
        const closestDateFormat = moment(closestDate.date, "YYYYMMDD").format("YYYYMM");
        //找出距離目標月份差幾個月來區別出資料
        let closestDate_Year = +moment(closestDateFormat, "YYYYMM").format("YYYY");
        let closestDate_Month = +moment(closestDateFormat, "YYYYMM").format("MM");
        let initYearMonth_Year = +moment(initYearMonth, "YYYYMM").format("YYYY");
        let initYearMonth_Month = +moment(initYearMonth, "YYYYMM").format("MM");
        let diffMonth = null;
        //比年比月
        if (closestDate_Year === initYearMonth_Year) {
            diffMonth = Math.abs(initYearMonth_Month - closestDate_Month);
        } else {
            diffMonth = Math.abs(initYearMonth_Month - closestDate_Month);
            const diffYear = Math.abs(initYearMonth_Year - closestDate_Year);
            //每增加一年 月份+1
            for (let i = 0; i < diffYear; i++) {
                diffMonth -= (diffYear * 12)
            }

        }
        let anotherMonthCount = []
        const closestDateCount = dataSource.filter((data) => {
            return +moment(data.date, "YYYY/MM/DD").format("YYYYMM") == closestDateFormat;
        })
        if (Date.parse(initYearMonth) > Date.parse(closestDateFormat)) {
             anotherMonthCount = dataSource.filter((data) => {
                return +moment(data.date, "YYYY/MM/DD").format("YYYYMM") == moment(initYearMonth, "YYYYMM").add(+diffMonth, "M").format("YYYYMM");
            })
        } else {
             anotherMonthCount = dataSource.filter((data) => {
                return +moment(data.date, "YYYY/MM/DD").format("YYYYMM") == moment(initYearMonth, "YYYYMM").add(-diffMonth, "M").format("YYYYMM");
            })
        }

        this.setState({
            dataSourceTmp: dataSource
        })
        //找另一個方向的相差月份比資料數量
        console.log('closestDateCount', closestDateCount)
        console.log('anotherMonthCount', anotherMonthCount)

        //判斷方向待補
        let initCloseDate = '';

        if (closestDateCount > anotherMonthCount) {
            initCloseDate = closestDateFormat;
        } else if (closestDateCount === anotherMonthCount) { //如果比較的兩個月資料數一樣,找前面一個月
            initCloseDate = closestDateFormat;
        } else {
            initCloseDate = moment(initYearMonth, "YYYYMM").add(+diffMonth, "M").format("YYYYMM");
        }


        //如果過期的資料數量比較多,顯示另一筆一比可銷售的資料
        //秀恩提醒,不該給消費者看不能購買的"商品",應顯示未過期且可購買的月份
        //故在此做了一個判斷 經過比月筆數的答案再做一次關於月份的判斷，避免出現過期的月份
        if (Date.parse(initCloseDate) < Date.parse(initYearMonth)) {
            initCloseDate = moment(initYearMonth, "YYYYMM").add(-diffMonth, "M").format("YYYYMM");
        } else {
            initCloseDate = moment(initYearMonth, "YYYYMM").add(+diffMonth, "M").format("YYYYMM");
        }

        console.log('initCloseDate', initCloseDate, 'initYearMonth', initYearMonth)

        this.setState({
            initYearMonth: initCloseDate,
            dataDateMax: maxDate,
            dataDateMin: minDate,
        })

        //統一時間格式YYYY/MM 方便用於原生換算秒數
        // const initDay = moment(initYearMonth,"YYYYMM").format(`YYYY/MM`);
        // const newDataDay =moment(Date.parse(newData[0].date)).format(`YYYY/MM`);
        //找出最接近資料當月
        // console.log(moment(initYearMonth,"YYYYMM").format(`YYYY/MM`),newDataDay)
        //如果當月沒有資料,排序資料的月份後將月曆月份初始化到有資料的那一個月

    }


    dataSourceCheck = async () => {
        let dataSource = this.state.dataSource;

        if (typeof dataSource === 'string') {
            //1. regex url
            //2. call fetch
            //^([A-z0-9-_+]+\/)+([A-z0-9-_+]+\/) 只驗證aaaa/aaa/aa/aa/
            const regexUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(dataSource)
            if (regexUrl) {
                await fetch(dataSource, { method: 'get' })
                    .then((response) => {
                        // 這裡會得到一個 ReadableStream 的物件

                        // 可以透過 blob(), json(), text() 轉成可用的資訊
                        return response.json()
                    }).then((jsonData) => {
                        dataSource = jsonData;
                    })
            }
        }
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
        //邏輯為只留下可以賣的資料
        //優先顯示報名

        const set = new Set();
        let newResult = result.filter((item, index) => {
            if (!set.has(item.date) || item.status === "報名") { return set.add(item.date) }
        });


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
                weekDay: moment.weekdays(i),
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
                weekDay: null,
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
                weekDay: null,
            })
        }
        this.setState({
            data: data,
        })
    }

    prevMonth = async () => {
        // const { initYearMonth, dataDateMin } = this.state;
        // const nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        // const minFormat = Date.parse(dataDateMin);
        // nowFormat === minFormat ? await this.updateDayInfo(0) : await this.updateDayInfo(-1)
        // await this.listValue();
        // await this.createDays();
        // await this.filterData();
        const { initYearMonth, dataDateMin } = this.state;
        let nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        let MinFormat = Date.parse(moment(dataDateMin, "YYYYMM").add(0, "M").format("YYYY/MM"));
        let MinFormatPrev = Date.parse(moment(dataDateMin, "YYYYMM").add(+1, "M").format("YYYY/MM"));

        if (nowFormat <= MinFormatPrev) {
            let day = '';
            if(nowFormat<=MinFormat ){
                day = 0 
            }else{
                    day = moment(dataDateMin, "YYYYMM").format("MM") - moment(initYearMonth, "YYYYMM").format("MM")  ;
            }
              
            console.log('day--',day);
            const newDay = moment(initYearMonth, "YYYYMM").add(day, "M").format("YYYYMM");
            const firstDayWeek = moment(newDay, "YYYYMM").startOf('month').format('d');
            const daysInMonth = moment(newDay).daysInMonth();
            const year = moment(newDay, "YYYYMM").format("YYYY");
            const month = moment(newDay, "YYYYMM").format("MM");
            await this.setState({
                initYearMonth: newDay,
                firstDayWeek: firstDayWeek,
                daysInMonth: daysInMonth,
                year: year,
                month: month
            })
            await this.createDays();
            await this.filterData();
        } else {
            await this.updateDayInfo(-1)
            await this.listValue();
            await this.createDays();
            await this.filterData();
        }
    }

    nextMonth = async () => {
        // const { initYearMonth, dataDateMax } = this.state;
        // const nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        // const MaxFormat = Date.parse(moment(dataDateMax, "YYYYMM").add(-0, "M").format("YYYY/MM"));
        // nowFormat === MaxFormat ?  await this.updateDayInfo(+0) : await this.updateDayInfo(+1)
        // await this.listValue();
        // await this.createDays();
        // await this.filterData();

        const { initYearMonth, dataDateMax,year } = this.state;
        let nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        let MaxFormat = Date.parse(moment(dataDateMax, "YYYYMM").add(0, "M").format("YYYY/MM"));
        let MaxFormatPrev = Date.parse(moment(dataDateMax, "YYYYMM").add(-1, "M").format("YYYY/MM"));

        let dateMaxYear = + moment(dataDateMax, "YYYYMM").format("YYYY");
        let nowYear =  +year
      

        console.log('moment(initYearMonth, "YYYYMM").format("YYYY/MM")',moment(initYearMonth, "YYYYMM").format("YYYY/MM"))
        if (nowFormat >= MaxFormatPrev) {
            let day = '';
            if(nowFormat>=MaxFormat ){
                day = 0 

            }else{
                    day = moment(dataDateMax, "YYYYMM").format("MM") - moment(initYearMonth, "YYYYMM").format("MM") ;
            }
            console.log('day++',day);
            const newDay = moment(initYearMonth, "YYYYMM").add(day, "M").format("YYYYMM");
            const firstDayWeek = moment(newDay, "YYYYMM").startOf('month').format('d');
            const daysInMonth = moment(newDay).daysInMonth();
            const year = moment(newDay, "YYYYMM").format("YYYY");
            const month = moment(newDay, "YYYYMM").format("MM");
            await this.setState({
                initYearMonth: newDay,
                firstDayWeek: firstDayWeek,
                daysInMonth: daysInMonth,
                year: year,
                month: month
            })
            await this.createDays();
            await this.filterData();
        } else {
            await this.updateDayInfo(+1)
            await this.listValue();
            await this.createDays();
            await this.filterData();
        }
    }

    leftList = () => { this.prevMonth() }
    centerList = () => { 
        /*center*/ 
        const{ initYearMonth,dataDateMax,dataDateMin }=this.state;
        const now = Date.parse(initYearMonth); 
        const min = Date.parse(moment(dataDateMin, "YYYY/MM").format("YYYYMM")); 
        const max = Date.parse(moment(dataDateMax, "YYYY/MM").format("YYYYMM")); 
        if(now>=max){this.leftList()};
        if(now<=min){this.rightList()};
    }
    rightList = () => { this.nextMonth() }

    listValue = () => {
        this.setState({
            listLeft: moment(this.state.initYearMonth, "YYYYMM").add(-1, "M").format("YYYY M"),
            listCenter: moment(this.state.initYearMonth, "YYYYMM").add(0, "M").format("YYYY M"),
            listRight: moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYY M"),
            listLeftYYYYMM: moment(this.state.initYearMonth, "YYYYMM").add(-1, "M").format("YYYYMM"),
            listCenterYYYYMM: moment(this.state.initYearMonth, "YYYYMM").add(0, "M").format("YYYYMM"),
            listRightYYYYMM: moment(this.state.initYearMonth, "YYYYMM").add(+1, "M").format("YYYYMM"),
        })
    }

    updateDayInfo(action) {
        const { initYearMonth } = this.state;
        const newDay = moment(initYearMonth, "YYYYMM").add(action, "M").format("YYYYMM");
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


    prevHaveDataMonth = async () => {
        let { initYearMonth, dataDateMin } = this.state;
        const nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        const minFormat = Date.parse(dataDateMin);

        if (nowFormat === minFormat) {
            console.log('zzzzz')
        } else {
            let hasData = [];
            do {
                await this.updateDayInfo(-1);
                let { dataSourceTmp, initYearMonth } = this.state;
                hasData = await dataSourceTmp.filter((data) => {
                    return +moment(data.date, "YYYY/MM/DD").format("YYYYMM") == moment(initYearMonth, "YYYYMM").format("YYYYMM");
                })
            } while (hasData.length === 0);

            await this.listValue();
            await this.createDays();
            await this.filterData();
            console.log('hasdata', hasData)

        }
    }
    nextHaveDataMonth = async () => {
        let { initYearMonth, dataDateMax } = this.state;
        const nowFormat = Date.parse(moment(initYearMonth, "YYYYMM").format("YYYY/MM"));
        const MaxFormat = Date.parse(dataDateMax);

        if (nowFormat === MaxFormat) {
            console.log('zzzzz 沒月可以換了')
        } else {

            let hasData = [];
            do {
                await this.updateDayInfo(+1);
                let { dataSourceTmp, initYearMonth } = this.state;
                hasData = await dataSourceTmp.filter((data) => {
                    return +moment(data.date, "YYYY/MM/DD").format("YYYYMM") == moment(initYearMonth, "YYYYMM").format("YYYYMM");
                })
            } while (hasData.length === 0);

            await this.listValue();
            await this.createDays();
            await this.filterData();
            console.log('hasdata', hasData)
        }
    }

    resetData = async (addNewData) => {
        //resetData
        //洗掉舊的資料留下新的
        await this.setState({ dataSource: addNewData });
        await this.dataSourceCheck();
        await this.initData();
        await this.updateDayInfo(0);
        await this.listValue();
        await this.createDays();
        await this.filterData();
        console.log('addDataFunction')
    }

    addData = async (addNewData) => {
        //addData
        // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
        const { dataSource } = this.state;
        //加入資料後,整合所有資料,重新跑一次驗證+整理
        const concatData = await dataSource.concat(addNewData);
        await this.setState({ dataSource: concatData });
        await this.dataSourceCheck();
        await this.initData();
        await this.updateDayInfo(0);
        await this.listValue();
        await this.createDays();
        await this.filterData();
        console.log('addDataFunction')
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
        const { initYearMonth, listLeft, listCenter, listRight, days, modeClass, activeId, listRightYYYYMM, listCenterYYYYMM, listLeftYYYYMM } = this.state;
        return (
            <div>
                {/* 可加上這兩個修飾符來切換日曆模式或列表模式 calendars_daymode,calendars_listmode */}
                <div className={`calendars ${modeClass ? 'calendars_daymode' : 'calendars_listmode'}`}>
                    <a href="javascript:void(0)" className="prev on" onClick={this.changeMode} style={{ float: 'right' }}>切換模式</a>
                    <div className="calendars_tabWrap">
                        <a href="javascript:void(0)" className="prev on" onClick={this.prevMonth}>{`<`}</a>
                        <ul className="ntb_tab">
                            <li className="tab" onClick={this.leftList}>
                                <a className={`${listLeftYYYYMM === initYearMonth ? 'active' : false}`} href="javascript:void(0)"><span>{listLeft}月</span></a>
                            </li>
                            <li className="tab" onClick={this.centerList}>
                                <a className={`${listCenterYYYYMM === initYearMonth ? 'active' : false}`} href="javascript:void(0)"><span>{listCenter}月</span></a>
                            </li>
                            <li className="tab" onClick={this.rightList}>
                                <a className={`${listRightYYYYMM === initYearMonth ? 'active' : false}`} href="javascript:void(0)"><span>{listRight}月</span></a>
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
                                                ${+activeId === +day.index && day.data !== 'noData' && day.index !== "" ? `active` : ''} 
                                                ${day.data === "noData" ? "noData" : null}`}
                                                onClick={this.activeClass}>
                                                {day.data === 'noData' ? '' : (
                                                    <div className={`day js_day ${day.index === "" ? 'none' : ''}`}>
                                                        <div className="details js_details">
                                                            <span className={`status js_status ${day.status === "報名" ? 'status_org' : 'status_green'}`}>{day.status}</span>
                                                            <span className="sell">可賣: <i className="js_sell">{day.availableVancancy}</i></span>
                                                            <span className="group">團位: <i className="js_group">{day.totalVacnacy}</i></span>
                                                            <span className="price js_price">${day.price}</span>
                                                        </div>
                                                        <div className="m_info">
                                                            <div className="m_left">
                                                                <div className="m_day">{day.index}</div>
                                                                <div className="m_week">{day.weekDay}</div>
                                                            </div>
                                                            <div className="middle">
                                                                <div className="middle_text">
                                                                    <span className="sell">可賣: <i className="js_sell">{day.availableVancancy}</i></span>
                                                                    <span className="group">團位: <i className="js_group">{day.totalVacnacy}</i></span>
                                                                </div>
                                                                <div className="group_tag">
                                                                    <span>{day.guaranteed ? '成團' : ''}</span>
                                                                </div>

                                                            </div>
                                                            <div className="right">
                                                                <span className={`status ${day.status === "報名" ? 'status_org' : 'status_green'}`}>{day.status}</span>
                                                                <span className="price js_price">${day.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
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
