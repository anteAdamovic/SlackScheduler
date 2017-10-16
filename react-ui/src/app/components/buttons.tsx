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
            <div className='buttons-wrapper'>
                <div className='buttons'>
                    <button className='new-job-button button' onClick={this.toggleModal.bind(this)}> New Job </button>
                    <button className='refresh-button button' onClick={this.updateJobs.bind(this)}> Update Jobs </button>
                </div>
            </div>
        );
    }
}

export default Buttons;