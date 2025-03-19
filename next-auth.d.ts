// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    /**
     * Extend the Session interface to include the `id` property.
     */
    interface Session {
        id?: string; // Add the `id` property to the Session object
    }

    /**
     * Extend the User interface to include custom properties.
     */
    interface User {
        username?: string; // Example: Add a `username` property
    }

    /**
     * Extend the JWT interface to include custom properties.
     */
    interface JWT {
        id?: string; // Example: Add an `id` property to the JWT token
    }
}