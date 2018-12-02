import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("1261875137320900")
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
                "198946252969-hepq58tqbqpfu3m10avj8k0nql6hnj4m.apps.googleusercontent.com"
            )
        }
    ]);
    return config;
}
