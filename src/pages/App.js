import React, { Component } from 'react'
import Calendar from '../components/Calendar/Calendar';
import Demo from '../components/demo/demo';
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
          dataSource={ false }
          initYearMonth={ `201907` }
          dataKeySetting={ false }
          />
          {/* <Demo/> */}
      </div>
    )
  }
}



