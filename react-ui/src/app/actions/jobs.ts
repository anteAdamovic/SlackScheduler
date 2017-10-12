const GET_JOBS_TYPE: string = 'GET_JOBS';
const UPDATE_JOBS_TYPE: string = 'UPDATE_JOBS';

export const getJobs: Function = () => {
    return {
        type: GET_JOBS_TYPE
    }
}

export const updateJobs: Function = (jobs: any[]) => {
    return {
        type: UPDATE_JOBS_TYPE,
        jobs
    }
}