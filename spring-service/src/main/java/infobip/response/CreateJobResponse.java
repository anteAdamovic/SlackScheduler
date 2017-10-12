package infobip.response;

import infobip.model.JobModel;

public class CreateJobResponse extends Response {
	public JobModel job;
	
	public CreateJobResponse(int status, boolean success, boolean error, String errorMessage) {
		super(status, success, error, errorMessage);
	}
	
	public CreateJobResponse(int status, boolean success, JobModel job) {
		super(status, success);
		
		this.job = job;
	}
}
