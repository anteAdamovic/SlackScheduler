import * as React from 'react';
import * as Redux from 'redux';

import { getJobs } from '../actions/getJobs';

interface TableProps {
    jobs: any[],
    store: Redux.Store<any>
}

class Table extends React.Component<TableProps, {}> {
    
    constructor(props: any) {
        super(props);
    }

    redAction() {
        return {
            type: 'from-table'
        }
    }

    testRedux() {
        console.log(this);
        console.log('click');
        this.props.store.dispatch(getJobs());
    }

    render(): JSX.Element {
        return (
            <div onClick={this.testRedux.bind(this)}>
                I am table !
                {
                    this.props.jobs.map(job => <p> {job} </p>)
                }
            </div>);
    }
}

export default Table;