package infobip.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import infobip.model.JobModel;
import infobip.response.JobsResponse;

@Service
public class JobService {

	
	public JobsResponse getJobs() {
		ArrayList<JobModel> jobs = new ArrayList<JobModel>();
		jobs.add(new JobModel("1", "Testing get jobs, one.", "general", "SOMERANDOMTIMESTAMP", "COMPLETED"));
		jobs.add(new JobModel("2", "Testing get jobs, two.", "general", "SOMERANDOMTIMESTAMP", "PENDING"));
		return new JobsResponse(200, true, jobs);
	}
}
