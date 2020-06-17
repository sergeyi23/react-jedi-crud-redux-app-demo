import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/PeopleForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/common/NotFound";
import {getPeople} from "./services/peopleService";


// for intro/learning purposes
const columns = ['First', 'Last', 'Handle']
const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
]
//

function App() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const peopleResponse = await getPeople()
            setPeople(peopleResponse)
        }

        fetchData()
    }, [])

    return (
        <>
            <Navbar/>
            <main className="container">
                <Switch>
                    <Route path="/people/:id" render={props =>
                        <PeopleForm {...props}  setPeople={setPeople} people={people} />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} setPeople={setPeople} people={people} />} />
                    {/*<Route path="/planets/:id" component={Form}/>*/}
                    <Route path="/planets" component={PlanetsPage}/>
                    {/*<Route path="/starships/:id" component={Form}/>*/}
                    <Route path="/starships" component={StarshipsPage}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        </>

    );
}

export default App;
