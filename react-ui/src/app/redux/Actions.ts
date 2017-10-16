import { ActionTypes } from './ActionTypes';

export class Actions {
    static toggleModal(): any {
        return {
            type: ActionTypes.TOGGLE_MODAL
        }
    }

    static getJobs(): any {
        return {
            type: ActionTypes.GET_JOBS
        }
    }

    static fetchJobs(): any {
        return {
            type: ActionTypes.FETCH_JOBS
        }
    }

    static createJob(job: any): any {
        return {
            type: ActionTypes.CREATE_JOB,
            job
        }
    }

    static deleteJob(id: any): any {
        return {
            type: ActionTypes.DELETE_JOB,
            id
        }
    }
}