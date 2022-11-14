export const appInfo = {
  // Docs: https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Vigorish",
  apiDomain: process.env.NEXT_PUBLIC_VIGORISH_API_URL as string,
  websiteDomain: process.env.NEXT_PUBLIC_VIGORISH_ROOT_URL as string,
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
};
