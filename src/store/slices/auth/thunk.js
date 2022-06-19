import moment from "moment"
import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../../../helpers/fetch"
import { authChecking, login, logout } from "./authSlice"

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const greeting = moment().hour()
        let greet
        if (greeting >= 0 && greeting <= 11) {
            greet = '🌄 Buenos días'
        } else if (greeting >= 12 && greeting <= 18) {
            greet = '☀️ Buenas tardes'
        } else if (greeting >= 19 && greeting <= 23) {
            greet = '🌙 Buenas noches'
        }
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();
        
        if(body.ok) {
            dispatch(login({
                uid: body.uid,
                name: body.name
            }
            ))
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                title: `${greet} ${body.name}`
              })             
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}

export const startAuthCheking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(authChecking())

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'error',
                title: body.msg
            })

        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        dispatch(logout())
    }
}