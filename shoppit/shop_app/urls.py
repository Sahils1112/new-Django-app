from django.urls import path
from . import views


# from .views import create_razorpay_order, verify_razorpay_payment

urlpatterns = [
    path("products/", views.products, name="products"),
    path("product_detail/<slug:slug>", views.product_detail, name="product_detail"),
    path("add_item/", views.add_item, name="add-item"),
    path("product_in_cart/", views.product_in_cart, name="product_in_cart"),
    path("get_cart_stat/", views.get_cart_stat, name="get_cart_stat"),
    path("get_cart/", views.get_cart, name="get_cart"),
    path("update_quantity/", views.update_quantity, name="update_quantity"),
    path('remove_cart_item/<int:item_id>/', views.remove_cart_item, name="remove_cart_item"),


    path("create-order/", views.create_order, name="create_order"),
    path("verify-payment/", views.verify_payment, name="verify_payment"),

    #  path("payments/create-order/", create_razorpay_order, name="rzp_create_order"),
    # path("payments/verify/", verify_razorpay_payment, name="rzp_verify"),

]
