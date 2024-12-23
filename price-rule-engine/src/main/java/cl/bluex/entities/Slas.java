package cl.bluex.entities;

import io.quarkus.mongodb.panache.MongoEntity;
import lombok.Data;

@Data
@MongoEntity(collection="sla")
public class Slas {
    private Integer sla;
    private Integer origin;
    private String radio;
    private String typeservice;
    private String zone;
}
