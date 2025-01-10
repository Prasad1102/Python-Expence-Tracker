from django.contrib import admin
from django.urls import path
from Expences.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_world),
    path('api/register/', register_user),
    path('api/login/', login_user),
    path('api/addexpence/', add_new_expense),
    path('api/updateExpence/', update_expence),
    path('api/expences/', get_All_Expences),
    path('api/deleteexpence/', delete_expense),
    path('api/user/', getUserInfo),
    path('api/getOneRecord/', getExpenceById),
]
