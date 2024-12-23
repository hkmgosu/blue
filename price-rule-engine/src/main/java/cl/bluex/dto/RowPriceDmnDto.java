package cl.bluex.dto;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class RowPriceDmnDto {
    @JsonProperty("amountBase")
    private Integer amountBase;

    @JsonProperty("amountXLplus")
    private Integer amountXLplus;

    @JsonProperty("weight")
    private double weight;

    @JsonProperty("amountXL")
    private Integer amountXL;

    @JsonProperty("factorOrigin")
    private double factorOrigin;

    @JsonProperty("factorDestino")
    private double factorDestino;

    @JsonProperty("codeDestination")
    private String codeDestination;
}
