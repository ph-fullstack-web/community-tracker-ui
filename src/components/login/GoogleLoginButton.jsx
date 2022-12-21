import React, {useEffect} from 'react';

const GoogleLoginButton = ({style, onCallbackResponse}) => {
  const clientId =
    '1090992123059-dts3p5cf117rq6mqlkbitupdbfssrnd7.apps.googleusercontent.com';

  useEffect(() => {
    if (window.google) {
      /* global google */
      google.accounts.id.initialize({
        client_id: clientId,
        callback: onCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'medium',
        text: 'signin_with',
        shape: 'pill',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.google]);

  return <div id="signInDiv" style={style} />;
};

export default GoogleLoginButton;
