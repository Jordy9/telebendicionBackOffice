import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {useSelector, useDispatch} from 'react-redux'
import { crearVideo, startGetVideos, startUpdateVideo } from '../../store/slices/videos/thunk';
import { clearActiveVideo } from '../../store/slices/videos/videosSlice';

export const Videos = () => {

    const dispatch = useDispatch()
    const {Porcentage, active} = useSelector(state => state.videos)

    const [imag, setImag] = useState(active?.image)

    const {handleSubmit, resetForm, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            image: (active?.image === null) ? '' : active?.image,
        },
        enableReinitialize: true,
        onSubmit: ({image}) => {
            if (active?.image) {
                dispatch(startUpdateVideo(image))
                dispatch(clearActiveVideo())
            } else {
                dispatch(crearVideo(image))
            }
            setImag()
            resetForm({
                image: document.getElementsByName('image').value = ''
            })
        },
        validationSchema: Yup.object({
            image: Yup.string()
                        .required('Requerido'),
        })
    })

    const handledImage = () => {
        document.querySelector('#fileSelector').click()
      }

      useEffect(() => {
        dispatch(startGetVideos())
      }, [dispatch])

  return (
    <>
        <form onSubmit = {handleSubmit}>
            <div className = 'row my-5'>
                <h1>Videos del carrusel</h1>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="form-group">
                        <label className='my-2'>Video</label>
                        <button type='button' className='btn btn-outline-primary form-control' onClick={handledImage}>Seleccionar video</button>
                        <input accept="video/*" id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                            setFieldValue('image', e.currentTarget.files[0], (e.currentTarget.files[0]) ? setImag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setImag())
                        }} />
                        {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">

                    {
                        (Porcentage > 0)
                            &&
                        <div className="col-12 mb-2">
                            <label className='d-flex justify-content-center'>Subiendo video</label>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: `${Porcentage}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Porcentage}%</div>
                            </div>
                        </div>
                    }
                    
                    {
                        (imag)
                            &&
                        <div className="form-group d-flex justify-content-center">
                            <video src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} ></video>
                        </div> 
                    }
                </div>
            </div>
            <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
    </>
  )
}
