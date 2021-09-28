import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Providers from "next-auth/providers"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Facebook({
        clientId:process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET
    })
    // ...add more providers here
  ],
})