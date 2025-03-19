import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { JWT } from "next-auth/jwt";
import { Session, User, Profile } from "next-auth";

// Define a type for the user data returned by Sanity
interface SanityUser {
  _id: string;
  id: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile?: Profile }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile as { id: string; login: string; bio?: string };

      try {
        // Fetch the user from Sanity by GitHub ID
        const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch<SanityUser | null>(AUTHOR_BY_GITHUB_ID_QUERY, { id });

        // If the user doesn't exist, create a new user in Sanity
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name: name || "",
            username: login,
            email: email || "",
            image: image || "",
            bio: bio || "",
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Block sign-in if an error occurs
      }
    },
    async jwt({ token, account, profile }: { token: JWT; account?: any ; profile?: Profile }) {
      if (account && profile) {
        try {
          // Fetch the user from Sanity by GitHub ID
          const user = await client
              .withConfig({ useCdn: false })
              .fetch<SanityUser | null>(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

          // Add the user's Sanity ID to the JWT token
          if (user) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error fetching user for JWT:", error);
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add the user's Sanity ID to the session object
      session.id = token.id as string;
      return session;
    },
  },
});