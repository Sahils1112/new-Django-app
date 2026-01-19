from rest_framework import serializers
from .models import Product, Cart, CartItem

# ============================================================================
#  Product serializer
# ============================================================================
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "image", "description", "category", "price"]




# ============================================================================
#  Detailed product with similar products
# ============================================================================
class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]

    def get_similar_products(self, obj):
        products = Product.objects.filter(category=obj.category).exclude(id=obj.id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data





# ============================================================================
#  Cart item serializer
# ============================================================================
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product', 'total']

    def get_total(self, cartitem):
        return cartitem.product.price * cartitem.quantity






# ============================================================================
#  Cart serializer (for full cart details)
# ============================================================================
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', "items", "sum_total", "num_of_items", 'created_at', 'modified_at']

    def get_sum_total(self, cart):
        items = cart.items.all()
        total = sum([item.product.price * item.quantity for item in items])
        return total

    def get_num_of_items(self, cart):
        items = cart.items.all()
        return sum([item.quantity for item in items])






# ============================================================================
#  Simple cart serializer (for quick cart status)
# ============================================================================
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'num_of_items']

    def get_num_of_items(self, cart):
        return sum([item.quantity for item in cart.items.all()])
