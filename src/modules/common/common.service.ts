import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class CommonService {
  validateContacts(contacts: ContactDto[]) {
    const seen = new Set<string>();
    const validos: ContactDto[] = [];
    const invalidos: (ContactDto & { error: string })[] = [];

    for (const contact of contacts) {
      const { index, name, telf } = contact;

      if (!name?.trim()) {
        invalidos.push({ ...contact, error: 'Nombre vacío' });
        continue;
      }

      if (!telf?.trim()) {
        invalidos.push({ ...contact, error: 'Teléfono vacío' });
        continue;
      }

      if (!/^\d+$/.test(telf)) {
        invalidos.push({
          ...contact,
          error: 'Teléfono debe contener solo números',
        });
        continue;
      }

      if (telf.length !== 9) {
        invalidos.push({ ...contact, error: 'Teléfono debe tener 9 dígitos' });
        continue;
      }

      if (!telf.startsWith('9')) {
        invalidos.push({ ...contact, error: 'Teléfono debe empezar con 9' });
        continue;
      }

      if (seen.has(telf)) {
        invalidos.push({ ...contact, error: 'Teléfono duplicado' });
        continue;
      }

      seen.add(telf);
      validos.push(contact);
    }

    return {
      metadata: {
        total: contacts.length,
        validos: validos.length,
        invalidos: invalidos.length,
      },
      data: { validos, invalidos },
    };
  }
}
