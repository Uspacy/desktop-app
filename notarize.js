require('dotenv').config();
import { notarize } from '@electron/notarize';

async function packageTask () {
  // Package your app here, and code sign with hardened runtime
  await notarize({
	  appBundleId: 'com.uspacy.app',
	  appPath: `${appOutDir}/${appName}.app`,
	  appleApiKey: process.env.API_KEY_ID,
	  appleApiIssuer: process.env.API_KEY_ISSUER_ID,
  }
