package cl.bluex.interfaces;

import cl.bluex.dto.LocalServiceLocation;
import cl.bluex.dto.RespPriceDmnDto;
import cl.bluex.dto.RespRulesDto;
import cl.bluex.dto.RespRulesNewDto;
import cl.bluex.dto.RespSlaRule;
import cl.bluex.dto.RulesDto;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import cl.bluex.dto.EntryLocateDto;
import cl.bluex.dto.EntryPriceDmnDto;
import cl.bluex.dto.EntrySlaRule;
import cl.bluex.dto.IRulesDto;

@RegisterRestClient(configKey="local-api")
public interface LocalHttpService {
    
    @POST
    @Path("/locationService")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    LocalServiceLocation getLocateByCode(@RequestBody EntryLocateDto entryLocateDto);

    @POST
    @Path("/generalRulesPrice")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RespRulesDto generalRulesPrice(@RequestBody RulesDto rulesDto);

    @POST
    @Path("/generalRules")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RespRulesNewDto generalRules(@RequestBody IRulesDto rulesDto);

    @POST
    @Path("/slaRules")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RespSlaRule rulesSla(@RequestBody EntrySlaRule rulesSlaDto);

    @POST
    @Path("/priceDecision")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RespPriceDmnDto priceDecision(@RequestBody EntryPriceDmnDto entryPriceDmnDto);

    
}
