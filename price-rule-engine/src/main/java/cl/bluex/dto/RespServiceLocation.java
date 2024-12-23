package cl.bluex.dto;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RespServiceLocation {
    @JsonProperty("_id")
    public String _id;

    @JsonProperty("region_code")
    public String region_code;

    @JsonProperty("commune_code")
    public String commune_code;

    @JsonProperty("code")
    public String code;

    @JsonProperty("name")
    public String name;

    @JsonProperty("zone")
    public String zone;

    @JsonProperty("radio")
    public String radio;

    @JsonProperty("base_post")
    public String basePost;
}
