import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e22', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    prismaService = app.get(PrismaService);
    await prismaService.cleanDb();
    app.listen(3333);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('POST - signup', () => {});
    describe('POST - signin', () => {});
  });

  describe('User', () => {
    describe('GET - users', () => {});
    describe('GET - me', () => {});
  });

  describe('Bookmark', () => {
    describe('GET - bookmarks', () => {});
  });
});
