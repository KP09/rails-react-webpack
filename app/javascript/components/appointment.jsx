import React from 'react'

// Stateless functional component
export const Appointment = ({appointment}) =>
    <div>
      <h3>{appointment.title}</h3>
      <p>{appointment.appointment_time}</p>
    </div>
