const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(cors({ origin: true }));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.put("/", (req, res) => {
  const id = req.body.id;
  // const id = req.params.id;
  if (id) {
    admin
      .auth()
      .getUser(id)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
        const user = userRecord.toJSON();
        const email = user.email;

        admin
          .auth()
          .updateUser(id, {
            password: email,
          })
          .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully updated user", userRecord.toJSON());
            res.json({ userRecord });
          })
          .catch(function (error) {
            // console.log("Error updating user:", error);
            res.send(error);
          });
      })
      .catch(function (error) {
        console.log("Error fetching user data:", error);
      });
  } else {
    res.send("not received id error");
  }
});

exports.updatePassword = functions.https.onRequest(app);

// exports.updatePassword = functions.https.onRequest(
//   async (request, response) => {

//     const data = request.body;
//     if (data.id) {
//       const id = data.id;
//       // const user = await firestore.doc(`cours/${id}`);
//       auth
//         .updateUser(id, {
//           email: "yvesthior@dev.com",
//           phoneNumber: "779716833",
//           emailVerified: true,
//           password: "passer1234",
//           displayName: "Yves Thior",
//           photoURL: "http://www.example.com/12345678/photo.png",
//           disabled: false,
//         })
//         .then(function (userRecord) {
//           // See the UserRecord reference doc for the contents of userRecord.
//           console.log("Successfully updated user", userRecord.toJSON());
//           response.json({ userRecord });
//         })
//         .catch(function (error) {
//           console.log("Error updating user:", error);
//         });
//     } else {
//       response.send("not received id error");
//     }
//   }
// );
