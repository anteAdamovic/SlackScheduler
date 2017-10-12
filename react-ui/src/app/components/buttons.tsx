import * as React from 'react';
import { Store } from 'react-redux';
import { toggleModal, getJobs } from '../actions/jobs';

interface ButtonsProps {
    store: Store<any>
}

class Buttons extends React.Component<ButtonsProps, {}> {

    toggleModal(): void {
        this.props.store.dispatch(toggleModal());
    }

    updateJobs(): void {
        this.props.store.dispatch(getJobs());
    }

    render(): JSX.Element {
        return (
            <div className='buttons'>
                <button className='newJobButton' onClick={this.toggleModal.bind(this)}> New Job </button>
                <button className='updateJobsButton' onClick={this.updateJobs.bind(this)}> Update Jobs </button>
            </div>);
    }
}

export default Buttons;