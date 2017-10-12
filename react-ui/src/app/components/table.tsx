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

    render(): JSX.Element {

        if (this.props.jobs.length != 0) {
            return (
                <div>
                    Scheduled Jobs
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
                <div>
                    Scheduled Jobs
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