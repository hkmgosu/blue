package cl.bluex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RespSlaRule {
    @JsonProperty("DecisionSla")
    private Integer DecisionSla;
}
