package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RespPriceDto {
    @JsonProperty("codeOrigin")
    private String codeOrigin;

    @JsonProperty("codeDestination")
    private String codeDestination;

    @JsonProperty("price")
    private double price;

    @JsonProperty("weight")
    private double weight;

    @JsonProperty("service")
    private String service;

    @JsonProperty("sla")
    private Integer sla;
}
