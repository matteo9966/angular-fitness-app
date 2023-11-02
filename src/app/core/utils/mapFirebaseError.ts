// {
//     code: "auth/email-already-in-use",
//     customData: {
//       appName: "[DEFAULT]",
//       _tokenResponse: {
//         error: {
//           code: 400,
//           message: "EMAIL_EXISTS",
//           errors: [
//             {
//               message: "EMAIL_EXISTS",
//               reason: "invalid",
//               domain: "global",
//             },
//           ],
//         },
//       },
//     },
//     name: "FirebaseError",
//   }

export function mapFirebaseError(
  code: string,
  config: Record<string, string>,
  defaultErrorMessage = 'Error'
) {
  const message = config[code];
  if (!message) {
    return defaultErrorMessage;
  }
  return message;
}
