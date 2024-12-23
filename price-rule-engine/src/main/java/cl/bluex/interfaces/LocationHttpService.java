package cl.bluex.interfaces;

import cl.bluex.dto.RespServiceLocation;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RegisterRestClient(configKey="location-api")
public interface LocationHttpService {
    
    @GET
    @Path("/location/get-by-code/{code}")
    @Produces(MediaType.APPLICATION_JSON)
    RespServiceLocation getLocateByCode(@PathParam String code);

}
