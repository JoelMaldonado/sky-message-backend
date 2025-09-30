import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class WebhookService {
  async verifySignature(signature: string, raw?: Buffer) {
    if (!process.env.APP_SECRET) return; // si no quieres validar, omite APP_SECRET
    if (!signature || !raw) throw new UnauthorizedException();

    const expected =
      'sha256=' +
      crypto
        .createHmac('sha256', process.env.APP_SECRET)
        .update(raw)
        .digest('hex');

    const ok = crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
    if (!ok) throw new UnauthorizedException();
  }

  async handleEvent(body: any) {
    // Estructura típica del webhook de WhatsApp Cloud
    // body.entry[].changes[].value.messages[], statuses[], etc.
    const entries = body?.entry ?? [];
    for (const e of entries) {
      for (const c of e.changes ?? []) {
        const value = c.value;

        // Mensajes recibidos
        const msgs = value?.messages ?? [];
        for (const m of msgs) {
          const from = m.from; // E.164
          const type = m.type; // 'text', 'button', etc.
          const text = m.text?.body;

          // TODO: guarda en DB, encola respuesta, etc.
          console.log('MSG IN:', { from, type, text });
        }

        // Estados de entrega/lectura
        const stats = value?.statuses ?? [];
        for (const s of stats) {
          // s.status = 'sent' | 'delivered' | 'read' | 'failed'
          // s.id = message_id que enviaste
          console.log('STATUS:', s.status, s.id);
        }
      }
    }
  }
}
