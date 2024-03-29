import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ENV_VARS } from '@/configs/env';
@Injectable({
  scope: Scope.TRANSIENT,
})
export class Logger extends ConsoleLogger {
  constructor() {
    super(ENV_VARS.NAME, { timestamp: true });
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: any, stack?: any, context?: any, ...rest: any[]): void {
    super.error(message, stack, context, ...rest);
  }
}

export const LOGGER = new Logger();
