package models;

import javax.persistence.*;

import com.avaje.ebean.*;
import com.avaje.ebean.Query;
import play.data.validation.*;
import play.db.ebean.*;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Entity
@Table(name = "locations2")
public class Location extends Model {

    public static Logger logger = Logger.getLogger("controllers.location");

    // Fields
    public String brand;
    public String store_number;
    public String name;
    public String ownership_type;
    public String facility_id;
    public String features_products;
    public String features_service;
    public String features_stations;
    public String food_region;
    public String venue_type;
    public String phone_number;
    public String location;
    public String street_address;
    public String street_line_1;
    public String street_line_2;
    public String city;
    public String state;
    public String zip;
    public String country;
    public String coordinates;
    public String latitude;
    public String longitude;
    public String insert_date;

    public static Finder<Object, Location> find = new Finder<Object, Location>(Object.class, Location.class);
    
    public static List<Location> getLocationsByRadLatLng(String rad, String lat, String lng) {
        
        // TODO: Implement some basic validation for lat lng (length, value, parseInt, etc.)
        // TODO: Implement some basic validation for maximum radius

        try {
            final int MAX_RETURNED = 350;
            final String MAX_RADIUS = "250";
            String radius;
            if (Integer.parseInt(rad) <= 0) {
                radius = MAX_RADIUS;
            } else {
                radius = rad;
            }
            String radiusQuery = "" + 
                "SELECT *,\n" +
                "    (3959 * acos(cos(radians(\n" +
                "    " + lat + "\n" +
                "    ))*cos(radians(\n" +
                "        `Latitude`\n" +
                "    ))*cos(radians(\n" +
                "        `Longitude`\n" +
                "    )-radians(\n" +
                "    " + lng + "\n" +
                "    ))+sin(radians(\n" +
                "    " + lat + "\n" +
                "    ))*sin(radians(\n" +
                "        `Latitude`\n" +
                "    ))))\n" +
                "AS distance\n" +
                "FROM locations2\n" +
                "HAVING distance < " + radius + "\n" +
                "ORDER BY distance\n" +
                "LIMIT 0 , " + MAX_RETURNED + ";\n";

            List<SqlRow> sqlRows = Ebean.createSqlQuery(radiusQuery).findList();
            Location currentLocation;
            List<Location> locations = new ArrayList<Location>();
            for (int i = 0; i < sqlRows.size(); i++) {
                currentLocation = new Location();
                currentLocation.store_number = sqlRows.get(i).getString("store_number");
                currentLocation.name = sqlRows.get(i).getString("name");
                currentLocation.latitude = sqlRows.get(i).getString("latitude");
                currentLocation.longitude = sqlRows.get(i).getString("longitude");
                currentLocation.street_address = sqlRows.get(i).getString("street_address");
                currentLocation.phone_number = sqlRows.get(i).getString("phone_number");
                locations.add(currentLocation);
            }
            
            return locations;

        } catch (Exception e) {
            // TODO: Return some relevant error code
        }
        
        return null; // no-op return, cannot be reached.
    }
}
