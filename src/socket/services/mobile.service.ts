import { Injectable } from '@nestjs/common';

@Injectable()
export class MobileService {
  private phones = new Map<string, string>();

  registerAvailable(deviceId: string, socketId: string) {
    console.log(`Registering device ${deviceId} with socket ID ${socketId}`);

    this.phones.set(socketId, deviceId);
  }

  getAvailablePhones(): string[] {
    return Array.from(this.phones.values());
  }

  removeBySocketId(socketId: string) {
    const deviceId = this.phones.get(socketId);
    if (deviceId) {
      this.phones.delete(socketId);
    }
  }
}
