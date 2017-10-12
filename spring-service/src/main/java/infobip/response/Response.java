package infobip.response;

public class Response {
	public int status;
	public boolean success;
	public boolean error = false;
	public String errorMessage;
	
	public Response(int status, boolean success, boolean error, String errorMessage) {
		this.status = status;
		this.success = success;
		this.error = error;
		this.errorMessage = errorMessage;
	}
	
	public Response(int status, boolean success) {
		this.status = status;
		this.success = success;
	}
}
