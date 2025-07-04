import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1', path: 'health' })
export class HealthController {
  @Get()
  health(): Record<string, string> {
    return { status: 'UP' };
  }
}
