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

        return (
            <div className='table-wrapper'>
                <h3>Scheduled Jobs</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Message </th>
                            <th> Channel </th>
                            <th> Timestamp </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.jobs && this.props.jobs.length > 0) ? this.props.jobs.map(job =>
                            <tr className='row'>
                                <td className='cell'> {job.id} </td>
                                <td className='cell'> {job.message} </td>
                                <td className='cell'> {job.channel} </td>
                                <td className='cell'> {job.timestamp} </td>
                                <td className='cell'> {job.status} </td>
                            </tr>
                        ) : <tr><td colSpan={5}>No scheduled jobs. </td></tr>
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Table;