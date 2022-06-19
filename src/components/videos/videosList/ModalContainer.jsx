import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SetActiveVideo, startDeleteVideo } from '../../../store/slices/videos/thunk'

export const ModalContainer = (props) => {

  const {image, createdAt} = props

    const dispatch = useDispatch()

    const history = useHistory()

    const handledSet = () => {
      dispatch(SetActiveVideo(props))
      history.push('/Videos')
    }

    const Handleddelete = () => {
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este video?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteVideo(props))
          }
        })
      }

    return (
        <>
          <tr>
              <td>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</td>
              <td><video className='rounded' src = {image} alt="" style = {{height: '60px', width: '60px', objectFit: 'cover'}} ></video></td>
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
