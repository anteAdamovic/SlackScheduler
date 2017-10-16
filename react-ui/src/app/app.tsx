import * as React from 'react';
import { Store, createStore } from 'redux';
import * as fetch from 'isomorphic-fetch';

import Modal from './components/Modal';
import Buttons from './components/Buttons';
import Table from './components/Table';

import { getJobs, updateJobs } from './actions/jobs';
import { fetchJobs } from './reducers/fetchJobs';

import { ActionTypes } from './redux/ActionTypes';

interface AppState {
    jobs: any[],
    store: Store<any>,
    showModal: boolean
};

class App extends React.Component<{}, AppState> {
    initialState: any = {
        jobs: [],
        store: createStore(this.rootReducer.bind(this), null),
        showModal: false
    }

    rootReducer(state: any, action: any) {
        console.log('Root Reducer:');
        console.log('State: ', state);
        console.log('Action: ', action);

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
                    if (response.status)
                        this.state.store.dispatch(updateJobs(response.jobs));
                },
                (error: any) => {
                    console.error(error);
                }
                );
            return action;
        } else if (action.type == 'UPDATE_JOBS') {
            if (action.jobs) {
                return {
                    jobs: action.jobs
                };
            } else {
                return {
                    jobs: state.jobs
                }
            }
        } else if (action.type == 'TOGGLE_MODAL') {
            return {
                toggleModal: true
            }
        } else if (action.type == 'CREATE_JOB') {
            let headers = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });

            let data = {
                channel: action.job.channel,
                message: action.job.message,
                timestamp: action.job.timestamp,
                status: 'PENDING'
            };

            fetch("http://localhost:8080/job", { method: 'POST', headers: headers, body: JSON.stringify(data) })
                .then((response: Response) => { console.log('Raw response:', response); return response.json(); })
                .then(
                (response: any) => {
                    console.log('Response:', response);
                    
                    if (response.status)
                        this.state.store.dispatch(getJobs());
                },
                (error: any) => {
                    console.error(error);
                }
                );
            return {
                type: action.type,
                job: action.job
            }
        } else {
            return {}
        }
    }

    constructor() {
        super();

        this.state = this.initialState;
        this.state.store.subscribe(
            () => {
                var storeState = this.state.store.getState();
                console.log('subscription: ', storeState);

                if (storeState.jobs != undefined) {
                    this.setState({ jobs: storeState.jobs });
                } else if (storeState.toggleModal) {
                    this.setState({ showModal: !this.state.showModal });
                } else if (storeState.type == ActionTypes.CREATE_JOB) {
                    let jobs = this.state.jobs;
                    jobs.push(storeState.job);

                    this.setState({ jobs: jobs })
                }
            }
        )

        this.state.store.dispatch(getJobs());
    }

    render(): JSX.Element {
        return (
            <div className='app'>
                <Modal show={this.state.showModal} store={this.state.store} />
                <Buttons store={this.state.store} />
                <Table jobs={this.state.jobs} store={this.state.store} />
            </div>
        );
    }
}

export default App;