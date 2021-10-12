import {
    Switch,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';

import { HomePage } from './HomePage';
import { PastePage } from './pastes/PastePage';

export const App = () => {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:hash" component={PastePage} />
            </Switch>
        </Router>
    );
}