import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/login/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Spinner } from '../components/spinner/Spinner';
import { useEffect } from 'react';
import { startGetImages } from '../store/slices/images/thunks';
import { startAuthCheking } from '../store/slices/auth/thunk';
import { startGetVideos } from '../store/slices/videos/thunk';



export const AppRouter = () => {

    const dispatch = useDispatch()

    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startAuthCheking())
        dispatch(startGetImages())
        dispatch(startGetVideos())
    }, [dispatch])
    

    // if (checking) {
    //     return <Spinner />
    // }

    return (
        <Router>
            <div>

                <Switch>
                    <PublicRoute exact path = '/Login' component = {LoginScreen} isAuthenticated = {!!uid} />
                    <PrivateRoute path = '/' component={AuthRouter} isAuthenticated = {!!uid} />

                    <Redirect to = '/Login' />
                </Switch>

            </div>
        </Router>
    )
}
