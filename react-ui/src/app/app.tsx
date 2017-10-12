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
            return state;
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
                    this.setState({ jobs: storeState.jobs, store: this.state.store, showModal: this.state.showModal });
                }
                if (storeState.toggleModal) {
                    this.setState({ jobs: this.state.jobs, store: this.state.store, showModal: !this.state.showModal });
                }
            }
        )

        this.state.store.dispatch(getJobs());
    }

    render(): JSX.Element {
        return (
            <div className='app'>
                <Modal show={this.state.showModal} />
                <Buttons store={this.state.store} />
                <Table jobs={this.state.jobs} store={this.state.store} />
            </div>
        );
    }
}

export default App;