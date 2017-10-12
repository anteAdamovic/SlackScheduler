package infobip.model;

public class JobModel {
	public String id;
	public String message;
	public String channel;
	public String timestamp;
	public String status;
	
	public JobModel(String id, String message, String channel, String timestamp, String status) {
		this.id = id;
		this.message = message;
		this.channel = channel;
		this.timestamp = timestamp;
		this.status = status;
	}
}
