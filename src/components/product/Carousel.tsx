import ProductTab from './Tab'
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
      <Splide
        options={{
          autoWidth: true,
          pagination: false,
          gap: 'var(--block-spacing-horizontal)'
        }}
        onMoved={(e) => {
          console.log(e.index, products.length)
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
