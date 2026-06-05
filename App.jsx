import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FoodDeliveryApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(30);
  useEffect(() => {
    fetchRestaurants();
  }, []);
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const mockRestaurants = [
        {
          id: 1,
          name: 'Burger Palace',
          cuisine: 'American',
          rating: 4.8,
          deliveryTime: '25-30',
          deliveryFee: 2.99,
          minOrder: 15,
          image: '🍔',
          description: 'Juicy burgers and crispy fries',
          distance: 1.2,
          isOpen: true
        },
        {
          id: 2,
          name: 'Pizza Corner',
          cuisine: 'Italian',
          rating: 4.9,
          deliveryTime: '20-25',
          deliveryFee: 1.99,
          minOrder: 18,
          image: '🍕',
          description: 'Authentic Italian pizzas',
          distance: 0.8,
          isOpen: true
        },
        {
          id: 3,
          name: 'Sushi Master',
          cuisine: 'Japanese',
          rating: 4.7,
          deliveryTime: '30-40',
          deliveryFee: 3.99,
          minOrder: 25,
          image: '🍣',
          description: 'Fresh sushi and Japanese delicacies',
          distance: 2.1,
          isOpen: true
        },
        {
          id: 4,
          name: 'Taco Fiesta',
          cuisine: 'Mexican',
          rating: 4.6,
          deliveryTime: '20-25',
          deliveryFee: 2.49,
          minOrder: 12,
          image: '🌮',
          description: 'Authentic Mexican street food',
          distance: 1.5,
          isOpen: true
        },
        {
          id: 5,
          name: 'Biryani House',
          cuisine: 'Indian',
          rating: 4.8,
          deliveryTime: '35-45',
          deliveryFee: 2.99,
          minOrder: 20,
          image: '🍛',
          description: 'Aromatic Indian cuisine',
          distance: 2.3,
          isOpen: true
        },
        {
          id: 6,
          name: 'Noodle Station',
          cuisine: 'Asian',
          rating: 4.7,
          deliveryTime: '25-30',
          deliveryFee: 2.49,
          minOrder: 14,
          image: '🍜',
          description: 'Fresh noodles and Asian stir-fries',
          distance: 1.8,
          isOpen: true
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 800));
      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMenu = (restaurant) => {
    const menus = {
      1: [ 
        { id: 101, name: 'Classic Burger', price: 8.99, category: 'burgers', image: '🍔', description: 'Beef patty with lettuce, tomato, onion' },
        { id: 102, name: 'Cheese Burger', price: 9.99, category: 'burgers', image: '🧀', description: 'With melted American cheese' },
        { id: 103, name: 'Bacon Burger', price: 10.99, category: 'burgers', image: '🥓', description: 'Crispy bacon on top' },
        { id: 104, name: 'French Fries', price: 3.99, category: 'sides', image: '🍟', description: 'Golden crispy fries' },
        { id: 105, name: 'Onion Rings', price: 4.99, category: 'sides', image: '🧅', description: 'Crispy fried onion rings' },
        { id: 106, name: 'Milkshake', price: 4.49, category: 'drinks', image: '🥤', description: 'Chocolate, vanilla, or strawberry' }
      ],
      2: [ 
        { id: 201, name: 'Margherita Pizza', price: 12.99, category: 'pizza', image: '🍕', description: 'Fresh mozzarella and basil' },
        { id: 202, name: 'Pepperoni Pizza', price: 13.99, category: 'pizza', image: '🍕', description: 'Loaded with pepperoni' },
        { id: 203, name: 'Vegetarian Pizza', price: 11.99, category: 'pizza', image: '🥒', description: 'Mixed vegetables' },
        { id: 204, name: 'Garlic Bread', price: 3.99, category: 'sides', image: '🍞', description: 'Crispy with garlic butter' },
        { id: 205, name: 'Caesar Salad', price: 7.99, category: 'salads', image: '🥗', description: 'With parmesan and croutons' },
        { id: 206, name: 'Coke', price: 2.49, category: 'drinks', image: '🥤', description: 'Cold refreshing cola' }
      ],
      3: [ 
        { id: 301, name: 'California Roll', price: 8.99, category: 'sushi', image: '🍣', description: 'Crab, avocado, cucumber' },
        { id: 302, name: 'Spicy Tuna Roll', price: 9.99, category: 'sushi', image: '🌶️', description: 'Spicy tuna with mayo' },
        { id: 303, name: 'Dragon Roll', price: 14.99, category: 'sushi', image: '🐉', description: 'Premium assorted sushi' },
        { id: 304, name: 'Edamame', price: 4.99, category: 'sides', image: '🫘', description: 'Steamed soybeans' },
        { id: 305, name: 'Miso Soup', price: 3.99, category: 'soup', image: '🍲', description: 'Traditional miso broth' },
        { id: 306, name: 'Green Tea', price: 2.99, category: 'drinks', image: '🍵', description: 'Hot green tea' }
      ],
      4: [ 
        { id: 401, name: 'Beef Tacos', price: 7.99, category: 'tacos', image: '🌮', description: 'Three soft beef tacos' },
        { id: 402, name: 'Chicken Tacos', price: 7.99, category: 'tacos', image: '🌮', description: 'Three grilled chicken tacos' },
        { id: 403, name: 'Fish Tacos', price: 8.99, category: 'tacos', image: '🐟', description: 'Fresh grilled fish' },
        { id: 404, name: 'Burrito Supreme', price: 9.99, category: 'burritos', image: '🌯', description: 'Large burrito with everything' },
        { id: 405, name: 'Guacamole Dip', price: 4.99, category: 'sides', image: '🥑', description: 'Fresh avocado dip' },
        { id: 406, name: 'Agua Fresca', price: 2.99, category: 'drinks', image: '🧃', description: 'Refreshing fruit drink' }
      ],
      5: [ 
        { id: 501, name: 'Chicken Biryani', price: 9.99, category: 'biryani', image: '🍛', description: 'Aromatic basmati rice with chicken' },
        { id: 502, name: 'Lamb Biryani', price: 11.99, category: 'biryani', image: '🍛', description: 'With tender lamb pieces' },
        { id: 503, name: 'Vegetable Biryani', price: 8.99, category: 'biryani', image: '🥬', description: 'Mixed vegetables' },
        { id: 504, name: 'Samosa', price: 3.99, category: 'sides', image: '🥟', description: 'Crispy fried pastry' },
        { id: 505, name: 'Raita', price: 2.99, category: 'sides', image: '🥛', description: 'Yogurt with spices' },
        { id: 506, name: 'Mango Lassi', price: 3.99, category: 'drinks', image: '🥭', description: 'Sweet mango yogurt drink' }
      ],
      6: [ 
        { id: 601, name: 'Pad Thai', price: 8.99, category: 'noodles', image: '🍜', description: 'Thai style noodles' },
        { id: 602, name: 'Chow Mein', price: 8.99, category: 'noodles', image: '🍝', description: 'Chinese egg noodles' },
        { id: 603, name: 'Ramen', price: 10.99, category: 'noodles', image: '🍜', description: 'Japanese ramen with broth' },
        { id: 604, name: 'Spring Rolls', price: 4.99, category: 'sides', image: '🥬', description: 'Crispy spring rolls' },
        { id: 605, name: 'Vegetable Stir-fry', price: 6.99, category: 'sides', image: '🥦', description: 'Fresh vegetables' },
        { id: 606, name: 'Iced Tea', price: 2.99, category: 'drinks', image: '🧋', description: 'Chilled iced tea' }
      ]
    };

    setMenuItems(menus[restaurant.id] || []);
  };

  // Filter menu items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity, restaurantId: selectedRestaurant.id }]);
    }
    setQuantity(1);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedRestaurant?.deliveryFee || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getCategories = () => {
    const categories = new Set(menuItems.map(item => item.category));
    return ['all', ...Array.from(categories)];
  };

  return (
    <div className="food-delivery-container">
      <header>
        <div className="header-content">
          <div className="logo" onClick={() => { setCurrentPage('home'); setCart([]); }}>
            <span className="logo-icon">🍕</span>
            FoodHub
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage('home')}>Home</button>
            <button className="cart-button" onClick={() => setCartOpen(!cartOpen)}>
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <main>
        {loading ? (
          <div className="loading">Loading restaurants...</div>
        ) : currentPage === 'home' ? (
          <>
            <section className="hero-section">
              <div className="hero-content">
                <div className="hero-icon">🚀</div>
                <h1>Order Food Delivered Fast</h1>
                <p>Discover amazing restaurants and get your favorite meals in minutes</p>
                <button onClick={() => setCurrentPage('restaurants')}>
                  Order Now
                </button>
              </div>
            </section>

            <h2 className="section-title">Popular Restaurants</h2>
            <div className="restaurants-grid">
              {restaurants.slice(0, 6).map(restaurant => (
                <div key={restaurant.id} className="restaurant-card" onClick={() => {
                  setSelectedRestaurant(restaurant);
                  fetchMenu(restaurant);
                  setCurrentPage('menu');
                  setSearchTerm('');
                  setFilterCategory('all');
                }}>
                  <div className="restaurant-image">
                    {restaurant.image}
                  </div>
                  <div className="restaurant-info">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                    <p className="restaurant-desc">{restaurant.description}</p>
                    <div className="restaurant-meta">
                      <div className="restaurant-rating">
                        ⭐ {restaurant.rating}
                      </div>
                      <div className="restaurant-delivery">
                        {restaurant.deliveryTime} min • ${restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentPage === 'restaurants' ? (
          <>
            <h2 className="section-title">All Restaurants</h2>
            <div className="restaurants-grid">
              {filteredRestaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-card" onClick={() => {
                  setSelectedRestaurant(restaurant);
                  fetchMenu(restaurant);
                  setCurrentPage('menu');
                  setSearchTerm('');
                  setFilterCategory('all');
                }}>
                  <div className="restaurant-image">
                    {restaurant.image}
                  </div>
                  <div className="restaurant-info">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                    <p className="restaurant-desc">{restaurant.description}</p>
                    <div className="restaurant-meta">
                      <div className="restaurant-rating">
                        ⭐ {restaurant.rating}
                      </div>
                      <div className="restaurant-delivery">
                        {restaurant.deliveryTime} min • ${restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentPage === 'menu' ? (
          selectedRestaurant && (
            <>
              <div className="menu-header">
                <div className="menu-header-image">{selectedRestaurant.image}</div>
                <div className="menu-header-info">
                  <h2>{selectedRestaurant.name}</h2>
                  <p>{selectedRestaurant.cuisine} • {selectedRestaurant.description}</p>
                  <p>⭐ {selectedRestaurant.rating} • {selectedRestaurant.deliveryTime} min delivery</p>
                  <button onClick={() => setCurrentPage('restaurants')} style={{ marginTop: '1rem' }}>
                    ← Back to Restaurants
                  </button>
                </div>
              </div>

              <div className="menu-filters">
                {getCategories().map(category => (
                  <button
                    key={category}
                    className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="menu-items-grid">
                {filteredMenuItems.map((item, index) => (
                  <div key={item.id} className="menu-item-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="menu-item-icon">{item.image}</div>
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-footer">
                      <span className="menu-item-price">${item.price}</span>
                      <button onClick={() => {
                        setSelectedFood(item);
                        setCurrentPage('food-detail');
                      }}>
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        ) : currentPage === 'food-detail' ? (
          selectedFood && (
            <div className="food-detail">
              <button onClick={() => setCurrentPage('menu')} style={{ marginBottom: '2rem' }}>
                ← Back to Menu
              </button>
              <div className="detail-grid">
                <div className="detail-image">{selectedFood.image}</div>
                <div className="detail-info">
                  <h2>{selectedFood.name}</h2>
                  <div className="detail-price">${selectedFood.price}</div>
                  <p className="detail-description">
                    {selectedFood.description}
                  </p>
                  <p className="detail-description">
                    Enjoy this delicious {selectedFood.category} item from {selectedRestaurant.name}. 
                    Freshly prepared and delivered to your doorstep with care.
                  </p>
                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button className="add-to-cart-btn" onClick={() => {
                    addToCart(selectedFood);
                    setCartOpen(true);
                    setCurrentPage('menu');
                  }}>
                    Add to Cart - ${(selectedFood.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          )
        ) : currentPage === 'checkout' ? (
          <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            <form className="checkout-form" onSubmit={(e) => {
              e.preventDefault();
              setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
              setOrderPlaced(true);
              setCurrentPage('order-tracking');
            }}>
              <div className="form-section">
                <h3>📍 Delivery Address</h3>
                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" required placeholder="123 Main Street" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" required placeholder="New York" />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input type="text" required placeholder="10001" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" required placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="form-section">
                <h3>👤 Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" required placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" required placeholder="Doe" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-section">
                <h3>💳 Payment Method</h3>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" required placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" required placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>📋 Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="checkout-btn" style={{ marginTop: '2rem' }}>
                Place Order - ${total.toFixed(2)}
              </button>
            </form>
          </div>
        ) : currentPage === 'order-tracking' ? (
          <div className="tracking-container">
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h2>Order Confirmed!</h2>
              <p>Thank you for your order. Your food is being prepared.</p>
              <div className="order-number">{orderNumber}</div>
            </div>

            <div className="tracking-card">
              <div className="tracking-status">
                <div className="status-icon">📦</div>
                <div className="status-text">Your order is confirmed</div>
                <div className="status-time">Expected delivery in {estimatedTime} minutes</div>
              </div>

              <div className="tracking-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot">✓</div>
                  <div className="timeline-content">
                    <h4>Order Confirmed</h4>
                    <p>Your order has been received and confirmed</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot">👨‍🍳</div>
                  <div className="timeline-content">
                    <h4>Preparing Your Food</h4>
                    <p>Chef is preparing your delicious meal</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot">📦</div>
                  <div className="timeline-content">
                    <h4>Ready for Pickup</h4>
                    <p>Your order is being packed and ready for delivery</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot">🚚</div>
                  <div className="timeline-content">
                    <h4>On the Way</h4>
                    <p>Your delivery partner is heading to your address</p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setCurrentPage('home')} style={{ marginTop: '2rem', width: '100%' }}>
              Back to Home
            </button>
          </div>
        ) : null}
      </main>

      {/* CART SIDEBAR */}
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Add items to your cart to get started
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price} each</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {selectedRestaurant && (
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={() => {
                  setCurrentPage('checkout');
                  setCartOpen(false);
                }}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodDeliveryApp;