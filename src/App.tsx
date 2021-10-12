import {
    Switch,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';

import { HomePage } from './HomePage';
import { ViewPastePage } from './pastes/ViewPastePage';
import { EditPastePage } from './pastes/EditPastePage';

export const App = () => {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:hash" component={ViewPastePage} />
            <Route exact path="/edit/:hash" component={EditPastePage} />
            </Switch>
        </Router>
    );
}