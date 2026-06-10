const admin = require("firebase-admin");

let initialized = false;

function initFirebaseAdmin() {
  if (initialized || admin.apps.length) {
    initialized = true;
    return admin;
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (json) {
    const serviceAccount = JSON.parse(json);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || projectId,
    });
    initialized = true;
    return admin;
  }

  if (projectId) {
    admin.initializeApp({ projectId });
    initialized = true;
    return admin;
  }

  return null;
}

function getFirestore() {
  const app = initFirebaseAdmin();
  return app ? admin.firestore() : null;
}

function getAuth() {
  const app = initFirebaseAdmin();
  return app ? admin.auth() : null;
}

module.exports = { initFirebaseAdmin, getFirestore, getAuth, admin };
