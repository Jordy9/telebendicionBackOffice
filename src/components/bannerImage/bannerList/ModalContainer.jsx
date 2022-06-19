import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SetActiveImage, startDeleteImage } from '../../../store/slices/images/thunks'

export const ModalContainer = (props) => {

  const {image, createdAt} = props

    const dispatch = useDispatch()

    const history = useHistory()

    const handledSet = () => {
      dispatch(SetActiveImage(props))
      history.push('/BannerImage')
    }

    const Handleddelete = () => {
        Swal.fire({
          title: '¿Esta seguro que desea eliminar esta imagen del banner?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteImage(props))
          }
        })
      }

    return (
        <>
          <tr>
              <td>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</td>
              <td><img className='rounded' src = {image} alt="" style = {{height: '60px', width: '60px', objectFit: 'cover'}} /></td>
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
