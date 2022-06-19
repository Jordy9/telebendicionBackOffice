import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetImages } from '../../../store/slices/images/thunks';
import { ModalListContainer } from './ModalListContainer';

export const BannerList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetImages())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '30px'}}>Listado de imagenes del banner</h1>
          <div className="table-responsive">
            <table className="table text-white bg-dark text-center">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Imagen</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <ModalListContainer />
              </tbody>
            </table>
          </div>
        </>
    )
}
