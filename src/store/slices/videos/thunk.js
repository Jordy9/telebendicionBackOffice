import { fetchConToken, fetchSinToken } from "../../../helpers/fetch"
import axios from "axios"
import Swal from "sweetalert2"
import { activeVideo, deleteVideo, getVideos, nuevoVideo, updateVideo, upload, uploadFinish } from "./videosSlice"

export const startGetVideos = () => {
    return async(dispatch) => {

        const resp = await fetchSinToken('videoCarrousel')
        const body = await resp.json()

        if (body.ok) {
            dispatch(getVideos(body.video))
        }

    }
}

export const crearVideo = (file) => {
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
            const resp = await fetchConToken('videoCarrousel', {image, idImage}, 'POST');
            const body = await resp.json()


            if (body.ok) {

                dispatch(nuevoVideo(body.videoguardado))
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
                    title: 'Video creado correctamente'
                    })
            }

            
        }
    }
}

export const SetActiveVideo = (video) => {
    return (dispatch) => {
        dispatch(activeVideo(video))
    }
}

export const startUpdateVideo = (fileupload) => {
    return async(dispatch, getState) => {

        const {active} = getState().videos

        const token = localStorage.getItem('token') || '';

        const title = "Nueva Imagen"

        if (active?.image === fileupload) {
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
        const resp = await fetchConToken(`videoCarrousel/${active._id}`, {title, image, idImage}, 'PUT');
        const body = await resp.json()
        
        if (body.ok) {
            
            dispatch(updateVideo(body.video))
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
                        title: 'Video actualizado correctamente'
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

export const startDeleteVideo = (props) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        const resp = await fetchConToken(`videoCarrousel/${props._id}`, props, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteVideo(props))
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
                title: 'Video eliminado correctamente'
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