import React from 'react';

const CardCarousel = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="cardCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {/* Carousel Item 1 */}
              <div className="carousel-item active" id="carouselItem1">
                <div className="card">
                  <img src="https://www.mytechmag.com/wp-content/uploads/2022/03/agritech-trends-in-2022.jpg" className="card-img-top" alt="Card Image" style={{ height: '300px' }} />
                  <div className="card-body">
                    <h5 className="card-title">FloraBert</h5>
                    <p className="card-text">This is the content of Card 1.</p>
                  </div>
                </div>
              </div>

              {/* Carousel Item 2 */}
              <div className="carousel-item" id="carouselItem2">
                <div className="card">
                  <img src="https://www.mytechmag.com/wp-content/uploads/2022/03/agritech-trends-in-2022.jpg" className="card-img-top" alt="Card Image" style={{ height: '300px' }} />
                  <div className="card-body">
                    <h5 className="card-title">Another Card hi</h5>
                    <p className="card-text">This is the content of Card 2.</p>
                  </div>
                </div>
              </div>

              {/* Add more carousel items as needed */}
            </div>

            {/* Carousel Controls */}
            <a className="carousel-control-prev" href="#cardCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#cardCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
