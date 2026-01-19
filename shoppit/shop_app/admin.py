from django.contrib import admin
from .models import Product,Cart ,CartItem

# Register your models here.

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)



# from django.contrib import admin
# from .models import Payment
# @admin.register(Payment)
# class PaymentAdmin(admin.ModelAdmin):
#     list_display = ("id","cart_code","amount","status","razorpay_order_id","created_at")

