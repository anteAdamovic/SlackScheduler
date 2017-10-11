import * as React from 'react';

class Modal extends React.Component<{}, {}> {
    
    render(): JSX.Element {
        if (!this.props) {
            return null;
        }

        return <div> I am modal! </div>;
    }
}

export default Modal;