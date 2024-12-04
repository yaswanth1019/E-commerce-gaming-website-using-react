// import React, { useEffect, useState } from 'react';
// import CartCard from '../components/cartpage/CartCard';
// import './CartPage.css';
// import { LoadingScreen } from '../components/LoadingScreen';
// import { Link } from 'react-router-dom';

// const CartPage = () => {
//   const [cartgames, setCartGames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const buycartGame = async () => {
//     try {
//       //rediredct to payment page

//       window.location.href = ('/payment');
      
//     } catch (error) {
//       console.error("Error purchasing games:", error);
//       alert("Error processing the purchase");
//     }
//   };

//   useEffect(() => {
//     const fetchCartGames = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/getcartgames', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();
//         console.log("Fetched cart games:", data); // Log the response data
//         if (Array.isArray(data)) {
//           setCartGames(data);
//         } else {
//           throw new Error("Expected an array but got something else");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     setTimeout(() => {
//       (async () => await fetchCartGames())();
//     }, 3000);
//   }, []);

//   useEffect(() => {
//     const calculateTotalAmount = () => {
//       if (Array.isArray(cartgames)) {
//         return cartgames.reduce((sum, game) => sum + game.price, 0);
//       }
//       return 0;
//     };
//     setTotalAmount(calculateTotalAmount());
//   }, [cartgames]);

//   const handleRemoveGame = async (game_name) => {
//     try {
//       const response = await fetch('http://localhost:3000/removetocart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ cart_games: game_name }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const newCartGames = cartgames.filter(game => game.game_name !== game_name);
//         setCartGames(newCartGames);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleRemoveAllGames = async () => {
//     try {
//       for (let game of cartgames) {
//         await fetch('http://localhost:3000/removetocart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ cart_games: game.game_name }),
//           credentials: 'include',
//         });
//       }
//       setCartGames([]);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='cartPage'>
//       <h1>Your Shopping Cart</h1>
//       <div className='cartpagemain'>
//         <div className='cartgames'>
//           {cartgames.length > 0 ? (
//             cartgames.map((game, index) => (
//               <div key={index}>
//                 <CartCard
//                   game_image={game.main_image}
//                   game_name={game.game_name}
//                   game_price={game.price}
//                   removeGame={() => handleRemoveGame(game.game_name)}
//                 />
//               </div>
//             ))
//           ) : (
//             <div className='emptycart'>
//               <video
//                 src='/EmptyCart.mp4'
//                 autoPlay
//                 loop
//                 muted
//               />
//               <p>Your cart is Empty</p>
//               <p>Looks like you haven't made your choice yet.</p>
//               <button><Link to='/'>Start Shopping</Link></button>
//             </div>
//           )}

//           {cartgames.length > 0 && (
//             <div className='cartcontrols'>
//               <button> Continue Shopping </button>
//               <p onClick={handleRemoveAllGames}>Remove all Items</p>
//             </div>
//           )}
//         </div>
//         {cartgames.length > 0 && (
//           <div className='paymentcard'>
//             <div className='estimatedTotal'>
//               <h3 style={{ fontWeight: '10' }}>Estimated Price</h3>
//               <p>&#8377;{totalAmount}</p>
//             </div>
//             <p style={{ color: 'gray', width: '70%', fontSize: '15px' }}>
//               Sales tax will be calculated during checkout where applicable
//             </p>
//             <button className='paymentBtn' onClick={buycartGame}><Link to='/payment'>Continue to Payment</Link></button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../components/cartpage/CartCard';
import './CartPage.css';
import { LoadingScreen } from '../components/LoadingScreen';
import { Link } from 'react-router-dom';
import Header from './Header'
import {
  fetchCartGames,
  removeFromCart,
} from '../redux/slices/cartSlice';
import Footer from './Footer';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, game) => sum + game.price, 0);

  useEffect(() => {
    dispatch(fetchCartGames());
  }, [dispatch]);

  const handleRemoveGame = (game) => {
    dispatch(removeFromCart(game));
  };

  const handleRemoveAllGames = () => {
    cart.forEach((game) => {
      dispatch(removeFromCart(game.game_name));
    });
  };

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
   <>
   <Header />
   <div className="cartPage">
      <h1>Your Shopping Cart</h1>
      <div className="cartpagemain">
        <div className="cartgames">
          {cart.length > 0 ? (
            cart.map((game, index) => (
              <div key={index}>
                <CartCard
                  game_image={game.main_image}
                  game_name={game.game_name}
                  game_price={game.price}
                  removeGame={() => handleRemoveGame(game.game_name)}
                />
              </div>
            ))
          ) : (
            <div className="emptycart">
              <video src="/EmptyCart.mp4" autoPlay loop muted />
              <p>Your cart is Empty</p>
              <p>Looks like you haven't made your choice yet.</p>
              <button>
                <Link to="/">Start Shopping</Link>
              </button>
            </div>
          )}

          {cart.length > 0 && (
            <div className="cartcontrols">
              <button> <Link to='/'>Continue Shopping</Link> </button>
              <p onClick={handleRemoveAllGames}>Remove all Items</p>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="paymentcard">
            <div className="estimatedTotal">
              <h3 style={{ fontWeight: '10' }}>Estimated Price</h3>
              <p>&#8377;{totalAmount}</p>
            </div>
            <p style={{ color: 'gray', width: '70%', fontSize: '15px' }}>
              Sales tax will be calculated during checkout where applicable
            </p>
            <button className="paymentBtn">
              <Link to="/payment">Continue to Payment</Link>
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
   </>
  );
};

export default CartPage;
