import * as React from 'react';
import * as Redux from 'redux';

import { getJobs } from '../actions/jobs';

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

        if (this.props.jobs.length != 0) {
            return (
                <div onClick={this.testRedux.bind(this)}>
                    I am table !
                    <table>
                        {
                            this.props.jobs.map(job =>
                                <tr>
                                    <td> {job.id} </td>
                                    <td> {job.message} </td>
                                    <td> {job.channel} </td>
                                    <td> {job.timestamp} </td>
                                    <td> {job.status} </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            );
        } else {
            return (
                <div onClick={this.testRedux.bind(this)}>
                    I am table !
                    <table>
                        {
                            <tr> No scheduled jobs. </tr>
                        }
                    </table>
                </div>
            );
        }

    }
}

export default Table;