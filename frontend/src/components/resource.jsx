
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResourceCarousel = () => {
    const videos = [
        { id: "0XTBYMfZyrM", title: "Introduction to SDGs" },
        { id: "NU6rc_vm9rs", title: "Climate Action Explained" },
        { id: "ZVqSC_hN2lk", title: "Sustainable Development Goals Overview" }
      ];
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-150">
      <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} className="p-4">
            <iframe
              title={video.title}
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="mt-2 text-lg">{video.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ResourceCarousel;
