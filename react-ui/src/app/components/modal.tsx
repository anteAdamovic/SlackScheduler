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
    hour: string,
    minute: string,
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

        let curDate: Date = new Date();

        this.state = {
            channel: '',
            timestamp: curDate.getHours() + ':' + curDate.getMinutes(),
            hour: curDate.getHours().toString(),
            minute: curDate.getMinutes().toString(),
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

    public getHoursArray(): string[] {
        let hours: string[] = [];

        for(var i = 0; i < 24; i++) {
            hours.push(i.toString());
        }

        return hours;
    }

    public minuteChange(event: any): void {
        let minute: string = event.target.value;
        let timestamp = this.state.timestamp.split(':')[0] + ':' + minute;
        this.setState({ minute: minute, timestamp: timestamp });
    }

    public hourChange(event: any): void {
        let hour: string = event.target.value;
        let timestamp = hour + ':' + this.state.timestamp.split(':')[1];
        this.setState({ hour: hour, timestamp: timestamp });
    }

    public getMinutesArray(): string[] {
        let minutes: string[] = [];

        for(var i = 0; i < 60; i++) {
            minutes.push(i.toString());
        }

        return minutes;
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
                            <select className="form-control" id="searchType" onChange={this.channelChange.bind(this)} value={this.state.channel}>
                                    { this.state.channels.map(
                                        (channel: any, index: any) => {
                                            return <option key={index} value={channel.name} selected={index == 0}> #{ channel.name } </option>;
                                        }
                                    ) }
                                </select>
                            </label>
                        </div>
                        <div className='form-item-wrapper'>
                            <label className='form-item'> Timestamp:
                        <input className='form-input' type='text' value={this.state.timestamp} disabled={true} name='timestamp' />
                        <select value={this.state.hour} onChange={this.hourChange.bind(this)}>
                            { this.getHoursArray().map(
                                (hour: string, index: number) => {
                                    return <option key={index} value={hour}>{hour}</option>;
                                }
                            ) }
                        </select>
                        <select value={this.state.minute} onChange={this.minuteChange.bind(this)}>
                        { this.getMinutesArray().map(
                                (minute: string, index: number) => {
                                    return <option key={index} value={minute}>{minute}</option>;
                                }
                            ) }
                        </select>
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