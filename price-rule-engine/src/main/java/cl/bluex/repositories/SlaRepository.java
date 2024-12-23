package cl.bluex.repositories;

import cl.bluex.entities.Slas;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import java.util.Map;
import java.util.HashMap;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SlaRepository implements PanacheMongoRepository<Slas> {

    public Integer findSlaByRadio(Integer origin, String radio, String zone, String typeservice){
        Map<String, Object> params = new HashMap<>();
        params.put("origin", origin);
        params.put("radio", radio);
        params.put("zone", zone);
        params.put("typeservice", typeservice);
        Slas response = new Slas();
        response = find("origin = :origin and radio = :radio and zone = :zone and typeservice = :typeservice", params).firstResult();
        if(response==null){
            return 0;
        }
        return response.getSla();
    }
    
}
