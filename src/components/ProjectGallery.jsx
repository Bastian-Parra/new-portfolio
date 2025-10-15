import { Galleria } from "primereact/galleria";
import { useState } from "react";

export default function ProjectGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.src}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
        className="max-h-96 object-contain"
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.src}
        alt={item.alt}
        style={{
          display: "block",
          width: "60px",
          height: "60px",
          objectFit: "cover",
        }}
      />
    );
  };

  return (
    <div className="my-6">
      <Galleria
        value={images}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        numVisible={3}
        style={{ maxWidth: "1000px" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        circular
        showItemNavigators
        transitionInterval={3000}
      />
    </div>
  );
}
