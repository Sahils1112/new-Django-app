from django.shortcuts import get_object_or_404
from .models import Product, Cart, CartItem
from .serializers import (
    
    ProductSerializer,
        DetailedProductSerializer,
    CartItemSerializer,
        SimpleCartSerializer,
    CartSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = DetailedProductSerializer(product)
    return Response(serializer.data)


@api_view(['POST'])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")

    if not cart_code or not product_id:
        return Response({"error": "cart_code and product_id are required"}, status=400)

    cart, _ = Cart.objects.get_or_create(cart_code=cart_code, paid=False)
    product = get_object_or_404(Product, id=product_id)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if created:
        cart_item.quantity = 1
    else:
        cart_item.quantity += 1

    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response({"data": serializer.data, "message": "Cart item added successfully"}, status=201)


@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    product = get_object_or_404(Product, id=product_id)

    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
    return Response({'product_in_cart': product_exists_in_cart})


@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
        serializer = SimpleCartSerializer(cart)
        return Response(serializer.data)
    except Cart.DoesNotExist:
        return Response({"num_of_items": 0})


@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


# @api_view(['PATCH'])
# def update_quantity(request):
#     try: 
#         cartitem_id = request.data.get('item_id')
#         quantity = request.data.get("quantity")
#         quantity = int(quantity)
#         cartitem = CartItem.objects.get(id=cartitem_id)
#         cartitem.quantity = quantity
#         cartitem.save()
#         serializer = CartItemSerializer(cartitem)
#         return Response({ "data":serializer.data, "message": "Cartitem updated successful"})



@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get('item_id')
        quantity = request.data.get('quantity')

        if cartitem_id is None or quantity is None:
            return Response(
                {"error": "item_id and quantity are required"},
                status=400
            )

        quantity = int(quantity)
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({
            "data": serializer.data,
            "message": "Cart item updated successfully"
        })

    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=404)
    except ValueError:
        return Response({"error": "Quantity must be an integer"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(['DELETE'])
def remove_cart_item(request, item_id):
    """
    Delete a specific cart item by ID.
    """
    cart_item = get_object_or_404(CartItem, id=item_id)
    cart_item.delete()
    return Response({"message": "Item removed from cart successfully."})




# import razorpay, json
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Payment

# client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def create_razorpay_order(request):
#     """
#     body:
#     {
#       "cart_code": "ABC123",
#       "amount": 1234,      # rupees (frontend total), we'll convert to paise
#       "address": "...",
#       "phone": "...",
#       "full_name": "...",
#       "landmark": "...",
#       "pincode": "110001",
#       "city": "Delhi",
#       "state": "Delhi"
#     }
#     """
#     data = request.data
#     rupees = int(round(float(data.get("amount", 0))))
#     amount_paise = rupees * 100

#     # Create local Payment record
#     pay = Payment.objects.create(
#         cart_code=data.get("cart_code", ""),
#         amount=amount_paise,
#         notes={
#             "address": data.get("address"),
#             "phone": data.get("phone"),
#             "full_name": data.get("full_name"),
#             "landmark": data.get("landmark"),
#             "pincode": data.get("pincode"),
#             "city": data.get("city"),
#             "state": data.get("state"),
#         },
#     )

#     # Create Razorpay order
#     rzp_order = client.order.create(dict(
#         amount=amount_paise,
#         currency="INR",
#         payment_capture=1,  # auto-capture
#         notes={"cart_code": pay.cart_code, "payment_id": str(pay.id)}
#     ))

#     pay.razorpay_order_id = rzp_order["id"]
#     pay.save()

#     return Response({
#         "key": settings.RAZORPAY_KEY_ID,
#         "amount": amount_paise,
#         "currency": "INR",
#         "order_id": rzp_order["id"],
#         "payment_id": pay.id,  # our DB id
#     })

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def verify_razorpay_payment(request):
#     """
#     body:
#     {
#       "razorpay_payment_id": "...",
#       "razorpay_order_id": "...",
#       "razorpay_signature": "...",
#       "payment_id": 12   # our DB id returned earlier
#     }
#     """
#     rp = request.data
#     params_dict = {
#         "razorpay_order_id": rp.get("razorpay_order_id"),
#         "razorpay_payment_id": rp.get("razorpay_payment_id"),
#         "razorpay_signature": rp.get("razorpay_signature"),
#     }

#     try:
#         client.utility.verify_payment_signature(params_dict)
#     except razorpay.errors.SignatureVerificationError:
#         # mark failed
#         try:
#             pay = Payment.objects.get(id=rp.get("payment_id"))
#             pay.status = "failed"
#             pay.razorpay_payment_id = rp.get("razorpay_payment_id")
#             pay.razorpay_signature = rp.get("razorpay_signature")
#             pay.save()
#         except Payment.DoesNotExist:
#             pass
#         return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)

#     # success
#     pay = Payment.objects.get(id=rp.get("payment_id"))
#     pay.status = "paid"
#     pay.razorpay_payment_id = rp.get("razorpay_payment_id")
#     pay.razorpay_signature = rp.get("razorpay_signature")
#     pay.save()

#     # TODO: yahan aap apna actual Order create/confirm kar sakte ho (Cart -> Order items)
#     return Response({"status": "paid"})



import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


@api_view(["POST"])
@permission_classes([AllowAny])
def create_order(request):
    """
    Frontend -> POST amount (in rupees), cart_code
    """
    try:
        amount = int(request.data.get("amount", 0))  # in rupees
        cart_code = request.data.get("cart_code", "")

        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)

        # Convert rupees to paise
        amount_paise = amount * 100

        # Create order in Razorpay
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {"cart_code": cart_code},
        })

        return Response({
            "key": settings.RAZORPAY_KEY_ID,  # frontend me chahiye hota hai
            "amount": amount_paise,
            "currency": "INR",
            "order_id": order["id"],
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def verify_payment(request):
    """
    Verify payment after frontend success
    """
    data = request.data
    try:
        params_dict = {
            "razorpay_order_id": data.get("razorpay_order_id"),
            "razorpay_payment_id": data.get("razorpay_payment_id"),
            "razorpay_signature": data.get("razorpay_signature"),
        }

        # Verify signature
        client.utility.verify_payment_signature(params_dict)

        return Response({"status": "success"})
    except razorpay.errors.SignatureVerificationError:
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)
