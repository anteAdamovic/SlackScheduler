const GET_JOBS_TYPE: string = 'GET_JOBS';
const UPDATE_JOBS_TYPE: string = 'UPDATE_JOBS';
const TOGGLE_MODAL_TYPE: string = 'TOGGLE_MODAL';

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

export const toggleModal: Function = () => {
    return {
        type: TOGGLE_MODAL_TYPE
    }
}