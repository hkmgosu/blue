package cl.bluex.controller;

import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;
import org.eclipse.microprofile.health.Readiness;

@Liveness
@Readiness
@ApplicationScoped
public class HealthCheckController implements HealthCheck {
    
    @Override
    public HealthCheckResponse call() {
        return HealthCheckResponse.named("Simple health check").up().build();
    }
    
}
