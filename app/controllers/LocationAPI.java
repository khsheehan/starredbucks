package controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Location;
import play.libs.Json;
import play.mvc.*;

public class LocationAPI extends Controller {

    public static Logger logger = Logger.getLogger("controllers.locationAPI");
    
    public static Result getLocationsByRadLatLng(String rad, String lat, String lng) {

        // Hit the DB to get a list of reviews
        logger.log(Level.INFO, "Getting the stores within " + rad + " miles of lat:" + lat + " lng:" + lng + ".");
        
        List<Location> locations = Location.getLocationsByRadLatLng(rad, lat, lng);
        
        ObjectNode json = Json.newObject();
        JsonNodeFactory nodeFactory = JsonNodeFactory.instance;
        ArrayNode reviewsContainerJson = nodeFactory.arrayNode();

//        Location currentLocation;
//        ObjectNode reviewJson;
//        for (int i = 0; i < reviews.size(); i++) {
//            reviewJson = Json.newObject();
//            currentReview = reviews.get(i);
//
//            logger.log(Level.INFO, "Fetched review:" + currentReview.id + " from database for store:" + store_id);
//
//            reviewJson.put("id", currentReview.id);
//            reviewJson.put("stars", currentReview.num_stars);
//            reviewJson.put("text", currentReview.review_text);
//            reviewJson.put("user_id", currentReview.user_id);
//
//            reviewsContainerJson.add(reviewJson);
//        }
//
//        json.put("reviews", reviewsContainerJson);

        return ok(json);
    }
}
