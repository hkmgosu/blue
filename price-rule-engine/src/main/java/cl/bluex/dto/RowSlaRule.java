package cl.bluex.dto;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class RowSlaRule {
    @JsonProperty("codeDestino")
    private String codeDestino;
    
    @JsonProperty("zonaOrigin")
    private String zonaOrigin;

    @JsonProperty("basePostOrigin")
    private String basePostOrigin;

    @JsonProperty("radioOrigin")
    private String radioOrigin;

    @JsonProperty("zonaDestino")
    private String zonaDestino;

    @JsonProperty("basePostDestino")
    private String basePostDestino;

    @JsonProperty("radioDestino")
    private String radioDestino;
    
    @JsonProperty("sla")
    private Integer sla;
}
