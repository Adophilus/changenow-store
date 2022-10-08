import ProductTab from '../ProductTab'
import { IProduct } from '../../types/Collections'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

interface Props {
  products: IProduct[]
  onReachEnd: () => void
}

const ProductCarousel: React.FC<Props> = ({ products, onReachEnd }) => {
  return (
    <div className="products-carousel-wrapper">
      {/*<a
        role="button"
        onClick={handleLeftClick}
        href="#!"
        className="products-carousel-nav-btn nav-left"
      >
        <i className="bi bi-chevron-left"></i>
      </a>
      <Swiper
        className="products-carousel"
        onSwiper={(swiper) => setSwiperRef(swiper)}
        onReachEnd={() => onReachEnd()}
        modules={[Pagination]}
      >
        {
          <>
            {products.map((product: IProduct, index: number) => (
              <SwiperSlide key={index}>
                <ProductTab product={product} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div aria-busy="true"></div>
            </SwiperSlide>
          </>
        }
      </Swiper>
      <a
        role="button"
        onClick={handleRightClick}
        href="#!"
        className="products-carousel-nav-btn nav-right"
      >
        <i className="bi bi-chevron-right"></i>
      </a>*/}
      <Splide
        options={{
          autoWidth: true,
          pagination: false,
          gap: 'var(--block-spacing-horizontal)'
        }}
        onMoved={(e) => {
          if (e.index >= products.length - 2) onReachEnd()
        }}
        className="products-carousel"
      >
        {products.map((product: IProduct, index: number) => (
          <SplideSlide key={index}>
            <ProductTab product={product} />
          </SplideSlide>
        ))}
        <SplideSlide>
          <div
            aria-busy="true"
            className="products-carousel-slide-loader"
          ></div>
        </SplideSlide>
      </Splide>
    </div>
  )
}

export default ProductCarousel
