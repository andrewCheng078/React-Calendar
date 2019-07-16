import React, { Component } from 'react'
import Calendar from '../components/Calendar/Calendar';
import jsonData from '../data/data2.json';
export default class App extends Component {
  constructor(){
    super();
    this.state={

    }
    this.calendarRef=React.createRef();
  }

  addData(data){
    // addData
  }
  switch(event){
    //switch
  }
  resetData(){
    //resetData
  }
  destroy(){
    //destroy
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
          <Calendar
          ref={ this.calendarRef }
          dataSource={ jsonData }
          initYearMonth={ `201907` }
          dataKeySetting={ false }
          />
      </div>
    )
  }
}



