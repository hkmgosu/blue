package cl.bluex.entities;

import io.quarkus.mongodb.panache.MongoEntity;
import lombok.Data;

@Data
@MongoEntity(collection="prices")
public class Prices {
    private Integer amount;
    private String typeLoad;
    private String zones;
    private String typeService;
}
