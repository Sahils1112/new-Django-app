from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import Product, Cart, CartItem
from .serializers import (
    ProductSerializer,
    DetailedProductSerializer,
    CartItemSerializer,
    SimpleCartSerializer,
    CartSerializer,
)

import razorpay
from django.conf import settings


# -----------------------------
# PUBLIC PRODUCT APIs
# -----------------------------

@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = DetailedProductSerializer(product)
    return Response(serializer.data)


# -----------------------------
# CART APIs
# -----------------------------

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")

    if not cart_code or not product_id:
        return Response(
            {"error": "cart_code and product_id are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart, _ = Cart.objects.get_or_create(cart_code=cart_code, paid=False)
    product = get_object_or_404(Product, id=product_id)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    cart_item.quantity = 1 if created else cart_item.quantity + 1
    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(
        {"data": serializer.data, "message": "Item added to cart"},
        status=status.HTTP_201_CREATED
    )


@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    product = get_object_or_404(Product, id=product_id)

    exists = CartItem.objects.filter(cart=cart, product=product).exists()
    return Response({"product_in_cart": exists})


@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")

    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
        serializer = SimpleCartSerializer(cart)
        return Response(serializer.data)
    except Cart.DoesNotExist:
        return Response({"num_of_items": 0})


@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(["PATCH", "OPTIONS"])
@permission_classes([AllowAny])
def update_quantity(request):
    try:
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")

        if item_id is None or quantity is None:
            return Response(
                {"error": "item_id and quantity are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        quantity = int(quantity)
        cart_item = CartItem.objects.get(id=item_id)
        cart_item.quantity = quantity
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(
            {"data": serializer.data, "message": "Quantity updated"}
        )

    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
    except ValueError:
        return Response({"error": "Quantity must be integer"}, status=400)


@api_view(["DELETE", "OPTIONS"])
@permission_classes([AllowAny])
def remove_cart_item(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id)
    cart_item.delete()
    return Response({"message": "Item removed"})


# -----------------------------
# RAZORPAY PAYMENT APIs
# -----------------------------

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_order(request):
    try:
        amount = int(request.data.get("amount", 0))
        cart_code = request.data.get("cart_code", "")

        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)

        amount_paise = amount * 100

        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {"cart_code": cart_code},
        })

        return Response({
            "key": settings.RAZORPAY_KEY_ID,
            "amount": amount_paise,
            "currency": "INR",
            "order_id": order["id"],
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@csrf_exempt
@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def verify_payment(request):
    try:
        data = request.data

        params = {
            "razorpay_order_id": data.get("razorpay_order_id"),
            "razorpay_payment_id": data.get("razorpay_payment_id"),
            "razorpay_signature": data.get("razorpay_signature"),
        }

        client.utility.verify_payment_signature(params)
        return Response({"status": "success"})

    except razorpay.errors.SignatureVerificationError:
        return Response(
            {"status": "failed"},
            status=status.HTTP_400_BAD_REQUEST
        )

