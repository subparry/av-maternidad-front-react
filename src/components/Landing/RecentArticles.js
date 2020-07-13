import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../support/constants";
import Slider from "../shared/Slider";
import ArticlePreviewCard from "../shared/ArticlePreviewCard";

const RecentArticles = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(`${API_BASE_URL}/recent_posts`, { signal })
      .then((res) => res.json())
      .then((json) => setRecent(json))
      .catch((err) => {});
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section data-testid="recent-articles-section">
      <h2>Artículos recientes</h2>
      <Slider
        items={recent.map((e, i) => (
          <ArticlePreviewCard key={i} {...e} thumbnailImg={e.image} />
        ))}
        itemWidthInPx={290}
      />
    </section>
  );
};

export default RecentArticles;
