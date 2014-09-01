import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import controllers.LocationAPI;
import controllers.UserAPI;
import models.Location;
import models.User;
import org.junit.*;

import org.mockito.Mockito;
import play.mvc.*;
import play.mvc.Result;
import play.test.*;
import play.data.DynamicForm;
import play.data.validation.ValidationError;
import play.data.validation.Constraints.RequiredValidator;
import play.i18n.Lang;
import play.libs.F;
import play.libs.F.*;
import play.twirl.api.Content;

import static play.test.Helpers.*;
import static org.fest.assertions.Assertions.*;
import static org.mockito.Mockito.*;

public class UserAPITest {

    @Test
    public void failLoginWithBadCredentials() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Long BAD_ID = 1234L;
                Mockito.when(User.getUserById(BAD_ID)).thenReturn(null);
                assertThat(UserAPI.login().toScala().body().equals(""));
            }
        });
    }
}
