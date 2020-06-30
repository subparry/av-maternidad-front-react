import React, { useEffect } from "react";
import { API_BASE_URL } from "../../support/constants";
import Slider from "../shared/Slider";
import ArticlePreviewCard from "../shared/ArticlePreviewCard";

const RecentArticles = () => {
  useEffect(() => {
    fetch(`${API_BASE_URL}/recent_posts`).catch((err) => {});
  }, []);
  return (
    <section data-testid="recent-articles-section">
      <h2>Artículos recientes</h2>
      <Slider
        items={[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <ArticlePreviewCard key={e} />
        ))}
        itemWidthInPx={290}
      />
    </section>
  );
};

export default RecentArticles;
