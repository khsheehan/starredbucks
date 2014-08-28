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
        List<Location> locations = Location.getLocationsByRadLatLng(rad, lat, lng);

        ObjectNode json = Json.newObject();
        JsonNodeFactory nodeFactory = JsonNodeFactory.instance;
        ArrayNode locationsContainerJson = nodeFactory.arrayNode();

        Location currentLocation;
        ObjectNode locationJson;
        for (int i = 0; i < locations.size(); i++) {
            locationJson = Json.newObject();
            currentLocation = locations.get(i);

            locationJson.put("id", currentLocation.store_number);
            locationJson.put("name", currentLocation.name);
            locationJson.put("lat", currentLocation.latitude);
            locationJson.put("lng", currentLocation.longitude);

            locationsContainerJson.add(locationJson);
        }

        json.put("locations", locationsContainerJson);
        return ok(json);
    }
}
