import React, { useEffect, useState } from "react";
import AdminLogin from "../../AdminLogin/AdminLogin";
import storageHelper from "../../../support/storageUtils";
import idUtils from "../../../support/idUtils";

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
      const uniqueId = idUtils.createUniqueId("with-require-auth-component");
      storageHelper.subscribe({
        id: uniqueId,
        callback: storageChangesCallback,
      });
      return () => storageHelper.unsubscribe(uniqueId);
    }, []);

    if (!currentToken) return <AdminLogin />;
    return <WrappedComponent {...props} />;
  };
};

export default withRequireAuth;
