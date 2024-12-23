package cl.bluex.interfaces;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import cl.bluex.dto.DateRuleDto;
import cl.bluex.dto.EntryPriceDto;
import cl.bluex.dto.EntrySlaRule;
import cl.bluex.dto.IRulesDto;
import cl.bluex.dto.LocalServiceLocation;
import cl.bluex.dto.RowSlaRule;
import org.jboss.logging.Logger;

@ApplicationScoped
public class ObjectService {

   @Inject
   @RestClient
   LocalHttpService localHttpService;

    @Inject
    Logger log;
   
    
    public IRulesDto paramRulesGeneral(LocalServiceLocation respLocationOrigin, LocalServiceLocation respLocationDestination, EntryPriceDto entryPrice){
        IRulesDto rulesDto = new IRulesDto();
        DateRuleDto dateRuleDto = new DateRuleDto(); 
        dateRuleDto.setCodeOrigin(respLocationOrigin.getRespServiceLocation().getCode());
        dateRuleDto.setBasePostOrigin(respLocationOrigin.getRespServiceLocation().getBasePost());
        dateRuleDto.setRadioOrigin(respLocationOrigin.getRespServiceLocation().getRadio());
        dateRuleDto.setZonaOrigin(respLocationOrigin.getRespServiceLocation().getZone());
        dateRuleDto.setCodeDestination(respLocationDestination.getRespServiceLocation().getCode());
        dateRuleDto.setBasePostDestination(respLocationDestination.getRespServiceLocation().getBasePost());
        dateRuleDto.setZonaDestino(respLocationDestination.getRespServiceLocation().getZone());
        dateRuleDto.setRadioDestino(respLocationDestination.getRespServiceLocation().getRadio());
        dateRuleDto.setBroad(entryPrice.getBroad());
        dateRuleDto.setLength(entryPrice.getLength());
        dateRuleDto.setHigh(entryPrice.getHigh());
        dateRuleDto.setWeight(entryPrice.getWeight());
        rulesDto.setIRulesDto(dateRuleDto);
        return rulesDto;
     }

     public EntrySlaRule rulesSla(Integer sla, LocalServiceLocation respLocationOrigin,LocalServiceLocation respLocationDestination){
        EntrySlaRule entrySlaRule = new EntrySlaRule();
        RowSlaRule rowSlaRule = new RowSlaRule();
        rowSlaRule.setSla(sla);
        rowSlaRule.setZonaOrigin(respLocationOrigin.getRespServiceLocation().getZone());
        rowSlaRule.setBasePostOrigin(respLocationOrigin.getRespServiceLocation().getBasePost());
        rowSlaRule.setRadioOrigin(respLocationOrigin.getRespServiceLocation().getRadio());
        rowSlaRule.setZonaDestino(respLocationDestination.getRespServiceLocation().getZone());
        rowSlaRule.setBasePostDestino(respLocationDestination.getRespServiceLocation().getBasePost());
        rowSlaRule.setRadioDestino(respLocationDestination.getRespServiceLocation().getRadio());
        rowSlaRule.setCodeDestino(respLocationDestination.getRespServiceLocation().getCode());
        entrySlaRule.setSlaIntRule(rowSlaRule);
        return entrySlaRule;
     }

     

}
