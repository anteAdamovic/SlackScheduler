import * as React from 'react';
import { Store, createStore } from 'redux';
import * as fetch from 'isomorphic-fetch';

import Modal from './components/modal';
import Buttons from './components/buttons';
import Table from './components/table';

import { getJobs, updateJobs } from './actions/jobs';
import { fetchJobs } from './reducers/fetchJobs';

interface AppState {
    jobs: any[],
    store: Store<any>
};

class App extends React.Component<{}, AppState> {
    initialState: any = {
        jobs: [],
        store: createStore(this.rootReducer.bind(this), null)
    }

    red(state: any = {}, action: any) {
        console.log('this is from app');
        console.log(state);
        console.log(action);
        console.log('trying the fetch');
        console.log(fetch);

        return state;
    }

    act(e: any) {
        return {
            type: 'act',
            e
        }
    }

    rootReducer(state: any, action: any) {
        console.log('rootReducer');
        console.log('state:', state);
        console.log('action:', action);
        if (!state) {
            return {
                jobs: []
            };
        }

        if (action.type == 'GET_JOBS') {
            let headers = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
            });
            fetch("http://localhost:8080/jobs", { method: 'GET', headers: headers })
                .then((response: Response) => response.json())
                .then(
                (response: any) => {
                    console.log('response:');
                    console.log(response);
                    if (response.status)
                        this.state.store.dispatch(updateJobs(response.jobs));
                },
                (error: any) => {
                    console.log('error:');
                    console.log(error);
                }
                );
            return state;
        } else if (action.type == 'UPDATE_JOBS') {
            if (action.jobs) {
                return {
                    jobs: action.jobs
                };
            } else {
                let newJobs: any[] = ['1', '2', '3'];
                newJobs.forEach(job => state.jobs.push(job))
                return {
                    jobs: state.jobs
                }
            }
        }
    }

    constructor() {
        super();

        this.state = this.initialState;
        this.state.store.subscribe(
            () => {
                console.log('subscription');
                console.log(this);
                console.log(this.state.store);
                console.log(this.state.store.getState());
                this.setState({ jobs: this.state.store.getState().jobs, store: this.state.store });
            }
        )

        setTimeout(
            () => {
                // this.setState({ jobs: this.state.store.dispatch(getJobs()), store: this.state.store });
                setTimeout(() => console.log(this.state), 1000);
            }, 1000
        );
    }

    componentWillMount() {
        this.setState(this.state.store.getState());
    }

    render(): JSX.Element {
        return (
            <div className='app'>
                <Modal />
                <Buttons />
                <Table jobs={this.state.jobs} store={this.state.store} />
            </div>
        );
    }
}

export default App;