package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RespRulesNewDto {
    
    @JsonProperty("Weight")
    private double Weight;

    @JsonProperty("TypeLoad")
    private String TypeLoad;

    @JsonProperty("Zone")
    private String Zone;
    
    @JsonProperty("FinalZone")
    private String FinalZone;

    @JsonProperty("Prices")
    private double Prices;

    @JsonProperty("Service")
    private String Service;

    @JsonProperty("SlaOrigin")
    private Integer SlaOrigin;

    @JsonProperty("decisionPriceAdditional")
    private Integer decisionPriceAdditional;

    @JsonProperty("FinalPrice")
    private double FinalPrice;



}
