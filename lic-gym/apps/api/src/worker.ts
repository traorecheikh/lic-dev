import 'reflect-metadata';

async function bootstrapWorker(): Promise<void> {
  process.stdout.write('Gym worker scaffold started\n');
}

bootstrapWorker();
