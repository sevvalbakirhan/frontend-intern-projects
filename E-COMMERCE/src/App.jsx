import { useEffect } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { ToastContainer } from 'react-toastify'
import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, removeFromBasket, setDrawer } from './redux/slices/basketSlice'

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products]);

  return (
    <div>
      <PageContainer>
        <Loading />
        <Header />
        <RouterConfig />

        <Drawer className='drawer'
          onClose={() => dispatch(setDrawer())}
          anchor="right"
          open={drawer}
          PaperProps={{
            sx: {
              width: 340,
              padding: '20px',
              backgroundColor: '#fff8dc',
            },
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#222',
            marginBottom: '20px',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px'
          }}>
            Basket
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginRight: '12px',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#777', marginTop: '4px' }}>
                      {product.count} adet
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#000', marginTop: '4px' }}>
                      {(product.price * product.count).toFixed(2)} TL
                    </div>
                  </div>
                  <button
                    style={{
                      backgroundColor: '#ea7171ff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      color: '#000',
                      fontWeight: '500',
                    }}
                    onClick={() => dispatch(removeFromBasket(product.id))}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: '#666' }}>Basket is empty.</p>
            )}
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
              Total Price: {totalAmount.toFixed(2)} ₺
            </p>
          </div>
        </Drawer>
      </PageContainer>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App
