import * as React from 'react';

interface TestProps {
    t: string
}
export default class Test extends React.Component<TestProps, {}> {
    render() {
        return <div> Test { this.props.t } </div>
    }
}