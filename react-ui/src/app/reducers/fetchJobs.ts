export const fetchJobs: Function = (state: any = {}, action: any) => {
    console.log('fetchJobs');
    console.log(state, action);
    // this.setState({ jobs: ['job1', 'job2', 'job3'], store: this.state.store });
    if (!state) {
        return { jobs: ['job1', 'job2']};
    }
    console.log(state.jobs);
    return { jobs: ['job1', 'job2']};
}