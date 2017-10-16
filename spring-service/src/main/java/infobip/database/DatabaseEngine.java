package infobip.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import infobip.model.JobModel;

public class DatabaseEngine {
    private Connection conn = null;
	
	public boolean connect() {
        Connection conn = null;
        try {
            // db parameters
            String url = "jdbc:sqlite:./database/database";
            // create a connection to the database
            this.conn = DriverManager.getConnection(url);
            
            System.out.println("Connection to SQLite has been established.");            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
        if (this.conn != null)
        	return true;
        
        return false;
    }
	
	public void initializeDatabase() {
		String tableQuery = "CREATE TABLE IF NOT EXISTS jobs (message VARCHAR NOT NULL, channel VARCHAR NOT NULL, status VARCHAR NOT NULL, timestamp VARCHAR NOT NULL)";
		try {
			this.conn.prepareStatement(tableQuery).execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void testDatabase() {
		String query1 = "INSERT INTO jobs VALUES ('message1', 'channel1', 'status1', 'timestamp1')";
		String query2 = "INSERT INTO jobs VALUES ('message2', 'channel2', 'status2', 'timestamp2')";
		String query3 = "SELECT ROWID, * FROM jobs";
		try {
			this.conn.prepareStatement(query1).execute();
			this.conn.prepareStatement(query2).execute();
			ResultSet result = this.conn.prepareStatement(query3).executeQuery();
			while(result.next()) {
				System.out.println(result.getString("ROWID") + "|" + result.getString("message") + "|" + result.getString("channel") + "|" + result.getString("status") + "|" + result.getString("timestamp"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public ResultSet getJobs() {
		String query = "SELECT ROWID, * FROM jobs";
		
		try {
			return this.conn.prepareStatement(query).executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public void createJob(JobModel job) {
		String query = "INSERT INTO jobs VALUES ('" + job.message + "','" + job.channel + "','" + job.status + "'" + job.timestamp + "','" + job.timestamp + "')";
		
		try {
			this.conn.prepareStatement(query).execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
