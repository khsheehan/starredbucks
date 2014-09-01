import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import controllers.LocationAPI;
import models.Location;
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

public class LocationAPITest {

    @Test
    public void getZeroLocations() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Mockito.when(Location.getLocationsByRadLatLng("0","0","0")).thenReturn(new ArrayList<Location>());
                assertThat(LocationAPI.getLocationsByRadLatLng("0","0","0").toScala().toString().equals(""));
            }
        });
    }

    @Test
    public void getOneLocation() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Location loc = mock(Location.class);
                List<Location> fakeLocationList = new ArrayList<Location>();
                fakeLocationList.add(loc);
                Mockito.when(Location.getLocationsByRadLatLng("0","0","0")).thenReturn(fakeLocationList);
                assertThat(LocationAPI.getLocationsByRadLatLng("0","0","0").equals(fakeLocationList));
            }
        });
    }

    @Test
    public void getMultipleLocation() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Location loc = mock(Location.class);
                List<Location> fakeLocationList = new ArrayList<Location>();
                fakeLocationList.add(loc);
                fakeLocationList.add(loc);
                fakeLocationList.add(loc);
                Mockito.when(Location.getLocationsByRadLatLng("0","0","0")).thenReturn(fakeLocationList);
                assertThat(LocationAPI.getLocationsByRadLatLng("0","0","0").equals(fakeLocationList));
            }
        });
    }
}
