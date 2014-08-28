package controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Review;
import play.libs.Json;
import play.mvc.*;

public class ReviewAPI extends Controller {
    
    public static Logger logger = Logger.getLogger("controllers.reviewAPI");

    public static Result getReviewsByStoreId(String store_id) {

        // Hit the DB to get a list of reviews
        logger.log(Level.INFO, "Getting the set of reviews for store:" + store_id);
        List<Review> reviews = Review.getReviewsByStoreId(store_id);

        ObjectNode json = Json.newObject();
        JsonNodeFactory nodeFactory = JsonNodeFactory.instance;
        ArrayNode reviewsContainerJson = nodeFactory.arrayNode();

        Review currentReview;
        ObjectNode reviewJson;
        for (int i = 0; i < reviews.size(); i++) {
            reviewJson = Json.newObject();
            currentReview = reviews.get(i);
            
            logger.log(Level.INFO, "Fetched review:" + currentReview.id + " from database for store:" + store_id);

            reviewJson.put("id", currentReview.id);
            reviewJson.put("stars", currentReview.num_stars);
            reviewJson.put("text", currentReview.review_text);
            reviewJson.put("user_id", currentReview.user_id);
            
            reviewsContainerJson.add(reviewJson);
        }

        json.put("reviews", reviewsContainerJson);
        
        return ok(json);
    }
    
    public static Result addNewStoreReview(String store_id) {
        Http.RequestBody body = request().body();
        String reviewText = body.asJson().findPath("review_text").asText();
        int numStars = body.asJson().findPath("num_stars").asInt();
        
        Review newReview = new Review();
        newReview.num_stars = numStars;
        newReview.review_text = reviewText;
        newReview.store_id = store_id;
        newReview.user_id =  Integer.parseInt(session("uid"));
        newReview.save();
        
        return ok();
    }
}
