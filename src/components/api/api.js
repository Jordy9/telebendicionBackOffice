import axios from "axios"
import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

export const startGetBannerImages = async () => {

    const resp = await fetchSinToken('bannerImage')
    const body = await resp.json()

    if (body.ok) {
        const respuesta = body
        console.log(respuesta)
    }
}


export const startCreateBannerImages = async (title, file, descripcion) => {

    const token = localStorage.getItem('token') || '';

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
            headers: {'x-token': token},
        //   onUploadProgress: (e) =>
        //   {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
        })
        
        if(res.data.ok) {
            const image = res.data.image.url
            const idImage = res.data.image.id
            const resp = await fetchConToken('bannerImage', {image, idImage}, 'POST');
            const body = await resp.json()

            console.log(body)

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
                icon: 'success',
                title: 'banner creado correctamente'
                })
            
        }
}

export const startUpdateBannerImage = async (fileupload) => {

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
              
              const formData = new FormData()
              formData.append('file', fileupload)

              const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
                headers: {'x-token': token}, 
                // onUploadProgress: (e) =>
                // {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
              })
              
              if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken(`bannerImage/id`, {image, idImage}, 'PUT');
                const body = await resp.json()
                
                if (body.ok) {
                  
                  const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/id`, {headers: {'x-token': token}})
                  console.log(ress)
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
                        icon: 'success',
                        title: 'Evento actualizado correctamente'
                        })
                    }
                
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
                            title: `${res.errors}`
                          })
                    }
            } 
            // else {

            //     const {image, idImage} = activeEvent
            //     const resp = await fetchConToken(`bannerImage/${activeEvent._id}`, {title, image, idImage, descripcion}, 'PUT');
            //     const body = await resp.json()

            //     if (body.ok) {

            //         dispatch(updateEvento(body.evento))
            //         socket?.emit('notifications-admin-to-user-update', body.evento)
            //         const Toast = Swal.mixin({
            //             toast: true,
            //             position: 'top-end',
            //             showConfirmButton: false,
            //             timer: 5000,
            //             timerProgressBar: true,
            //             didOpen: (toast) => {
            //               toast.addEventListener('mouseenter', Swal.stopTimer)
            //               toast.addEventListener('mouseleave', Swal.resumeTimer)
            //             }
            //           })
                      
            //           return Toast.fire({
            //             icon: 'success',
            //             title: 'Evento actualizado correctamente'
            //           })
            //     }
            // }

            

}

export const startDeleteBannerImage = async () => {

        // const token = localStorage.getItem('token') || '';

        // if(activeEvent.idImage) {
        //     await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeEvent.idImage}`, {headers: {'x-token': token}})

        //     const resp = await fetchConToken(`evento/${activeEvent._id}`, activeEvent, 'DELETE')
        //     const body = await resp.json()
    
        //     if(body.ok) {
        //         dispatch(deleteEvento(activeEvent))
        //         socket?.emit('notifications-admin-to-user-delete', activeEvent._id)
        //         const Toast = Swal.mixin({
        //             toast: true,
        //             position: 'top-end',
        //             showConfirmButton: false,
        //             timer: 5000,
        //             timerProgressBar: true,
        //             didOpen: (toast) => {
        //               toast.addEventListener('mouseenter', Swal.stopTimer)
        //               toast.addEventListener('mouseleave', Swal.resumeTimer)
        //             }
        //           })
                  
        //           return Toast.fire({
        //             icon: 'success',
        //             title: 'Evento eliminado correctamente'
        //           })
        //     } else {
        //       const Toast = Swal.mixin({
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 5000,
        //         timerProgressBar: true,
        //         didOpen: (toast) => {
        //           toast.addEventListener('mouseenter', Swal.stopTimer)
        //           toast.addEventListener('mouseleave', Swal.resumeTimer)
        //         }
        //       })
              
        //       return Toast.fire({
        //         icon: 'error',
        //         title: body.msg
        //       })
        //     }

        // } else {
        //     const resp = await fetchConToken(`evento/${activeEvent._id}`, activeEvent, 'DELETE')
        //     const body = await resp.json()
    
        //     if(body.ok) {
        //         dispatch(deleteEvento(activeEvent))
        //         socket?.emit('notifications-admin-to-user-delete', activeEvent._id)
        //         const Toast = Swal.mixin({
        //             toast: true,
        //             position: 'top-end',
        //             showConfirmButton: false,
        //             timer: 5000,
        //             timerProgressBar: true,
        //             didOpen: (toast) => {
        //               toast.addEventListener('mouseenter', Swal.stopTimer)
        //               toast.addEventListener('mouseleave', Swal.resumeTimer)
        //             }
        //           })
                  
        //           return Toast.fire({
        //             icon: 'success',
        //             title: 'Evento eliminado correctamente'
        //           })
        //     } else {
        //       const Toast = Swal.mixin({
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 5000,
        //         timerProgressBar: true,
        //         didOpen: (toast) => {
        //           toast.addEventListener('mouseenter', Swal.stopTimer)
        //           toast.addEventListener('mouseleave', Swal.resumeTimer)
        //         }
        //       })
              
        //       return Toast.fire({
        //         icon: 'error',
        //         title: body.msg
        //       })
        //     }
        // }

}

// Videos

export const startGetVideoCarrousel = async () => {

    const resp = await fetchSinToken('videoCarrousel')
    const body = await resp.json()

    if (body.ok) {
        const respuesta = body
        console.log(respuesta)
    }
}