import React from "react";
import withRequireAuth from "../HOCs/withRequireAuth";
import NewArticleForm from "./NewArticleForm";

const AdminSection = () => {
  return (
    <section data-testid="admin-section">
      <NewArticleForm />
    </section>
  );
};

export default withRequireAuth(AdminSection);
