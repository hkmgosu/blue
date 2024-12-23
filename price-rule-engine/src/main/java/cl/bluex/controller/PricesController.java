package cl.bluex.controller;

import javax.inject.Inject;
import cl.bluex.services.PricesService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cl.bluex.dto.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.logging.Logger;

import java.util.List;

@RestController
@RequestMapping(value = "api/pyme2c/tarifario/v1/price")
public class PricesController {
    
    @Inject
    private PricesService pricesService;

    @Inject
    Logger log;

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON)
    public Response price(@RequestBody EntryPriceDto entryPrice) {
        try{
            List<RespPriceDto> response = pricesService.price(entryPrice); 
            return Response.status(Response.Status.OK).entity(response).build();
        }catch(Exception e){
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
       }
    }
}
