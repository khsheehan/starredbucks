package models;

import javax.persistence.*;
import play.data.validation.*;
import play.db.ebean.*;

import java.util.List;

@Entity
@Table(name = "reviews")
public class Review extends Model {

    // Fields
    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String store_id;

    @Constraints.Required
    public int user_id;

    @Constraints.Required
    public String review_text;

    @Constraints.Required
    public int num_stars; // Some value out of 5

    // Standard Finder
    public static Finder<Long, Review> find = new Finder<Long, Review>(Long.class, Review.class);

    // Queries
    public static List<Review> getReviewsByStoreId(String storeId) {
        return find.where().eq("store_id", storeId).findList();
    }

    public static List<Review> getReviewsByUserId(int userId) {
        return find.where().eq("user_id", userId).findList();
    }
}
