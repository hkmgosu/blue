package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RespPriceDmnDto {
    @JsonProperty("decisionPrice")
    private Integer decisionPrice;

    @JsonProperty("decisionPriceAdditional")
    private Integer decisionPriceAdditional;

    @JsonProperty("finaPrice")
    private Integer finaPrice;
}
