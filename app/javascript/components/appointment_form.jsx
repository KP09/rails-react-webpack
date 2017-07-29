import React from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'

export default class AppointmentForm extends React.Component {
  handleChange(e) {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmission();
  }

  setAppointmentTime(e) {
    const name = 'appointment_time';
    const obj = {};
    obj[name] = e;
    this.props.onUserInput(obj);
  }

  render() {
    var inputProps = {
      name: 'appointment_time'
    }

    return (
      <div>
        <h2>Make a new appointment</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            name="title"
            placeholder="Appointment title"
            value={this.props.title} onChange={this.handleChange.bind(this)}>
          </input>
          <Datetime
            open={true}
            input={false}
            inputProps={inputProps}
            value={moment(this.props.appointment_time)}
            onChange={this.setAppointmentTime.bind(this)} />
          <input type="submit" value="Make appointment"></input>
        </form>
      </div>
    )
  }
}
