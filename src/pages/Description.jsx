import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import useAxios from '../utils/useAxios'

const Description = () => {
  const api = useAxios()
  const {quan,ids,table} = useParams()
  const navigate = useNavigate()
  const [description, setDescription] = useState(localStorage.getItem(`description/${ids}`))
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const desp = localStorage.getItem(`description/${ids}`)

  const handleSubmit = (e) => {
    localStorage.setItem(`description/${ids}`,description)
    e.preventDefault()
    const formData = new FormData()
    formData.append('description', description)
    formData.append('quantity', quan)
    api.put(`/editorder/${ids}`, formData)
      .then(() => {
        setDescription('')
        navigate(`/home/${table}`)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="order-checkout">
      <div className="checkout-container">
        <h3 className="checkout-heading">Add Note</h3>
        <label htmlFor="description">Additional Details:</label>
        <textarea name="description" id="description" placeholder="Write Additional Details...." cols="30" rows="5" value={description} onChange={handleDescriptionChange}></textarea>
        <button className='button-order' type='submit' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Description