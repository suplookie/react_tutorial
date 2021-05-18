import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from './App';
import Signin from './Signin';
import Portal from './Portal';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/signin' component={Signin}/>
                    <Route exact path='/' component={App}/>
                    <Route exact path='/portal' component={Portal}/>
                </Switch>
            </Router>
        )
    }
}
export default Routes;