package infobip.response;

public class DeleteJobResponse extends Response {
	
	public DeleteJobResponse(int status, boolean success, boolean error, String errorMessage) {
		super(status, success, error, errorMessage);
	}
	
	public DeleteJobResponse(int status, boolean success) {
		super(status, success);
	}
}
