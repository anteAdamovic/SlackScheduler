package infobip.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import infobip.database.DatabaseEngine;
import infobip.model.JobModel;
import infobip.request.CreateJobRequest;
import infobip.response.CreateJobResponse;
import infobip.response.JobsResponse;

@Service
public class JobService {
	private DatabaseEngine dbEngine;
	private int jobCount = 0;
	
	public JobService() {
		this.dbEngine = new DatabaseEngine();
    	if (this.dbEngine.connect()) {
    		this.dbEngine.initializeDatabase();
    	}
	}
	
	public JobsResponse getJobs() {
		ArrayList<JobModel> jobs = new ArrayList<JobModel>();
		ResultSet result = this.dbEngine.getJobs();
		
		try {
			while(result.next()) {
					jobs.add(new JobModel(result.getString("ROWID"), result.getString("message"), result.getString("channel"), result.getString("timestamp"), result.getString("status")));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		this.jobCount = jobs.size();
		return new JobsResponse(200, true, jobs);
	}
	
	public CreateJobResponse createJob(CreateJobRequest request) {
		CreateJobResponse response;
		JobModel model = new JobModel(String.valueOf(this.jobCount++), request.message, request.channel, request.timestamp, request.status);
		this.dbEngine.createJob(model);
		response = new CreateJobResponse(200, true, model);
		return response;
	}
}
