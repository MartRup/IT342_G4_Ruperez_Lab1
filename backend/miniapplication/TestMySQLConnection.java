import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestMySQLConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/miniapp?useSSL=false&serverTimezone=UTC";
        String username = "root";
        String password = ""; // Empty password as confirmed
        
        try {
            System.out.println("Attempting to connect to MySQL...");
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("SUCCESS: Connected to MySQL database!");
            connection.close();
        } catch (SQLException e) {
            System.out.println("FAILED: Could not connect to MySQL");
            System.out.println("Error: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
        }
    }
}