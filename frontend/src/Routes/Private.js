import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = () => {
      fetch("http://localhost:4101/api/user-auth", {
        headers: {
          Authorization: auth?.token,
        },
      }).then((resp1) => {
        resp1.json().then((resp2) => {
          if (resp2.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        });
      });
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
