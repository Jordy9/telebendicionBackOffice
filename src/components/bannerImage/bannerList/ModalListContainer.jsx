import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {image} = useSelector(state => state.images)
    return (
        <>
            {
                (image)
                    ?
                    image.map(image => {
                        return (
                            <ModalContainer key = {image._id} {...image} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
