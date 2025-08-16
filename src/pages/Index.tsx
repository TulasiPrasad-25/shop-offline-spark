import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart } from '@/components/ShoppingCart';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { usePWA } from '@/hooks/usePWA';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());
  
  const { isOnline, notificationPermission, requestNotificationPermission, showNotification } = usePWA();
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopwave-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }

    const savedFavorites = localStorage.getItem('shopwave-favorites');
    if (savedFavorites) {
      try {
        setFavoriteProducts(new Set(JSON.parse(savedFavorites)));
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopwave-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopwave-favorites', JSON.stringify(Array.from(favoriteProducts)));
  }, [favoriteProducts]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    showNotification('Item Added to Cart', {
      body: `${product.name} has been added to your cart.`,
      icon: product.image,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleToggleFavorite = (productId: string) => {
    setFavoriteProducts(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        toast({
          title: "Removed from favorites",
          description: "Product has been removed from your favorites.",
        });
      } else {
        newFavorites.add(productId);
        toast({
          title: "Added to favorites",
          description: "Product has been added to your favorites.",
        });
      }
      return newFavorites;
    });
  };

  const handleNotificationPermission = async () => {
    if (notificationPermission === 'default') {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "You'll now receive updates about deals and order status.",
        });
      }
    } else if (notificationPermission === 'granted') {
      showNotification('Test Notification', {
        body: 'Notifications are working! You\'ll receive updates about deals and orders.',
      });
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const productsWithFavorites = products.map(product => ({
    ...product,
    isFavorite: favoriteProducts.has(product.id)
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        isOnline={isOnline}
        onCartClick={() => setIsCartOpen(true)}
        onNotificationPermission={handleNotificationPermission}
      />
      
      <main>
        <HeroSection />
        
        {/* Featured Products */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products, 
              available both online and offline with our PWA technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsWithFavorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
