import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider
} from "angular-6-social-login";
import { socialLibraryConstants } from "./Services/Constants/constants";
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
                socialLibraryConstants.facebookID
            )
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(socialLibraryConstants.googleID)
        }
    ]);
    return config;
}
