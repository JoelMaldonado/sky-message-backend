import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request, Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // GET de verificación inicial
  @Get()
  verify(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    const valid =
      mode === 'subscribe' &&
      typeof token === 'string' &&
      token === VERIFY_TOKEN &&
      typeof challenge === 'string';

    if (valid) {
      // Meta espera 200 con el challenge en el body
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  }

  // POST: eventos entrantes
  @Post()
  @HttpCode(200) // Siempre 200 para que Meta no reintente
  async receive(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('x-hub-signature-256') signature: string,
  ) {
    // (Opcional) Validar firma del webhook
    await this.webhookService.verifySignature(signature, req.rawBody);

    // Procesar payload
    await this.webhookService.handleEvent(req.body);
    return 'EVENT_RECEIVED';
  }
}
