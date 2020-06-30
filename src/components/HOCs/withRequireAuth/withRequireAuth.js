import React, { useEffect, useState } from "react";
import AdminLogin from "../../AdminLogin/AdminLogin";
import storageHelper from "../../../support/storageUtils";

const withRequireAuth = (WrappedComponent) => {
  return (props) => {
    const [currentToken, setCurrentToken] = useState(
      Boolean(localStorage.getItem("access_token"))
    );

    const storageChangesCallback = (changes) => {
      if (changes.method === "setItem") {
        setCurrentToken(changes.value);
      }
    };

    useEffect(() => {
      const randomID = `wrapped-component-${Date.now()}`;
      storageHelper.subscribe({
        id: randomID,
        callback: storageChangesCallback,
      });
      return () => storageHelper.unsubscribe(randomID);
    }, []);

    if (!currentToken) return <AdminLogin />;
    return <WrappedComponent {...props} />;
  };
};

export default withRequireAuth;
