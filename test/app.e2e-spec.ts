import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignInDto } from 'src/auth/dto';

describe('App e22', () => {
  const BASE_ENDPOINT = 'http://localhost:3333';
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    app.listen(3333);

    prismaService = app.get(PrismaService);
    await prismaService.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const AUTH_ENDPOINT = `${BASE_ENDPOINT}/auth`;

    const authDto: SignInDto = {
      email: 'bookmark.admin@bookmark.com',
      password: '#!bl4kJavaScrip7ra',
    };
    const authDto2: SignInDto = {
      email: 'bookmark@bookmark.com',
      password: '#!bl4kJavaScrip7ra',
    };

    describe('POST - signup', () => {
      const SIGN_UP_ENDPOINT = `${AUTH_ENDPOINT}/sign-up`;
      it('should successfully sign up', () => {
        return pactum
          .spec()
          .post(SIGN_UP_ENDPOINT)
          .withBody(authDto)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains('id');
      });
      it('should fail if password is not provided', () => {
        return pactum
          .spec()
          .post(SIGN_UP_ENDPOINT)
          .withBody({ email: authDto.email })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail if email is not provided', () => {
        return pactum
          .spec()
          .post(SIGN_UP_ENDPOINT)
          .withBody({ password: authDto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail if credentials are not provided', () => {
        return pactum
          .spec()
          .post(SIGN_UP_ENDPOINT)
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail when invalid email is provided', () => {
        return pactum
          .spec()
          .post(SIGN_UP_ENDPOINT)
          .withBody({ email: 'failing', password: authDto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });

    describe('POST - signin', () => {
      const SIGN_IN_ENDPOINT = `${AUTH_ENDPOINT}/sign-in`;
      it('should successfully signin', () => {
        pactum.spec().post(SIGN_IN_ENDPOINT);
        return pactum
          .spec()
          .post(`${AUTH_ENDPOINT}/sign-in`)
          .withBody(authDto)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('access_token');
      });

      it('should fail with due to wrong credentials', () => {
        return pactum
          .spec()
          .post(`${AUTH_ENDPOINT}/sign-in`)
          .withBody(authDto2)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail if password is not provided', () => {
        return pactum
          .spec()
          .post(SIGN_IN_ENDPOINT)
          .withBody({ email: authDto.email })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail if email is not provided', () => {
        return pactum
          .spec()
          .post(SIGN_IN_ENDPOINT)
          .withBody({ password: authDto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should fail if credentials are not provided', () => {
        return pactum
          .spec()
          .post(SIGN_IN_ENDPOINT)
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('User', () => {
    describe('GET - me', () => {
      it.todo('Should get currently signed in user endpoint');
    });
    describe('GET - users', () => {
      it.todo('Should create all users endpoint');
    });
    describe('GET - users by id', () => {
      it.todo('Should get user by id');
    });
    describe('PUT - users update by id', () => {
      it.todo('Should edit user by id');
    });
    describe('DELETE - users delete by id', () => {
      it.todo('Should delete user by id');
    });
  });

  describe('Bookmark', () => {
    describe('GET - me', () => {
      it.todo('Should get currently signed in user endpoint');
    });
    describe('GET - bookmarks', () => {
      it.todo('Should create all bookmarks endpoint');
    });
    describe('GET - bookmarks by id', () => {
      it.todo('Should get bookmark by id');
    });
    describe('PUT - bookmarks update by id', () => {
      it.todo('Should edit bookmark by id');
    });
    describe('DELETE - bookmarks delete by id', () => {
      it.todo('Should delete bookmark by id');
    });
  });
});
