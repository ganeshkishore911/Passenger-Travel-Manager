import React, { useEffect, useState } from 'react'
import API from '../services/Api'
import { useNavigate } from 'react-router-dom'

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
      const res = await API.get("api/travels/")
      setdata(res.data)
    } catch (err) {
      console.error(err)
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
  <div>
    <h2>Passenger Travel List</h2>

    {data.length === 0 ? (
      <p>No travels found</p>
    ) : (
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
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
                    <button onClick={(e) => handleUpdate(e, item.id)}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.source}</td>
                  <td>{item.destination}</td>
                  <td>{item.travel_date}</td>

                  <td>
                    <button onClick={(e) => startEdit(e, item)}>Edit</button>
                    <button onClick={(e) => handleDelete(e, item.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)
}

export default TravelList