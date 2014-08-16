package models;

import javax.persistence.*;
import play.data.validation.*;
import play.db.ebean.*;

@Entity
@Table(name = "users")
public class User extends Model {

    // Fields
    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    @Constraints.MaxLength(60)
    public String username;

    @Constraints.Required
    @Constraints.MaxLength(64)
    public String hashedpass;

    @Constraints.MaxLength(5)
    public String zip;

    // Standard Finder
    public static Finder<Long, User> find = new Finder<Long, User>(Long.class, User.class);

    // Queries
    public static User getUserById(Long id) {
        return find.byId(id);
    }
    
    public static User getUserByUsername(String username) {
        return find.where().eq("username", username).findUnique();
    }
}
