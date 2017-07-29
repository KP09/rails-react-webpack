// Standard React imports
import React from 'react'
import ReactDOM from 'react-dom'

// Additional packages
import update from 'immutability-helper'

// Imported classes
import AppointmentForm from './appointment_form'

// Imported named constants
import { AppointmentsList } from './appointments_list'

import $ from 'jquery'

export default class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: 'Your title here',
      appointment_time: 'Select a date and time'
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleUserInput(obj) {
    this.setState(obj);
  }

  handleFormSubmission() {
    const appointment = {
      title: this.state.title,
      appointment_time: this.state.appointment_time
    }
    $.ajax({
      type: 'POST',
      url: '/appointments',
      data: JSON.stringify({appointment}),
      error: function(e) {
        console.log(e)
      },
      dataType: 'json',
      contentType: 'application/json'
    }).done(function(data) {
      this.addNewAppointment(data);
    }.bind(this));
  }

  addNewAppointment(appointment) {
    const appointments = update(this.state.appointments, {$push: [appointment]});
    this.setState({appointments: appointments.sort(function(a,b){
      return new Date(a.appointment_time) - new Date(b.appointment_time);
    })})
  }

  render() {
    return (
      <div>
        <AppointmentForm
          title={this.state.title}
          appointment_time={this.state.appointment_time}
          onUserInput={this.handleUserInput}
          onFormSubmission={this.handleFormSubmission}
        />
        <AppointmentsList
          appointments={this.state.appointments}
        />
      </div>
    )
  }
}
