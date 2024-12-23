import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import LoggerService from 'src/logger/logger.service';
// import { ShippingService } from './shipping.service';

@Controller('/')
export class ShippingController {
  constructor(
    private readonly logger: LoggerService,
    // private readonly appService: ShippingService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
  ) {}

  @MessagePattern('get-os')
  public getOs(@Payload() message: any) {
    this.logger.log(message);
    return message;
  }

  @Post('/send')
  public sendMessage(@Body(`message`) message: string) {
    return firstValueFrom(this.kafka.emit('get-os', message));
  }
}
