declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production';
    MEMBER_API_URL: string = 'https://member-api.mustit.co.kr';
    MEMBER_API_TIMEOUT: string = '1000';
    MUSTIT_SERVICE_API_URL: string = 'https://release.mustit.xyz';
    MUSTIT_SERVICE_API_TIMEOUT: string = '1000';
    HOME_API_URL: string = 'https://home-devapi.mustit.xyz';
    HOME_API_TIMEOUT: string = '1000';
    MUSTIT_SERVICE_MOBILE_LANDING_URL: string = 'https://release.mustit.xyz';
    MOBILE_LANDING_URL: string = 'https://release.mustit.xyz';
    SEARCH_API_URL: string = 'https://search-devapi.mustit.xyz';
    SEARCH_API_TIMEOUT: string = '1000';
  }
}
