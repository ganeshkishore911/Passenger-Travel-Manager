import React, { useEffect, useState } from 'react'
import API from '../services/Api'
import { useNavigate } from 'react-router-dom'
import Logger from '../services/Loggers'
import "../styles/TravelList.scss"

const TravelList = () => {
  const [data, setdata] = useState([])
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({
    source: "",
    destination: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    fetchdata()
  }, [])
  const fetchdata = async () => {
    try {
      Logger.info("fetching the travel list")
      const res = await API.get("api/travels/")
      setdata(res.data)
      Logger.info("fetched data",res.data)
      Logger.debug("Travel data received",res.data)
    } catch (err) {
      Logger.error("failed to fetch",err)
    }
  }


  const startEdit = (e, item) => {
    e.stopPropagation()
    setEditId(item.id)
    setEditForm({
      source: item.source,
      destination: item.destination
    })
  }


  const handleUpdate = async (e, id) => {
    e.stopPropagation()

    try {
      await API.put(`api/travelUpdate/${id}/`, editForm)

      setEditId(null)
      fetchdata()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()

    try {
      await API.delete(`api/travelDelete/${id}/`)
      fetchdata()
    } catch (err) {
      console.error(err)
    }
  }

  return (
  <div className='travel-list' >
    <h2>Passenger Travel List</h2>

    {data.length === 0 ? (
      <p>No travels found</p>
    ) : (
      <div className='table-container'>
      <table >
        <thead>
          <tr>
            <th>Passenger</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/passenger/${item.passenger}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.passenger_name}</td>

              {editId === item.id ? (
                <>
                  <td>
                    <input
                      value={editForm.source}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setEditForm({ ...editForm, source: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editForm.destination}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setEditForm({ ...editForm, destination: e.target.value })
                      }
                    />
                  </td>

                  <td>{item.travel_date}</td>

                  <td>
                    <button className='save-btn' onClick={(e) => handleUpdate(e, item.id)}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.source}</td>
                  <td>{item.destination}</td>
                  <td>{item.travel_date}</td>

                  <td className='actions'>
                    <button className="edit-btn" onClick={(e) => startEdit(e, item)}>Edit</button>
                    <button className=" delete-btn" onClick={(e) => handleDelete(e, item.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
  </div>
)
}

export default TravelList