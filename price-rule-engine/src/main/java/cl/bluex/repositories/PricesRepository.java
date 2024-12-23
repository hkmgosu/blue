package cl.bluex.repositories;

import cl.bluex.entities.Prices;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import java.util.Map;
import java.util.HashMap;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PricesRepository implements PanacheMongoRepository<Prices> {
    
    public Prices findPriceByZone(String typeLoad, String zones, String typeService){
        
        Map<String, Object> params = new HashMap<>();
        params.put("typeLoad", typeLoad);
        params.put("zones", zones);
        params.put("typeService", typeService);
        return find("typeLoad = :typeLoad and zones = :zones and typeService = :typeService", params).firstResult();

    }

}
