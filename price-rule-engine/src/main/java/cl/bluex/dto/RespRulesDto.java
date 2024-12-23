package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RespRulesDto {
    
    @JsonProperty("factorDestino")
    private double factorDestino;

    @JsonProperty("Polinomio")
    private String Polinomio;

    @JsonProperty("TypeLoad")
    private String TypeLoad;

    @JsonProperty("Service")
    private String Service;

    @JsonProperty("factorOrigin")
    private double factorOrigin;

    @JsonProperty("Weight")
    private double Weight;

    @JsonProperty("SlaOrigin")
    private Integer SlaOrigin;

    @JsonProperty("DecisionWeight")
    private String DecisionWeight;
}
