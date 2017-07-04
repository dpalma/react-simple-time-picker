import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './timepicker.css'

import 'font-awesome/scss/font-awesome.scss'

function TimeGridCell(props) {
  let minstr = props.minute.toString().padStart(2, "0");
  return (
    <div className={"timegrid__min timegrid__min"+minstr}
      onClick={()=>console.log("clicked "+props.hour.toString()+":"+props.minute.toString())}>{":"+minstr}</div>
  )
}

class TimeGrid extends Component {
    render() {
      return(
        <div className="timegrid__container">
          {this.renderTimeGridColumn("am")}
          {this.renderTimeGridColumn("pm")}
        </div>
      )
    }

    // meridiem argument should be "am" or "pm"
    renderTimeGridColumn(meridiem) {
      return (
        <div className={"timegrid__"+meridiem+"col"}>
          <div className="timegrid__colheader">{meridiem.toUpperCase()}</div>
          {this.renderTimeGridHours(meridiem)}
        </div>
      )
    }

    renderTimeGridHours(meridiem) {
      let hours = [];
      for (let i = 0; i < 12; ++i) {
          let h = i || 12;
          hours.push(
            <div key={h} className="timegrid__hour">
              <div className="timegrid__hourtext">{h}:00</div>
              <div className="timegrid__minutes">
                <TimeGridCell hour={h} minute={0} />
                <TimeGridCell hour={h} minute={15} />
                <TimeGridCell hour={h} minute={30} />
                <TimeGridCell hour={h} minute={45} />
              </div>
            </div>
          )
      }
      return hours;
    }
}

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            value: 12
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    showDropdown() {
        this.setState({ isOpen: true });
        document.addEventListener("click", this.hideDropdown);
    }

    hideDropdown() {
        this.setState({ isOpen: false });
        document.removeEventListener("click", this.hideDropdown);
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    selectItem(value) {
        this.setState({value})
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {
        return (
            <div className={"timepicker__container" + (this.state.isOpen ? " timepicker__container__open" : " timepicker__container__closed")}>
                <div className="timepicker__display" onClick={this.toggleDropdown}>
                    {this.state.value}
                    <i className="fa fa-clock-o"></i>
                </div>
                <div className="timepicker__droplist">
                  <TimeGrid />
                </div>
            </div>
        )
    }

    renderChoices() {
        let choices = [];
        for (let i = 0; i < 12; ++i) {
            let t = i || 12;
            choices.push(<div key={t} onClick={this.selectItem.bind(this, t)}>{t}</div>)
        }
        return choices;
    }
}

TimePicker.PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
}
