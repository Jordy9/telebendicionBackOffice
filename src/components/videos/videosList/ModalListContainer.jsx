import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {video} = useSelector(state => state.videos)
    return (
        <>
            {
                (video)
                    ?
                    video.map(video => {
                        return (
                            <ModalContainer key = {video._id} {...video} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
