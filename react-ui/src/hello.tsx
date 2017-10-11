import * as React from 'react';
import Test from './test';

interface HelloProps {
    name: string;
}

class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>
                <p>
                    Hello, {this.props.name}
                </p>
                <Test t='1' />
            </div>
            
        );
    }
}

export default Hello;