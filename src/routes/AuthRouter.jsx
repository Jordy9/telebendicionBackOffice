import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navb } from '../components/navbar/Navb';
import { BannerImage } from '../components/bannerImage/BannerImage';
import { BannerList } from '../components/bannerImage/bannerList/BannerList';
import { VideosList } from '../components/videos/videosList/VideosList';
import { Videos } from '../components/videos/Videos';

export const AuthRouter = () => {

    return (
        <>
        <Navb />
        <Container>
            <>
                <Switch>
                    <Route path = '/BannerImage' component={BannerImage} />
                    <Route path = '/BannerList' component={BannerList} />

                    <Route path = '/Videos' component={Videos} />
                    <Route path = '/VideosList' component={VideosList} />
                    
                    <Redirect to = '/BannerImage' />
                </Switch>
            </>
        </Container>
    </>
    )
}
