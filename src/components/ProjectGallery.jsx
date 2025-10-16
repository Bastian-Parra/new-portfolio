import { Galleria } from "primereact/galleria";
import { useState } from "react";

export default function ProjectGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.src}
        alt={item.alt}
        style={{
          width: "100%",
          display: "block",
          height: "450px",
          borderRadius: "15px",
        }}
      />
    );
  };

  const navigatorStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    color: "#fff",
    margin: "0px 10px 0px 10px"
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
        circular
        showItemNavigators
        autoPlay
        transitionInterval={5000}
        pt={{
          previousItemButton: {
            style: navigatorStyle,
          },
          nextItemButton: {
            style: navigatorStyle,
          },
        }}
      />
    </div>
  );
}
