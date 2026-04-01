import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@gym/types';

@Controller()
export class AppController {
  @Get('health')
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'api',
      timestamp: new Date().toISOString(),
    };
  }
}
