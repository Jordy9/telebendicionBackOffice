import { fetchConToken, fetchSinToken } from "../../../helpers/fetch"
import axios from "axios"
import Swal from "sweetalert2"
import { activeImage, deleteImage, getImages, nuevaImagen, updateImage, upload, uploadFinish } from "./imagesSlice"

export const startGetImages = () => {
    return async(dispatch) => {

        const resp = await fetchSinToken('bannerImage')
        const body = await resp.json()

        if (body.ok) {
            dispatch(getImages(body.banner))
        }

    }
}

export const crearImageBanner = (file) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token') || '';

        const title = "Nueva Imagen"
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
            headers: {'x-token': token},
          onUploadProgress: (e) =>
          {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
        })
        
        if(res.data.ok) {
            const image = res.data.image.url
            const idImage = res.data.image.id
            const resp = await fetchConToken('bannerImage', {image, idImage}, 'POST');
            const body = await resp.json()

            console.log(body)

            if (body.ok) {

                dispatch(nuevaImagen(body.bannerguardado))
                dispatch(uploadFinish())
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
                    title: 'Banner creado correctamente'
                    })
            }

            
        }
    }
}

export const SetActiveImage = (image) => {
    return (dispatch) => {
        dispatch(activeImage(image))
    }
}

export const startUpdateImage = (fileupload) => {
    return async(dispatch, getState) => {

        const {active} = getState().images

        const token = localStorage.getItem('token') || '';

        const title = "Nueva Imagen"

        if (fileupload === active?.image) {
            return
        }
              
        const formData = new FormData()
        formData.append('file', fileupload)
        formData.append('title', title)
        
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
        headers: {'x-token': token}, 
        onUploadProgress: (e) =>
        {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
        })
        
        if(res.data.ok) {
        const image = res.data.image.url
        const idImage = res.data.image.id
        const resp = await fetchConToken(`bannerImage/${active._id}`, {title, image, idImage}, 'PUT');
        const body = await resp.json()
        
        if (body.ok) {
            
            dispatch(updateImage(body.banner))
            dispatch(uploadFinish())
            const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${active.idImage}`, {headers: {'x-token': token}})
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
                        title: 'Banner actualizado correctamente'
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
}

export const startDeleteImage = (props) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        const resp = await fetchConToken(`bannerImage/${props._id}`, props, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteImage(props))
            await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${props.idImage}`, {headers: {'x-token': token}})
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
                title: 'Banner eliminado correctamente'
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
            title: body.msg
            })
        }

    }
}