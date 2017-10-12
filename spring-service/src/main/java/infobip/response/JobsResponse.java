package infobip.response;

import java.util.ArrayList;

import infobip.model.JobModel;

public class JobsResponse extends Response {
	public ArrayList<JobModel> jobs;
	
	public JobsResponse(int status, boolean success, boolean error, String errorMessage) {
		super(status,success, error, errorMessage);
	}
	
	public JobsResponse(int status, boolean success, ArrayList<JobModel> jobs) {
		super(status, success);
		
		this.jobs = jobs;
	}
}
