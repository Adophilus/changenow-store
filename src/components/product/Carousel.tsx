import ProductTab from '../ProductTab'
import { IProduct } from '../../types/Collections'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
import { useState, useCallback } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

interface Props {
  products: IProduct[]
  onReachEnd: () => void
}

const ProductCarousel: React.FC<Props> = ({ products, onReachEnd }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperRef>()

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return
    swiperRef.slidePrev()
  }, [swiperRef])

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return
    swiperRef.slideNext()
  }, [swiperRef])

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
        className="products-carousel"
      >
        {products.map((product: IProduct, index: number) => (
          <SplideSlide key={index}>
            <ProductTab product={product} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default ProductCarousel
