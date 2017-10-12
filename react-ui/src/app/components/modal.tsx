import * as React from 'react';

interface ModalProps {
    show: boolean
}

class Modal extends React.Component<ModalProps, {}> {
    
    render(): JSX.Element {

        if (!this.props.show) {
            return null;
        }

        return <div> I am modal! </div>;
    }
}

export default Modal;