import * as React from 'react';
import { Store } from 'react-redux';
import { toggleModal } from '../actions/jobs';
import { Actions } from '../redux/Actions';

interface ModalProps {
    show: boolean,
    store: Store<any>
}

interface ModalState {
    channel: string,
    channels: any[],
    timestamp: string,
    message: string
}

const channels: any[] = [
    {
        name: 'general',
        id: 1
    },
    {
        name: 'test',
        id: 2
    }
];

class Modal extends React.Component<ModalProps, ModalState> {

    constructor(props: ModalProps) {
        super(props);

        this.state = {
            channel: '',
            timestamp: '',
            message: '',
            channels: [
                {
                    name: 'general',
                    id: 1
                },
                {
                    name: 'test',
                    id: 2
                }
            ]
        };
    }

    public closeModal(): void {
        this.props.store.dispatch(toggleModal());
    }

    public createNewJob(event: any): void {
        event.preventDefault();
        this.props.store.dispatch(Actions.createJob(this.state));
        this.closeModal();
    }

    public channelChange(event: any): void {
        this.setState({ channel: event.target.value });
    }

    public timestampChange(event: any): void {
        this.setState({ timestamp: event.target.value });
    }

    public messageChange(event: any): void {
        this.setState({ message: event.target.value });
    }

    public render(): JSX.Element {

        if (!this.props.show) {
            return null;
        }

        console.log(this.state);

        return (
            <div className='modal-wrapper'>
                <div className='modal'>
                    <h2 className='title'> Create New Job </h2>
                    <form className='form' onSubmit={this.createNewJob.bind(this)}>
                        <div className='form-item-wrapper'>
                            <label className='form-item'> Channel:
                            <select className="form-control" id="searchType" onChange={e => this.channelChange(e)} value={this.state.channel}>
                                    { this.state.channels.map(
                                        (channel: any, index: any) => {
                                            return <option key={index} value={channel.name}> { channel.name } </option>;
                                        }
                                    ) }
                                </select>
                            </label>
                        </div>
                        <div className='form-item-wrapper'>
                            <label className='form-item'> Timestamp:
                        <input className='form-input' type='text' value={this.state.timestamp} onChange={this.timestampChange.bind(this)} name='timestamp' />
                            </label>
                        </div>
                        <div className='form-item-wrapper'>
                            <label className='form-item'> Message:
                        <textarea className='form-input' value={this.state.message} onChange={this.messageChange.bind(this)} name='message' />
                            </label>
                        </div>
                        <div className='form-item-wrapper'>
                            <input className='form-button' type='button' value='Cancel' onClick={this.closeModal.bind(this)} />
                            <input className='form-button' type='submit' value='Create' />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Modal;