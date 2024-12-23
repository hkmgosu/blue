package cl.bluex;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.inject.Inject;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.junit.jupiter.api.Test;
import cl.bluex.repositories.PricesRepository;
import io.quarkus.test.junit.QuarkusTest;
import cl.bluex.dto.EntryLocateDto;
import cl.bluex.dto.LocalServiceLocation;
import cl.bluex.interfaces.LocalHttpService;

@QuarkusTest
public class ReactivePriceTest {

    @Inject
    PricesRepository pricesRepository;

    @Inject
    @RestClient
    LocalHttpService localHttpService;

    /*@Test
    void testPricesRepository() {
        assert(pricesRepository.count() > 0);
    }*/

    @Test
    void testLocalHttpService(){
        LocalServiceLocation location = localHttpService.getLocateByCode(new EntryLocateDto("ARI"));
        assertNotNull(location);
    }

    /*
    @Test
    public void testIntPriceService() {
        given()
            .contentType("application/json")
            .body(new EntryPriceDto("ARI", "AMB", 10, 10, 10, 35.0))
            .when()
            .post("/testPrice/int")
            .then()
            .statusCode(200);
    }
    */

}