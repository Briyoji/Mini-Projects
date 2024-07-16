import React from 'react'
import { useParams } from 'react-router-dom'


export default function Contact() {
  const { id } = useParams();
  return (
    <div>
        <h1>Contact {id}</h1> 
    </div>
  )
}
