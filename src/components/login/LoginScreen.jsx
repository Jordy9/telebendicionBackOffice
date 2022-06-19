import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { startLogin } from '../../store/slices/auth/thunk'

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const email = localStorage.getItem('email2')

    const [remember, setRemember] = useState();

    useEffect(() => {
        if (email) {
          setRemember(true)
        }
      }, [email, setRemember]);

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            email: localStorage.getItem('email2') || '', 
            password: '', 
            rememberme: (email) ? true : false
        },
        enableReinitialize: true,
        onSubmit: ({email, password, rememberme}) => {
            (rememberme)
                ?
            localStorage.setItem('email2', email)
            :
            localStorage.removeItem('email2')
            dispatch(startLogin(email.toLowerCase(), password))
        },
        validationSchema: Yup.object({
        })
    })

    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className="col-12 my-5 d-flex justify-content-center">
                        <div className = 'shadow p-2 mt-2 bg-dark rounded-lg flex-column text-white' style = {{width: '400px', height: '490px'}}>
                            <h4 className = 'text-center my-4'>Iniciar sesión</h4>
                            <div className="container card-body">
                                <form onSubmit={handleSubmit} className = 'my-4'>
                                    <div className="row my-2">

                                        <div className="col form-group">
                                            <label className='my-2'>Correo electrónico</label>
                                            <input autoComplete='off' type="text" {...getFieldProps('email')} placeholder = 'Ejemplo@hotmail.com' className = 'form-control bg-transparent text-white' />
                                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                        </div>

                                    </div>

                                    <div className="row my-2">

                                        <div className="col form-group">
                                            <label className='my-2'>Contraseña</label>
                                            <input type="password" {...getFieldProps('password')} placeholder = '********' className = 'form-control bg-transparent text-white' />
                                            {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                        </div>

                                    </div>

                                    <div className="form-check">
                                        <input {...getFieldProps('rememberme')} defaultChecked = {(email) && true} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label">Recuerdame</label>
                                    </div>
                                    <button type='submit' className = 'btn btn-outline-primary form-control mt-4' style = {{borderRadius: '50px'}}>Iniciar sesión</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    )
}
