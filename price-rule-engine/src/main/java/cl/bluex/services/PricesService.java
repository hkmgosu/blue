package cl.bluex.services;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import cl.bluex.interfaces.LocationHttpService;
import cl.bluex.interfaces.ObjectService;
import cl.bluex.repositories.SlaRepository;
import cl.bluex.interfaces.LocalHttpService;
import cl.bluex.dto.RespServiceLocation;
import cl.bluex.dto.RespSlaRule;

import org.jboss.logging.Logger;
import cl.bluex.dto.EntryLocateDto;
import cl.bluex.dto.EntryPriceDto;
import cl.bluex.dto.EntrySlaRule;
import cl.bluex.dto.IRulesDto;
import cl.bluex.dto.LocalServiceLocation;
import cl.bluex.dto.RespPriceDto;
import cl.bluex.dto.RespRulesNewDto;


@ApplicationScoped
public class PricesService {

    @Inject
    Logger log;

    @Inject
    @RestClient
    LocationHttpService locationHttpService;

    @Inject
    @RestClient
    LocalHttpService localHttpService;

    @Inject
    private SlaRepository slaRepository;

    @Inject
    private ObjectService objectService;

    public List<RespPriceDto> price(EntryPriceDto entryPrice){
        log.info("--price entry: "+entryPrice);
        List<RespPriceDto> response = new ArrayList<>();
        LocalServiceLocation respLocationOrigin = this.getLocalByCode(entryPrice.getCodeOrigin());
        LocalServiceLocation respLocationDestination = this.getLocalByCode(entryPrice.getCodeDestination());
        IRulesDto rulesDto =  objectService.paramRulesGeneral(respLocationOrigin, respLocationDestination, entryPrice);
        log.info("entrada rulesDto: "+ rulesDto);
        RespRulesNewDto generalRules = this.generalRules(rulesDto);
        log.info("--generalRules: "+generalRules);
        log.info("--");
        String[] services = generalRules.getService().split(";", 0);
        for (String row : services){
            response.add(this.priceRules(row, generalRules, respLocationDestination, respLocationOrigin));
        }
        return response;
    }

    public RespPriceDto priceRules(String service, RespRulesNewDto generalRulesPrice, LocalServiceLocation respLocationDestination, LocalServiceLocation respLocationOrigin){
        log.info("--priceRules");
        RespPriceDto response = new RespPriceDto();
        response.setPrice(generalRulesPrice.getFinalPrice());
        response.setService(service);
        Integer sla = this.getSla(generalRulesPrice.getSlaOrigin(), respLocationOrigin,  respLocationDestination);
        if(sla == null){
            log.info("SLA not found");
            throw new NotFoundException("SLA not found");
        }
        response.setSla(sla);
        response.setWeight(generalRulesPrice.getWeight());
        response.setCodeOrigin(respLocationOrigin.getRespServiceLocation().getCode());
        response.setCodeDestination(respLocationDestination.getRespServiceLocation().getCode());
        return response;
    }

    public RespServiceLocation getLocateByCode(String code){
      RespServiceLocation response = new RespServiceLocation();  
      try{
            response = locationHttpService.getLocateByCode(code); 
        }catch(Exception e){
            log.info("Error api location code: "+code+" Message:"+ e.getMessage());
            throw new NotFoundException("Error api location "+ e.getMessage());
        }
       return response;
    }

    public LocalServiceLocation getLocalByCode(String code){
        log.info("--getLocalByCode");
        EntryLocateDto entryLocateDto = new EntryLocateDto(); 
        entryLocateDto.setCode(code);
        return localHttpService.getLocateByCode(entryLocateDto);
     }

     public RespRulesNewDto generalRules(IRulesDto rulesDto){
        log.info("--generalRules :");
        return localHttpService.generalRules(rulesDto);
     }

     public RespSlaRule rulesSla(EntrySlaRule rulesSlaDto){
        log.info("--rulesSla");
        return localHttpService.rulesSla(rulesSlaDto);
     }

     public Integer getSla(Integer origin, LocalServiceLocation respLocationOrigin, LocalServiceLocation respLocationDestination){
        log.info("--getSla");
        EntrySlaRule entrySlaRule = objectService.rulesSla(origin, respLocationOrigin, respLocationDestination);
        RespSlaRule rulesSla = this.rulesSla(entrySlaRule);
        return rulesSla.getDecisionSla();
     }

}
