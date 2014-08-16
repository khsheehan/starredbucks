package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import java.security.*;
import play.libs.Json;
import play.mvc.*;

public class UserAPI extends Controller {

    public static Result signup() {

        // TODO: Add some validation to this method
        Http.RequestBody body = request().body();
        String username = body.asJson().findPath("username").asText();
        String password = body.asJson().findPath("password").asText();

        // Hash and salt their password
        String hashedPassword = hashPassword(username, password);

        // Construct and save the new user to the db
        User newUser = new User();
        newUser.username = username;
        newUser.hashedpass = hashedPassword;
        newUser.save();

        // Start a session for this user
        User user = User.getUserByUsername(username);
        session("uid", user.id.toString());
        session("username", user.username);

        // Return some useful JSON to the front end
        ObjectNode json = Json.newObject();
        json.put("status", "OK");
        json.put("username", user.username);

        return ok(json);
    }

    public static Result login() {

        Http.RequestBody body = request().body();
        String username = body.asJson().findPath("username").asText();
        String password = body.asJson().findPath("password").asText();

        String hashedPassword = hashPassword(username, password);

        try {
            User user = User.getUserByUsername(username);
            ObjectNode json = Json.newObject();
            if (user.username.equals(username) && user.hashedpass.equals(hashedPassword)) {
                
                // If the login was valid, set up a session
                session().clear();
                session("uid", user.id.toString());
                session("username", user.username);

                json.put("status", "OK");
                json.put("username", user.username);
                return ok(json);
                
            } else {
                json.put("status", "Invalid Credentials");
                return unauthorized();
            }
        } catch (Exception e) {
            return badRequest(); // If this fails the user doesn't exist
        }
    }

    public static Result logout() {
        return null;
        // return ok(index.render("Signup"));
    }
    
    private static String hashPassword(String username, String password) {
        try {

            // Hash and salt their password
            MessageDigest digester = MessageDigest.getInstance("MD5");
            digester.update((username + password).getBytes());

            byte hashed[] = digester.digest();

            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < hashed.length; i++) {
                sb.append(Integer.toString((hashed[i] & 0xff) + 0x100, 16).substring(1));
            }

            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }
}
