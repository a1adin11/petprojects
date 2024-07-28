import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="139" cy="129" r="119" />
      <rect x="29" y="257" rx="10" ry="10" width="220" height="21" />
      <rect x="19" y="296" rx="10" ry="10" width="250" height="63" />
      <rect x="153" y="365" rx="20" ry="20" width="116" height="34" />
      <rect x="21" y="369" rx="10" ry="10" width="106" height="28" />
    </ContentLoader>
  );
};

export default PizzaBlockSkeleton;
