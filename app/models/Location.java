package models;

import javax.persistence.*;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Query;
import com.avaje.ebean.RawSql;
import com.avaje.ebean.RawSqlBuilder;
import play.data.validation.*;
import play.db.ebean.*;

import java.util.List;

@Entity
@Table(name = "locations2")
public class Location extends Model {

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
    
    public static List<Location> getLocationsByRadLatLng(String rad, String lat, String lng) {
        
        // TODO: Implement some basic validation for lat lng (length, value, parseInt, etc.)
        // TODO: Implement some basic validation for maximum radius
        
        /*
         * This is IN-FUCKING-CREDIBLY UN-FUCKING-SAFE.
         * But IDGAF.
         * #yolo.
         * ....................../´¯/)
         * ....................,/¯../
         * .................../..../
         * ............./´¯/'...'/´¯¯`·¸
         * ........../'/.../..../......./¨¯\
         * ........('(...´...´.... ¯~/'...')
         * .........\.................'..../
         * ..........\................._.·´
         * ............\..............(
         * .............\.............\
         */
        
        try {
            final int MAX_RETURNED = 350;
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
                "HAVING distance < " + rad + "\n" +
                "ORDER BY distance\n" +
                "LIMIT 0 , " + MAX_RETURNED + ";\n";

            RawSql raw = RawSqlBuilder.parse(radiusQuery).create();
            Query<Location> query = Ebean.find(Location.class);
            return query.setRawSql(raw).findList();            

        } catch (Exception e) {
            // TODO: Return some relevant error code
        }
        
        return null; // no-op return, cannot be reached.
    }
}
