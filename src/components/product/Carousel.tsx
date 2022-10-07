import ProductTab from '../ProductTab'
import { IProduct } from '../../types/Collections'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, type Swiper as SwiperRef } from 'swiper'
import { useState, useCallback } from 'react'

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
      <a
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
        onReachEnd={onReachEnd}
        modules={[Pagination]}
      >
        {
          <>
            {products.map((product: IProduct, index: number) => (
              <SwiperSlide key={index}>
                <ProductTab product={product} />
              </SwiperSlide>
            ))}
            <div aria-busy="true"></div>
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
      </a>
    </div>
  )
}

export default ProductCarousel
