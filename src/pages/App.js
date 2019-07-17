import React, { Component } from 'react'
import Calendar from '../components/Calendar/Calendar';
import jsonData from '../data/data2.json';
export default class App extends Component {
  constructor(){
    super();
    this.state={
      destroy:true,
    }
    this.calendarRef=React.createRef();
  }

  addData(data){
    // addData
    this.calendarRef.current.addData(data);
  }
  switch(event){
    //switch
    this.calendarRef.current.changeMode();
  }
  resetData(data){
    //resetData
    this.calendarRef.current.resetData(data);
  }
  destroy(){
    //destroy
    const destroy = this.state.destroy;
    this.setState({
      destroy:! destroy
    })
  }
  nextMonth(){
    this.calendarRef.current.nextHaveDataMonth();
  }

  componentDidMount(){

  }
//http://localhost:3000/data
  render() {
    const {destroy}=this.state;
    return (
      <div>
        {destroy?<Calendar
          ref={ this.calendarRef }
          // dataSource={ jsonData }
          dataSource={ `http://127.0.0.1:3000/data` }
          initYearMonth={ `201710` }
          />:''}
        
      </div>
    )
  }
}



