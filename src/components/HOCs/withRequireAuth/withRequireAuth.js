import React, { useEffect, useState } from "react";
import AdminLogin from "../../AdminLogin/AdminLogin";
import storageHelper from "../../../support/storageUtils";
import idUtils from "../../../support/idUtils";
import { API_BASE_URL } from "../../../support/constants";
import Spinner from "../../shared/Spinner";

const withRequireAuth = (WrappedComponent) => {
  return (props) => {
    const [currentToken, setCurrentToken] = useState({
      token: Boolean(localStorage.getItem("access_token")),
      valid: false,
      checked: false,
    });

    const storageChangesCallback = (changes) => {
      if (changes.method === "setItem" && changes.key === "access_token") {
        setCurrentToken((prev) => ({
          ...prev,
          token: changes.value,
          checked: false,
        }));
      }
    };

    const tokenMissing = () => !currentToken.token;
    const tokenUnchecked = () => !currentToken.checked;
    useEffect(() => {
      const uniqueId = idUtils.createUniqueId("with-require-auth-component");
      storageHelper.subscribe({
        id: uniqueId,
        callback: storageChangesCallback,
      });
      return () => storageHelper.unsubscribe(uniqueId);
    }, []);

    useEffect(() => {
      if (currentToken.token) {
        fetch(`${API_BASE_URL}/check_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("access_token") }),
        })
          .then((res) => res.json())
          .then(({ valid }) =>
            setCurrentToken((prev) => ({ ...prev, checked: true, valid }))
          );
      }
    }, [currentToken.token]);

    if (tokenMissing()) return <AdminLogin />;
    if (tokenUnchecked()) return <Spinner />;

    return currentToken.valid ? (
      <WrappedComponent {...props} />
    ) : (
      <AdminLogin />
    );
  };
};

export default withRequireAuth;
