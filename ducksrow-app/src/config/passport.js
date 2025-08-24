import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let authProvider = await prisma.authProvider.findUnique({
          where: {
            provider_providerUid: {
              provider: "google",
              providerUid: profile.id,
            },
          },
          include: { user: true },
        });

        let user;
        if (!authProvider) {
          user = await prisma.user.create({
            data: {
              fullName: profile.displayName,
              email: profile.emails[0].value,
              avatarUrl: profile.photos[0]?.value,
              providers: {
                create: {
                  provider: "google",
                  providerUid: profile.id,
                },
              },
            },
          });
        } else {
          user = authProvider.user;
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

export default passport;
