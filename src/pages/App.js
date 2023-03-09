import React, { Component } from 'react'
import Calendar from '../components/Calendar/Calendar';
import jsonData from '../data/data4.json';

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
  prevMonth(){
    this.calendarRef.current. prevHaveDataMonth();
  }

  componentDidMount(){

  }

// use json-server api
// json-server --watch db.json --port 3004
//api url: http://127.0.0.1:3004/data
  render() {
    const { destroy }= this.state;
    return (
      <div>
        {destroy?<Calendar
          ref={ this.calendarRef }   
          dataSource={  jsonData }
          initYearMonth={ `http://127.0.0.1:3004/data` }
          />:''}
        
      </div>
    )
  }
}



