package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntryPriceDto {

    @JsonProperty("codeOrigin")
    private String codeOrigin;

    @JsonProperty("basePostOrigin")
    private String basePostOrigin;

    @JsonProperty("codeDestination")
    private String codeDestination;
    
    @JsonProperty("basePostDestination")
    private String basePostDestination;

    @JsonProperty("broad")
    private Integer broad;

    @JsonProperty("high")
    private Integer high;

    @JsonProperty("length")
    private Integer length;

    @JsonProperty("weight")
    private double weight;

}
